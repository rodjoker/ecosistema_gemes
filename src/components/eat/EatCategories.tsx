import Image from "next/image";
import { Cake, Coffee, Fish } from "lucide-react";
import styles from "@/app/eat/eat.module.css";

const CATEGORIES = [
  { label: "Hamburguesas", image: "/eat/burger.png" },
  { label: "Pizza", image: "/eat/pizza-slice.png" },
  { label: "Bebidas", image: "/eat/soda-can.png" },
  { label: "Sushi", Icon: Fish },
  { label: "Postres", Icon: Cake },
  { label: "Café", Icon: Coffee },
];

export function EatCategories() {
  return (
    <section id="que-pedir" className={styles.sectionSpacing}>
      <div className={styles.container}>
        <span className={styles.eyebrow}>QUÉ PUEDES PEDIR</span>
        <h2 className={styles.secTitle}>Lo que se te antoje, de los negocios de tu ciudad</h2>

        <ul className={styles.catRow}>
          {CATEGORIES.map((category) => (
            <li key={category.label} className={styles.catItem}>
              <span className={styles.catCircle}>
                {category.image ? (
                  <Image src={category.image} alt="" width={96} height={96} className={styles.catImg} />
                ) : (
                  category.Icon && <category.Icon size={38} aria-hidden />
                )}
              </span>
              <span className={styles.catLabel}>{category.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
