import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Nav");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-4">
      <div className="text-center">
        <h1 className="mb-2 font-heading text-6xl font-bold text-navy">404</h1>
        <p className="mb-8 text-lg text-gray-700">
          La página que buscas no existe.
        </p>
        <a
          href="/"
          className="inline-flex rounded-full bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
