"use client";

import { useState } from "react";
import { Wizard, useWizard } from "react-use-wizard";
import styles from "@/app/hub/hub.module.css";

type QuestionKey = "despacho" | "volumen" | "dolor";
type Answer = { v: string; label: string };
type Answers = Partial<Record<QuestionKey, Answer>>;

const WHATSAPP_NUMBER = "593988594710";

function buildWhatsappUrl(answers: Answers) {
  const msg =
    "Hola, hice el test de GEMES-HUB.\n" +
    `Hoy: ${answers.despacho?.label ?? "-"}.\n` +
    `Volumen: ${answers.volumen?.label ?? "-"}.\n` +
    `Lo que más se me complica: ${answers.dolor?.label ?? "-"}.\n` +
    "Quiero coordinar una demo.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const headlineByDolor: Record<string, string> = {
  cocina: "Tu cocina va a dejar de perder pedidos.",
  caja: "Tu caja va a cuadrar sola, todos los días.",
  flota: "Vas a vender a domicilio sin armar una flota.",
};
const bodyByDespacho: Record<string, string> = {
  nada: "Hoy no ofrecés delivery -- con GEMES-HUB arrancás directo con la flota de GEMES Express ya integrada, sin contratar a nadie.",
  yo: "Hoy coordinás cada motorizado vos mismo -- eso pasa a ser automático, sin llamadas ni WhatsApp cruzado.",
  app: "Hoy pagás comisión alta a una app externa -- acá el despacho es parte del mismo sistema, no un tercero cobrándote por pedido.",
};
const urgentByVolumen: Record<string, string> = {
  alto: " Con más de 30 pedidos en un día ocupado, cada minuto perdido a mano se nota directo en la caja.",
  medio: "",
  bajo: "",
};

function WizardDots() {
  const { activeStep, stepCount } = useWizard();
  return (
    <div className={styles.wizardDots}>
      {Array.from({ length: stepCount - 1 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.wizardDot} ${i <= activeStep && activeStep < stepCount - 1 ? styles.active : ""}`}
        />
      ))}
    </div>
  );
}

function OptionButton({
  label,
  onSelect,
}: {
  label: string;
  onSelect: () => void;
}) {
  return (
    <button type="button" className={styles.wizardOption} onClick={onSelect}>
      {label}
    </button>
  );
}

function StepDespacho({ onAnswer }: { onAnswer: (a: Answer) => void }) {
  const { nextStep } = useWizard();
  const pick = (v: string, label: string) => {
    onAnswer({ v, label });
    void nextStep();
  };
  return (
    <div className={styles.wizardStep}>
      <h3>¿Cómo despachás hoy tus pedidos a domicilio?</h3>
      <div className={styles.wizardOptions}>
        <OptionButton label="No ofrezco delivery todavía" onSelect={() => pick("nada", "No ofrezco delivery todavía")} />
        <OptionButton label="Yo mismo coordino un motorizado cada vez" onSelect={() => pick("yo", "Yo mismo coordino un motorizado cada vez")} />
        <OptionButton label="Uso una app externa que cobra comisión alta" onSelect={() => pick("app", "Uso una app externa que cobra comisión alta")} />
      </div>
    </div>
  );
}

function StepVolumen({ onAnswer }: { onAnswer: (a: Answer) => void }) {
  const { nextStep } = useWizard();
  const pick = (v: string, label: string) => {
    onAnswer({ v, label });
    void nextStep();
  };
  return (
    <div className={styles.wizardStep}>
      <h3>¿Cuántas mesas o pedidos manejás en un día ocupado?</h3>
      <div className={styles.wizardOptions}>
        <OptionButton label="Menos de 10" onSelect={() => pick("bajo", "Menos de 10")} />
        <OptionButton label="Entre 10 y 30" onSelect={() => pick("medio", "Entre 10 y 30")} />
        <OptionButton label="Más de 30" onSelect={() => pick("alto", "Más de 30")} />
      </div>
    </div>
  );
}

function StepDolor({ onAnswer }: { onAnswer: (a: Answer) => void }) {
  const { nextStep } = useWizard();
  const pick = (v: string, label: string) => {
    onAnswer({ v, label });
    void nextStep();
  };
  return (
    <div className={styles.wizardStep}>
      <h3>¿Qué es lo que más se te complica hoy?</h3>
      <div className={styles.wizardOptions}>
        <OptionButton label="La cocina se atrasa o se pierden pedidos" onSelect={() => pick("cocina", "La cocina se atrasa o se pierden pedidos")} />
        <OptionButton label="El cierre de caja nunca cuadra" onSelect={() => pick("caja", "El cierre de caja nunca cuadra")} />
        <OptionButton label="No tengo cómo vender a domicilio sin flota propia" onSelect={() => pick("flota", "No tengo cómo vender a domicilio sin flota propia")} />
      </div>
    </div>
  );
}

function StepResult({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const { goToStep } = useWizard();
  const dolor = answers.dolor?.v ?? "flota";
  const despacho = answers.despacho?.v ?? "nada";
  const volumen = answers.volumen?.v ?? "medio";
  const headline = headlineByDolor[dolor];
  const body = (bodyByDespacho[despacho] ?? "") + (urgentByVolumen[volumen] ?? "");

  return (
    <div className={`${styles.wizardStep} ${styles.wizardResult}`}>
      <span className={styles.tag}>Tu resultado</span>
      <h3>{headline}</h3>
      <p>{body}</p>
      <div className={styles.actions}>
        <a
          className={styles.ctaPrimary}
          href={buildWhatsappUrl(answers)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Mandar por WhatsApp →
        </a>
        <button
          type="button"
          className={styles.wizardRestart}
          onClick={() => {
            onRestart();
            goToStep(0);
          }}
        >
          Volver a empezar
        </button>
      </div>
    </div>
  );
}

export function HubWizard() {
  const [answers, setAnswers] = useState<Answers>({});

  const setAnswer = (key: QuestionKey) => (a: Answer) =>
    setAnswers((prev) => ({ ...prev, [key]: a }));

  return (
    <div className={styles.wizard}>
      <div className={styles.wizardInner}>
        <Wizard header={<WizardDots />}>
          <StepDespacho onAnswer={setAnswer("despacho")} />
          <StepVolumen onAnswer={setAnswer("volumen")} />
          <StepDolor onAnswer={setAnswer("dolor")} />
          <StepResult answers={answers} onRestart={() => setAnswers({})} />
        </Wizard>
      </div>
    </div>
  );
}
