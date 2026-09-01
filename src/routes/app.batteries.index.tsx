import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ChevronRight, MapPin } from "lucide-react";
import { batteries, ago } from "@/lib/data";
import { Chips, StatusPill, EmptyState, Bar } from "@/components/ev/primitives";

export const Route = createFileRoute("/app/batteries/")({
  head: () => ({
    meta: [
      { title: "Batteries — EV Ops Control Center" },
      {
        name: "description",
        content: "Search and filter the battery fleet by BMS ID, IMEI or ICCID and check SOC, status and location.",
      },
      { property: "og:title", content: "Batteries — EV Ops" },
      { property: "og:description", content: "Search the battery fleet by BMS, IMEI or ICCID." },
    ],
  }),
  component: BatteryList,
});

const filters = ["all", "online", "offline", "critical", "charging"];

function BatteryList() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return batteries.filter(
      (b) =>
        (filter === "all" || b.status === filter) &&
        (!t ||
          [b.bms, b.id, b.imei, b.iccid, b.vehicle ?? ""].some((f) => f.toLowerCase().includes(t))),
    );
  }, [q, filter]);

  return (
    <div>
      <header className="sticky top-0 z-30 space-y-3 border-b border-border bg-background/90 px-4 pb-3 pt-6 backdrop-blur-xl">
        <div className="flex items-baseline justify-between">
          <h1 className="text-[22px] font-extrabold tracking-tight">Batteries</h1>
          <span className="tabular text-[12px] text-muted-foreground">{list.length} results</span>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search battery ID, BMS, IMEI, ICCID…"
            className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-[14px] outline-none transition-colors focus:border-primary"
          />
        </div>
        <Chips options={filters} value={filter} onChange={setFilter} />
      </header>

      <div className="space-y-3 px-4 py-4">
        {list.length === 0 ? (
          <EmptyState title="No batteries found" hint="Try a different BMS ID, IMEI or filter." />
        ) : (
          list.map((b) => (
            <Link
              key={b.id}
              to="/app/batteries/$id"
              params={{ id: b.bms }}
              className="block rounded-2xl border border-border bg-card p-4 shadow-card transition-transform active:scale-[0.995]"
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                <p className="truncate font-mono text-[14px] font-bold">{b.bms}</p>
                <StatusPill status={b.status} />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-surface px-3 py-2">
                  <p className="text-[10.5px] text-muted-foreground">SOC</p>
                  <p className="tabular text-[15px] font-bold">{b.soc}%</p>
                  <Bar
                    value={b.soc}
                    tone={b.soc < 20 ? "danger" : b.soc < 40 ? "warning" : "success"}
                  />
                </div>
                <div className="rounded-xl bg-surface px-3 py-2">
                  <p className="text-[10.5px] text-muted-foreground">Vehicle</p>
                  <p className="truncate text-[13px] font-bold">{b.vehicle ?? "Unassigned"}</p>
                  <p className="mt-1 text-[10.5px] text-muted-foreground">SOH {b.soh}%</p>
                </div>
                <div className="rounded-xl bg-surface px-3 py-2">
                  <p className="text-[10.5px] text-muted-foreground">Last seen</p>
                  <p className="text-[13px] font-bold">{ago(b.lastSeenMin)}</p>
                  <p className="mt-1 text-[10.5px] text-muted-foreground">{b.temperature}°C</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 text-[12px] text-muted-foreground">
                <span className="flex min-w-0 items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" />
                  <span className="truncate">
                    {b.location}, {b.city}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
