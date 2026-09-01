import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "success" | "danger" | "warning" | "info" | "muted";

export const statusTone: Record<string, Tone> = {
  online: "success",
  active: "success",
  resolved: "success",
  charging: "info",
  offline: "danger",
  critical: "danger",
  high: "warning",
  maintenance: "warning",
  investigating: "warning",
  medium: "info",
  low: "muted",
  open: "danger",
};

const toneClasses: Record<Tone, string> = {
  success: "bg-success-soft text-success",
  danger: "bg-danger-soft text-danger",
  warning: "bg-warning-soft text-warning-foreground",
  info: "bg-info-soft text-info",
  muted: "bg-muted text-muted-foreground",
};

const dotClasses: Record<Tone, string> = {
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  muted: "bg-muted-foreground",
};

export function StatusPill({
  status,
  className,
  pulse,
}: {
  status: string;
  className?: string;
  pulse?: boolean;
}) {
  const tone = statusTone[status] ?? "muted";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize",
        toneClasses[tone],
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotClasses[tone], pulse && "animate-pulse")} />
      {status}
    </span>
  );
}

export function Card({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-card",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3 px-1">
      <h2 className="text-[15px] font-bold tracking-tight">{title}</h2>
      {action}
    </div>
  );
}

export function Metric({
  label,
  value,
  sub,
  className,
}: {
  label: string;
  value: ReactNode;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl bg-surface px-3 py-2.5", className)}>
      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      <p className="tabular mt-0.5 text-base font-bold leading-tight">{value}</p>
      {sub ? <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

export function KeyValue({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <span className="tabular text-right text-[13px] font-semibold">{value}</span>
    </div>
  );
}

export function DetailHeader({
  title,
  subtitle,
  right,
  back,
}: {
  title: string;
  subtitle?: ReactNode;
  right?: ReactNode;
  back: string;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <Link
          to={back}
          aria-label="Go back"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-foreground transition-colors active:bg-muted"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-bold leading-tight">{title}</h1>
          {subtitle ? (
            <div className="truncate text-[12px] text-muted-foreground">{subtitle}</div>
          ) : null}
        </div>
        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
}

export function Chips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold capitalize transition-colors",
            value === o
              ? "border-ink bg-ink text-ink-foreground"
              : "border-border bg-card text-muted-foreground active:bg-muted",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-[13px] text-muted-foreground">{hint}</p>
    </div>
  );
}

export function SocRing({ value, size = 132 }: { value: number; size?: number }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const tone = value < 20 ? "var(--danger)" : value < 40 ? "var(--warning)" : "var(--success)";
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={10} stroke="var(--muted)" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={10}
          stroke={tone}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={c - (c * value) / 100}
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="tabular text-3xl font-extrabold leading-none">{value}%</p>
        <p className="mt-1 text-[11px] font-medium text-muted-foreground">Battery SOC</p>
      </div>
    </div>
  );
}

export function Bar({ value, tone = "success" }: { value: number; tone?: Tone }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full", dotClasses[tone])} style={{ width: `${value}%` }} />
    </div>
  );
}
