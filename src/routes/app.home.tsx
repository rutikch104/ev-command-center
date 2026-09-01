import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  Search,
  BatteryCharging,
  Truck,
  ScanLine,
  RefreshCw,
  TriangleAlert,
  Siren,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { batteries, fleetStats, ago } from "@/lib/data";
import { Card, SectionTitle, StatusPill, Bar } from "@/components/ev/primitives";

export const Route = createFileRoute("/app/home")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard — EV Ops Control Center" },
      {
        name: "description",
        content: "Live battery counts, fleet health, quick actions and recent field activity for EV operations teams.",
      },
      { property: "og:title", content: "Operations Dashboard — EV Ops" },
      { property: "og:description", content: "Live battery counts, fleet health and recent field activity." },
    ],
  }),
  component: HomeScreen,
});

const overview = [
  { label: "Total Batteries", value: fleetStats.total, tone: "bg-ink text-ink-foreground", sub: "Deployed fleet" },
  { label: "Online", value: fleetStats.online, tone: "bg-success-soft text-success", sub: "Communicating" },
  { label: "Offline", value: fleetStats.offline, tone: "bg-danger-soft text-danger", sub: "No data > 30 min" },
  { label: "Critical", value: fleetStats.critical, tone: "bg-warning-soft text-warning-foreground", sub: "Needs attention" },
];

const actions = [
  { label: "Search Battery", icon: BatteryCharging, to: "/app/batteries" },
  { label: "Search Vehicle", icon: Truck, to: "/app/vehicles" },
  { label: "Scan Battery", icon: ScanLine, to: "/app/scan" },
  { label: "Recent Swaps", icon: RefreshCw, to: "/app/swaps" },
  { label: "Open Issues", icon: TriangleAlert, to: "/app/issues" },
  { label: "Alerts", icon: Siren, to: "/app/issues" },
] as const;

function HomeScreen() {
  const onlinePct = Math.round((fleetStats.online / fleetStats.total) * 100);
  const recent = batteries.slice(0, 5);

  return (
    <div className="space-y-6">
      <header className="rounded-b-[28px] bg-ink px-5 pb-8 pt-6 text-ink-foreground">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-foreground/15 text-sm font-bold">
              RP
            </div>
            <div className="min-w-0">
              <p className="text-[12px] text-ink-foreground/60">Good morning</p>
              <p className="truncate text-[16px] font-bold">Rutik Pawar</p>
            </div>
          </div>
          <button
            aria-label="Notifications"
            className="relative grid size-11 place-items-center rounded-full bg-ink-foreground/10"
          >
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-danger" />
          </button>
        </div>

        <Link
          to="/app/search"
          className="mt-5 flex items-center gap-3 rounded-2xl bg-ink-foreground/10 px-4 py-3.5 text-[14px] text-ink-foreground/70"
        >
          <Search className="size-[18px] shrink-0" />
          <span className="truncate">Search battery, vehicle, BMS, IMEI, ICCID…</span>
        </Link>
      </header>

      <section className="-mt-12 px-4">
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {overview.map((o) => (
            <div
              key={o.label}
              className={`min-w-[142px] shrink-0 rounded-2xl border border-border/50 px-4 py-3.5 shadow-card ${o.tone}`}
            >
              <p className="text-[11px] font-semibold opacity-80">{o.label}</p>
              <p className="tabular mt-1 text-2xl font-extrabold leading-none">
                {o.value.toLocaleString("en-IN")}
              </p>
              <p className="mt-1.5 text-[11px] opacity-70">{o.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-semibold text-muted-foreground">Battery Status</p>
              <p className="tabular mt-1 text-3xl font-extrabold leading-none">{onlinePct}%</p>
              <p className="mt-1 text-[12px] text-muted-foreground">of the fleet is online right now</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">
              <ArrowUpRight className="size-3.5" /> +1.4%
            </span>
          </div>

          <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="bg-success" style={{ width: `${onlinePct}%` }} />
            <div className="bg-danger" style={{ width: `${(fleetStats.offline / fleetStats.total) * 100}%` }} />
            <div className="bg-warning" style={{ width: `${(fleetStats.critical / fleetStats.total) * 100}%` }} />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["Online", fleetStats.online, "bg-success"],
              ["Offline", fleetStats.offline, "bg-danger"],
              ["Critical", fleetStats.critical, "bg-warning"],
            ].map(([label, value, dot]) => (
              <div key={label as string} className="rounded-xl bg-surface px-3 py-2.5">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <span className={`size-1.5 rounded-full ${dot}`} />
                  {label}
                </span>
                <p className="tabular mt-1 text-[15px] font-bold">
                  {(value as number).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="px-4">
        <SectionTitle title="Quick Actions" />
        <div className="grid grid-cols-3 gap-3">
          {actions.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3 text-center shadow-card transition-transform active:scale-[0.97]"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" />
              </span>
              <span className="text-[11.5px] font-semibold leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4">
        <SectionTitle
          title="Recent Activity"
          action={
            <Link to="/app/batteries" className="text-[12px] font-semibold text-primary">
              View all
            </Link>
          }
        />
        <div className="space-y-2.5">
          {recent.map((b) => (
            <Link
              key={b.id}
              to="/app/batteries/$id"
              params={{ id: b.bms }}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-card active:bg-surface"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-muted-foreground">
                <BatteryCharging className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate font-mono text-[13px] font-semibold">{b.bms}</p>
                  <StatusPill status={b.status} pulse={b.status === "critical"} />
                </div>
                <p className="mt-1 text-[12px] text-muted-foreground">
                  {b.status === "critical"
                    ? `Temperature alert · ${b.temperature}°C`
                    : `Last communication ${ago(b.lastSeenMin)}`}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Bar
                    value={b.soc}
                    tone={b.soc < 20 ? "danger" : b.soc < 40 ? "warning" : "success"}
                  />
                  <span className="tabular text-[11px] font-semibold text-muted-foreground">{b.soc}%</span>
                </div>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
