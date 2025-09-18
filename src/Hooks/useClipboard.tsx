import { useState, useRef, useEffect } from "react";
import { useToast } from "../Context/ToastContext";

export function useClipboard(timeout = 1500) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  //   Hooks
  const { showToast } = useToast();

  const copy = async (text: string) => {
    const ok = await (async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch {}
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const success = document.execCommand("copy");
        document.body.removeChild(ta);
        return success;
      } catch {
        return false;
      }
    })();

    setCopied(ok);
    showToast("Copied to clipboard successfully 🎉");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), timeout);
    return ok;
  };

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  return { copy, copied };
}
