import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import { getTenantBySlug } from "@/lib/get-tenant";
import { TenantProvider } from "@/context/TenantContext";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const meta = messages.Meta;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      type: "website",
      locale: locale === "es" ? "es_DO" : locale,
      siteName: "OTM Deslinde",
      images: [{ url: "/logo/otm-logo.png", width: 512, height: 512, alt: "OTM" }],
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, l === "es" ? "/" : `/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const headerStore = await headers();
  const slug = headerStore.get("x-tenant-slug") ?? "otm";
  const tenant = getTenantBySlug(slug);

  return (
    <NextIntlClientProvider messages={messages}>
      <TenantProvider tenant={tenant}>{children}</TenantProvider>
    </NextIntlClientProvider>
  );
}
