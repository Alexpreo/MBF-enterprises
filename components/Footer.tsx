import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-surface" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-text transition-colors hover:text-accent"
            >
              Buddy Landscaping
            </Link>
            <p className="mt-3 max-w-sm text-sm text-text-muted">
              Premium hardscaping, custom design, and flawless execution for properties that demand the best.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-text">
              Contact
            </h3>
            <p className="mt-1 text-lg font-medium text-text">Jack Fang - Owner</p>
            <ul className="mt-3 space-y-3 text-sm text-text-muted">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent/80" aria-hidden />
                <span>(778) 386-1862</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent/80" aria-hidden />
                <span>jack7783861862@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-text-muted">
          &copy; {currentYear} MDF Enterprises. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
