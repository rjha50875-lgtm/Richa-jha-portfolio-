import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { SiteProvider } from "./context/SiteContext";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { err: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { err: null };
  }

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 48, fontFamily: "sans-serif" }}>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>
            Something went wrong.
          </h1>
          <a href="/" style={{ color: "#F43F85" }}>
            Reload the site
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    if (!window.location.pathname.startsWith("/admin")) {
      document.body.classList.add("grain");
    }
  }, []);

  return (
    <ErrorBoundary>
      <SiteProvider>
        <Toaster richColors position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SiteProvider>
    </ErrorBoundary>
  );
}
