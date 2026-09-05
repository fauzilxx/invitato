import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "The Wedding of Ricky & Fellycia by Invitato",
  description:
    "Together with joyful hearts, we are pleased to announce the beginning of this new chapter of our lives together. Website Invitation by Invitato.",
  openGraph: {
    title: "The Wedding of Ricky & Fellycia by Invitato",
    description:
      "Together with joyful hearts, we are pleased to announce the beginning of this new chapter of our lives together.",
    images: ["https://nsavesotzraemkpblmyj.supabase.co/storage/v1/object/public/wedding-assets/assets/1.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Disable browser scroll restoration synchronously before hydration.
            This MUST run before React mounts — useEffect is too late. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration='manual';window.scrollTo(0,0);",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className="min-h-full bg-[#D5DADE] text-[#2C3F4E] selection:bg-[#2C3F4E] selection:text-white font-cormorant">
        {children}
      </body>
    </html>
  );
}
