import { z } from "zod";
import type { Vehicle } from "@/data/vehicles";

export const catalogSearchSchema = z.object({
  cat: z.enum(["todos", "esportivos", "suvs", "blindados", "repasse"]).catch("todos"),
  sort: z.enum(["ano", "km"]).catch("ano"),
});

export const catalogFilters = [
  { value: "todos", label: "Todos" },
  { value: "esportivos", label: "Esportivos" },
  { value: "suvs", label: "SUVs" },
  { value: "blindados", label: "Blindados" },
  { value: "repasse", label: "Repasse" },
] as const;

export function selectVehicles(
  vehicles: readonly Vehicle[],
  search: z.infer<typeof catalogSearchSchema>,
) {
  return vehicles
    .filter((vehicle) => {
      if (search.cat === "esportivos") return vehicle.tipo === "esportivo";
      if (search.cat === "suvs") return vehicle.tipo === "suv";
      if (search.cat === "blindados") return vehicle.statusType === "armored";
      if (search.cat === "repasse") return vehicle.repasse === true;
      return true;
    })
    .sort((a, b) =>
      search.sort === "ano"
        ? Number(b.ano) - Number(a.ano)
        : Number(a.km.replace(/\D/g, "")) - Number(b.km.replace(/\D/g, "")),
    );
}
