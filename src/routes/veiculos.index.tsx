import { createFileRoute } from "@tanstack/react-router";
import { VehicleCard } from "@/components/vehicle-card";
import { vehicles } from "@/data/vehicles";
import { catalogFilters, catalogSearchSchema, selectVehicles } from "@/lib/vehicle-catalog";

export const Route = createFileRoute("/veiculos/")({
  validateSearch: (search) => catalogSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Veículos disponíveis — GETCARS" },
      {
        name: "description",
        content:
          "Explore a seleção GETCARS de veículos premium, exclusivos e blindados. Filtre por categoria e encontre seu próximo veículo.",
      },
      { property: "og:title", content: "Veículos disponíveis — GETCARS" },
      {
        property: "og:description",
        content: "Conheça nossa seleção de veículos premium, exclusivos e blindados.",
      },
      { name: "twitter:title", content: "Veículos disponíveis — GETCARS" },
    ],
  }),
  component: VehiclesPage,
});

function VehiclesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = selectVehicles(vehicles, search);

  return (
    <main className="mx-auto max-w-[1720px] px-6 pb-24 pt-36 md:px-10 lg:px-16 lg:pb-32 lg:pt-44 xl:px-24">
      <div className="flex flex-col gap-8 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-gold">Nossa coleção</p>
          <h1 className="font-display text-5xl font-medium leading-tight sm:text-7xl">
            Veículos <span className="text-gold-gradient italic">disponíveis</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Uma seleção de veículos premium, exclusivos e blindados, com qualidade e procedência em
            cada detalhe.
          </p>
        </div>
        <label className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
          Ordenar por
          <select
            value={search.sort}
            onChange={(event) =>
              navigate({
                search: (previous) => ({ ...previous, sort: event.target.value as "ano" | "km" }),
                resetScroll: false,
              })
            }
            className="rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <option value="ano">Ano: mais recentes</option>
            <option value="km">Menor quilometragem</option>
          </select>
        </label>
      </div>
      <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filtrar veículos por categoria"
          className="flex flex-wrap gap-2"
        >
          {catalogFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={search.cat === filter.value}
              onClick={() =>
                navigate({
                  search: (previous) => ({ ...previous, cat: filter.value }),
                  resetScroll: false,
                })
              }
              className={`rounded-full border px-5 py-2.5 text-xs tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${search.cat === filter.value ? "border-transparent bg-gold-gradient text-primary-foreground" : "border-border text-muted-foreground hover:border-gold hover:text-gold"}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" aria-atomic="true" className="text-xs text-muted-foreground">
          {String(list.length).padStart(2, "0")}{" "}
          {list.length === 1 ? "veículo encontrado" : "veículos encontrados"}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
      {list.length === 0 && (
        <div className="rounded-lg border border-border px-6 py-24 text-center">
          <h2 className="font-display text-4xl">Nenhum veículo nesta seleção</h2>
          <button
            type="button"
            className="mt-6 rounded-full bg-gold-gradient px-6 py-3 text-sm text-primary-foreground"
            onClick={() =>
              navigate({ search: { cat: "todos", sort: search.sort }, resetScroll: false })
            }
          >
            Ver todos os veículos
          </button>
        </div>
      )}
      <p className="mt-10 max-w-3xl border-l-2 border-gold/50 pl-5 text-sm italic leading-relaxed text-muted-foreground">
        Os valores são informados mediante consulta, considerando forma de pagamento, troca,
        financiamento e condições comerciais.
      </p>
    </main>
  );
}
