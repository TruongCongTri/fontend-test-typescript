"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PATH_TITLES: Record<string, string> = {
  "": "OTP Terminal",
  login: "Signin",
  search: "Search GitHub",
  dashboard: "Dashboard",
};

const formatSegment = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isHome = segments.length === 0;

  const base = "C:\\Skipli\\Github";

  const trail = segments.map((seg, i) => {
    const display = PATH_TITLES[seg] || formatSegment(seg);
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;

    return (
      <span key={i} className="inline-flex items-center space-x-2">
        {/* Add "\" only between second and subsequent segments */}
        {i !== 0 && <span className="text-white">{" \\ "}</span>}
        {isLast ? (
          <span className="text-[#00ff88]">{display}</span>
        ) : (
          <Link href={href} className="text-white hover:underline">
            {display}
          </Link>
        )}
      </span>
    );
  });

  return (
    <h1 className="text-lg mb-6 font-mono">
      {isHome ? (
        <span className="text-[#00ff88]">{base}</span>
      ) : (
        <>
          <Link href="/" className="text-white hover:underline">
            {base}
          </Link>
          <span className="text-white">{"> "}</span>
        </>
      )}
      {trail}
    </h1>
  );
}
