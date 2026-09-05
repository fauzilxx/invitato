import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

/**
 * GET /api/admin/stats
 * Ringkasan statistik RSVP & Wishes.
 */
export async function GET(request: NextRequest) {
  // Auth check
  const session = request.cookies.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ambil semua RSVP untuk hitung stats
    const { data: rsvps, error: rsvpError } = await supabase
      .from("rsvps")
      .select("attendance, guest_count");

    const { count: wishesCount, error: wishesError } = await supabase
      .from("wishes")
      .select("*", { count: "exact", head: true });

    if (rsvpError || wishesError) {
      return NextResponse.json(
        { success: false, message: "Gagal mengambil data statistik." },
        { status: 500 }
      );
    }

    const totalRsvp = rsvps?.length ?? 0;
    const hadir = rsvps?.filter((r) => r.attendance === "hadir") ?? [];
    const tidakHadir = rsvps?.filter((r) => r.attendance === "tidak_hadir") ?? [];
    const totalHeadcount = hadir.reduce((sum, r) => sum + (r.guest_count ?? 0), 0);

    return NextResponse.json({
      success: true,
      data: {
        total_rsvp: totalRsvp,
        hadir: hadir.length,
        tidak_hadir: tidakHadir.length,
        total_headcount: totalHeadcount,
        total_wishes: wishesCount ?? 0,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
