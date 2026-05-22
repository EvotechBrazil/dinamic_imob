"use client";

import * as React from "react";
import { relativeTime } from "@/lib/utils";

interface RelativeTimeProps {
  ts: Date | string;
  /**
   * Texto exibido no SSR e antes do mount (evita hydration mismatch).
   * Default: string vazia ("&nbsp;" pra preservar layout).
   */
  fallback?: string;
  className?: string;
  /**
   * Refresh interval (ms). 0 desliga. Default 30s.
   */
  refreshMs?: number;
}

export function RelativeTime({
  ts,
  fallback = " ",
  className,
  refreshMs = 30_000,
}: RelativeTimeProps) {
  const [label, setLabel] = React.useState<string>(fallback);

  React.useEffect(() => {
    const update = () => setLabel(relativeTime(ts));
    update();
    if (refreshMs > 0) {
      const id = setInterval(update, refreshMs);
      return () => clearInterval(id);
    }
  }, [ts, refreshMs]);

  return (
    <span className={className} suppressHydrationWarning>
      {label}
    </span>
  );
}
