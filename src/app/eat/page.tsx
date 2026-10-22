import type { Metadata } from "next";
import styles from "./eat.module.css";
import { EatNavbar } from "@/components/eat/EatNavbar";
import { EatHero } from "@/components/eat/EatHero";
import { EatCategories } from "@/components/eat/EatCategories";
import { EatHowItWorks } from "@/components/eat/EatHowItWorks";
import { EatPerks } from "@/components/eat/EatPerks";
import { EatDownload } from "@/components/eat/EatDownload";
import { EatJoin } from "@/components/eat/EatJoin";
import { EatEcosystem } from "@/components/eat/EatEcosystem";
import { EatFooter } from "@/components/eat/EatFooter";

export const metadata: Metadata = {
  title: "GEMES EAT | Descarga la app y pide tu comida favorita",
  description:
    "Descarga la app GEMES Eat, elige tu restaurante, arma tu pedido con combos y sigue la entrega en tiempo real con GEMES Express.",
};

export default function EatPage() {
  return (
    <div className={styles.eatPage}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap"
      />
      <EatNavbar />
      <main>
        <EatHero />
        <EatCategories />
        <EatHowItWorks />
        <EatPerks />
        <EatDownload />
        <EatJoin />
        <EatEcosystem />
      </main>
      <EatFooter />
    </div>
  );
}
