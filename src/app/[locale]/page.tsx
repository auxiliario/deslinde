import { setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { getTenantBySlug } from "@/lib/get-tenant";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChoose } from "@/components/WhyChoose";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Areas } from "@/components/Areas";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { WhatsAppSticky } from "@/components/WhatsAppSticky";
import { StructuredData } from "@/components/StructuredData";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const headerStore = await headers();
  const slug = headerStore.get("x-tenant-slug") ?? "otm";
  const tenant = getTenantBySlug(slug);

  return (
    <>
      <StructuredData tenant={tenant} />
      <Nav locale={locale} />
      <main>
        <Hero tenant={tenant} />
        <Services tenant={tenant} />
        <WhyChoose />
        <Portfolio />
        <Testimonials tenant={tenant} />
        <Areas tenant={tenant} />
        <About tenant={tenant} />
      </main>
      <Footer tenant={tenant} />
      <WhatsAppSticky />
    </>
  );
}
