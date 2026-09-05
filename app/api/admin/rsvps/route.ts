import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

/**
 * GET /api/admin/rsvps
 * Ambil semua data RSVP dengan filter & pagination.
 * Query params:
 *   - page (default: 1)
 *   - limit (default: 20)
 *   - filter: "all" | "hadir" | "tidak_hadir"
 *   - export: "csv" — jika ada, return CSV
 */
export async function GET(request: NextRequest) {
  // Auth check
  const session = request.cookies.get("admin_session");
  if (session?.value !== "authenticated") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const filter = searchParams.get("filter") ?? "all";
  const exportCsv = searchParams.get("export") === "csv";

  try {
    let query = supabase
      .from("rsvps")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (filter === "hadir" || filter === "tidak_hadir") {
      query = query.eq("attendance", filter);
    }

    // CSV export — ambil semua tanpa pagination
    if (exportCsv) {
      const { data, error } = await query;
      if (error) throw error;

      const headers = ["ID", "Nama", "Kode Telepon", "Telepon", "Alamat", "Email", "Kehadiran", "Acara", "Jumlah Tamu", "Tanggal Submit"];
      const rows = (data ?? []).map((r) => [
        r.id,
        `"${(r.guest_name ?? "").replace(/"/g, '""')}"`,
        r.phone_code ?? "",
        r.phone_number ?? "",
        `"${(r.address ?? "").replace(/"/g, '""')}"`,
        r.email ?? "",
        r.attendance === "hadir" ? "Hadir" : "Tidak Hadir",
        `"${(r.events ?? []).join(", ")}"`,
        r.guest_count ?? 0,
        new Date(r.created_at).toLocaleString("id-ID"),
      ]);

      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="rsvp-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    // Paginated JSON response
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, count, error } = await query.range(from, to);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data ?? [],
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    });
  } catch (err) {
    console.error("Admin RSVP fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data RSVP." },
      { status: 500 }
    );
  }
}
