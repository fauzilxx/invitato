import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

/**
 * GET /api/admin/wishes
 * Ambil semua wishes dengan pagination.
 * Query params:
 *   - page (default: 1)
 *   - limit (default: 20)
 *   - export: "csv"
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
  const exportCsv = searchParams.get("export") === "csv";

  try {
    const baseQuery = supabase
      .from("wishes")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (exportCsv) {
      const { data, error } = await baseQuery;
      if (error) throw error;

      const headers = ["ID", "Nama", "Pesan", "Tanggal"];
      const rows = (data ?? []).map((w) => [
        w.id,
        `"${(w.name ?? "").replace(/"/g, '""')}"`,
        `"${(w.message ?? "").replace(/"/g, '""')}"`,
        new Date(w.created_at).toLocaleString("id-ID"),
      ]);

      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="wishes-${new Date().toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, count, error } = await baseQuery.range(from, to);

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
    console.error("Admin Wishes fetch error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data ucapan." },
      { status: 500 }
    );
  }
}
