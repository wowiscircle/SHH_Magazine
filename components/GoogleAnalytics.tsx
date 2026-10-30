"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsPage, cleanReferrer } from "@/lib/ga4.mjs";

const measurementId = "G-K49RGEBCHQ";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean | undefined;
};

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    const w = window as unknown as AnalyticsWindow;
    const page = analyticsPage(window.location.href);
    w[`ga-disable-${measurementId}`] = !page;
    if (!page) { lastPage.current = null; return; }
    if (lastPage.current === page) return;

    if (!w.gtag) {
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer!.push(arguments); };
      w.gtag("js", new Date());
      w.gtag("config", measurementId, {
        send_page_view: false,
        page_location: page,
        page_referrer: cleanReferrer(document.referrer),
      });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
    w.gtag("set", { page_location: page, page_referrer: cleanReferrer(document.referrer) });
    w.gtag("event", "page_view", { send_to: measurementId, page_location: page, page_referrer: cleanReferrer(document.referrer) });
    lastPage.current = page;
  }, [pathname]);

  return null;
}
