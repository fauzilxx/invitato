"use client";

import { useEffect, useState } from "react";
import { Download, ChevronLeft, ChevronRight, Search } from "lucide-react";

interface WishItem {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const PAGE_SIZE = 20;

export default function AdminWishesPage() {
  const [data, setData] = useState<WishItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
        });
        const res = await fetch(`/api/admin/wishes?${params}`);
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
  }, [page]);

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/admin/wishes?export=csv");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wishes-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const filtered = search
    ? data.filter(
        (w) =>
          w.name.toLowerCase().includes(search.toLowerCase()) ||
          w.message.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="font-marcellus text-3xl text-[#f3e5ca]">Ucapan & Doa</h1>
          <p className="font-cormorant italic text-white/40 mt-1">
            Total {total} ucapan dari tamu
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

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Cari nama atau isi ucapan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0F0A06] border border-[#f3e5ca]/15 rounded-xl pl-9 pr-4 py-2.5 font-cormorant text-base text-white placeholder-white/25 focus:border-[#d4af37]/40 outline-none transition-colors"
        />
      </div>

      {/* Cards */}
      {isLoading ? (
        <div className="text-center py-20 text-white/30 italic font-cormorant">
          Memuat ucapan...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">💌</p>
          <p className="font-cormorant italic text-white/30">Tidak ada ucapan ditemukan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((w) => (
            <div
              key={w.id}
              className="bg-[#0F0A06] border border-[#f3e5ca]/10 rounded-2xl p-5 hover:border-[#f3e5ca]/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="font-marcellus text-base text-[#f3e5ca]">{w.name}</p>
                <p className="font-cormorant italic text-xs text-white/30 whitespace-nowrap shrink-0">
                  {new Date(w.created_at).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <p className="font-cormorant text-base text-white/70 leading-relaxed">{w.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
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
  );
}
