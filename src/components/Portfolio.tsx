"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useTenant } from "@/context/TenantContext";

export function Portfolio() {
  const t = useTranslations("Portfolio");
  const tenant = useTenant();
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll
    ? tenant.portfolio
    : tenant.portfolio.slice(0, 4);

  return (
    <section id="proyectos" className="py-16 md:py-24">
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

        {/* Portfolio grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Image placeholder (9:16 aspect) */}
              <div className="aspect-[9/16] bg-gradient-to-b from-navy/10 to-navy/5 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-navy/20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-4">
                <p className="mb-2 text-sm font-medium text-navy">
                  {t(`${item.id}_desc`)}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-700">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {t(`${item.id}_location`)}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-700">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                  {t(`${item.id}_date`)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show all button */}
        {tenant.portfolio.length > 4 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="rounded-full border border-gold px-6 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white"
            >
              {showAll ? t("showLess") : t("showAll")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
