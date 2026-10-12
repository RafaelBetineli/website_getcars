import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/veiculos")({ component: VehiclesLayout });

function VehiclesLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
