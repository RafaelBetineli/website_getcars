import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  Compass,
  KeyRound,
  MessageCircle,
} from "lucide-react";
import sellBackground from "@/assets/bmw-sell-background.jpg";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { whatsappLink } from "@/lib/contact";
import { inquiryMessage, inquirySchema, type VehicleInquiry } from "@/lib/vehicle-inquiry";

export const Route = createFileRoute("/vender")({
  head: () => ({
    meta: [
      { title: "Venda seu veículo — GETCARS" },
      {
        name: "description",
        content:
          "Conte sobre seu veículo e solicite uma avaliação personalizada da GETCARS. Compra, troca e intermediação de veículos premium.",
      },
      { property: "og:title", content: "Venda seu veículo — GETCARS" },
      {
        property: "og:description",
        content: "Avaliação, estratégia e negociação para seu veículo premium.",
      },
      { name: "twitter:title", content: "Venda seu veículo — GETCARS" },
      {
        name: "twitter:description",
        content:
          "Solicite uma avaliação personalizada para vender, trocar ou intermediar seu veículo.",
      },
    ],
  }),
  component: SellPage,
});

const steps = [
  { key: "vehicle", label: "Qual é a marca e o modelo?", placeholder: "Ex.: BMW 330e" },
  { key: "year", label: "Qual é o ano do veículo?", placeholder: "Ex.: 2024" },
  { key: "km", label: "Qual é a quilometragem?", placeholder: "Ex.: 12.000 km" },
  { key: "goal", label: "O que você deseja fazer?", placeholder: "" },
  { key: "name", label: "Como podemos chamar você?", placeholder: "Seu nome" },
] as const;
const services = [
  {
    icon: ClipboardCheck,
    title: "Avaliação",
    text: "Analisamos modelo, estado, histórico, documentação e perfil comercial do veículo.",
  },
  {
    icon: Compass,
    title: "Estratégia",
    text: "Definimos a melhor forma de negociação, seja venda direta, troca ou intermediação.",
  },
  {
    icon: KeyRound,
    title: "Negociação",
    text: "Conduzimos o contato com interessados de forma transparente, segura e personalizada.",
  },
];

function SellPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ vehicle: "", year: "", km: "", goal: "", name: "" });
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const firstGoalRef = useRef<HTMLInputElement>(null);
  const current = steps[step];
  const lastStep = step === steps.length - 1;

  useEffect(() => {
    if (step === 0) return;
    (inputRef.current ?? firstGoalRef.current)?.focus({ preventScroll: true });
  }, [step]);

  function update(key: keyof VehicleInquiry, value: string) {
    setData((previous) => ({ ...previous, [key]: value }));
    setError("");
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = inquirySchema.shape[current.key].safeParse(data[current.key]);
    if (!result.success) {
      setError(result.error.issues[0].message);
      (inputRef.current ?? firstGoalRef.current)?.focus({ preventScroll: true });
      return;
    }
    if (!lastStep) {
      setError("");
      setStep((previous) => previous + 1);
      return;
    }
    const inquiry = inquirySchema.safeParse(data);
    if (!inquiry.success) {
      const issue = inquiry.error.issues[0];
      const invalidStep = steps.findIndex((item) => item.key === issue.path[0]);
      if (invalidStep >= 0) setStep(invalidStep);
      setError(issue.message);
      return;
    }
    window.open(whatsappLink(inquiryMessage(inquiry.data)), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section
          className="relative isolate min-h-[88svh] overflow-hidden px-6 pb-20 pt-36 md:px-10 lg:px-16 lg:pb-28 lg:pt-44 xl:px-24"
          aria-labelledby="sell-title"
        >
          <img
            src={sellBackground}
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            fetchPriority="high"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/85 to-background/45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/40" />
          <div className="mx-auto max-w-[1528px]">
            <div className="mb-8 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold">
                Avaliação · Intermediação
              </p>
              <h1
                id="sell-title"
                className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl"
              >
                Seu veículo em uma{" "}
                <span className="text-gold-gradient italic">negociação à altura.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Conte um pouco sobre seu veículo. Ao final, envie as informações pelo WhatsApp para
                solicitar uma avaliação personalizada.
              </p>
            </div>
            <div className="max-w-3xl">
              <p
                aria-live="polite"
                aria-atomic="true"
                className="mb-3 text-[10px] uppercase tracking-[0.25em] text-gold"
              >
                Etapa {String(step + 1).padStart(2, "0")} de 05
              </p>
              <div
                role="progressbar"
                aria-label="Progresso da avaliação"
                aria-valuemin={1}
                aria-valuemax={steps.length}
                aria-valuenow={step + 1}
                className="h-0.5 overflow-hidden rounded-full bg-border"
              >
                <div
                  className="h-full bg-gold-gradient transition-[width] duration-300 motion-reduce:transition-none"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
              <form noValidate onSubmit={submit} className="mt-10">
                <div
                  key={current.key}
                  className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300"
                >
                  {current.key === "goal" ? (
                    <fieldset aria-describedby={error ? "inquiry-error" : undefined}>
                      <legend className="font-display text-4xl leading-tight sm:text-5xl">
                        {current.label}
                      </legend>
                      <div className="mt-8 flex flex-wrap gap-3">
                        {(["Vender", "Trocar", "Intermediar"] as const).map((goal, index) => (
                          <label
                            key={goal}
                            className={`relative cursor-pointer rounded-full border px-6 py-3.5 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-gold ${data.goal === goal ? "border-transparent bg-gold-gradient text-primary-foreground" : "border-border bg-background/40 text-foreground hover:border-gold"}`}
                          >
                            <input
                              ref={index === 0 ? firstGoalRef : undefined}
                              type="radio"
                              name="goal"
                              value={goal}
                              checked={data.goal === goal}
                              onChange={() => update("goal", goal)}
                              aria-invalid={Boolean(error)}
                              className="sr-only"
                            />
                            {goal}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : (
                    <>
                      <label
                        htmlFor={`inquiry-${current.key}`}
                        className="block font-display text-4xl leading-tight sm:text-5xl"
                      >
                        {current.label}
                      </label>
                      <input
                        ref={inputRef}
                        id={`inquiry-${current.key}`}
                        name={current.key}
                        value={data[current.key]}
                        onChange={(event) => update(current.key, event.target.value)}
                        placeholder={current.placeholder}
                        inputMode={
                          current.key === "year" || current.key === "km" ? "numeric" : "text"
                        }
                        autoComplete={current.key === "name" ? "name" : "off"}
                        maxLength={
                          current.key === "year"
                            ? 4
                            : current.key === "km"
                              ? 20
                              : current.key === "name"
                                ? 100
                                : 120
                        }
                        required
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? "inquiry-error" : undefined}
                        className="mt-7 w-full border-b border-gold/40 bg-background/20 py-4 font-display text-3xl text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-gold focus:ring-1 focus:ring-gold sm:text-4xl"
                      />
                    </>
                  )}
                </div>
                <div className="min-h-10 pt-3">
                  {error && (
                    <p id="inquiry-error" role="alert" className="text-sm text-red-300">
                      {error}
                    </p>
                  )}
                </div>
                {lastStep && (
                  <dl className="mb-6 grid gap-2 rounded-lg border-gold-subtle bg-background/60 p-5 text-sm">
                    {[
                      ["Veículo", data.vehicle],
                      ["Ano", data.year],
                      ["Quilometragem", data.km],
                      ["Objetivo", data.goal],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                        <dt className="text-muted-foreground">{label}</dt>
                        <dd className="break-words">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setError("");
                        setStep((previous) => previous - 1);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border-gold-subtle bg-background/40 px-6 py-3.5 text-sm text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Voltar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_40px_-8px_var(--gold)]"
                  >
                    {lastStep ? (
                      <>
                        <MessageCircle className="h-4 w-4" />
                        Enviar pelo WhatsApp
                      </>
                    ) : (
                      <>
                        Continuar
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                {lastStep && (
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    O WhatsApp abrirá com suas informações preenchidas. Envie a mensagem para
                    iniciar o atendimento.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
        <section
          id="como-funciona"
          className="border-y border-border bg-surface/40 px-6 py-20 md:px-10 lg:px-16 lg:py-28 xl:px-24"
          aria-labelledby="process-title"
        >
          <div className="mx-auto max-w-[1528px]">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold">Como funciona</p>
            <h2
              id="process-title"
              className="max-w-3xl font-display text-4xl leading-tight lg:text-6xl"
            >
              Seu veículo, <span className="text-gold-gradient italic">bem conduzido.</span>
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className="rounded-lg border-gold-subtle bg-background/50 p-8 lg:p-10"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <service.icon className="h-6 w-6 text-gold" />
                    <span className="font-display text-4xl text-gold-gradient">0{index + 1}</span>
                  </div>
                  <h3 className="font-display text-3xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
