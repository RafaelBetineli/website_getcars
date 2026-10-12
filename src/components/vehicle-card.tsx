import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Gauge } from "lucide-react";
import { StatusBadge } from "@/components/vehicle-status";
import type { Vehicle } from "@/data/vehicles";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article className="card-premium card-premium-hover group flex flex-col overflow-hidden rounded-lg">
      <Link
        to="/veiculos/$slug"
        params={{ slug: vehicle.id }}
        aria-label={`Ver detalhes de ${vehicle.nome}`}
        className="relative block aspect-[16/10] overflow-hidden bg-black"
      >
        <img
          src={vehicle.img}
          alt={vehicle.nome}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <StatusBadge vehicle={vehicle} size="sm" />
        </div>
        {vehicle.destaque && (
          <span className="absolute bottom-4 right-4 rounded-full border-gold-subtle bg-background/80 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
            Destaque
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{vehicle.categoria}</p>
        <h2 className="mt-3 font-display text-3xl leading-tight lining-nums">{vehicle.nome}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{vehicle.descricao}</p>
        <div className="my-6 flex flex-wrap gap-5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gold" />
            {vehicle.ano}
          </span>
          <span className="inline-flex items-center gap-2">
            <Gauge className="h-4 w-4 text-gold" />
            {vehicle.km}
          </span>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <p className="text-xs text-gold-soft">Valor mediante consulta</p>
          <Link
            to="/veiculos/$slug"
            params={{ slug: vehicle.id }}
            className="inline-flex items-center gap-2 rounded-full text-sm text-gold hover:text-gold-soft"
          >
            Ver detalhes <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
