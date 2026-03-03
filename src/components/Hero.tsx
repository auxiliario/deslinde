import { getTranslations } from "next-intl/server";
import { Crosshair, Scale, GraduationCap, Calculator } from "lucide-react";
import { TenantConfig } from "@/lib/types";
import { Facebook, Instagram, WhatsApp } from "@/components/icons";

const BADGE_ICONS = [Crosshair, Scale, GraduationCap, Calculator] as const;

export async function Hero({ tenant }: { tenant: TenantConfig }) {
  const t = await getTranslations("Hero");

  const badges = [
    { label: t("badge_codia"), Icon: BADGE_ICONS[0] },
    { label: t("badge_abogado"), Icon: BADGE_ICONS[1] },
    { label: t("badge_master"), Icon: BADGE_ICONS[2] },
    { label: t("badge_tasador"), Icon: BADGE_ICONS[3] },
  ];

  return (
    <section className="relative overflow-hidden pt-14 md:pt-[60px]">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #0f1f33 0%, #1a3150 50%, #1e3854 100%)",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center px-4 py-20 text-center md:py-28">
        <div className="max-w-[660px]">
          {/* Name */}
          <h1 className="mb-3 font-heading text-2xl font-bold text-white md:text-3xl">
            {t("name")}
          </h1>

          {/* Partners */}
          <p className="mb-4 text-sm font-medium text-gold">
            {t("partners")}
          </p>

          {/* Role */}
          <p className="mb-8 text-sm text-white/55">{t("role")}</p>

          {/* Credential badges */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {badges.map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/80"
              >
                <Icon size={16} className="text-gold-light" />
                {label}
              </span>
            ))}
          </div>

          {/* Social links */}
          <div className="mb-8 flex justify-center gap-4">
            {tenant.social.facebook && (
              <a
                href={tenant.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {tenant.social.instagram && (
              <a
                href={tenant.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${tenant.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
          >
            <WhatsApp className="w-5 h-5" />
            {t("cta_whatsapp")}
          </a>
        </div>
      </div>

      {/* Wave transition */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#faf8f4"
          />
        </svg>
      </div>
    </section>
  );
}
