import { getTranslations } from "next-intl/server";
import { TenantConfig } from "@/lib/types";

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-gold"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export async function Testimonials({ tenant }: { tenant: TenantConfig }) {
  const t = await getTranslations("Testimonials");

  return (
    <section id="testimonios" className="bg-gray-100 py-16 md:py-24">
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

        {/* Testimonial cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {tenant.testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              {/* Avatar */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy/10 text-navy font-heading font-bold text-sm">
                  {t(`${item.id}_name`)
                    .split(" ")
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">
                    {t(`${item.id}_name`)}
                  </p>
                  <p className="text-xs text-gray-700">
                    {t(`${item.id}_role`)}
                  </p>
                </div>
              </div>

              <Stars />

              <p className="text-sm italic leading-relaxed text-gray-700">
                &ldquo;{t(`${item.id}_text`)}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Show all */}
        <div className="mt-8 text-center">
          <button className="rounded-full border border-gold px-6 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-white">
            {t("showAll")}
          </button>
        </div>
      </div>
    </section>
  );
}
