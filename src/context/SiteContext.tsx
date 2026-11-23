import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { defaultContent, type SiteContent } from "../data/defaultContent";
import liveSeed from "../../data/content.json";

interface SiteContextValue {
  content: SiteContent;
  saveContent: (next: SiteContent) => Promise<void>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export const useSite = () => {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
};

function deepMerge<T>(base: T, over: unknown): T {
  if (Array.isArray(base)) {
    return (over !== undefined ? over : base) as T;
  }
  if (
    base !== null &&
    typeof base === "object" &&
    over !== null &&
    typeof over === "object" &&
    !Array.isArray(over)
  ) {
    const out = { ...base } as Record<string, unknown>;
    const baseObj = base as Record<string, unknown>;
    const overObj = over as Record<string, unknown>;
    for (const k of Object.keys(baseObj)) {
      out[k] = deepMerge(baseObj[k], overObj[k]);
    }
    return out as T;
  }
  return (over !== undefined ? over : base) as T;
}

const initialSeed: SiteContent = liveSeed?.content
  ? deepMerge(defaultContent, liveSeed.content)
  : defaultContent;

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initialSeed);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    axios
      .get("/api/content")
      .then(({ data }) => {
        if (data?.content) {
          setContent(deepMerge(defaultContent, data.content));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
  }, [theme]);

  const saveContent = useCallback(async (next: SiteContent) => {
    await axios.put(
      "/api/content",
      { content: next },
      { withCredentials: true }
    );
    setContent(deepMerge(defaultContent, next));
  }, []);

  return (
    <SiteContext.Provider value={{ content, saveContent, theme, setTheme }}>
      {children}
    </SiteContext.Provider>
  );
}
