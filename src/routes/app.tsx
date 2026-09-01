import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, BatteryCharging, Truck, TriangleAlert, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const items = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/batteries", label: "Batteries", icon: BatteryCharging },
  { to: "/app/vehicles", label: "Vehicles", icon: Truck },
  { to: "/app/issues", label: "Issues", icon: TriangleAlert },
] as const;

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideNav = pathname.startsWith("/app/scan");

  return (
    <div className="mx-auto min-h-screen w-full max-w-[520px] bg-background pb-28">
      <Outlet />
      {hideNav ? null : (
        <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[520px] px-4 pb-4">
          <div className="relative">
            <Link
              to="/app/scan"
              aria-label="Scan battery"
              className="absolute -top-8 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-float transition-transform active:scale-95"
            >
              <ScanLine className="size-6" />
            </Link>
            <div className="grid grid-cols-4 items-center rounded-3xl border border-border bg-card/95 px-2 py-2 shadow-float backdrop-blur-xl">
              {items.map(({ to, label, icon: Icon }, i) => {
                const active = pathname.startsWith(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition-colors",
                      i === 1 && "mr-5",
                      i === 2 && "ml-5",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full transition-colors",
                        active && "bg-primary-soft",
                      )}
                    >
                      <Icon className="size-[18px]" />
                    </span>
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
