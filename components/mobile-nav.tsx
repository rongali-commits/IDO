"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const links = [
  ["Essays", "/essays"],
  ["Topics", "/topics"],
  ["Newsletter", "/newsletter"],
  ["Work with me", "/work-with-me"],
  ["About", siteConfig.authorPath],
  ["Reading List", "/reading-list"],
  ["Now", "/now"],
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="mobile-nav">
      <button className="mobile-nav-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen((value) => !value)}>
        <span /><span />
      </button>
      {open ? (
        <nav id="mobile-menu" aria-label="Mobile navigation">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      ) : null}
    </div>
  );
}
