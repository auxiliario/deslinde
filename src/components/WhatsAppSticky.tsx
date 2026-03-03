"use client";

import { useTenant } from "@/context/TenantContext";
import { WhatsApp } from "@/components/icons";

export function WhatsAppSticky() {
  const tenant = useTenant();

  return (
    <a
      href={`https://wa.me/${tenant.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[9999] flex h-[54px] w-[54px] items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/30 transition-transform hover:scale-110"
      aria-label="WhatsApp"
    >
      <WhatsApp className="w-6 h-6" />
    </a>
  );
}
