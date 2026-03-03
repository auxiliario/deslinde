import { supabase } from "@/lib/supabase";
import { TenantConfig } from "@/lib/types";

export async function fetchTenantBySlug(
  slug: string
): Promise<TenantConfig | null> {
  const { data: agrimensor, error } = await supabase
    .from("agrimensores")
    .select(
      `
      *,
      services (*),
      team_members (*),
      portfolio_items (*),
      testimonials (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (error || !agrimensor) return null;

  return {
    slug: agrimensor.slug,
    name: agrimensor.short_name,
    fullName: agrimensor.full_name,
    ownerName: agrimensor.owner_name,
    codia: agrimensor.codia,
    rnc: agrimensor.rnc,
    phone: agrimensor.phone,
    whatsapp: agrimensor.whatsapp,
    email: agrimensor.email,
    address: agrimensor.address,
    coordinates: agrimensor.lat
      ? { lat: agrimensor.lat, lng: agrimensor.lng }
      : undefined,
    website: agrimensor.website,
    social: {
      facebook: agrimensor.facebook_url,
      instagram: agrimensor.instagram_url,
      whatsapp: agrimensor.whatsapp_url,
    },
    credentials: agrimensor.credentials ?? [],
    services: (agrimensor.services ?? []).map(
      (s: { id: string; icon_key: string }) => ({
        id: s.id,
        iconKey: s.icon_key,
      })
    ),
    portfolio: (agrimensor.portfolio_items ?? []).map(
      (p: { id: string; image_url?: string }) => ({
        id: p.id,
        imageUrl: p.image_url,
      })
    ),
    testimonials: (agrimensor.testimonials ?? []).map(
      (t: { id: string; avatar_url?: string }) => ({
        id: t.id,
        avatarUrl: t.avatar_url,
      })
    ),
    team: (agrimensor.team_members ?? []).map(
      (m: { id: string; avatar_url?: string; is_primary?: boolean }) => ({
        id: m.id,
        avatarUrl: m.avatar_url,
        isPrimary: m.is_primary,
      })
    ),
    areas: agrimensor.areas ?? [],
  };
}
