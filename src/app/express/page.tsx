import { ExpressBenefits } from "@/components/express/ExpressBenefits";
import { ExpressHero } from "@/components/express/ExpressHero";
import { ExpressHumanFactor } from "@/components/express/ExpressHumanFactor";
import { ExpressQuality } from "@/components/express/ExpressQuality";
import { ExpressServices } from "@/components/express/ExpressServices";

export default function ExpressPage() {
  return (
    <div>
      <ExpressHero />
      <ExpressServices />
      <ExpressBenefits />
      <ExpressQuality />
      <ExpressHumanFactor />
    </div>
  );
}
