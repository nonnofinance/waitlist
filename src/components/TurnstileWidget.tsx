"use client";

import Script from "next/script";
import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface RenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: RenderOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export interface TurnstileHandle {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

// The existing sitekey (widget: NonnoApp Widget) — never rotate this,
// it's already deployed. No secret lives on the client.
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

export const TurnstileWidget = forwardRef<TurnstileHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ onVerify, onExpire, className }, ref) {
    const containerId = useId().replace(/:/g, "");
    const widgetId = useRef<string | null>(null);
    const [scriptReady, setScriptReady] = useState(false);

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetId.current) {
          window.turnstile?.reset(widgetId.current);
        }
      },
    }));

    useEffect(() => {
      if (!scriptReady || !window.turnstile || widgetId.current) return;

      widgetId.current = window.turnstile.render(`#${containerId}`, {
        sitekey: SITE_KEY,
        theme: "dark",
        size: "flexible",
        callback: onVerify,
        "expired-callback": () => onExpire?.(),
        "error-callback": () => onExpire?.(),
      });

      return () => {
        if (widgetId.current) {
          window.turnstile?.remove(widgetId.current);
          widgetId.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scriptReady, containerId]);

    return (
      <>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
        <div id={containerId} className={className} />
      </>
    );
  },
);
