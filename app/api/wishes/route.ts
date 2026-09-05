import { NextRequest, NextResponse } from "next/server";
import { wishSchema } from "@/app/lib/schemas";
import { supabase } from "@/app/lib/supabase";

/**
 * GET /api/wishes
 * Ambil 5 ucapan terbaru dari Supabase.
 * Jika database belum tersedia, kembalikan pesan error yang ramah.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Supabase Wishes Fetch Error:", error);

      // Jika tabel belum dibuat, beri pesan ramah daripada crash
      if (error.code === "PGRST205" || error.message?.includes("schema cache")) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Halaman ucapan sedang disiapkan. Silakan kembali lagi sebentar.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Ucapan tidak dapat dimuat saat ini. Silakan coba lagi.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err) {
    console.error("Wishes GET Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi gangguan pada server. Silakan muat ulang halaman.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wishes
 * Kirim ucapan baru ke Supabase.
 * Jika database belum tersedia, kembalikan pesan error yang ramah.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validasi input dengan Zod
    const validation = wishSchema.safeParse(body);
    if (!validation.success) {
      const formattedErrors = validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, errors: formattedErrors },
        { status: 400 }
      );
    }

    const { name, message } = validation.data;

    // 2. Insert ke Supabase
    const { data, error } = await supabase
      .from("wishes")
      .insert([{ name, message }])
      .select()
      .single();

    if (error) {
      console.error("Supabase Wishes Insert Error:", error);

      // Deteksi tabel belum dibuat / error RLS / error database
      if (
        error.code === "PGRST205" ||
        error.message?.includes("schema cache") ||
        error.message?.includes("does not exist")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Tabel 'wishes' belum disiapkan di Supabase. Silakan jalankan SQL Migration di Supabase Dashboard.",
            errorDetails: error.message,
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Ucapan gagal tersimpan. Silakan coba beberapa saat lagi.",
          errorDetails: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("Wishes API Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi gangguan pada server. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
