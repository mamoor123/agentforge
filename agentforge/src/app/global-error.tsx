"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: "#0f0f23", color: "#fff", fontFamily: "system-ui" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
          <div>
            <p style={{ fontSize: "4rem", marginBottom: "1rem" }}>😵</p>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Something went wrong</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2rem" }}>An unexpected error occurred.</p>
            <button
              onClick={reset}
              style={{ padding: "0.75rem 1.5rem", background: "linear-gradient(135deg, #6366f1, #06b6d4)", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontWeight: 600 }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
