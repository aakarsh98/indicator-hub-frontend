"use client";

import Link from "next/link";
import {
  LineChart,
  CreditCard,
  Receipt,
  Heart,
  Settings,
  TrendingUp,
  LogOut,
  ExternalLink,
  MoreHorizontal,
  Download,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { icon: LineChart, label: "My Indicators", href: "/dashboard/subscriber", active: true },
  { icon: CreditCard, label: "Subscriptions", href: "#" },
  { icon: Receipt, label: "Billing", href: "#" },
  { icon: Heart, label: "Favorites", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

const SUBSCRIPTIONS = [
  {
    name: "SMC Order Blocks Pro",
    creator: "Alex Chen",
    status: "Active",
    winRate: "72%",
    since: "Jan 2026",
    price: "₹499/mo",
  },
  {
    name: "AI Trend Scanner v3",
    creator: "QuantEdge",
    status: "Active",
    winRate: "78%",
    since: "Dec 2025",
    price: "₹999/mo",
  },
  {
    name: "Volume Profile Deluxe",
    creator: "TradeLab",
    status: "Active",
    winRate: "68%",
    since: "Nov 2025",
    price: "₹349/mo",
  },
  {
    name: "Liquidity Sweep Detector",
    creator: "MarketOwl",
    status: "Pending Setup",
    winRate: "65%",
    since: "Feb 2026",
    price: "₹249/mo",
  },
  {
    name: "Multi-TF Momentum",
    creator: "SwingKing",
    status: "Expired",
    winRate: "70%",
    since: "Oct 2025",
    price: "₹449/mo",
  },
];

const BILLING_HISTORY = [
  { date: "Feb 1, 2026", indicator: "SMC Order Blocks Pro", amount: "₹29.00", status: "Paid" },
  { date: "Feb 1, 2026", indicator: "AI Trend Scanner v3", amount: "₹49.00", status: "Paid" },
  { date: "Feb 1, 2026", indicator: "Volume Profile Deluxe", amount: "₹19.00", status: "Paid" },
  { date: "Feb 1, 2026", indicator: "Liquidity Sweep Detector", amount: "₹15.00", status: "Paid" },
  { date: "Jan 1, 2026", indicator: "Multi-TF Momentum", amount: "₹24.00", status: "Paid" },
  { date: "Jan 1, 2026", indicator: "Volume Profile Deluxe", amount: "₹19.00", status: "Paid" },
];

const FAVORITES = [
  { name: "Fibonacci Zones Pro", creator: "FibMaster", price: "₹22/mo", rating: "4.7" },
  { name: "HTF Supply & Demand", creator: "SDTrader", price: "₹27/mo", rating: "4.8" },
  { name: "VWAP Bands Elite", creator: "QuantEdge", price: "₹349/mo", rating: "4.6" },
  { name: "EMA Ribbon Pro", creator: "TrendKing", price: "₹12/mo", rating: "4.5" },
];

const STATUS_CONFIG: Record<string, { dot: string; text: string; badge: string }> = {
  Active: { dot: "#10B981", text: "#10B981", badge: "rgba(16,185,129,0.1)" },
  "Pending Setup": { dot: "#EAB308", text: "#EAB308", badge: "rgba(234,179,8,0.1)" },
  Expired: { dot: "#EF4444", text: "#EF4444", badge: "rgba(239,68,68,0.1)" },
};

const BILLING_STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  Paid: { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  Failed: { color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  Refunded: { color: "#71717A", bg: "rgba(113,113,122,0.2)" },
};

export default function SubscriberDashboardPage() {
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
        </div>

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

        <div className="px-4 py-4 border-t" style={{ borderColor: "#18181B" }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: "#3B82F6" }}
            >
              M
            </div>
            <div>
              <div className="text-sm font-medium text-white">Marcus R.</div>
              <Badge className="text-xs px-1.5 py-0" style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10B981", border: "none" }}>
                Subscriber
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
            <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
            <p className="text-sm mt-0.5" style={{ color: "#71717A" }}>Manage your subscriptions and billing</p>
          </div>
          <Button asChild variant="outline" className="font-semibold" style={{ borderColor: "#3F3F46", color: "#A1A1AA" }}>
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>

        {/* Spending Summary */}
        <div
          className="rounded-xl border p-5 mb-6"
          style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm mb-1" style={{ color: "#71717A" }}>Monthly Spend</div>
              <div className="text-3xl font-bold text-white">₹131<span className="text-lg font-normal" style={{ color: "#71717A" }}>/mo</span></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBSCRIPTIONS.filter(s => s.status === "Active").map(s => (
                <div key={s.name} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: "#27272A", color: "#A1A1AA" }}>
                  <span>{s.name.split(" ")[0]}</span>
                  <span style={{ color: "#10B981" }}>{s.price}</span>
                </div>
              ))}
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: "#71717A" }}>Next billing</div>
              <div className="text-sm font-medium text-white">Mar 1, 2026</div>
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Active Subscriptions (5)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SUBSCRIPTIONS.map((sub) => {
              const sc = STATUS_CONFIG[sub.status];
              return (
                <div
                  key={sub.name}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-white">{sub.name}</div>
                      <div className="text-sm mt-0.5" style={{ color: "#71717A" }}>by {sub.creator}</div>
                    </div>
                    <Badge
                      className="flex items-center gap-1.5 text-xs font-medium border-none"
                      style={{ backgroundColor: sc.badge, color: sc.text }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sc.dot }} />
                      {sub.status}
                    </Badge>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <div>
                      <div className="text-xs" style={{ color: "#71717A" }}>Win Rate</div>
                      <div className="text-sm font-medium" style={{ color: "#10B981" }}>{sub.winRate}</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "#71717A" }}>Subscribed</div>
                      <div className="text-sm font-medium text-white">{sub.since}</div>
                    </div>
                    <div>
                      <div className="text-xs" style={{ color: "#71717A" }}>Price</div>
                      <div className="text-sm font-medium text-white">{sub.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {sub.status === "Expired" ? (
                      <Button size="sm" className="flex-1 text-xs h-8 font-semibold" style={{ backgroundColor: "#10B981", color: "white" }}>
                        Renew
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 text-xs h-8 font-medium flex items-center gap-1.5"
                        style={{ border: "1px solid #3F3F46", color: "#10B981" }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Open in TradingView
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" style={{ color: "#71717A" }}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Billing History */}
        <div className="rounded-xl border mb-6" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
            <h2 className="text-base font-semibold text-white">Billing History</h2>
            <Button size="sm" variant="ghost" className="flex items-center gap-1.5 text-xs" style={{ color: "#71717A" }}>
              <Download className="h-3.5 w-3.5" />
              Download All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid #27272A" }}>
                  {["Date", "Indicator", "Amount", "Status", "Invoice"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: "#71717A" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BILLING_HISTORY.map((bill, i) => {
                  const bsc = BILLING_STATUS_CONFIG[bill.status];
                  return (
                    <tr
                      key={i}
                      className="transition-colors"
                      style={{ borderBottom: i < BILLING_HISTORY.length - 1 ? "1px solid #27272A" : "none" }}
                    >
                      <td className="px-4 py-3 text-sm" style={{ color: "#A1A1AA" }}>{bill.date}</td>
                      <td className="px-4 py-3 text-sm font-medium text-white">{bill.indicator}</td>
                      <td className="px-4 py-3 text-sm font-medium text-white">{bill.amount}</td>
                      <td className="px-4 py-3">
                        <Badge className="text-xs border-none" style={{ backgroundColor: bsc.bg, color: bsc.color }}>
                          {bill.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs hover:underline" style={{ color: "#10B981" }}>
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Saved Favorites */}
        <div className="rounded-xl border" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "#27272A" }}>
            <h2 className="text-base font-semibold text-white">Saved Indicators</h2>
          </div>
          <div className="p-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {FAVORITES.map((fav) => (
                <div
                  key={fav.name}
                  className="rounded-xl border p-4 flex-shrink-0 w-52 relative"
                  style={{ backgroundColor: "#27272A", borderColor: "#3F3F46" }}
                >
                  <button
                    className="absolute top-3 right-3"
                    style={{ color: "#71717A" }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="font-medium text-white text-sm mb-1 pr-6">{fav.name}</div>
                  <div className="text-xs mb-2" style={{ color: "#71717A" }}>by {fav.creator}</div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold" style={{ color: "#10B981" }}>{fav.price}</span>
                    <span className="text-xs" style={{ color: "#EAB308" }}>★ {fav.rating}</span>
                  </div>
                  <Button size="sm" className="w-full h-7 text-xs font-semibold" style={{ backgroundColor: "#10B981", color: "white" }}>
                    Subscribe
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
