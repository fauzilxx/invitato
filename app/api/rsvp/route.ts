import { NextRequest, NextResponse } from "next/server";
import { rsvpSchema } from "@/app/lib/schemas";
import { supabase } from "@/app/lib/supabase";

/**
 * POST /api/rsvp
 * Submit RSVP ke Supabase. Jika database belum tersedia,
 * kembalikan pesan error yang ramah dan informatif.
 */
export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Koneksi Supabase belum dikonfigurasi. Silakan isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di Environment Variables Vercel.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    // 1. Validasi input dengan Zod
    const validation = rsvpSchema.safeParse(body);
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

    const {
      guest_name,
      phone_code,
      phone_number,
      address,
      email,
      attendance,
      events,
      guest_count,
    } = validation.data;

    // 2. Insert ke Supabase
    const { data, error } = await supabase
      .from("rsvps")
      .insert([
        {
          guest_name,
          phone_code: phone_code || "+ 62",
          phone_number: phone_number || null,
          address: address || null,
          email: email || null,
          attendance,
          events: events || [],
          guest_count,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase RSVP Insert Error:", error);

      // Fallback ramah: cek apakah tabel belum dibuat
      if (
        error.code === "PGRST205" ||
        error.message?.includes("schema cache") ||
        error.message?.includes("does not exist")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Tabel 'rsvps' belum disiapkan di Supabase. Silakan jalankan SQL Migration di Supabase Dashboard.",
            errorDetails: error.message,
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            error.message ||
            "Konfirmasi kehadiran gagal disimpan. Silakan coba lagi dalam beberapa menit.",
          errorDetails: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err: unknown) {
    console.error("RSVP API Error:", err);
    const errMessage = err instanceof Error ? err.message : String(err);
    const isFetchFailed = errMessage.includes("fetch failed");

    return NextResponse.json(
      {
        success: false,
        message: isFetchFailed
          ? "Gagal terhubung ke Supabase. Silakan periksa URL Supabase pada Environment Variables Vercel."
          : "Terjadi gangguan pada server. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
