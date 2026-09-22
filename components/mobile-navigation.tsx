"use client";
import { useRef } from "react";
import { Link } from "@/components/plain-link";
const navigation = [ { href: "/projects", label: "Projects" }, { href: "/about", label: "About" }, { href: "/essays", label: "Writing" } ];
export function MobileNavigation({ activeSection }: { activeSection?: "projects" | "about" | "essays" }) {
  const menu = useRef<HTMLDetailsElement>(null);
  return <details ref={menu} className="mobile-menu" onKeyDown={event => {
    if (event.key === "Escape" && menu.current?.open) {
      menu.current.open = false;
      menu.current.querySelector("summary")?.focus();
      event.preventDefault();
    }
  }}><summary role="button" aria-label="Toggle navigation" aria-controls="mobile-navigation"><span /><span /></summary><nav id="mobile-navigation" aria-label="Mobile navigation">{navigation.map((item,index) => <Link href={item.href} key={item.href} aria-current={item.href === `/${activeSection}` ? "page" : undefined}><small>0{index+1}</small>{item.label}</Link>)}<Link href="/contact"><small>04</small>Start a project</Link></nav></details>;
}
