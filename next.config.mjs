import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Há package-lock.json em pastas acima; fixa a raiz para o build não inferir a errada
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920] },
  async headers() {
    // Arquivos com nome fixo: cache longo no navegador/CDN
    const cache = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }];
    // Segurança (NEXT-HEADERS-001): sem sniffing de MIME, sem ser embutido em iframe de terceiros
    // (clickjacking), referer mínimo e APIs sensíveis desligadas. CSP de script com nonce não foi
    // aplicada para manter as páginas estáticas (sem conteúdo de usuário renderizado).
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    ];
    return [
      { source: "/:path*", headers: security },
      { source: "/video/:path*", headers: cache },
      { source: "/img/:path*", headers: cache },
      { source: "/brand/:path*", headers: cache },
    ];
  },
};
export default nextConfig;
