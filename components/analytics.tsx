"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

function sendEvent(name: string, parameters: Record<string, unknown> = {}) {
  window.gtag?.("event", name, parameters);
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    sendEvent("page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });

    const milestones = new Set<number>();
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      if (available <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / available) * 100));
      for (const threshold of [25, 50, 75, 100]) {
        if (depth >= threshold && !milestones.has(threshold)) {
          milestones.add(threshold);
          sendEvent("scroll_depth", {
            percent_scrolled: threshold,
            page_path: pathname,
            content_type: pathname.startsWith("/essays/") ? "essay" : "page",
          });
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      if (!link || !link.href) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) {
        sendEvent("outbound_click", {
          link_url: url.href,
          link_domain: url.hostname,
          link_text: link.textContent?.trim().slice(0, 100) || "",
          page_path: pathname,
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return (
    <>
      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false});`}
          </Script>
        </>
      ) : null}
      {clarityId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${clarityId}');`}
        </Script>
      ) : null}
    </>
  );
}
