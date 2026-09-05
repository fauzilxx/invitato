"use client";

import { WEDDING_DATE } from "../lib/config";
import { useCountdown } from "../hooks/useCountdown";

/**
 * CountdownSection: Integrated countdown component for EventSection.
 */
export default function CountdownSection() {
  const { days, hours, minutes, seconds, isExpired } =
    useCountdown(WEDDING_DATE);

  const units = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <div className="relative w-full pt-4 pb-2 px-1 text-white flex flex-col items-center">
      <div className="relative z-10 w-full max-w-lg mx-auto text-center space-y-6">
        {/* Section Header */}
        <div className="space-y-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          <p className="font-jost text-xs sm:text-sm uppercase tracking-[0.3em] text-[#f3e5ca] font-semibold drop-shadow">
            COUNTING DOWN TO THE DAY
          </p>
          <div className="w-14 h-[1.5px] bg-[#f3e5ca]/80 mx-auto mt-2" />
        </div>

        {/* Timer Display */}
        {isExpired ? (
          <div className="p-6 rounded-2xl border border-[#f3e5ca]/50 bg-[#22160F]/90 backdrop-blur-xs shadow-2xl">
            <p className="font-marcellus text-xl sm:text-2xl text-[#f3e5ca]">
              Acara Telah Berlangsung
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
            {units.map((unit, index) => (
              <div
                key={index}
                className="bg-[#22160F]/85 backdrop-blur-xs p-3 sm:p-4 rounded-2xl flex flex-col items-center justify-center border border-[#f3e5ca]/50 shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 hover:border-[#f3e5ca]"
              >
                <span className="font-marcellus text-2xl sm:text-4xl font-light tracking-tight text-[#f3e5ca] drop-shadow">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="font-jost text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#f3e5ca]/85 mt-1.5 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
