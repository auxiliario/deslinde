import { getTranslations } from "next-intl/server";

export async function WhyChoose() {
  const t = await getTranslations("WhyChoose");

  return (
    <section
      id="por-que"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0f1f33 0%, #1a3150 50%, #1e3854 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="mb-4 mx-auto h-1 w-12 rounded bg-gold" />
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white md:text-3xl">
          {t("heading")}
        </h2>
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-white/75 md:text-base">
            {t("p1")}
          </p>
          <p className="text-sm leading-relaxed text-white/75 md:text-base">
            {t("p2")}
          </p>
          <p className="text-sm italic leading-relaxed text-gold-light md:text-base">
            {t("p3")}
          </p>
        </div>
      </div>
    </section>
  );
}
