"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, VolumeX } from "lucide-react";
import { MUSIC_URL } from "../lib/config";

/**
 * MusicToggle — background audio player.
 *
 * Browser Autoplay Policy: audio with sound can ONLY play after a real user
 * gesture (click / tap / keydown). There is no reliable way to bypass this.
 *
 * Strategy:
 * 1. On mount: start audio MUTED (always allowed) so the file pre-buffers.
 * 2. `window.__playAudio()` — called from HeroCoverSection's open button
 *    (a real user click) — unmutes and plays. This is the guaranteed trigger.
 * 3. On subsequent refreshes: if the user had previously clicked open, the
 *    localStorage flag lets us attempt unmuted play immediately. If the
 *    browser blocks it (low MEI score), we silently fall back to waiting for
 *    the first gesture.
 * 4. Page Visibility API: pause on tab switch, resume on tab return.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasUnmutedRef = useRef(false);
  const wasPlayingBeforeHiddenRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;

    const INTERACTED_KEY = "invitato_music_interacted";

    // Core unlock function — must be called from within a real user gesture
    const unlock = () => {
      if (hasUnmutedRef.current) return;
      hasUnmutedRef.current = true;
      try { localStorage.setItem(INTERACTED_KEY, "1"); } catch {}

      audio.muted = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));

      // No longer need gesture listeners once unlocked
      removeGestureListeners();
    };

    const addGestureListeners = () => {
      window.addEventListener("click", unlock, true);
      window.addEventListener("touchstart", unlock, true);
      window.addEventListener("pointerdown", unlock, true);
      window.addEventListener("keydown", unlock, true);
    };

    const removeGestureListeners = () => {
      window.removeEventListener("click", unlock, true);
      window.removeEventListener("touchstart", unlock, true);
      window.removeEventListener("pointerdown", unlock, true);
      window.removeEventListener("keydown", unlock, true);
    };

    // Expose for HeroCoverSection's open button (guaranteed user gesture)
    (window as any).__playAudio = unlock;

    // Try unmuted play if user has interacted before (returning visitor / refresh)
    const hasInteractedBefore = !!localStorage.getItem(INTERACTED_KEY);
    if (hasInteractedBefore) {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          hasUnmutedRef.current = true;
          setIsPlaying(true);
          // Already playing unmuted — no need for gesture listeners
        })
        .catch(() => {
          // Browser blocked even for returning visitor — pre-buffer muted,
          // wait for the open-button click
          audio.muted = true;
          audio.play().catch(() => {});
          addGestureListeners();
        });
    } else {
      // First visit: pre-buffer muted, wait for open-button gesture
      audio.muted = true;
      audio.play().catch(() => {});
      addGestureListeners();
    }

    // Page Visibility API
    const handleVisibilityChange = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) {
        wasPlayingBeforeHiddenRef.current = !a.paused && !a.muted;
        if (!a.paused) a.pause();
      } else {
        if (wasPlayingBeforeHiddenRef.current && hasUnmutedRef.current) {
          a.muted = false;
          a.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      delete (window as any).__playAudio;
      removeGestureListeners();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused && !audio.muted) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Audio play error:", err));
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center justify-center select-none">
      <audio ref={audioRef} src={MUSIC_URL} loop playsInline preload="auto" />

      {/* Floating Sparkle Emitter particles when music is playing */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <span className="absolute -top-3 left-1 text-xs text-[#f3e5ca] animate-bounce duration-1000 opacity-80">
            ✨
          </span>
          <span className="absolute -top-4 right-0 text-[10px] text-amber-300 animate-ping duration-1000 opacity-60">
            ✦
          </span>
          <span className="absolute -bottom-2 -left-2 text-[11px] text-[#f3e5ca] animate-pulse opacity-75">
            ✨
          </span>
        </div>
      )}

      {/* Floating Glassmorphism Sparkle Toggle Button */}
      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
        className={`relative z-10 w-13 h-13 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-90 shadow-2xl backdrop-blur-md border ${
          isPlaying
            ? "bg-[#18100A]/85 border-[#f3e5ca]/80 shadow-[0_0_25px_rgba(243,229,202,0.45)] scale-105"
            : "bg-[#0A1628]/80 border-white/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] opacity-80 hover:opacity-100"
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#f3e5ca]/20 blur-sm animate-ping pointer-events-none" />
            <Sparkles className="w-6 h-6 text-[#f3e5ca] animate-spin-slow drop-shadow-[0_0_8px_rgba(243,229,202,0.8)]" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center text-white/70">
            <Sparkles className="w-5 h-5 opacity-40" />
            <VolumeX className="w-4 h-4 absolute text-red-400/90" />
          </div>
        )}
      </button>
    </div>
  );
}
