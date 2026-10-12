import type { Vehicle } from "@/data/vehicles";

export function VehicleImageDisclosure({ vehicle }: { vehicle: Vehicle }) {
  if (!vehicle.imagemGeradaPorIA) return null;
  return (
    <p className="border-b border-border bg-background/95 px-5 py-2 text-xs leading-relaxed text-gold-soft">
      Imagem ilustrativa gerada por IA.
    </p>
  );
}
