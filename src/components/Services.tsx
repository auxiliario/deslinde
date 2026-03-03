import { getTranslations } from "next-intl/server";
import { TenantConfig } from "@/lib/types";

const SERVICE_ICONS: Record<string, string> = {
  deslinde: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  subdivision: "M4 6h16M4 12h8m-8 6h16M12 6v6",
  refundicion: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  condominio: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  saneamiento: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  actualizacion: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  levantamiento: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

export async function Services({ tenant }: { tenant: TenantConfig }) {
  const t = await getTranslations("Services");

  return (
    <section id="servicios" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-1 w-12 rounded bg-gold" />
          <h2 className="mb-3 font-heading text-2xl font-bold text-navy md:text-3xl">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-lg text-sm text-gray-700">
            {t("subheading")}
          </p>
        </div>

        {/* Service cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {tenant.services.map((service) => (
            <div
              key={service.id}
              className="flex gap-4 rounded-lg border-l-[3px] border-gold bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Icon */}
              <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={SERVICE_ICONS[service.iconKey] || SERVICE_ICONS.deslinde} />
                </svg>
              </div>
              <div>
                <h3 className="mb-1.5 font-heading text-base font-bold text-navy">
                  {t(`${service.id}_title`)}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {t(`${service.id}_desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
