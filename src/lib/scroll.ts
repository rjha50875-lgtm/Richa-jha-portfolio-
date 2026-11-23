declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: HTMLElement, options?: { offset?: number }) => void;
    } | null;
  }
}

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -76 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
