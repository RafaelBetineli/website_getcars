import { Shield, BadgeCheck, Repeat2 } from "lucide-react";
import type { Vehicle } from "@/data/vehicles";

export function StatusBadge({ vehicle, size = "md" }: { vehicle: Vehicle; size?: "sm" | "md" }) {
  const Icon = vehicle.statusType === "armored" ? Shield : BadgeCheck;
  const isSm = size === "sm";
  return (
    <span className="inline-flex flex-col items-start gap-2">
      {vehicle.repasse && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-soft bg-gold-gradient px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-md">
          <Repeat2 className="h-3.5 w-3.5" aria-hidden="true" />
          Repasse
        </span>
      )}
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-background/75 backdrop-blur border-gold-subtle ${
          isSm ? "px-2.5 py-1" : "px-3.5 py-1.5"
        }`}
      >
        <Icon className={isSm ? "h-3 w-3 text-gold" : "h-3.5 w-3.5 text-gold"} />
        <span
          className={`uppercase text-gold ${
            isSm ? "text-[9px] tracking-wider" : "text-[10px] tracking-[0.25em]"
          }`}
        >
          {vehicle.statusLabel}
        </span>
      </span>
    </span>
  );
}
