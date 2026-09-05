"use client";

import { useEffect, useState } from "react";
import { Download, ChevronLeft, ChevronRight, Search } from "lucide-react";

interface RsvpItem {
  id: string;
  guest_name: string;
  phone_code?: string;
  phone_number?: string;
  address?: string;
  email?: string;
  attendance: "hadir" | "tidak_hadir";
  events?: string[];
  guest_count: number;
  created_at: string;
}

const PAGE_SIZE = 20;

export default function AdminRsvpsPage() {
  const [data, setData] = useState<RsvpItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<"all" | "hadir" | "tidak_hadir">("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
          filter,
        });
        const res = await fetch(`/api/admin/rsvps?${params}`);
        const json = await res.json();
        if (isMounted && json.success) {
          setData(json.data);
          setTotal(json.total);
          setTotalPages(json.totalPages);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [page, filter]);

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const params = new URLSearchParams({ filter, export: "csv" });
      const res = await fetch(`/api/admin/rsvps?${params}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rsvp-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const filtered = search
    ? data.filter(
        (r) =>
          r.guest_name.toLowerCase().includes(search.toLowerCase()) ||
          r.email?.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-marcellus text-3xl text-[#f3e5ca]">Data RSVP</h1>
          <p className="font-cormorant italic text-white/40 mt-1">
            Total {total} konfirmasi kehadiran
          </p>
        </div>
        <button
          onClick={handleExportCsv}
          disabled={isExporting}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#d4af37] rounded-xl font-cormorant text-sm hover:bg-[#d4af37]/25 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {isExporting ? "Mengunduh..." : "Export CSV"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F0A06] border border-[#f3e5ca]/15 rounded-xl pl-9 pr-4 py-2.5 font-cormorant text-base text-white placeholder-white/25 focus:border-[#d4af37]/40 outline-none transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex rounded-xl border border-[#f3e5ca]/15 overflow-hidden">
          {(["all", "hadir", "tidak_hadir"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              className={`px-4 py-2.5 font-cormorant text-sm transition-colors cursor-pointer ${
                filter === f
                  ? "bg-[#d4af37]/15 text-[#d4af37]"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {f === "all" ? "Semua" : f === "hadir" ? "Hadir" : "Tidak Hadir"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0F0A06] border border-[#f3e5ca]/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full font-cormorant text-sm">
            <thead>
              <tr className="border-b border-[#f3e5ca]/10">
                <th className="text-left px-5 py-4 text-white/40 uppercase tracking-wider text-xs font-normal">Nama</th>
                <th className="text-left px-5 py-4 text-white/40 uppercase tracking-wider text-xs font-normal">Kontak</th>
                <th className="text-left px-5 py-4 text-white/40 uppercase tracking-wider text-xs font-normal">Kehadiran</th>
                <th className="text-left px-5 py-4 text-white/40 uppercase tracking-wider text-xs font-normal">Acara</th>
                <th className="text-left px-5 py-4 text-white/40 uppercase tracking-wider text-xs font-normal">Tamu</th>
                <th className="text-left px-5 py-4 text-white/40 uppercase tracking-wider text-xs font-normal">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-white/30 italic">
                    Memuat data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-white/30 italic">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((r, i) => (
                  <tr
                    key={r.id}
                    className={`border-b border-[#f3e5ca]/5 hover:bg-white/[0.02] transition-colors ${
                      i % 2 === 0 ? "" : "bg-white/[0.01]"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{r.guest_name}</p>
                      {r.address && (
                        <p className="text-white/35 text-xs mt-0.5 truncate max-w-[180px]">{r.address}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {r.phone_number && (
                        <p className="text-white/70">{r.phone_code} {r.phone_number}</p>
                      )}
                      {r.email && (
                        <p className="text-white/40 text-xs mt-0.5">{r.email}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          r.attendance === "hadir"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {r.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/60">
                      {r.events && r.events.length > 0
                        ? r.events.map((e) =>
                            e === "akad" ? "Akad" : e === "reception" ? "Resepsi" : e === "both" ? "Akad & Resepsi" : e
                          ).join(", ")
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-white font-medium">{r.guest_count}</td>
                    <td className="px-5 py-4 text-white/40 text-xs whitespace-nowrap">
                      {new Date(r.created_at).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#f3e5ca]/10">
            <p className="font-cormorant text-sm text-white/40">
              Halaman {page} dari {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-[#f3e5ca]/15 text-white/50 hover:text-white hover:border-[#f3e5ca]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-[#f3e5ca]/15 text-white/50 hover:text-white hover:border-[#f3e5ca]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
