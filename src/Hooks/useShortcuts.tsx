import { useEffect } from "react";

type ShortcutHandler = (event: KeyboardEvent) => void;

interface ShortcutMap {
  [combo: string]: ShortcutHandler;
}

export function useShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const parts: string[] = [];

      if (e.metaKey) parts.push("Meta");
      if (e.ctrlKey) parts.push("Ctrl");
      if (e.shiftKey) parts.push("Shift");
      if (e.altKey) parts.push("Alt");

      parts.push(e.key);

      const combo = parts.join("+");

      if (shortcuts[combo]) {
        e.preventDefault();
        shortcuts[combo](e);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}
