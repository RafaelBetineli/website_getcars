import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import { StatusBadge } from "@/components/vehicle-status";
import { vehicles } from "@/data/vehicles";
import { whatsappLink } from "@/lib/contact";

export const Route = createFileRoute("/veiculos/$slug")({
  loader: ({ params }) => {
    const vehicle = vehicles.find((item) => item.id === params.slug);
    if (!vehicle) throw notFound();
    return vehicle;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.nome} ${loaderData.ano} — GETCARS`
      : "Veículo não encontrado — GETCARS";
    const description = loaderData
      ? `${loaderData.descricao} Ano ${loaderData.ano}, ${loaderData.km}. Valor mediante consulta.`
      : "O veículo solicitado não foi encontrado.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
    };
  },
  component: VehicleDetail,
  notFoundComponent: () => (
    <main className="px-6 pb-24 pt-44 text-center">
      <h1 className="font-display text-5xl">Veículo não encontrado</h1>
      <p className="mt-4 text-muted-foreground">
        Consulte os veículos disponíveis em nossa coleção.
      </p>
      <Link
        to="/veiculos"
        search={{ cat: "todos", sort: "ano" }}
        className="mt-8 inline-flex rounded-full bg-gold-gradient px-6 py-3 text-primary-foreground"
      >
        Ver todos os veículos
      </Link>
    </main>
  ),
});

function VehicleDetail() {
  const vehicle = Route.useLoaderData();
  const suggestions = vehicles.filter((item) => item.id !== vehicle.id).slice(0, 2);
  const specs = [
    ["Ano", vehicle.ano],
    ["Quilometragem", vehicle.km],
    ["Categoria", vehicle.categoria],
    ["Condição", vehicle.statusLabel],
  ];
  return (
    <main className="mx-auto max-w-[1720px] px-6 pb-24 pt-32 md:px-10 lg:px-16 lg:pt-40 xl:px-24">
      <Link
        to="/veiculos"
        search={{ cat: "todos", sort: "ano" }}
        className="mb-8 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-soft"
      >
        <ArrowLeft className="h-4 w-4" />
        Ver outros veículos
      </Link>
      <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div className="relative overflow-hidden rounded-lg border-gold-subtle bg-black">
          <img
            src={vehicle.img}
            alt={vehicle.nome}
            width={1200}
            height={900}
            fetchPriority="high"
            className="aspect-[4/3] w-full object-contain"
          />
          <div className="absolute left-4 top-4">
            <StatusBadge vehicle={vehicle} />
          </div>
        </div>
        <section>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            {vehicle.categoria} · Disponível
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight lining-nums sm:text-6xl">
            {vehicle.nome}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{vehicle.descricao}</p>
          <p className="mt-6 text-gold-soft">Valor mediante consulta</p>
          <dl className="my-8 border-y border-border">
            {specs.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-border py-4 text-sm last:border-0"
              >
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={whatsappLink(vehicle.whatsappMensagem)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-4 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_40px_-8px_var(--gold)]"
          >
            <MessageCircle className="h-4 w-4" />
            Tenho interesse
          </a>
        </section>
      </div>
      <section className="mt-20 lg:mt-28" aria-labelledby="outros-veiculos">
        <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold">Continue explorando</p>
        <h2 id="outros-veiculos" className="mb-8 font-display text-4xl lg:text-5xl">
          Outros <span className="text-gold-gradient italic">veículos</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {suggestions.map((item) => (
            <VehicleCard key={item.id} vehicle={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
