"use client";
import { Fragment, useRef } from "react";
import { AppearanceSwitch } from "@/components/appearance-switch";
import { Link } from "@/components/plain-link";
const navigation = [ { href: "/projects", label: "Projects" }, { href: "/#motion-studies", label: "Play" }, { href: "/about", label: "About" }, { href: "/essays", label: "Writing" } ];
export function MobileNavigation({ activeSection }: { activeSection?: "projects" | "about" | "essays" }) {
  const menu = useRef<HTMLDetailsElement>(null);
  return <details ref={menu} className="mobile-menu" onKeyDown={event => {
    if (event.key === "Escape" && menu.current?.open) {
      menu.current.open = false;
      menu.current.querySelector("summary")?.focus();
      event.preventDefault();
    }
  }}><summary role="button" aria-label="Toggle navigation" aria-controls="mobile-navigation"><span /><span /></summary><nav id="mobile-navigation" aria-label="Mobile navigation">{navigation.map((item,index) => <Fragment key={item.href}><Link href={item.href} onClick={() => { if (menu.current) menu.current.open = false; }} aria-current={item.href === `/${activeSection}` ? "page" : undefined}><small>0{index+1}</small>{item.label}</Link>{item.href === "/projects" && <AppearanceSwitch />}</Fragment>)}<Link href="/contact"><small>05</small>Start a project</Link></nav></details>;
}
