import { TenantConfig } from "@/lib/types";

export function StructuredData({ tenant }: { tenant: TenantConfig }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": tenant.website,
    name: tenant.fullName,
    description:
      "Servicios profesionales de agrimensura, deslinde, subdivisión, saneamiento catastral y levantamiento topográfico en el Este de República Dominicana.",
    url: tenant.website,
    telephone: tenant.phone,
    email: tenant.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Higüey",
      addressRegion: "La Altagracia",
      addressCountry: "DO",
    },
    ...(tenant.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: tenant.coordinates.lat,
        longitude: tenant.coordinates.lng,
      },
    }),
    founder: {
      "@type": "Person",
      name: tenant.ownerName,
      jobTitle: "Agrimensor, Abogado, Tasador, Asesor Inmobiliario",
      credential: tenant.codia,
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional License",
      name: tenant.codia,
    },
    areaServed: tenant.areas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    sameAs: [
      tenant.social.facebook,
      tenant.social.instagram,
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
