import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Sparkles,
  Gem,
  Handshake,
  X,
  Instagram,
  MessageCircle,
  ArrowRight,
  MapPin,
  Calendar,
  Gauge,
  ClipboardCheck,
  Compass,
  KeyRound,
} from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import heroCar1280Avif from "@/assets/hero-car-1280.avif";
import heroCar1920Avif from "@/assets/hero-car-1920.avif";
import heroCar2560Avif from "@/assets/hero-car-2560.avif";
import heroCar1280Webp from "@/assets/hero-car-1280.webp";
import heroCar1920Webp from "@/assets/hero-car-1920.webp";
import heroCar2560Webp from "@/assets/hero-car-2560.webp";
import heroCarMobileAvif from "@/assets/hero-car-mobile.avif";
import heroCarMobileWebp from "@/assets/hero-car-mobile.webp";
import heroCarMobileJpg from "@/assets/hero-car-mobile.jpg";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { StatusBadge } from "@/components/vehicle-status";
import { INSTAGRAM_URL, whatsappLink } from "@/lib/contact";
import LightRays from "@/components/LightRays";
import { vehicles } from "@/data/vehicles";

export const Route = createFileRoute("/")({
  component: Index,
});

const BADGE = "Revenda Especializada em Veículos Premium";
const HERO_CAR_AVIF_SRCSET = `${heroCar1280Avif} 1280w, ${heroCar1920Avif} 1920w, ${heroCar2560Avif} 2560w`;
const HERO_CAR_WEBP_SRCSET = `${heroCar1280Webp} 1280w, ${heroCar1920Webp} 1920w, ${heroCar2560Webp} 2560w`;

const jornada = [
  {
    icon: Gem,
    step: "01",
    title: "Curadoria",
    text: "Selecionamos veículos premium com foco em qualidade, perfil comercial e oportunidade.",
  },
  {
    icon: ShieldCheck,
    step: "02",
    title: "Procedência",
    text: "Analisamos documentação, histórico e critérios essenciais para uma negociação segura.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Negociação",
    text: "Conduzimos cada etapa com transparência, discrição e atenção ao perfil do cliente.",
  },
  {
    icon: KeyRound,
    step: "04",
    title: "Entrega",
    text: "Oferecemos suporte até a conclusão do processo de compra, venda ou intermediação.",
  },
];

const etapasVenda = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Avaliação",
    text: "Analisamos modelo, estado, histórico, documentação e perfil comercial do veículo.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Estratégia",
    text: "Definimos a melhor forma de negociação, seja venda direta, troca ou intermediação.",
  },
  {
    icon: KeyRound,
    step: "03",
    title: "Negociação",
    text: "Conduzimos o contato com interessados de forma transparente, segura e personalizada.",
  },
];

const pilares = [
  {
    icon: Gem,
    title: "Curadoria premium",
    text: "Veículos selecionados com atenção ao perfil, estado e oportunidade.",
  },
  {
    icon: ShieldCheck,
    title: "Procedência e documentação",
    text: "Análise criteriosa para garantir mais segurança em cada negociação.",
  },
  {
    icon: Sparkles,
    title: "Atendimento personalizado",
    text: "Contato direto, consultivo e adaptado ao objetivo de cada cliente.",
  },
  {
    icon: Handshake,
    title: "Negociação segura",
    text: "Processo conduzido com clareza, discrição e suporte até a conclusão.",
  },
];

function HeroCarPicture({
  alt,
  className,
  loading = "eager",
  fetchPriority = "auto",
  sizes = "100vw",
}: {
  alt: string;
  className: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}) {
  return (
    <picture className="block h-full w-full">
      <source media="(max-width: 767px)" type="image/avif" srcSet={heroCarMobileAvif} />
      <source media="(max-width: 767px)" type="image/webp" srcSet={heroCarMobileWebp} />
      <source media="(max-width: 767px)" srcSet={heroCarMobileJpg} />
      <source type="image/avif" srcSet={HERO_CAR_AVIF_SRCSET} sizes={sizes} />
      <source type="image/webp" srcSet={HERO_CAR_WEBP_SRCSET} sizes={sizes} />
      <img
        src={heroCar}
        alt={alt}
        className={className}
        width={2560}
        height={1440}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}


function Index() {
  const [comoFuncionaOpen, setComoFuncionaOpen] = useState(false);
  const [comoFuncionaClosing, setComoFuncionaClosing] = useState(false);
  const heroLightingRef = useRef<HTMLDivElement>(null);

  const openComoFunciona = () => {
    setComoFuncionaClosing(false);
    setComoFuncionaOpen(true);
  };
  const closeComoFunciona = () => {
    setComoFuncionaClosing(true);
    setTimeout(() => {
      setComoFuncionaOpen(false);
      setComoFuncionaClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (!comoFuncionaOpen && !comoFuncionaClosing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeComoFunciona();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [comoFuncionaOpen, comoFuncionaClosing]);

  useEffect(() => {
    const lightingLayer = heroLightingRef.current;
    const hero = lightingLayer?.closest("#inicio") as HTMLElement | null;
    if (!lightingLayer || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frameId: number | null = null;
    let pointerX = 0;
    let pointerY = 0;

    const paintLightPosition = () => {
      const bounds = hero.getBoundingClientRect();
      const x = Math.min(0.96, Math.max(0.36, (pointerX - bounds.left) / bounds.width));
      const y = Math.min(0.62, Math.max(0.12, (pointerY - bounds.top) / bounds.height));

      lightingLayer.style.setProperty("--hero-light-x", `${x * 100}%`);
      lightingLayer.style.setProperty("--hero-light-y", `${y * 100}%`);
      frameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frameId === null) frameId = requestAnimationFrame(paintLightPosition);
    };

    const resetLightPosition = () => {
      lightingLayer.style.setProperty("--hero-light-x", "72%");
      lightingLayer.style.setProperty("--hero-light-y", "48%");
    };

    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetLightPosition);

    return () => {
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetLightPosition);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  const veiculoDestaque = vehicles.find((v) => v.destaque) ?? vehicles[0];
  const veiculosGrid = vehicles.filter((v) => v.id !== veiculoDestaque.id);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <SiteHeader home />

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden max-md:min-h-svh max-md:items-start">
        <div className="absolute inset-0">
          <HeroCarPicture
            alt="Veículo premium GETCARS"
            className="h-full w-full object-cover object-[55%_center] lg:object-[75%_center] max-md:object-contain max-md:object-center max-md:scale-100"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 md:via-background/70 lg:via-background/85 to-transparent max-md:via-background/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/45 lg:via-background/30 lg:to-background/60 max-md:from-background/30 max-md:via-background/5 max-md:to-background/55" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.08_0.005_60/0.35),transparent_60%)] lg:bg-[radial-gradient(ellipse_at_left,oklch(0.08_0.005_60/0.6),transparent_60%)] max-md:bg-[radial-gradient(ellipse_at_left,oklch(0.08_0.005_60/0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background/55 lg:from-background/60 lg:to-background/80 max-md:from-background/30 max-md:via-transparent max-md:to-background/10" />

          <div ref={heroLightingRef} className="hero-car-illumination absolute inset-0 z-[1]" aria-hidden="true">
            <HeroCarPicture
              alt=""
              className="h-full w-full object-cover object-[55%_center] lg:object-[75%_center] max-md:object-contain max-md:object-center max-md:scale-100"
              fetchPriority="low"
            />
          </div>

          <div className="hero-light-rays absolute inset-y-0 left-[16%] right-0 z-[2] max-md:hidden" aria-hidden="true">
            <LightRays
              raysOrigin="top-center"
              raysColor="#e8c98c"
              raysSpeed={0.4}
              lightSpread={0.76}
              rayLength={1.55}
              fadeDistance={1.2}
              saturation={0.78}
              followMouse
              mouseInfluence={0.14}
              noiseAmount={0.015}
              distortion={0.012}
            />
          </div>

          <div className="hero-mobile-light-rays absolute inset-0 z-[2] md:hidden" aria-hidden="true">
            <LightRays
              raysOrigin="top-right"
              raysColor="#d8b26a"
              raysSpeed={0.24}
              lightSpread={0.82}
              rayLength={1.45}
              fadeDistance={1.05}
              saturation={0.66}
              followMouse={false}
              mouseInfluence={0}
              noiseAmount={0.01}
              distortion={0.008}
            />
          </div>

          <div className="hero-floor-shade absolute inset-0 z-[3]" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1720px] w-full px-6 md:px-10 lg:px-16 xl:px-24 pt-32 pb-24 max-md:pt-48 max-md:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border-gold-subtle mb-10 bg-background/40 backdrop-blur max-md:px-3 max-md:py-1.5 max-md:mb-4 max-md:gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse max-md:h-1 max-md:w-1" />
                <span className="text-[10px] sm:text-xs tracking-[0.3em] text-gold uppercase max-md:tracking-[0.25em]">{BADGE}</span>
              </div>

              <h1 className="font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-medium leading-[1.02] mb-8 tracking-tight max-md:mb-40">
                Veículos <span className="text-gold-gradient italic">Premium</span>,
                <br />
                Exclusivos e <span className="text-gold-gradient italic">Blindados</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed mb-12 max-md:mb-14 max-md:text-base">
                Revenda especializada em veículos de alto padrão, com atendimento personalizado, qualidade e procedência.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-md:gap-4">
                <a href="/veiculos" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_50px_-5px_var(--gold)] transition-all">
                  Ver veículos disponíveis
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={whatsappLink("Olá, GETCARS! Gostaria de conhecer os veículos disponíveis.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-gold-subtle text-gold hover:bg-gold hover:text-primary-foreground transition-all">
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="absolute left-6 md:left-10 lg:left-16 xl:left-24 right-6 md:right-10 lg:right-16 xl:right-24 bottom-8 hidden md:flex items-end justify-between text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold/50" />
              <span>Coleção 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Role para descobrir</span>
              <span className="h-px w-10 bg-gold/50" />
            </div>
          </div>
        </div>
      </section>

      {/* JORNADA GETCARS — timeline editorial */}
      <section className="py-10 md:py-20 lg:py-28 relative">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Editorial column */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">A jornada GETCARS</p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05] mb-6">
                Uma experiência premium do <span className="text-gold-gradient italic">primeiro contato</span> à entrega
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Cada veículo é tratado com critério, cada negociação com transparência e cada cliente com atendimento personalizado.
              </p>
              <div className="hidden lg:block relative aspect-[3/2] rounded-lg overflow-hidden border-gold-subtle">
                <HeroCarPicture
                  alt="Detalhe automotivo premium"
                  loading="lazy"
                  sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 42vw, 100vw"
                  className="h-full w-full object-cover object-[60%_center] grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
            </div>

            {/* Timeline column */}
            <div className="lg:col-span-7 relative">
              <div className="absolute left-6 lg:left-7 top-3 bottom-3 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent" aria-hidden />
              <ol className="space-y-6 lg:space-y-8">
                {jornada.map((j) => (
                  <li key={j.step} className="relative pl-20 lg:pl-24 group">
                    <div className="absolute left-0 top-0 h-12 w-12 lg:h-14 lg:w-14 rounded-full border-gold-subtle bg-background flex items-center justify-center group-hover:border-gold/60 group-hover:bg-gold/5 transition-all duration-500">
                      <j.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] tracking-[0.35em] text-gold/70 uppercase">{j.step}</span>
                      <span className="h-px w-10 bg-gold/25" />
                    </div>
                    <h3 className="font-display text-2xl lg:text-3xl mb-2 text-foreground leading-tight">
                      {j.title}
                    </h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl">{j.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>



      {/* VEÍCULOS */}
      <section id="veiculos" className="py-28 lg:py-40 bg-surface/40 border-y border-gold-subtle relative">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="max-w-4xl mb-16 lg:mb-20">
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Coleção em destaque</p>
            <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05] mb-8">
              Veículos em <span className="text-gold-gradient italic">destaque</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Uma seleção de veículos premium, exclusivos e blindados, escolhidos com foco em qualidade, procedência e oportunidade.
            </p>
            <div className="max-w-3xl border-l-2 border-gold/50 pl-5 py-1">
              <p className="text-sm text-muted-foreground/85 italic leading-relaxed">
                Os valores são informados mediante consulta para garantir uma negociação personalizada, considerando forma de pagamento, troca, financiamento e condições comerciais.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured car */}
            <article className="lg:col-span-7 card-premium card-premium-hover rounded-lg overflow-hidden group flex flex-col">
              <div className="relative aspect-[16/11] overflow-hidden bg-black">
                <img src={veiculoDestaque.img} alt={veiculoDestaque.nome} loading="lazy" width={1600} height={1100} className="h-full w-full object-cover object-[45%_center] sm:object-center transition-transform duration-[1200ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <StatusBadge vehicle={veiculoDestaque} />
                </div>
                <div className="hidden sm:block absolute top-6 right-6 text-[10px] tracking-[0.3em] uppercase text-gold/80">
                  {veiculoDestaque.categoria}
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <p className="sm:hidden text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-2">
                    {veiculoDestaque.categoria}
                  </p>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Destaque da semana</p>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-5xl lining-nums">{veiculoDestaque.nome}</h3>
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="flex-1 min-w-0">
                  <p className="text-gold-soft text-sm tracking-wide mb-4">Valor mediante consulta</p>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /><span>{veiculoDestaque.ano}</span></div>
                    <div className="flex items-center gap-2"><Gauge className="h-4 w-4 text-gold" /><span>{veiculoDestaque.km}</span></div>
                  </div>
                </div>
                <a
                  href={whatsappLink(veiculoDestaque.whatsappMensagem)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gold-gradient text-primary-foreground text-sm font-medium tracking-wide hover:shadow-[0_0_40px_-8px_var(--gold)] transition-all shrink-0"
                >
                  <MessageCircle className="h-4 w-4" />
                  Tenho interesse
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>

            {/* Side grid */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-8">
              {veiculosGrid.map((v) => (
                <article key={v.id} className="card-premium card-premium-hover rounded-lg overflow-hidden group grid grid-cols-1 sm:grid-cols-2">
                  <div className="relative aspect-[16/10] sm:aspect-auto overflow-hidden bg-black">
                    <img src={v.img} alt={v.nome} loading="lazy" width={800} height={600} className="h-full w-full object-cover object-[55%_center] sm:object-center transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      <StatusBadge vehicle={v} size="sm" />
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-gold/70 mb-2">{v.categoria}</p>
                    <h3 className="font-display text-xl lg:text-2xl mb-2 leading-tight lining-nums">{v.nome}</h3>
                    <p className="text-gold-soft text-xs tracking-wide mb-4">Valor mediante consulta</p>
                    <div className="flex flex-wrap gap-4 mb-5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" />{v.ano}</div>
                      <div className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-gold" />{v.km}</div>
                    </div>
                    <a
                      href={whatsappLink(v.whatsappMensagem)}
                      target="_blank" rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 rounded-full border-gold-subtle text-gold text-[11px] sm:text-xs uppercase tracking-[0.15em] hover:bg-gold hover:text-primary-foreground transition-all"
                    >
                      Consultar veículo
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <a href="/veiculos" className="inline-flex items-center gap-3 rounded-full border-gold-subtle px-8 py-4 text-sm text-gold transition-colors hover:bg-gold hover:text-primary-foreground">
              Ver todos os veículos <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* VENDA — serviço premium */}
      <section id="venda" className="py-28 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.78_0.13_80/0.08),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 mb-16 lg:mb-20 items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Avaliação · Intermediação</p>
              <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05]">
                Seu veículo premium em uma <span className="text-gold-gradient italic">negociação à altura</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lg text-muted-foreground leading-relaxed">
                A GETCARS auxilia proprietários que desejam vender, trocar ou intermediar veículos de alto padrão com segurança, discrição e posicionamento adequado.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
            {etapasVenda.map((e) => (
              <div
                key={e.step}
                className="group rounded-lg border-gold-subtle bg-surface/50 hover:bg-surface/80 transition-all duration-500 p-8 lg:p-10 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-full border-gold-subtle flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all">
                    <e.icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="font-display text-4xl text-gold-gradient">{e.step}</span>
                </div>
                <h3 className="font-display text-2xl lg:text-3xl mb-3 leading-tight">{e.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/vender"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_50px_-5px_var(--gold)] transition-all"
            >
              Solicitar avaliação
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={openComoFunciona}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-gold-subtle text-gold hover:bg-gold hover:text-primary-foreground transition-all"
            >
              Entender como funciona
            </button>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-28 lg:py-40 bg-surface/40 border-y border-gold-subtle">
        <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 mb-16 lg:mb-24">
            <div className="lg:col-span-5">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Sobre a GETCARS</p>
              <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-medium leading-[1.05]">
                Uma revenda para quem valoriza <span className="text-gold-gradient italic">procedência, discrição e alto padrão</span>
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-7 text-lg text-muted-foreground leading-relaxed">
              <p>
                A <span className="text-gold-soft">GETCARS</span> atua na compra, venda e intermediação de veículos premium, exclusivos e blindados, oferecendo uma experiência segura, transparente e personalizada para clientes que buscam veículos diferenciados.
              </p>
              <p>
                Mais do que apresentar veículos, nosso trabalho é conduzir cada negociação com critério, atenção aos detalhes e suporte completo durante todo o processo de compra ou venda.
              </p>
            </div>
          </div>

          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-gold/50" />
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase">O padrão GETCARS</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pilares.map((p, i) => (
              <div
                key={p.title}
                className="group relative rounded-lg border-gold-subtle bg-background/50 hover:bg-surface/70 transition-all duration-500 p-8 lg:p-10 flex flex-col min-h-[240px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-full border-gold-subtle flex items-center justify-center group-hover:bg-gold/10 group-hover:border-gold/60 transition-all">
                    <p.icon className="h-5 w-5 text-gold" />
                  </div>
                  <span className="text-[10px] tracking-[0.35em] text-gold/60 uppercase">0{i + 1}</span>
                </div>
                <h3 className="font-display text-xl lg:text-2xl mb-3 leading-tight text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-28 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.78_0.13_80/0.06),transparent_65%)]" />
        </div>
        <div className="relative mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.35em] text-gold uppercase mb-5">Contato</p>
            <h2 className="font-display text-4xl lg:text-6xl font-medium leading-[1.05] mb-6">
              Pronto para encontrar seu próximo <span className="text-gold-gradient italic">veículo premium?</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fale com a GETCARS para consultar veículos disponíveis, negociar seu veículo ou receber atendimento personalizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <a href={whatsappLink("Olá, GETCARS! Gostaria de falar com um consultor.")} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 lg:p-12 flex flex-col group">
              <div className="flex items-center gap-5 mb-6">
                <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-1">WhatsApp</p>
                  <p className="font-display text-2xl">Atendimento direto</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Atendimento direto para consultas, avaliações e negociações.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold group-hover:gap-3 transition-all">
                Iniciar conversa <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="card-premium card-premium-hover rounded-lg p-10 lg:p-12 flex flex-col group">
              <div className="flex items-center gap-5 mb-6">
                <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center shrink-0">
                  <Instagram className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-1">Instagram</p>
                  <p className="font-display text-2xl">@getcars_</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Acompanhe oportunidades, novidades e veículos em destaque.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold group-hover:gap-3 transition-all">
                Seguir perfil <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div className="mt-14 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-gold" />
            <span>Atendimento em São Paulo e em todo o Brasil</span>
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <SiteFooter />

      {/* MODAL: Como funciona a avaliação */}
      {(comoFuncionaOpen || comoFuncionaClosing) && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="como-funciona-title"
        >
          <div
            className={`absolute inset-0 bg-background/85 backdrop-blur-sm transition-opacity duration-300 ${comoFuncionaClosing ? "opacity-0" : "opacity-100"}`}
            onClick={closeComoFunciona}
          />
          <div className={`relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-surface border border-gold/25 shadow-[0_0_80px_-10px_var(--gold)] rounded-t-2xl sm:rounded-2xl duration-300 ${comoFuncionaClosing ? "animate-out fade-out slide-out-to-bottom-4" : "animate-in fade-in slide-in-from-bottom-4"}`}>
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-10 py-5 border-b border-gold-subtle bg-surface/95 backdrop-blur">
              <p className="text-[11px] tracking-[0.35em] text-gold uppercase">Processo GETCARS</p>
              <button
                type="button"
                onClick={closeComoFunciona}
                className="h-9 w-9 rounded-full border-gold-subtle flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 sm:px-10 py-8 sm:py-10">
              <h3 id="como-funciona-title" className="font-display text-3xl sm:text-4xl leading-tight mb-4">
                Como funciona a <span className="text-gold-gradient italic">avaliação</span>
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
                Entenda como a GETCARS conduz a avaliação, negociação e intermediação de veículos premium com segurança, transparência e discrição.
              </p>

              <ol className="space-y-6">
                {[
                  { t: "Primeiro contato", d: "Você informa o modelo, ano, versão, quilometragem e envia algumas fotos do veículo." },
                  { t: "Análise do veículo", d: "A GETCARS avalia o perfil do carro, estado geral, documentação, histórico e potencial comercial." },
                  { t: "Estratégia de negociação", d: "Definimos a melhor forma de conduzir: venda direta, troca ou intermediação." },
                  { t: "Atendimento e proposta", d: "A negociação é conduzida com transparência, discrição e suporte até a conclusão." },
                ].map((item, i) => (
                  <li key={item.t} className="flex gap-5">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full border-gold-subtle flex items-center justify-center">
                      <span className="font-display text-lg text-gold-gradient">{i + 1}</span>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-display text-xl mb-1.5 leading-tight">{item.t}</h4>
                      <p className="text-[14px] text-muted-foreground leading-relaxed">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 pt-6 border-t border-gold-subtle/50 flex flex-col sm:flex-row gap-3">
                <a
                  href="/vender"
                  onClick={closeComoFunciona}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold-gradient text-primary-foreground font-medium tracking-wide hover:shadow-[0_0_50px_-5px_var(--gold)] transition-all"
                >
                  Solicitar avaliação
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={closeComoFunciona}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-gold-subtle text-gold hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
