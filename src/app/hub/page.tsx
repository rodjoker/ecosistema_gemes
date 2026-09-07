import type { Metadata } from "next";
import styles from "./hub.module.css";
import { HubNavbar } from "@/components/hub/HubNavbar";
import { HubHero } from "@/components/hub/HubHero";
import { HubComparison } from "@/components/hub/HubComparison";
import { HubFeatures } from "@/components/hub/HubFeatures";
import { HubFleet } from "@/components/hub/HubFleet";
import { HubCalculator } from "@/components/hub/HubCalculator";
import { HubFinalCta } from "@/components/hub/HubFinalCta";
import { HubFooter } from "@/components/hub/HubFooter";
import { HubFloatingWhatsApp } from "@/components/hub/HubFloatingWhatsApp";

export const metadata: Metadata = {
  title: "GEMES-HUB | El Sistema que Multiplica las Ventas de tu Restaurante",
  description:
    "GEMES-HUB sincroniza comandas y cocina, y conecta a tu restaurante con la flota de motorizados de GEMES Express.",
};

export default function HubPage() {
  return (
    <div className={styles.hubPage}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap"
      />
      <HubNavbar />
      <main>
        <HubHero />
        <HubComparison />
        <HubFeatures />
        <HubFleet />
        <HubCalculator />
        <HubFinalCta />
      </main>
      <HubFooter />
      <HubFloatingWhatsApp />
    </div>
  );
}
