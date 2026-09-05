/**
 * Centralized asset URLs served from Supabase Storage.
 * Files in public/assets/ and public/music/ are excluded from git.
 */

const STORAGE_BASE =
  "https://nsavesotzraemkpblmyj.supabase.co/storage/v1/object/public/wedding-assets";

export const ASSETS = {
  bg: `${STORAGE_BASE}/assets/background.jpg`,
  goldenMoon: `${STORAGE_BASE}/assets/golden-moon.jpg`,
  frameFloral: `${STORAGE_BASE}/assets/frame-floral.png`,
  flowerGold: `${STORAGE_BASE}/assets/flower-gold.png`,
  goldBouquet: `${STORAGE_BASE}/assets/gold-bouquet-transparent.png`,
  curtainDrapes: `${STORAGE_BASE}/assets/curtain-drapes-transparent.png`,
  venueChapel: `${STORAGE_BASE}/assets/venue-chapel.png`,
  venueBallroom: `${STORAGE_BASE}/assets/venue-ballroom.png`,
  venueExterior: `${STORAGE_BASE}/assets/venue-exterior.png`,
  scrollDown: `${STORAGE_BASE}/assets/noun_scrolldown_111854_@700.png`,
  gallery: Array.from(
    { length: 10 },
    (_, i) => `${STORAGE_BASE}/assets/${i + 1}.png`
  ),
  music: `${STORAGE_BASE}/music/sparkle.mp3`,
};
