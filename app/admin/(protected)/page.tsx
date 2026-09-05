import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

interface Stats {
  total_rsvp: number;
  hadir: number;
  tidak_hadir: number;
  total_headcount: number;
  total_wishes: number;
}

async function getStats(): Promise<Stats | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    if (session?.value !== "authenticated") redirect("/admin/login");

    const { data: rsvps } = await supabase
      .from("rsvps")
      .select("attendance, guest_count");

    const { count: wishesCount } = await supabase
      .from("wishes")
      .select("*", { count: "exact", head: true });

    const totalRsvp = rsvps?.length ?? 0;
    const hadir = rsvps?.filter((r) => r.attendance === "hadir") ?? [];
    const tidakHadir = rsvps?.filter((r) => r.attendance === "tidak_hadir") ?? [];
    const totalHeadcount = hadir.reduce((sum, r) => sum + (r.guest_count ?? 0), 0);

    return {
      total_rsvp: totalRsvp,
      hadir: hadir.length,
      tidak_hadir: tidakHadir.length,
      total_headcount: totalHeadcount,
      total_wishes: wishesCount ?? 0,
    };
  } catch {
    return null;
  }
}


function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: number | string;
  sub?: string;
  color: string;
}) {
  return (
    <div className={`bg-[#0F0A06] border rounded-2xl p-6 space-y-2 ${color}`}>
      <p className="font-cormorant text-sm text-white/50 uppercase tracking-widest">{label}</p>
      <p className="font-marcellus text-4xl text-white">{value}</p>
      {sub && <p className="font-cormorant italic text-sm text-white/40">{sub}</p>}
    </div>
  );
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-marcellus text-3xl text-[#f3e5ca]">Overview</h1>
        <p className="font-cormorant italic text-white/40 mt-1">
          Ringkasan data undangan pernikahan Ricky &amp; Fellycia
        </p>
      </div>

      {stats ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
            <StatCard
              label="Total RSVP Masuk"
              value={stats.total_rsvp}
              sub="Tamu yang sudah konfirmasi"
              color="border-[#f3e5ca]/15"
            />
            <StatCard
              label="Hadir"
              value={stats.hadir}
              sub={`${stats.total_headcount} orang total`}
              color="border-emerald-500/20"
            />
            <StatCard
              label="Tidak Hadir"
              value={stats.tidak_hadir}
              sub="Tamu berhalangan"
              color="border-red-500/15"
            />
            <StatCard
              label="Total Headcount"
              value={stats.total_headcount}
              sub="Estimasi tamu hadir"
              color="border-[#d4af37]/20"
            />
            <StatCard
              label="Total Ucapan"
              value={stats.total_wishes}
              sub="Doa & ucapan masuk"
              color="border-purple-500/15"
            />
            <div className="bg-[#0F0A06] border border-[#f3e5ca]/10 rounded-2xl p-6 flex flex-col justify-between">
              <p className="font-cormorant text-sm text-white/40 uppercase tracking-widest">
                Tingkat Respons
              </p>
              <div>
                <p className="font-marcellus text-4xl text-[#d4af37]">
                  {stats.total_rsvp > 0
                    ? Math.round((stats.hadir / stats.total_rsvp) * 100)
                    : 0}
                  %
                </p>
                <p className="font-cormorant italic text-sm text-white/40 mt-1">
                  tamu menyatakan hadir
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar Hadir vs Tidak */}
          {stats.total_rsvp > 0 && (
            <div className="bg-[#0F0A06] border border-[#f3e5ca]/10 rounded-2xl p-6 space-y-4">
              <p className="font-cormorant text-sm text-white/50 uppercase tracking-widest">
                Komposisi Kehadiran
              </p>
              <div className="flex rounded-full overflow-hidden h-4">
                <div
                  className="bg-emerald-500/70 transition-all"
                  style={{ width: `${(stats.hadir / stats.total_rsvp) * 100}%` }}
                />
                <div
                  className="bg-red-500/50 transition-all"
                  style={{ width: `${(stats.tidak_hadir / stats.total_rsvp) * 100}%` }}
                />
              </div>
              <div className="flex gap-6 font-cormorant text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70 inline-block" />
                  Hadir ({stats.hadir})
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/50 inline-block" />
                  Tidak Hadir ({stats.tidak_hadir})
                </span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📊</p>
          <p className="font-cormorant italic text-white/40 text-lg">
            Data tidak dapat dimuat. Pastikan schema database sudah dijalankan di Supabase.
          </p>
        </div>
      )}
    </div>
  );
}
