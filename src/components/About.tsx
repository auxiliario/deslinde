import { getTranslations } from "next-intl/server";
import { TenantConfig } from "@/lib/types";

export async function About({ tenant }: { tenant: TenantConfig }) {
  const t = await getTranslations("About");

  return (
    <section id="nosotros" className="bg-gray-100 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 h-1 w-12 rounded bg-gold" />
          <h2 className="mb-6 font-heading text-2xl font-bold text-navy md:text-3xl">
            {t("heading")}
          </h2>
        </div>

        {/* About text */}
        <div className="mx-auto max-w-3xl space-y-5 mb-16">
          <p className="text-sm leading-relaxed text-gray-700 md:text-base">
            {t("p1")}
          </p>
          <p className="text-sm leading-relaxed text-gray-700 md:text-base">
            {t("p2")}
          </p>
        </div>

        {/* Team */}
        <div className="text-center">
          <h3 className="mb-8 font-heading text-xl font-bold text-navy">
            {t("teamHeading")}
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tenant.team.map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm"
              >
                {/* Avatar */}
                <div
                  className={`mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full text-white font-heading font-bold text-lg ${
                    member.isPrimary
                      ? "ring-2 ring-gold bg-navy"
                      : "bg-navy/80"
                  }`}
                >
                  {t(`${member.id}_name`)
                    .split(" ")
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h4 className="mb-1 text-center font-heading text-sm font-bold text-navy">
                  {t(`${member.id}_name`)}
                </h4>
                <p className="mb-2 text-center text-xs text-gold">
                  {t(`${member.id}_role`)}
                </p>
                <p className="text-center text-xs leading-relaxed text-gray-700">
                  {t(`${member.id}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
