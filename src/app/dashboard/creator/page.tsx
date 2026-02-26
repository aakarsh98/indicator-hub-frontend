"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  LineChart,
  Users,
  DollarSign,
  Monitor,
  Wallet,
  Settings,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard/creator", active: true },
  { icon: LineChart, label: "My Indicators", href: "#" },
  { icon: Users, label: "Subscribers", href: "#" },
  { icon: DollarSign, label: "Revenue", href: "#" },
  { icon: Monitor, label: "TradingView", href: "#" },
  { icon: Wallet, label: "Payouts", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

const REVENUE_DATA = [
  { month: "Mar", revenue: 4200 },
  { month: "Apr", revenue: 5800 },
  { month: "May", revenue: 5200 },
  { month: "Jun", revenue: 7100 },
  { month: "Jul", revenue: 6400 },
  { month: "Aug", revenue: 8900 },
  { month: "Sep", revenue: 8200 },
  { month: "Oct", revenue: 10500 },
  { month: "Nov", revenue: 9800 },
  { month: "Dec", revenue: 11200 },
  { month: "Jan", revenue: 11800 },
  { month: "Feb", revenue: 12847 },
];

const MY_INDICATORS = [
  { name: "SMC Order Blocks Pro", status: "Active", subscribers: 1247, revenue: "$3,619", winRate: "72%", rating: "4.8" },
  { name: "Volume Profile Deluxe", status: "Active", subscribers: 890, revenue: "$1,691", winRate: "68%", rating: "4.6" },
  { name: "Liquidity Sweep Detector", status: "Active", subscribers: 640, revenue: "$960", winRate: "65%", rating: "4.5" },
  { name: "Multi-TF Momentum", status: "Under Review", subscribers: 0, revenue: "$0", winRate: "70%", rating: "—" },
  { name: "AI Swing Signals", status: "Draft", subscribers: 0, revenue: "$0", winRate: "—", rating: "—" },
];

const RECENT_SUBSCRIBERS = [
  { name: "Marcus R.", indicator: "SMC Order Blocks Pro", date: "2h ago", amount: "$29" },
  { name: "Priya S.", indicator: "Volume Profile Deluxe", date: "4h ago", amount: "$19" },
  { name: "James K.", indicator: "SMC Order Blocks Pro", date: "6h ago", amount: "$29" },
  { name: "Tom W.", indicator: "Liquidity Sweep Detector", date: "8h ago", amount: "$15" },
  { name: "Anna L.", indicator: "SMC Order Blocks Pro", date: "12h ago", amount: "$29" },
];

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  Active: { bg: "rgba(16,185,129,0.1)", text: "#10B981" },
  "Under Review": { bg: "rgba(234,179,8,0.1)", text: "#EAB308" },
  Draft: { bg: "rgba(113,113,122,0.2)", text: "#71717A" },
};

export default function CreatorDashboardPage() {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#09090B" }}>
      {/* Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 border-r sticky top-0 h-screen"
        style={{ backgroundColor: "#050507", borderColor: "#18181B" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b" style={{ borderColor: "#18181B" }}>
          <TrendingUp className="h-5 w-5" style={{ color: "#10B981" }} />
          <span className="font-bold text-white">IndicatorHub</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: item.active ? "rgba(16,185,129,0.1)" : "transparent",
                color: item.active ? "#10B981" : "#A1A1AA",
              }}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t" style={{ borderColor: "#18181B" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: "#10B981" }}
            >
              A
            </div>
            <div>
              <div className="text-sm font-medium text-white">Alex Chen</div>
              <Badge className="text-xs px-1.5 py-0" style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#3B82F6", border: "none" }}>
                Creator
              </Badge>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs w-full px-2 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors" style={{ color: "#71717A" }}>
            <LogOut className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, Alex 👋</h1>
            <p className="text-sm mt-0.5" style={{ color: "#71717A" }}>Last updated 2 min ago</p>
          </div>
          <Button
            className="flex items-center gap-2 font-semibold"
            style={{ backgroundColor: "#10B981", color: "white" }}
          >
            <Plus className="h-4 w-4" />
            Add New Indicator
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Revenue", value: "$12,847", change: "+12.5% from last month", positive: true, icon: DollarSign },
            { label: "Active Subscribers", value: "1,247", change: "+48 this week", positive: true, icon: Users },
            { label: "Total Indicators", value: "12", change: "3 pending review", positive: null, icon: LineChart },
            { label: "Avg Rating", value: "4.8 ★", change: "124 reviews", positive: null, icon: TrendingUp },
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
                style={{ color: stat.positive === true ? "#10B981" : stat.positive === false ? "#EF4444" : "#71717A" }}
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
            <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
            <div className="flex gap-1">
              {["7D", "1M", "3M", "6M", "1Y"].map((p) => (
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
            <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis dataKey="month" tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: "#27272A", border: "1px solid #3F3F46", borderRadius: "8px", color: "white" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={((value: any) => [`$${Number(value ?? 0).toLocaleString()}`, "Revenue"]) as any}
              />
              <Bar dataKey="revenue" fill="rgba(16,185,129,0.7)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* My Indicators Table */}
          <div className="lg:col-span-2 rounded-xl border" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
              <h2 className="text-base font-semibold text-white">My Indicators</h2>
              <Link href="#" className="text-xs" style={{ color: "#10B981" }}>View All →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #27272A" }}>
                    {["Name", "Status", "Subs", "Revenue", "Win Rate", "Rating", ""].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: "#71717A" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MY_INDICATORS.map((ind, i) => (
                    <tr
                      key={ind.name}
                      className="transition-colors hover:bg-zinc-800/50"
                      style={{ borderBottom: i < MY_INDICATORS.length - 1 ? "1px solid #27272A" : "none" }}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">{ind.name}</td>
                      <td className="px-4 py-3">
                        <Badge
                          className="text-xs font-medium border-none"
                          style={{ backgroundColor: STATUS_STYLES[ind.status].bg, color: STATUS_STYLES[ind.status].text }}
                        >
                          {ind.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#A1A1AA" }}>{ind.subscribers.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#A1A1AA" }}>{ind.revenue}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: ind.winRate !== "—" ? "#10B981" : "#71717A" }}>{ind.winRate}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: "#A1A1AA" }}>{ind.rating}</td>
                      <td className="px-4 py-3">
                        <button style={{ color: "#71717A" }}>
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Subscribers */}
          <div className="rounded-xl border" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
              <h2 className="text-base font-semibold text-white">Recent Subscribers</h2>
            </div>
            <div className="flex flex-col">
              {RECENT_SUBSCRIBERS.map((sub, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-colors"
                  style={{ borderBottom: i < RECENT_SUBSCRIBERS.length - 1 ? "1px solid #27272A" : "none" }}
                >
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: "#27272A" }}
                  >
                    {sub.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{sub.name}</div>
                    <div className="text-xs truncate" style={{ color: "#71717A" }}>{sub.indicator}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium" style={{ color: "#10B981" }}>{sub.amount}</div>
                    <div className="text-xs" style={{ color: "#71717A" }}>{sub.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Plus, label: "Add Indicator", desc: "List a new indicator on the marketplace" },
            { icon: Monitor, label: "Manage TradingView", desc: "Update session IDs and access" },
            { icon: Wallet, label: "Request Payout", desc: "Available: $3,240" },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-4 p-5 rounded-xl border text-left transition-all hover:border-emerald-500/50"
              style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(16,185,129,0.1)" }}
              >
                <action.icon className="h-5 w-5" style={{ color: "#10B981" }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{action.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#71717A" }}>{action.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
