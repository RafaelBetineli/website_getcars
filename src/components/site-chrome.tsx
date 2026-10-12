import { useEffect, useState } from "react";
import { Instagram, MapPin, Menu, MessageCircle, X } from "lucide-react";
import logo from "@/assets/getcars-logo.png";
import { INSTAGRAM_URL, whatsappLink } from "@/lib/contact";

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Veículos", href: "/veiculos" },
  { label: "Venda seu veículo", href: "/vender" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function SiteHeader({ home = false }: { home?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || !home ? "bg-background/80 backdrop-blur-xl border-b border-gold-subtle" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 lg:h-24 gap-6">
          <a href={home ? "#inicio" : "/"} className="flex items-center gap-3 shrink-0">
            <img
              src={logo}
              alt="GETCARS"
              className="h-11 w-11 object-contain"
              width={44}
              height={44}
            />
            <span className="font-display text-2xl tracking-[0.28em] text-gold-gradient font-semibold">
              GETCARS
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center justify-center gap-12"
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href.startsWith("#") && !home ? `/${n.href}` : n.href}
                className="text-[13px] text-muted-foreground hover:text-gold transition-colors tracking-[0.15em] uppercase"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-gold-subtle text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-primary-foreground transition-all"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gold p-2 justify-self-end"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="site-mobile-menu"
            className="lg:hidden pb-6 pt-2 space-y-1 border-t border-gold-subtle"
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href.startsWith("#") && !home ? `/${n.href}` : n.href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-3 text-muted-foreground hover:text-gold transition-colors"
              >
                {n.label}
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-primary-foreground text-sm font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-gold-subtle bg-surface/60">
      <div className="mx-auto max-w-[1720px] px-6 md:px-10 lg:px-16 xl:px-24 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="GETCARS"
                className="h-9 w-9 object-contain"
                width={36}
                height={36}
                loading="lazy"
              />
              <span className="font-display text-lg tracking-[0.28em] text-gold-gradient font-semibold">
                GETCARS
              </span>
            </div>
            <p className="text-muted-foreground italic font-display text-base leading-relaxed max-w-xs">
              Veículos premium com qualidade, procedência e exclusividade.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-[10px] tracking-[0.3em] text-gold uppercase mb-5">Contato</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground flex flex-col md:items-end">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4" /> @getcars_
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> São Paulo, Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 pt-6 border-t border-gold-subtle/40 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground tracking-[0.18em]">
          <p>© {new Date().getFullYear()} GETCARS · Todos os direitos reservados.</p>
          <p className="uppercase text-gold/70">Qualidade · Procedência · Exclusividade</p>
        </div>
      </div>
    </footer>
  );
}
