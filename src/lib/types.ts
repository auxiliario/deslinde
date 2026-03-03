export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  linkedin?: string;
}

export interface ServiceItem {
  id: string;
  iconKey: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl?: string;
}

export interface TestimonialItem {
  id: string;
  avatarUrl?: string;
}

export interface TeamMember {
  id: string;
  avatarUrl?: string;
  isPrimary?: boolean;
}

export interface TenantConfig {
  slug: string;
  name: string;
  fullName: string;
  ownerName: string;
  codia: string;
  rnc?: string;
  phone: string;
  phoneLandline?: string;
  whatsapp: string;
  email: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  website: string;
  social: SocialLinks;
  credentials: string[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
  team: TeamMember[];
  areas: string[];
}
