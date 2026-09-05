/**
 * Script: upload-assets.mjs
 * Upload semua file dari public/assets/ dan public/music/
 * ke Supabase Storage bucket "wedding-assets".
 *
 * Jalankan sekali:
 *   node upload-assets.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

// ── Config ─────────────────────────────────────────────────────
const SUPABASE_URL = "https://nsavesotzraemkpblmyj.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = "wedding-assets";

// ── MIME types ──────────────────────────────────────────────────
const MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

if (!SUPABASE_SERVICE_KEY) {
  console.error("❌  Set SUPABASE_SERVICE_ROLE_KEY terlebih dahulu:");
  console.error("   $env:SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Ensure bucket exists ─────────────────────────────────────────
async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET_NAME);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ["image/*", "audio/*"],
      fileSizeLimit: 20971520, // 20MB
    });
    if (error) throw new Error(`Gagal buat bucket: ${error.message}`);
    console.log(`✅  Bucket "${BUCKET_NAME}" berhasil dibuat`);
  } else {
    console.log(`✅  Bucket "${BUCKET_NAME}" sudah ada`);
  }
}

// ── Upload file ──────────────────────────────────────────────────
async function uploadFile(localPath, storagePath) {
  const fileBuffer = readFileSync(localPath);
  const ext = extname(localPath).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`  ❌  ${storagePath} — ${error.message}`);
    return false;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
  console.log(`  ✅  ${storagePath}`);
  console.log(`      ${data.publicUrl}`);
  return true;
}

// ── Upload folder ────────────────────────────────────────────────
async function uploadFolder(localFolder, storageFolder) {
  const files = readdirSync(localFolder);
  console.log(`\n📁  Uploading ${localFolder}...`);
  for (const file of files) {
    const localPath = join(localFolder, file);
    if (statSync(localPath).isFile()) {
      await uploadFile(localPath, `${storageFolder}/${file}`);
    }
  }
}

// ── Generate config output ───────────────────────────────────────
async function printConfig() {
  const baseUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}`;
  console.log("\n\n📋  Copy ini ke app/lib/assets.ts:\n");
  console.log(`export const STORAGE_BASE = "${baseUrl}";`);
  console.log(`
export const ASSETS = {
  bg: \`\${STORAGE_BASE}/assets/background.jpg\`,
  goldenMoon: \`\${STORAGE_BASE}/assets/golden-moon.jpg\`,
  frameFloral: \`\${STORAGE_BASE}/assets/frame-floral.png\`,
  flowerGold: \`\${STORAGE_BASE}/assets/flower-gold.png\`,
  goldBouquet: \`\${STORAGE_BASE}/assets/gold-bouquet-transparent.png\`,
  curtainDrapes: \`\${STORAGE_BASE}/assets/curtain-drapes-transparent.png\`,
  venueChapel: \`\${STORAGE_BASE}/assets/venue-chapel.png\`,
  venueBallroom: \`\${STORAGE_BASE}/assets/venue-ballroom.png\`,
  venueExterior: \`\${STORAGE_BASE}/assets/venue-exterior.png\`,
  scrollDown: \`\${STORAGE_BASE}/assets/noun_scrolldown_111854_@700.png\`,
  gallery: Array.from({ length: 10 }, (_, i) => \`\${STORAGE_BASE}/assets/\${i + 1}.png\`),
  music: \`\${STORAGE_BASE}/music/sparkle.mp3\`,
};`);
}

// ── Main ─────────────────────────────────────────────────────────
(async () => {
  console.log("🚀  Memulai upload assets ke Supabase Storage...\n");

  await ensureBucket();
  await uploadFolder("public/assets", "assets");
  await uploadFolder("public/music", "music");
  await printConfig();

  console.log("\n\n✅  Selesai! Langkah selanjutnya:");
  console.log("   1. Copy output ASSETS config di atas ke app/lib/assets.ts");
  console.log("   2. Tambahkan public/assets/ dan public/music/ ke .gitignore");
  console.log("   3. Push repo ke GitHub (tanpa asset files)");
})();
