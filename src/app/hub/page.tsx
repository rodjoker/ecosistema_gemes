import type { Metadata } from "next";
import styles from "./hub.module.css";
import { HubTopbar } from "@/components/hub/HubTopbar";
import { HubHero } from "@/components/hub/HubHero";
import { HubWhy } from "@/components/hub/HubWhy";
import { HubWizardSection } from "@/components/hub/HubWizardSection";
import { HubProblem } from "@/components/hub/HubProblem";
import { HubStations } from "@/components/hub/HubStations";
import { HubIntegration } from "@/components/hub/HubIntegration";
import { HubHowItWorks } from "@/components/hub/HubHowItWorks";
import { HubFinalCta } from "@/components/hub/HubFinalCta";
import { HubFooter } from "@/components/hub/HubFooter";

export const metadata: Metadata = {
  title: "GEMES-HUB",
  description:
    "El sistema de restaurante integrado con la flota de delivery de GEMES Express.",
};

export default function HubPage() {
  return (
    <div className={styles.hubPage}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
      />
      <HubTopbar />
      <main>
        <HubHero />
        <hr className={styles.rule} />
        <HubWhy />
        <hr className={styles.rule} />
        <HubWizardSection />
        <hr className={styles.rule} />
        <HubProblem />
        <hr className={styles.rule} />
        <HubStations />
        <hr className={styles.rule} />
        <HubIntegration />
        <hr className={styles.rule} />
        <HubHowItWorks />
        <HubFinalCta />
      </main>
      <HubFooter />
    </div>
  );
}
