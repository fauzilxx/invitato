"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

export default function ApiDocsPage() {
  return (
    <>
      {/* Reset dark body background khusus halaman ini */}
      <style>{`
        body {
          background: #fff !important;
          color: #000 !important;
          min-height: 100vh;
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#fff" }}>
        <SwaggerUI url="/api/docs/spec" />
      </div>
    </>
  );
}
