"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, MessageSquareHeart, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/rsvps", label: "RSVP", icon: Users },
  { href: "/admin/wishes", label: "Wishes", icon: MessageSquareHeart },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0F0A06] border-r border-[#f3e5ca]/10 flex flex-col z-40">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-[#f3e5ca]/10">
        <p className="font-marcellus text-[#d4af37] text-lg leading-tight">Invitato</p>
        <p className="font-cormorant italic text-white/40 text-sm mt-0.5">
          Ricky &amp; Fellycia
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-cormorant text-base transition-all ${
                isActive
                  ? "bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/25"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-[#f3e5ca]/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-cormorant text-base text-white/40 hover:text-red-400 hover:bg-red-900/10 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
