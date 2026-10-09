import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Syne } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/data/profile";

const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const title = `${PROFILE.name} | ${PROFILE.role}`;
const description = "Portfólio de Victor Razzuli: sites rápidos e com identidade para negócios reais (cardápio, simulador, pedido no WhatsApp) e projetos de machine learning.";

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", url: PROFILE.url, title, description, siteName: PROFILE.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#0B0C10", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.fullName,
  jobTitle: PROFILE.role,
  url: PROFILE.url,
  email: `mailto:${PROFILE.email}`,
  sameAs: [PROFILE.github.url],
  knowsAbout: ["Next.js", "React", "TypeScript", "Machine Learning", "Python", "TensorFlow", "PyTorch"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#projetos" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-text focus:px-5 focus:py-3 focus:text-bg">
          Pular para os projetos
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
