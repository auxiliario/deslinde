"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTenant } from "@/context/TenantContext";
import { Facebook, Instagram } from "@/components/icons";

const NAV_LINKS = [
  { href: "#servicios", key: "services" },
  { href: "#por-que", key: "whyMe" },
  { href: "#proyectos", key: "portfolio" },
  { href: "#testimonios", key: "testimonials" },
  { href: "#areas", key: "areas" },
  { href: "#nosotros", key: "about" },
  { href: "#contacto", key: "contact" },
] as const;

const LOCALES = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "it", label: "IT" },
] as const;

export function Nav({ locale }: { locale: string }) {
  const t = useTranslations("Nav");
  const tenant = useTenant();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function switchLocale(code: string) {
    router.replace(pathname, { locale: code });
    setLangOpen(false);
    setMenuOpen(false);
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-[60px]">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5"
        >
          <Image
            src="/logo/otm-logo.png"
            alt="OTM"
            width={52}
            height={52}
            className="h-11 w-11 shrink-0 object-contain md:h-[52px] md:w-[52px]"
            priority
          />
          <span className="font-heading text-sm text-navy">
            OTM<span className="hidden sm:inline">
              {" "}<span className="text-navy/30">|</span>{" "}
              <span className="text-navy/70 font-normal">{tenant.fullName}</span>
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, key }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`text-sm transition-colors ${
                activeSection === href.slice(1)
                  ? "text-gold"
                  : "text-navy/50 hover:text-gold"
              }`}
            >
              {t(key)}
            </a>
          ))}

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded border border-navy/15 px-2.5 py-1 text-sm text-navy/70 transition-colors hover:text-navy"
            >
              {locale.toUpperCase()}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 rounded border border-navy/10 bg-white py-1 shadow-lg">
                {LOCALES.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => switchLocale(code)}
                    className={`block w-full px-4 py-1.5 text-left text-sm ${
                      locale === code
                        ? "text-gold"
                        : "text-navy/70 hover:text-gold hover:bg-navy/[0.03]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center w-10 h-10 text-navy md:hidden"
          aria-label={menuOpen ? t("close") : t("menu")}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-14 md:hidden z-50" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex flex-col items-center gap-6 pt-12">
            {NAV_LINKS.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`text-lg ${
                  activeSection === href.slice(1)
                    ? "text-gold"
                    : "text-navy/70 hover:text-gold"
                }`}
              >
                {t(key)}
              </a>
            ))}
            <div className="flex gap-4 pt-4 border-t border-navy/10 mt-2">
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => switchLocale(code)}
                  className={`px-3 py-1.5 rounded text-sm ${
                    locale === code
                      ? "bg-gold text-white"
                      : "text-navy/50 hover:text-gold"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex gap-5 pt-4 border-t border-navy/10 mt-2">
              <a
                href={tenant.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy/40 hover:text-navy"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={tenant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy/40 hover:text-navy"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
