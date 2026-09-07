import type { Metadata } from "next";
import styles from "./eat.module.css";
import { EatCartProvider } from "@/components/eat/EatCartContext";
import { EatNavbar } from "@/components/eat/EatNavbar";
import { EatHero } from "@/components/eat/EatHero";
import { EatMarketplace } from "@/components/eat/EatMarketplace";
import { EatCartSection } from "@/components/eat/EatCartSection";
import { EatEcosystem } from "@/components/eat/EatEcosystem";
import { EatFooter } from "@/components/eat/EatFooter";

export const metadata: Metadata = {
  title: "GEMES EAT | Tu Marketplace de Comida Favorito",
  description: "Pide comida de tus restaurantes favoritos y recíbela con la flota de GEMES Express.",
};

export default function EatPage() {
  return (
    <div className={styles.eatPage}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap"
      />
      <EatCartProvider>
        <EatNavbar />
        <main>
          <EatHero />
          <EatMarketplace />
          <EatCartSection />
          <EatEcosystem />
        </main>
        <EatFooter />
      </EatCartProvider>
    </div>
  );
}
