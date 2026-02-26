"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  LineChart,
  CheckCircle,
  DollarSign,
  Flag,
  Settings,
  TrendingUp,
  ArrowUpRight,
  Wallet,
  MoreHorizontal,
  Search,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Users, label: "Users", href: "#" },
  { icon: LineChart, label: "Indicators", href: "#" },
  { icon: CheckCircle, label: "Approvals", href: "#", badge: 3 },
  { icon: DollarSign, label: "Revenue", href: "#" },
  { icon: Flag, label: "Reports", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

const REVENUE_DATA = [
  { month: "Mar", gmv: 32000, fees: 4160 },
  { month: "Apr", gmv: 38000, fees: 4940 },
  { month: "May", gmv: 35000, fees: 4550 },
  { month: "Jun", gmv: 42000, fees: 5460 },
  { month: "Jul", gmv: 39000, fees: 5070 },
  { month: "Aug", gmv: 47000, fees: 6110 },
  { month: "Sep", gmv: 44000, fees: 5720 },
  { month: "Oct", gmv: 51000, fees: 6630 },
  { month: "Nov", gmv: 48000, fees: 6240 },
  { month: "Dec", gmv: 55000, fees: 7150 },
  { month: "Jan", gmv: 52000, fees: 6760 },
  { month: "Feb", gmv: 48290, fees: 6280 },
];

const PENDING_APPROVALS = [
  { name: "Fibonacci Zones Pro", creator: "FibMaster", submitted: "Feb 24, 2026", category: "Price Action" },
  { name: "HTF Supply & Demand", creator: "SDTrader", submitted: "Feb 23, 2026", category: "Volume" },
  { name: "EMA Crossover Elite", creator: "TrendKing", submitted: "Feb 22, 2026", category: "Trend" },
];

const ACTIVITY_FEED = [
  { icon: "👤", color: "#3B82F6", text: "New user registered: john_trader", time: "2m ago" },
  { icon: "✅", color: "#10B981", text: "Indicator approved: Fibonacci Zones Pro", time: "14m ago" },
  { icon: "💸", color: "#10B981", text: "Payout processed: ₹1,240 to Alex Chen", time: "1h ago" },
  { icon: "🚩", color: "#EF4444", text: "Review flagged: spam report on VolumeX", time: "2h ago" },
  { icon: "❌", color: "#71717A", text: "Subscription cancelled: user_847 → AI Scanner", time: "3h ago" },
  { icon: "👤", color: "#3B82F6", text: "New user registered: priya_trades", time: "4h ago" },
  { icon: "✅", color: "#10B981", text: "Creator verified: MarketOwl Pro", time: "5h ago" },
  { icon: "💸", color: "#10B981", text: "Payout processed: ₹890 to TradeLab", time: "6h ago" },
];

const USERS = [
  { name: "Alex Chen", email: "alex@tradersig.io", role: "Creator", joined: "Sep 2025", subs: "3.4k", revenue: "₹28,490", status: "Active" },
  { name: "Marcus Rivera", email: "marcus@example.com", role: "Subscriber", joined: "Jan 2026", subs: "5", revenue: "₹0", status: "Active" },
  { name: "TradeLab", email: "info@tradelab.io", role: "Creator", joined: "Aug 2025", subs: "1.8k", revenue: "₹12,340", status: "Active" },
  { name: "Priya Singh", email: "priya.s@example.com", role: "Subscriber", joined: "Dec 2025", subs: "3", revenue: "₹0", status: "Active" },
  { name: "QuantEdge", email: "quant@quantedge.io", role: "Creator", joined: "Jul 2025", subs: "4.2k", revenue: "₹38,200", status: "Active" },
  { name: "John Turner", email: "jturner@example.com", role: "Subscriber", joined: "Feb 2026", subs: "1", revenue: "₹0", status: "Active" },
  { name: "VolumeX", email: "admin@volumex.io", role: "Creator", joined: "Oct 2025", subs: "400", revenue: "₹4,100", status: "Suspended" },
  { name: "SwingKing", email: "swing@kingtrader.io", role: "Creator", joined: "Sep 2025", subs: "2.1k", revenue: "₹18,900", status: "Active" },
];

const TOP_CREATORS = [
  { name: "QuantEdge", subs: "4.2k", revenue: "₹38,200", rating: "4.9", rank: 1 },
  { name: "Alex Chen", subs: "3.4k", revenue: "₹28,490", rating: "4.8", rank: 2 },
  { name: "SwingKing", subs: "2.1k", revenue: "₹18,900", rating: "4.7", rank: 3 },
  { name: "TradeLab", subs: "1.8k", revenue: "₹12,340", rating: "4.6", rank: 4 },
  { name: "InstitutionalFX", subs: "1.5k", revenue: "₹10,200", rating: "4.8", rank: 5 },
];

const ROLE_CONFIG: Record<string, { bg: string; color: string }> = {
  Creator: { bg: "rgba(59,130,246,0.1)", color: "#3B82F6" },
  Subscriber: { bg: "rgba(16,185,129,0.1)", color: "#10B981" },
  Admin: { bg: "rgba(234,179,8,0.1)", color: "#EAB308" },
};

const STATUS_CONFIG: Record<string, { bg: string; color: string }> = {
  Active: { bg: "rgba(16,185,129,0.1)", color: "#10B981" },
  Suspended: { bg: "rgba(239,68,68,0.1)", color: "#EF4444" },
};

const RANK_COLORS: Record<number, string> = { 1: "#EAB308", 2: "#A1A1AA", 3: "#CD7F32" };

export default function AdminPage() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#09090B" }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 border-r sticky top-0 h-screen"
        style={{ backgroundColor: "#050507", borderColor: "#18181B" }}
      >
        <div className="flex items-center gap-2 px-6 py-5 border-b" style={{ borderColor: "#18181B" }}>
          <TrendingUp className="h-5 w-5" style={{ color: "#10B981" }} />
          <span className="font-bold text-white">IndicatorHub</span>
          <Badge className="text-xs ml-1 border-none" style={{ backgroundColor: "rgba(239,68,68,0.2)", color: "#EF4444" }}>
            Admin
          </Badge>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all relative"
              style={{
                backgroundColor: item.active ? "rgba(16,185,129,0.1)" : "transparent",
                color: item.active ? "#10B981" : "#A1A1AA",
              }}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {"badge" in item && item.badge && (
                <span
                  className="ml-auto text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold"
                  style={{ backgroundColor: "#EF4444", color: "white" }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t" style={{ borderColor: "#18181B" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: "#EF4444" }}
            >
              A
            </div>
            <div>
              <div className="text-sm font-medium text-white">Admin</div>
              <div className="text-xs" style={{ color: "#71717A" }}>Octave Finance India</div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs w-full px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors" style={{ color: "#71717A" }}>
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
            <p className="text-sm mt-0.5" style={{ color: "#71717A" }}>IndicatorHub Admin Dashboard</p>
          </div>
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Users", value: "4,832", change: "+340 this month", positive: true, icon: Users },
            { label: "Active Indicators", value: "187", change: "12 pending approval", positive: null, icon: LineChart, changeColor: "#EAB308" },
            { label: "Monthly Revenue", value: "₹40,24,000", change: "+18.4% MoM", positive: true, icon: DollarSign },
            { label: "Platform Fees Earned", value: "₹6,280", change: "Avg 13.2% rate", positive: null, icon: Wallet },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-6 border"
              style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: "#71717A" }}>{stat.label}</span>
                <stat.icon className="h-4 w-4" style={{ color: "#71717A" }} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div
                className="text-xs flex items-center gap-1"
                style={{ color: stat.positive === true ? "#10B981" : (stat as { changeColor?: string }).changeColor || "#71717A" }}
              >
                {stat.positive === true && <ArrowUpRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue &amp; Platform Fees</h2>
            <div className="flex gap-1">
              {["1M", "3M", "6M", "1Y", "ALL"].map((p) => (
                <button
                  key={p}
                  className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  style={p === "1Y" ? { backgroundColor: "#10B981", color: "white" } : { color: "#71717A" }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={REVENUE_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
              <XAxis dataKey="month" tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#27272A", border: "1px solid #3F3F46", borderRadius: "8px", color: "white" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={((value: any, name: any) => [`₹${Number(value).toLocaleString()}`, name === "gmv" ? "Total GMV" : "Platform Fees"]) as any}
              />
              <Legend formatter={(value) => value === "gmv" ? "Total GMV" : "Platform Fees"} wrapperStyle={{ color: "#71717A", fontSize: 12 }} />
              <Bar dataKey="gmv" fill="rgba(63,63,70,0.8)" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="fees" stroke="#10B981" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Two-col: Approvals + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pending Approvals */}
          <div className="rounded-xl border" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
              <h2 className="text-base font-semibold text-white">Pending Approvals</h2>
              <Badge className="text-xs border-none" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444" }}>
                3 pending
              </Badge>
            </div>
            <div>
              {PENDING_APPROVALS.map((item, i) => (
                <div
                  key={item.name}
                  className="px-6 py-4"
                  style={{ borderBottom: i < PENDING_APPROVALS.length - 1 ? "1px solid #27272A" : "none" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="text-xs" style={{ color: "#71717A" }}>by {item.creator} · {item.submitted}</div>
                    </div>
                    <Badge className="text-xs border-none" style={{ backgroundColor: "#27272A", color: "#A1A1AA" }}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Button size="sm" className="h-7 text-xs font-semibold" style={{ backgroundColor: "#10B981", color: "white" }}>
                      Approve
                    </Button>
                    <Button size="sm" variant="ghost" className="h-7 text-xs font-medium" style={{ color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }}>
                      Reject
                    </Button>
                    <Link href="#" className="text-xs ml-auto" style={{ color: "#71717A" }}>View Details →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-xl border" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
              <h2 className="text-base font-semibold text-white">Recent Activity</h2>
            </div>
            <div className="flex flex-col">
              {ACTIVITY_FEED.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-6 py-3"
                  style={{ borderBottom: i < ACTIVITY_FEED.length - 1 ? "1px solid #27272A" : "none" }}
                >
                  <div
                    className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-0.5"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white">{item.text}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#52525B" }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border mb-6" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
            <h2 className="text-base font-semibold text-white">User Management</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#71717A" }} />
                <Input
                  placeholder="Search users..."
                  className="pl-9 h-8 text-sm border w-48 text-white placeholder:text-zinc-600"
                  style={{ backgroundColor: "#27272A", borderColor: "#3F3F46" }}
                />
              </div>
              <select
                className="h-8 text-sm rounded-lg px-3 border"
                style={{ backgroundColor: "#27272A", borderColor: "#3F3F46", color: "#A1A1AA" }}
              >
                <option>All Roles</option>
                <option>Subscribers</option>
                <option>Creators</option>
                <option>Admins</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #27272A" }}>
                  {["User", "Role", "Joined", "Subscribers", "Revenue", "Status", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: "#71717A" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {USERS.map((user, i) => {
                  const rc = ROLE_CONFIG[user.role];
                  const sc = STATUS_CONFIG[user.status];
                  return (
                    <tr
                      key={user.email}
                      className="transition-colors hover:bg-zinc-800/30"
                      style={{ borderBottom: i < USERS.length - 1 ? "1px solid #27272A" : "none" }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: "#27272A" }}
                          >
                            {user.name[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-xs" style={{ color: "#71717A" }}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="text-xs border-none" style={{ backgroundColor: rc.bg, color: rc.color }}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#A1A1AA" }}>{user.joined}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#A1A1AA" }}>{user.subs}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#A1A1AA" }}>{user.revenue}</td>
                      <td className="px-4 py-3">
                        <Badge className="text-xs border-none" style={{ backgroundColor: sc.bg, color: sc.color }}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button style={{ color: "#71717A" }}>
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: "#27272A" }}>
            <span className="text-xs" style={{ color: "#71717A" }}>Showing 1–8 of 4,832 users</span>
            <div className="flex gap-1">
              {["←", "1", "2", "3", "...", "604", "→"].map((p) => (
                <button
                  key={p}
                  className="h-7 min-w-[28px] px-2 rounded text-xs font-medium transition-all"
                  style={p === "1" ? { backgroundColor: "#10B981", color: "white" } : { color: "#71717A" }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: Top Creators + Platform Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Creators */}
          <div className="rounded-xl border" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
              <h2 className="text-base font-semibold text-white">Top Creators</h2>
            </div>
            <div>
              {TOP_CREATORS.map((creator, i) => (
                <div
                  key={creator.name}
                  className="flex items-center gap-4 px-6 py-4"
                  style={{ borderBottom: i < TOP_CREATORS.length - 1 ? "1px solid #27272A" : "none" }}
                >
                  <span
                    className="text-sm font-bold w-5 text-center"
                    style={{ color: RANK_COLORS[creator.rank] || "#71717A" }}
                  >
                    #{creator.rank}
                  </span>
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: "#27272A" }}
                  >
                    {creator.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{creator.name}</div>
                    <div className="text-xs" style={{ color: "#71717A" }}>{creator.subs} subscribers</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium" style={{ color: "#10B981" }}>{creator.revenue}</div>
                    <div className="text-xs" style={{ color: "#EAB308" }}>★ {creator.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Health */}
          <div className="rounded-xl border" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
              <h2 className="text-base font-semibold text-white">Platform Health</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { label: "API Uptime", value: "99.97%", color: "#10B981", good: true },
                { label: "Avg Response Time", value: "142ms", color: "#10B981", good: true },
                { label: "Active Sessions", value: "1,247", color: "#A1A1AA", good: null },
                { label: "Failed Payments (mo)", value: "12", color: "#EF4444", good: false },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl p-4 border"
                  style={{ backgroundColor: "#0E0E11", borderColor: "#27272A" }}
                >
                  <div className="text-xs mb-2" style={{ color: "#71717A" }}>{metric.label}</div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#27272A" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: metric.color,
                        width: metric.good === true ? "97%" : metric.good === false ? "12%" : "60%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
