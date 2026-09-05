export const metadata = {
  title: "API Documentation",
  description: "Interactive API documentation for the Invitato Wedding Invitation backend.",
  robots: "noindex, nofollow",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  // Tidak boleh ada <html> / <body> di nested layout —
  // hanya root app/layout.tsx yang boleh. 
  // Override styling root body dengan wrapper div full-page.
  return (
    <div className="min-h-screen bg-white text-black" style={{ all: "revert" }}>
      {children}
    </div>
  );
}
