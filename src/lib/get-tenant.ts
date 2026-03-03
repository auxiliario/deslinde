import { TenantConfig } from "@/lib/types";
import { otmTenant } from "@/lib/data/otm-tenant";

const tenants: Record<string, TenantConfig> = {
  otm: otmTenant,
};

export function getTenantBySlug(slug: string): TenantConfig {
  return tenants[slug] ?? otmTenant;
}
