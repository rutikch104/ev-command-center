export type BatteryStatus = "online" | "offline" | "critical" | "charging";
export type VehicleStatus = "active" | "offline" | "maintenance";
export type Severity = "critical" | "high" | "medium" | "low";
export type IssueStatus = "open" | "investigating" | "resolved";

export interface Battery {
  id: string;
  bms: string;
  status: BatteryStatus;
  soc: number;
  soh: number;
  voltage: number;
  current: number;
  temperature: number;
  cycles: number;
  lastSeenMin: number;
  vehicle: string | null;
  location: string;
  city: string;
  imei: string;
  iccid: string;
  signal: number;
  firmware: string;
  bmsFirmware: string;
  hardware: string;
  chemistry: string;
  capacity: string;
  commissioned: string;
}

export interface Vehicle {
  id: string;
  number: string;
  status: VehicleStatus;
  vcu: string;
  vin: string;
  battery: string | null;
  model: string;
  odometer: number;
  speed: number;
  lastSeenMin: number;
  city: string;
  location: string;
  driver: string;
}

export interface Swap {
  id: string;
  time: string;
  day: "Today" | "Yesterday" | string;
  battery: string;
  action: "installed" | "removed";
  vehicle: string;
  location: string;
  operator: string;
}

export interface Issue {
  id: string;
  title: string;
  asset: string;
  assetType: "battery" | "vehicle";
  severity: Severity;
  status: IssueStatus;
  createdAt: string;
  ageMin: number;
  assignee: string;
  detail: string;
  notes: { at: string; by: string; text: string }[];
}

const cities = ["Mumbai", "Pune", "Nashik", "Thane", "Navi Mumbai", "Nagpur"];
const areas = ["Andheri East", "Hinjewadi", "Powai", "Wakad", "Vashi", "Bandra Kurla"];
const operators = ["Rutik Pawar", "Sana Kulkarni", "Imran Shaikh", "Neha Desai", "Vikas Rane"];

function rnd(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const statuses: BatteryStatus[] = ["online", "online", "online", "charging", "offline", "critical"];

export const batteries: Battery[] = Array.from({ length: 48 }, (_, i) => {
  const r = rnd(i + 1);
  const status = statuses[Math.floor(rnd(i + 7) * statuses.length)];
  const bms = `BMS-${10000 + i * 431 + Math.floor(r * 90)}`;
  const online = status !== "offline";
  return {
    id: `BAT-${2400 + i}`,
    bms,
    status,
    soc: status === "critical" ? 8 + Math.floor(r * 14) : 30 + Math.floor(r * 68),
    soh: 88 + Math.floor(rnd(i + 3) * 11),
    voltage: +(48 + rnd(i + 11) * 6).toFixed(1),
    current: +(rnd(i + 13) * 24 - 4).toFixed(1),
    temperature: status === "critical" ? 52 + Math.floor(r * 9) : 26 + Math.floor(r * 12),
    cycles: 120 + Math.floor(r * 900),
    lastSeenMin: online ? Math.floor(rnd(i + 5) * 12) : 30 + Math.floor(rnd(i + 5) * 600),
    vehicle: r > 0.16 ? `MH12${String.fromCharCode(65 + (i % 20))}B${1000 + i * 37}` : null,
    location: areas[i % areas.length],
    city: cities[i % cities.length],
    imei: `8654${210000000 + i * 13711}`,
    iccid: `8991000${900000000 + i * 7331}`,
    signal: online ? 2 + Math.floor(rnd(i + 17) * 3) : 0,
    firmware: `v3.${4 + (i % 3)}.${i % 7}`,
    bmsFirmware: `bms-2.${i % 5}.1`,
    hardware: `HW-Rev ${["C", "D", "E"][i % 3]}`,
    chemistry: "LFP",
    capacity: "3.5 kWh",
    commissioned: `${10 + (i % 18)} Mar 2025`,
  };
});

export const vehicles: Vehicle[] = Array.from({ length: 32 }, (_, i) => {
  const r = rnd(i + 101);
  const linked = batteries[i % batteries.length];
  const status: VehicleStatus = r > 0.78 ? "offline" : r > 0.7 ? "maintenance" : "active";
  return {
    id: `VEH-${8100 + i}`,
    number: linked.vehicle ?? `MH14CD${2000 + i * 13}`,
    status,
    vcu: `VCU-${98000 + i * 211}`,
    vin: `MD2A11CZ${400000 + i * 977}`,
    battery: linked.bms,
    model: ["Cargo L3", "Passenger L5", "Cargo L5", "Scooter L2"][i % 4],
    odometer: 4200 + Math.floor(r * 38000),
    speed: status === "active" ? Math.floor(r * 42) : 0,
    lastSeenMin: status === "active" ? Math.floor(r * 8) : 40 + Math.floor(r * 400),
    city: cities[i % cities.length],
    location: areas[(i + 2) % areas.length],
    driver: operators[i % operators.length],
  };
});

export const swaps: Swap[] = [
  { id: "SW-9001", day: "Today", time: "10:42 AM", battery: "BMS-10482", action: "installed", vehicle: "MH12AB1234", location: "Andheri East Hub", operator: "Rutik Pawar" },
  { id: "SW-9002", day: "Today", time: "10:38 AM", battery: "BMS-28491", action: "removed", vehicle: "MH12AB1234", location: "Andheri East Hub", operator: "Rutik Pawar" },
  { id: "SW-9003", day: "Today", time: "08:12 AM", battery: "BMS-19233", action: "installed", vehicle: "MH14CD2013", location: "Powai Swap Point", operator: "Sana Kulkarni" },
  { id: "SW-9004", day: "Yesterday", time: "06:31 PM", battery: "BMS-10482", action: "removed", vehicle: "MH12AB8932", location: "Vashi Depot", operator: "Imran Shaikh" },
  { id: "SW-9005", day: "Yesterday", time: "02:04 PM", battery: "BMS-33120", action: "installed", vehicle: "MH12AB8932", location: "Vashi Depot", operator: "Neha Desai" },
  { id: "SW-9006", day: "18 Aug", time: "11:20 AM", battery: "BMS-44012", action: "installed", vehicle: "MH14CD2039", location: "Hinjewadi Hub", operator: "Vikas Rane" },
];

export const issues: Issue[] = [
  {
    id: "ISS-4410",
    title: "Battery not communicating",
    asset: "BMS-10482",
    assetType: "battery",
    severity: "critical",
    status: "investigating",
    createdAt: "Today, 10:42 AM",
    ageMin: 42,
    assignee: "Rutik Pawar",
    detail: "No telemetry received from the battery for over 40 minutes. Last known SOC 62%.",
    notes: [
      { at: "10:42 AM", by: "System", text: "Issue auto-created — no data packets received." },
      { at: "10:55 AM", by: "Rutik Pawar", text: "Called rider, vehicle parked at Andheri hub." },
      { at: "11:10 AM", by: "Rutik Pawar", text: "Field team dispatched to check SIM connectivity." },
    ],
  },
  {
    id: "ISS-4411",
    title: "High cell temperature detected",
    asset: "BMS-98172",
    assetType: "battery",
    severity: "critical",
    status: "open",
    createdAt: "Today, 09:18 AM",
    ageMin: 128,
    assignee: "Unassigned",
    detail: "Pack temperature crossed 58°C during discharge. Charging blocked automatically.",
    notes: [{ at: "09:18 AM", by: "System", text: "Temperature threshold breached (58°C)." }],
  },
  {
    id: "ISS-4412",
    title: "Rapid SOC drop while idle",
    asset: "BMS-28491",
    assetType: "battery",
    severity: "high",
    status: "investigating",
    createdAt: "Today, 07:52 AM",
    ageMin: 210,
    assignee: "Sana Kulkarni",
    detail: "SOC dropped 18% in 40 minutes with vehicle stationary.",
    notes: [{ at: "08:20 AM", by: "Sana Kulkarni", text: "Checking for parasitic load on the VCU harness." }],
  },
  {
    id: "ISS-4413",
    title: "VCU offline after swap",
    asset: "MH12AB1234",
    assetType: "vehicle",
    severity: "high",
    status: "open",
    createdAt: "Yesterday, 06:40 PM",
    ageMin: 1080,
    assignee: "Imran Shaikh",
    detail: "Vehicle controller stopped reporting immediately after battery swap.",
    notes: [{ at: "06:45 PM", by: "System", text: "Vehicle marked offline." }],
  },
  {
    id: "ISS-4414",
    title: "SIM data balance exhausted",
    asset: "BMS-33120",
    assetType: "battery",
    severity: "medium",
    status: "open",
    createdAt: "Yesterday, 03:12 PM",
    ageMin: 1290,
    assignee: "Neha Desai",
    detail: "Connectivity intermittent, SIM plan needs recharge.",
    notes: [],
  },
  {
    id: "ISS-4415",
    title: "Firmware update pending",
    asset: "BMS-44012",
    assetType: "battery",
    severity: "low",
    status: "resolved",
    createdAt: "18 Aug, 11:02 AM",
    ageMin: 5000,
    assignee: "Vikas Rane",
    detail: "Battery running an older firmware build than fleet baseline.",
    notes: [{ at: "11:40 AM", by: "Vikas Rane", text: "OTA pushed and verified. Closing issue." }],
  },
];

export const fleetStats = {
  total: 12540,
  online: 10842,
  offline: 1698,
  critical: 126,
  charging: 2314,
  vehicles: 9310,
  openIssues: issues.filter((i) => i.status !== "resolved").length,
};

export function series(seed: number, base: number, spread: number, points = 24) {
  return Array.from({ length: points }, (_, i) => ({
    t: `${String((i + 24 - points) % 24).padStart(2, "0")}:00`,
    v: +(base + Math.sin(i / 2.2 + seed) * spread + (rnd(seed + i) - 0.5) * spread * 0.6).toFixed(1),
  }));
}

export function findBattery(key: string) {
  return batteries.find((b) => b.bms === key || b.id === key);
}
export function findVehicle(key: string) {
  return vehicles.find((v) => v.number === key || v.id === key);
}
export function ago(min: number) {
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} hr ago`;
  return `${Math.floor(h / 24)} d ago`;
}
