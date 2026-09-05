"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import StarryNightCanvas from "./StarryNightCanvas";
import { supabase } from "../lib/supabase";

interface WishItem {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchError, setFetchError] = useState("");

  const fetchWishes = async () => {
    setIsLoading(true);
    setFetchError("");
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setWishes(data.data.slice(0, 5));
      } else {
        setFetchError(
          data.message || "Ucapan belum dapat dimuat. Silakan coba lagi nanti."
        );
      }
    } catch {
      setFetchError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoading(true);
      setFetchError("");
      try {
        const res = await fetch("/api/wishes");
        const data = await res.json();
        if (isMounted) {
          if (data.success && Array.isArray(data.data)) {
            setWishes(data.data.slice(0, 5));
          } else {
            setFetchError(
              data.message || "Ucapan belum dapat dimuat. Silakan coba lagi nanti."
            );
          }
        }
      } catch {
        if (isMounted) {
          setFetchError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    load();

    // Subscribe to Supabase Realtime — ucapan baru langsung muncul tanpa refresh
    const channel = supabase
      .channel("public:wishes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          if (payload.new) {
            const newWish = payload.new as WishItem;
            setWishes((prev) => {
              if (prev.some((item) => item.id === newWish.id)) return prev;
              return [newWish, ...prev].slice(0, 5);
            });
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setErrorMessage("Mohon isi nama dan ucapan terlebih dahulu.");
      return;
    }
    setErrorMessage("");
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Tambahkan ucapan baru ke daftar secara optimistis
        if (data.data) {
          setWishes((prev) => {
            if (prev.some((item) => item.id === data.data.id)) return prev;
            return [data.data, ...prev].slice(0, 5);
          });
        }
        setName("");
        setMessage("");
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 4000);
      } else {
        // Fallback ramah — tetap tampil pesan gagal dengan jelas
        setErrorMessage(
          data.message ||
            "Ucapan gagal terkirim. Silakan coba beberapa saat lagi."
        );
      }
    } catch {
      setErrorMessage(
        "Terjadi gangguan jaringan. Pastikan koneksi internet Anda aktif dan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <section className="relative w-full py-24 px-6 sm:px-10 bg-gradient-to-b from-[#090D16] via-[#140D09] to-[#18100A] text-white flex flex-col items-center overflow-hidden isolate">
      {/* Dynamic Starry Night & Shooting Stars Canvas */}
      <StarryNightCanvas />

      {/* Soft Center Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md mx-auto space-y-10">
        {/* Header */}
        <ScrollReveal animation="fade-up" duration={1} className="text-center space-y-2">
          <p className="font-cormorant italic text-lg sm:text-xl text-[#f3e5ca]/90 leading-snug max-w-xs mx-auto drop-shadow">
            We&apos;d love to receive your blessings and kind words for us!
          </p>
        </ScrollReveal>

        {/* Wishes Input Form */}
        <ScrollReveal animation="zoom-in" delay={0.1} duration={1.1}>
          <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
            {/* Name Input */}
            <div className="space-y-1">
              <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                Your Name:
              </label>
              <input
                type="text"
                placeholder="Invitato"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-b border-[#f3e5ca]/40 py-2 font-cormorant text-base text-white placeholder-white/40 focus:border-[#f3e5ca] outline-none transition-colors"
              />
            </div>

            {/* Message Textarea */}
            <div className="space-y-1">
              <label className="font-cormorant text-base sm:text-lg text-white/90 block">
                Prayers &amp; Words:
              </label>
              <textarea
                placeholder="Dear Ricky & Fellycia..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full bg-transparent border-b border-[#f3e5ca]/40 py-2 font-cormorant text-base text-white placeholder-white/40 focus:border-[#f3e5ca] outline-none transition-colors resize-none"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2 bg-red-900/20 border border-red-400/30 rounded-lg px-4 py-3">
                <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
                <p className="font-cormorant text-sm text-red-300 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Success Message */}
            {submitSuccess && (
              <div className="flex items-start gap-2 bg-emerald-900/20 border border-emerald-400/30 rounded-lg px-4 py-3">
                <span className="text-emerald-400 text-lg leading-none mt-0.5">✓</span>
                <p className="font-cormorant text-sm text-emerald-300 leading-relaxed">
                  Ucapan Anda berhasil terkirim! Terima kasih atas doa &amp; kasih sayang Anda. 🤍
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 font-cormorant italic text-base sm:text-lg text-[#f3e5ca] hover:text-white underline underline-offset-4 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Mengirim..." : "Submit Wishes"}</span>
              </button>
            </div>
          </form>
        </ScrollReveal>

        {/* Wishes List */}
        <ScrollReveal animation="fade-up" delay={0.2} duration={1.1} className="pt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#f3e5ca]/20 pb-2">
            <span className="font-cormorant text-sm uppercase tracking-widest text-[#f3e5ca]/80">
              Prayers &amp; Blessings ({wishes.length})
            </span>
          </div>

          <div className="max-h-[380px] overflow-y-auto space-y-4 pr-1 pb-4 scrollbar-thin scrollbar-thumb-[#f3e5ca]/30">
            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-10 space-y-2">
                <div className="w-6 h-6 border-2 border-[#f3e5ca]/30 border-t-[#f3e5ca]/80 rounded-full animate-spin mx-auto" />
                <p className="font-cormorant italic text-[#f3e5ca]/50 text-sm">
                  Memuat ucapan...
                </p>
              </div>
            )}

            {/* Fetch Error State — friendly fallback */}
            {!isLoading && fetchError && (
              <div className="text-center py-8 space-y-3">
                <p className="text-3xl">🕊️</p>
                <p className="font-cormorant italic text-[#f3e5ca]/60 text-sm leading-relaxed max-w-xs mx-auto">
                  {fetchError}
                </p>
                <button
                  onClick={fetchWishes}
                  className="font-cormorant text-sm text-[#f3e5ca]/70 underline underline-offset-4 hover:text-[#f3e5ca] transition-colors"
                >
                  Coba muat ulang
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !fetchError && wishes.length === 0 && (
              <div className="text-center py-10 space-y-2">
                <p className="text-3xl">💌</p>
                <p className="font-cormorant italic text-[#f3e5ca]/50 text-base">
                  Jadilah yang pertama mengirim doa &amp; ucapan!
                </p>
              </div>
            )}

            {/* Wishes Cards */}
            {!isLoading && !fetchError && wishes.map((item) => (
              <div
                key={item.id}
                className="bg-[#22160F]/85 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[#f3e5ca]/30 shadow-[0_4px_20px_rgba(0,0,0,0.4)] space-y-2 text-left transition-all hover:border-[#f3e5ca]/60"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-cormorant text-base sm:text-lg font-semibold text-[#f3e5ca]">
                    {item.name}
                  </h4>
                  <span className="font-cormorant italic text-xs text-[#f3e5ca]/70">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                <p className="font-cormorant text-sm sm:text-base text-white/90 leading-relaxed font-light">
                  {item.message}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
