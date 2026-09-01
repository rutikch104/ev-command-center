import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Zap, Loader2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EV Ops Control Center — Field Operations Sign In" },
      {
        name: "description",
        content:
          "Sign in to the EV Operations control center: battery health, vehicle telemetry, swaps and field issues in one mobile app.",
      },
      { property: "og:title", content: "EV Ops Control Center" },
      {
        property: "og:description",
        content: "One EV operations control center in your pocket — batteries, vehicles, swaps and issues.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col justify-between bg-background px-6 pb-8 pt-16">
      <div>
        <div className="grid size-14 place-items-center rounded-2xl bg-ink text-ink-foreground shadow-card">
          <Zap className="size-7" />
        </div>
        <h1 className="mt-6 text-[28px] font-extrabold leading-tight tracking-tight">
          EV Operations
          <br />
          Control Center
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Sign in to monitor batteries, vehicles and field issues in real time.
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => navigate({ to: "/app/home" }), 700);
          }}
        >
          <label className="block">
            <span className="text-[12px] font-semibold text-muted-foreground">Email or employee ID</span>
            <input
              type="text"
              defaultValue="rutik.pawar@evops.in"
              className="mt-1.5 h-13 w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-primary"
              placeholder="you@evops.in"
            />
          </label>

          <label className="block">
            <span className="text-[12px] font-semibold text-muted-foreground">Password</span>
            <div className="relative mt-1.5">
              <input
                type={show ? "text" : "password"}
                defaultValue="fieldops2026"
                className="h-13 w-full rounded-2xl border border-border bg-card px-4 py-3.5 pr-12 text-[15px] outline-none transition-colors focus:border-primary"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground active:bg-muted"
              >
                {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-bold text-primary-foreground shadow-card transition-transform active:scale-[0.99] disabled:opacity-80"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : null}
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <button
            type="button"
            className="w-full py-2 text-center text-[13px] font-semibold text-primary"
          >
            Forgot password?
          </button>
        </form>
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        Internal use only · EV Ops v4.2.1 (build 2610)
      </p>
    </div>
  );
}
