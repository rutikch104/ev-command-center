import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Thermometer,
  Zap,
  Activity,
  HeartPulse,
  Signal,
  MapPin,
  ChevronDown,
  Truck,
  TriangleAlert,
  RefreshCw,
  Cpu,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { findBattery, ago, issues, swaps, series } from "@/lib/data";
import {
  Card,
  DetailHeader,
  KeyValue,
  Metric,
  SocRing,
  StatusPill,
  Chips,
} from "@/components/ev/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/batteries/$id")({
  loader: ({ params }) => {
    const battery = findBattery(params.id);
    if (!battery) throw notFound();
    return { battery };
  },
  head: ({ params }) => ({
    meta: [
      { title: `Battery ${params.id} — EV Ops Control Center` },
      {
        name: "description",
        content: `Live health, telemetry, vehicle link, swaps and issues for battery ${params.id}.`,
      },
      { property: "og:title", content: `Battery ${params.id} — EV Ops` },
      { property: "og:description", content: `Health, telemetry and swap history for battery ${params.id}.` },
    ],
  }),
  component: BatteryDetail,
  notFoundComponent: () => (
    <div className="px-6 py-24 text-center">
      <p className="text-sm font-semibold">Battery not found</p>
      <Link to="/app/batteries" className="mt-2 inline-block text-[13px] font-semibold text-primary">
        Back to batteries
      </Link>
    </div>
  ),
});

const ranges = ["1H", "6H", "24H", "7D"];

function Section({
  title,
  icon: Icon,
  children,
  defaultOpen,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <Card className="p-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-14 w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="size-[18px]" />
        </span>
        <span className="flex-1 text-[14px] font-bold">{title}</span>
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>
      {open ? <div className="border-t border-border px-4 py-3">{children}</div> : null}
    </Card>
  );
}

function BatteryDetail() {
  const { battery: b } = Route.useLoaderData();
  const [range, setRange] = useState("24H");
  const [metric, setMetric] = useState("SOC");
  const points = range === "1H" ? 12 : range === "6H" ? 18 : range === "24H" ? 24 : 28;
  const cfg: Record<string, { base: number; spread: number; unit: string }> = {
    SOC: { base: b.soc, spread: 12, unit: "%" },
    Voltage: { base: b.voltage, spread: 2, unit: "V" },
    Temperature: { base: b.temperature, spread: 4, unit: "°C" },
    Current: { base: Math.abs(b.current), spread: 6, unit: "A" },
  };
  const data = series(b.soc + metric.length, cfg[metric].base, cfg[metric].spread, points);
  const batteryIssues = issues.filter((i) => i.asset === b.bms);
  const batterySwaps = swaps.filter((s) => s.battery === b.bms);

  return (
    <div>
      <DetailHeader
        back="/app/batteries"
        title="Battery Details"
        subtitle={<span className="font-mono">{b.bms}</span>}
        right={<StatusPill status={b.status} />}
      />

      <div className="space-y-3 px-4 py-4">
        <Card className="flex flex-col items-center py-6">
          <SocRing value={b.soc} />
          <div className="mt-5 grid w-full grid-cols-3 gap-2">
            <Metric label="Voltage" value={`${b.voltage} V`} />
            <Metric label="Current" value={`${b.current} A`} />
            <Metric label="Temp" value={`${b.temperature}°C`} />
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">
            Last communication {ago(b.lastSeenMin)}
          </p>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card className="p-3.5">
            <span className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground">
              <HeartPulse className="size-4" /> Battery health
            </span>
            <p className="tabular mt-1.5 text-xl font-extrabold">{b.soh}%</p>
            <p className="text-[11px] text-muted-foreground">{b.cycles} cycles · {b.chemistry}</p>
          </Card>
          <Card className="p-3.5">
            <span className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground">
              <Signal className="size-4" /> Connectivity
            </span>
            <p className="mt-1.5 text-xl font-extrabold capitalize">
              {b.status === "offline" ? "Offline" : "Online"}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Signal {b.signal}/5 · SIM {b.signal ? "active" : "no data"}
            </p>
          </Card>
        </div>

        <Section title="Overview" icon={Zap} defaultOpen>
          <div className="divide-y divide-border">
            <KeyValue label="Battery ID" value={b.id} />
            <KeyValue label="BMS ID" value={<span className="font-mono">{b.bms}</span>} />
            <KeyValue label="Capacity" value={b.capacity} />
            <KeyValue label="Chemistry" value={b.chemistry} />
            <KeyValue label="IMEI" value={<span className="font-mono">{b.imei}</span>} />
            <KeyValue label="ICCID" value={<span className="font-mono">{b.iccid}</span>} />
            <KeyValue label="Commissioned" value={b.commissioned} />
          </div>
        </Section>

        <Section title="Telemetry" icon={Activity} defaultOpen>
          <div className="grid grid-cols-4 gap-2">
            <Metric label="SOC" value={`${b.soc}%`} />
            <Metric label="Volt" value={`${b.voltage}`} />
            <Metric label="Curr" value={`${b.current}`} />
            <Metric label="Temp" value={`${b.temperature}°`} />
          </div>

          <div className="mt-3">
            <Chips options={["SOC", "Voltage", "Temperature", "Current"]} value={metric} onChange={setMetric} />
          </div>

          <div className="mt-3 h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="t" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} interval={Math.ceil(points / 5)} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={38} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v} ${cfg[metric].unit}`, metric]}
                />
                <Line type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2">
            <Chips options={ranges} value={range} onChange={setRange} />
          </div>
        </Section>

        <Section title="Vehicle" icon={Truck}>
          {b.vehicle ? (
            <Link
              to="/app/vehicles/$id"
              params={{ id: b.vehicle }}
              className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold">{b.vehicle}</p>
                <p className="text-[12px] text-muted-foreground">Installed · tap to open vehicle</p>
              </div>
              <StatusPill status="active" />
            </Link>
          ) : (
            <p className="py-2 text-[13px] text-muted-foreground">Battery is not installed in any vehicle.</p>
          )}
        </Section>

        <Section title="Swaps" icon={RefreshCw}>
          {(batterySwaps.length ? batterySwaps : swaps.slice(0, 3)).map((s) => (
            <div key={s.id} className="flex gap-3 py-2.5">
              <div className="flex flex-col items-center">
                <span className="mt-1 size-2.5 rounded-full bg-primary" />
                <span className="w-px flex-1 bg-border" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold">
                  {s.action === "installed" ? "Installed in" : "Removed from"} {s.vehicle}
                </p>
                <p className="text-[11.5px] text-muted-foreground">
                  {s.day}, {s.time} · {s.location}
                </p>
              </div>
            </div>
          ))}
          <Link to="/app/swaps" className="mt-1 block text-[12px] font-semibold text-primary">
            View full swap history
          </Link>
        </Section>

        <Section title="Location" icon={MapPin}>
          <div className="overflow-hidden rounded-xl border border-border">
            <div
              className="relative h-36 bg-surface"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            >
              <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-float">
                <MapPin className="size-4" />
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 px-3 py-3">
              <div>
                <p className="text-[13px] font-semibold">
                  {b.location}, {b.city}
                </p>
                <p className="text-[11.5px] text-muted-foreground">Updated {ago(b.lastSeenMin)}</p>
              </div>
              <button className="rounded-xl bg-ink px-3 py-2.5 text-[12px] font-semibold text-ink-foreground">
                View location
              </button>
            </div>
          </div>
        </Section>

        <Section title="Issues" icon={TriangleAlert}>
          {batteryIssues.length ? (
            batteryIssues.map((i) => (
              <Link
                key={i.id}
                to="/app/issues/$id"
                params={{ id: i.id }}
                className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-3"
              >
                <span className="min-w-0 text-[13px] font-semibold">{i.title}</span>
                <StatusPill status={i.severity} />
              </Link>
            ))
          ) : (
            <p className="py-2 text-[13px] text-muted-foreground">No open issues for this battery.</p>
          )}
        </Section>

        <Section title="Firmware" icon={Cpu}>
          <div className="divide-y divide-border">
            <KeyValue label="Application firmware" value={b.firmware} />
            <KeyValue label="BMS firmware" value={b.bmsFirmware} />
            <KeyValue label="Hardware revision" value={b.hardware} />
            <KeyValue label="Update status" value="Up to date" />
          </div>
        </Section>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button className="rounded-2xl border border-border bg-card py-3.5 text-[13px] font-bold shadow-card">
            Report issue
          </button>
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[13px] font-bold text-primary-foreground shadow-card">
            <Thermometer className="size-4" /> Refresh data
          </button>
        </div>
      </div>
    </div>
  );
}
