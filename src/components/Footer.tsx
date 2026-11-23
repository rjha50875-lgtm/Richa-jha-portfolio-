import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";

export default function Footer() {
  const { content } = useSite();

  return (
    <footer className="border-t border-line" data-testid="footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-[13px] text-fg-dim font-mono"
          data-testid="footer-note"
        >
          {content.footer.note}
        </p>
        <div className="flex items-center gap-5">
          <span className="text-[13px] text-fg-dim font-mono hidden sm:inline">
            Meta Ads · Google Ads · ROAS
          </span>
          <Link
            to="/admin"
            data-testid="footer-admin-link"
            className="flex items-center gap-1.5 text-[13px] text-fg-dim hover:text-brand transition-colors"
          >
            <Lock size={12} /> Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
