import { getTranslations } from "next-intl/server";
import { TenantConfig } from "@/lib/types";

export async function Areas({ tenant }: { tenant: TenantConfig }) {
  const t = await getTranslations("Areas");

  return (
    <section id="areas" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 h-1 w-12 rounded bg-gold" />
          <h2 className="mb-3 font-heading text-2xl font-bold text-navy md:text-3xl">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-lg text-sm text-gray-700">
            {t("subheading")}
          </p>
        </div>

        {/* Area pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {tenant.areas.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy shadow-sm"
            >
              <svg
                className="w-4 h-4 text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {t(area)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
