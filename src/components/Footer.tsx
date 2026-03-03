import { getTranslations } from "next-intl/server";
import { TenantConfig } from "@/lib/types";
import { Facebook, Instagram } from "@/components/icons";

export async function Footer({ tenant }: { tenant: TenantConfig }) {
  const t = await getTranslations("Footer");
  const tServices = await getTranslations("Services");
  const year = new Date().getFullYear();

  const serviceLinks = tenant.services.map((s) => ({
    label: tServices(`${s.id}_title`),
    href: "#servicios",
  }));

  return (
    <footer id="contacto" className="bg-navy-dark">
      {/* Gold top border */}
      <div className="h-[2px] bg-gold/40" />

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact column */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">
              {t("contactHeading")}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              {/* Address */}
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 w-4 h-4 shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {t("address")}
              </li>
              {/* Landline */}
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 w-4 h-4 shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href={`tel:${tenant.phoneLandline}`} className="hover:text-white">
                  {t("phoneLandline")}
                </a>
              </li>
              {/* Mobile */}
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 w-4 h-4 shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <a href={`tel:${tenant.phone}`} className="hover:text-white">
                  {t("phone")}
                </a>
              </li>
              {/* Email */}
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 w-4 h-4 shrink-0 text-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href={`mailto:${tenant.email}`} className="hover:text-white">
                  {t("email")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services column — all 7 */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">
              {t("servicesHeading")}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">
              {t("companyHeading")}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#por-que" className="hover:text-white">
                  {t("companyWhyUs")}
                </a>
              </li>
              <li>
                <a href="#proyectos" className="hover:text-white">
                  {t("companyProjects")}
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-white">
                  {t("companyTestimonials")}
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white">
                  {t("companyAbout")}
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white">
                  {t("companyTeam")}
                </a>
              </li>
              <li>
                <a href="#areas" className="hover:text-white">
                  {t("companyAreas")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal + Síguenos column */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-gold">
              {t("legalHeading")}
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <span className="cursor-default">{t("legalPrivacy")}</span>
              </li>
              <li>
                <span className="cursor-default">{t("legalTerms")}</span>
              </li>
              <li>
                <span className="cursor-default">{t("legalNotice")}</span>
              </li>
              <li>
                <span className="cursor-default">{t("legalBanking")}</span>
              </li>
            </ul>

            {/* Síguenos */}
            <h3 className="mt-6 mb-3 font-heading text-sm font-bold uppercase tracking-wider text-gold">
              {t("followHeading")}
            </h3>
            <div className="flex gap-3">
              <a
                href={tenant.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={tenant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-4 text-xs text-white/40 md:flex-row md:justify-center md:gap-1">
          <span>{t("copyright", { year: String(year) })}</span>
          <span className="hidden md:inline"> · </span>
          <span>
            desarrollado en{" "}
            <a
              href="https://deslinde.do"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white underline decoration-white/20"
            >
              deslinde.do
            </a>
            {" "}por{" "}
            <a
              href="https://auxiliar.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white underline decoration-white/20"
            >
              auxiliar.io
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
