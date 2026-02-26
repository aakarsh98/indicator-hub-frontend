import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Star,
  Users,
  Clock,
  ChevronRight,
  Shield,
  Zap,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import EquityCurveChart from "@/components/EquityCurveChart";
import { indicators, reviews } from "@/lib/mockData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndicatorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const indicator = indicators.find((i) => i.slug === slug);

  if (!indicator) {
    notFound();
  }

  const related = indicators.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <div style={{ backgroundColor: "#09090B", minHeight: "100vh" }}>
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: "#71717A" }}>
          <Link href="/marketplace" className="hover:text-white transition-colors">
            Marketplace
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>{indicator.category}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{indicator.name}</span>
        </nav>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== LEFT COLUMN (2/3) ===== */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Hero */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {indicator.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback
                      style={{ backgroundColor: "#10B981", color: "white" }}
                    >
                      {indicator.creator[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    href="#"
                    className="text-sm font-medium hover:text-white transition-colors"
                    style={{ color: "#D4D4D8" }}
                  >
                    {indicator.creator}
                  </Link>
                  {indicator.creatorVerified && (
                    <CheckCircle
                      className="h-4 w-4"
                      style={{ color: "#3B82F6" }}
                    />
                  )}
                </div>
                <span style={{ color: "#3F3F46" }}>•</span>
                <Badge
                  style={{
                    backgroundColor: "#27272A",
                    color: "#A1A1AA",
                    border: "1px solid #3F3F46",
                  }}
                >
                  {indicator.category}
                </Badge>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${s <= Math.round(indicator.rating) ? "fill-current" : "stroke-current fill-none"}`}
                        style={{ color: "#EAB308" }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {indicator.rating}
                  </span>
                  <span className="text-sm" style={{ color: "#71717A" }}>
                    ({indicator.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: "#A1A1AA" }}>
                  <Users className="h-4 w-4" />
                  {indicator.subscribers.toLocaleString()} subscribers
                </div>
                <div className="flex items-center gap-1.5 text-sm" style={{ color: "#A1A1AA" }}>
                  <Clock className="h-4 w-4" />
                  Updated {indicator.updatedDaysAgo} day{indicator.updatedDaysAgo !== 1 ? "s" : ""} ago
                </div>
              </div>

              <p className="text-sm leading-relaxed mt-5" style={{ color: "#A1A1AA" }}>
                {indicator.description}. Includes real-time alerts and multi-timeframe analysis.
                Built for serious traders who demand precision and reliability.
              </p>
            </div>

            {/* Equity Curve Chart */}
            <div
              className="rounded-xl p-6 border"
              style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Equity Curve — Last 12 Months
                </h2>
                <Tabs defaultValue="1Y">
                  <TabsList style={{ backgroundColor: "#09090B" }}>
                    {["1M", "3M", "6M", "1Y", "ALL"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <EquityCurveChart />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Win Rate",
                  value: `${indicator.winRate}%`,
                  color: "#10B981",
                },
                {
                  label: "Avg Profit",
                  value: `+${indicator.avgProfit}%`,
                  color: "#10B981",
                },
                {
                  label: "Max Drawdown",
                  value: `${indicator.maxDrawdown}%`,
                  color: "#EF4444",
                },
                {
                  label: "Sharpe Ratio",
                  value: indicator.sharpeRatio.toFixed(2),
                  color: "white",
                },
                {
                  label: "Total Trades",
                  value: indicator.totalTrades.toLocaleString(),
                  color: "white",
                },
                {
                  label: "Profit Factor",
                  value: indicator.profitFactor.toFixed(2),
                  color: "white",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 border"
                  style={{
                    backgroundColor: "rgba(24,24,27,0.5)",
                    borderColor: "#27272A",
                  }}
                >
                  <div
                    className="text-xs uppercase tracking-wide mb-1"
                    style={{ color: "#71717A" }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* About Section */}
            <div
              className="rounded-xl p-6 border"
              style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
            >
              <h2 className="text-lg font-semibold text-white mb-5">
                About This Indicator
              </h2>
              <div className="flex flex-col gap-5 text-sm" style={{ color: "#A1A1AA" }}>
                <div>
                  <h3 className="font-semibold text-white mb-3">Features</h3>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Real-time institutional order block detection",
                      "Breaker blocks and mitigation zone identification",
                      "Multi-timeframe confluence analysis",
                      "Customizable alert conditions (push, email, SMS)",
                      "Premium/discount zone mapping",
                      "FVG (Fair Value Gap) detection",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle
                          className="h-4 w-4 mt-0.5 flex-shrink-0"
                          style={{ color: "#10B981" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator style={{ backgroundColor: "#27272A" }} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Supported Timeframes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["15m", "1H", "4H", "Daily", "Weekly"].map((tf) => (
                        <span
                          key={tf}
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{ backgroundColor: "#27272A", color: "#A1A1AA" }}
                        >
                          {tf}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      Compatible Markets
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Forex", "Crypto", "Indices", "Stocks"].map((m) => (
                        <span
                          key={m}
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{ backgroundColor: "#27272A", color: "#A1A1AA" }}
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator style={{ backgroundColor: "#27272A" }} />

                <div>
                  <h3 className="font-semibold text-white mb-3">
                    What&apos;s Included
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {[
                      { icon: <Zap className="h-4 w-4" />, text: "TradingView indicator access (instant)" },
                      { icon: <Shield className="h-4 w-4" />, text: "All alert conditions preconfigured" },
                      { icon: <BookOpen className="h-4 w-4" />, text: "Setup guide PDF + video walkthrough" },
                      { icon: <MessageSquare className="h-4 w-4" />, text: "Creator support Discord channel" },
                    ].map((item) => (
                      <li key={item.text} className="flex items-center gap-2">
                        <span style={{ color: "#10B981" }}>{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Reviews</h2>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">
                    {indicator.rating}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5 fill-current"
                          style={{ color: "#EAB308" }}
                        />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: "#71717A" }}>
                      out of 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating Bars */}
              <div className="flex flex-col gap-2 mb-8">
                {[
                  { stars: 5, pct: 78 },
                  { stars: 4, pct: 14 },
                  { stars: 3, pct: 6 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 1 },
                ].map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-6 text-right" style={{ color: "#71717A" }}>
                      {stars}
                    </span>
                    <Star
                      className="h-3 w-3 fill-current flex-shrink-0"
                      style={{ color: "#EAB308" }}
                    />
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: "#27272A" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: "#10B981",
                        }}
                      />
                    </div>
                    <span className="w-8 text-right" style={{ color: "#71717A" }}>
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Review Cards */}
              <div className="flex flex-col gap-5">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl p-5 border"
                    style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback
                            style={{ backgroundColor: "#27272A", color: "#A1A1AA" }}
                          >
                            {review.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-white text-sm">
                            {review.name}
                          </div>
                          <div className="text-xs" style={{ color: "#71717A" }}>
                            {review.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5 fill-current"
                            style={{ color: "#EAB308" }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full mt-5"
                style={{ borderColor: "#27272A", color: "#A1A1AA", backgroundColor: "transparent" }}
              >
                Write a Review
              </Button>
            </div>

            {/* Related */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-5">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((ind) => (
                  <Link
                    key={ind.id}
                    href={`/indicator/${ind.slug}`}
                    className="rounded-xl border p-4 flex flex-col gap-3 transition-all hover:border-emerald-500/40"
                    style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
                  >
                    <div>
                      <div className="font-semibold text-white text-sm mb-1">
                        {ind.name}
                      </div>
                      <div className="text-xs" style={{ color: "#71717A" }}>
                        by {ind.creator}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: "#10B981" }}>{ind.winRate}% WR</span>
                      <span className="font-bold" style={{ color: "#10B981" }}>
                        ${ind.price}/mo
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ===== RIGHT SIDEBAR (1/3) ===== */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-20 lg:self-start">
            {/* Price / Subscribe Card */}
            <div
              className="rounded-xl border p-6"
              style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
            >
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold text-white">
                  ${indicator.price}
                </span>
                <span className="text-base" style={{ color: "#71717A" }}>
                  /month
                </span>
              </div>

              <Button
                className="w-full h-12 text-base font-semibold mb-3"
                style={{ backgroundColor: "#10B981", color: "white" }}
              >
                Subscribe Now
              </Button>

              <p className="text-xs text-center mb-5" style={{ color: "#71717A" }}>
                Cancel anytime • Instant access
              </p>

              <Separator className="mb-5" style={{ backgroundColor: "#27272A" }} />

              <ul className="flex flex-col gap-3">
                {[
                  "Instant TradingView access",
                  "All alert conditions",
                  "Setup guide included",
                  "Creator support channel",
                  "Free updates forever",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm" style={{ color: "#A1A1AA" }}>
                    <CheckCircle
                      className="h-4 w-4 flex-shrink-0"
                      style={{ color: "#10B981" }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Creator Card */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback
                    className="text-lg font-bold"
                    style={{ backgroundColor: "#10B981", color: "white" }}
                  >
                    {indicator.creator[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white text-sm">
                      {indicator.creator}
                    </span>
                    {indicator.creatorVerified && (
                      <CheckCircle
                        className="h-3.5 w-3.5"
                        style={{ color: "#3B82F6" }}
                      />
                    )}
                  </div>
                  <span className="text-xs" style={{ color: "#71717A" }}>
                    Verified Creator
                  </span>
                </div>
              </div>

              <p className="text-xs leading-relaxed mb-4" style={{ color: "#A1A1AA" }}>
                Full-time trader & indicator developer. 8+ years of experience in
                forex, crypto, and indices markets.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ backgroundColor: "#09090B" }}
                >
                  <div className="text-lg font-bold text-white">12</div>
                  <div className="text-xs" style={{ color: "#71717A" }}>
                    Indicators
                  </div>
                </div>
                <div
                  className="rounded-lg p-3 text-center"
                  style={{ backgroundColor: "#09090B" }}
                >
                  <div className="text-lg font-bold text-white">3.4k</div>
                  <div className="text-xs" style={{ color: "#71717A" }}>
                    Subscribers
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-sm"
                style={{
                  borderColor: "#3F3F46",
                  color: "#A1A1AA",
                  backgroundColor: "transparent",
                }}
              >
                View Profile
              </Button>
            </div>

            {/* Trust Badges */}
            <div
              className="rounded-xl border p-5"
              style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
            >
              <div className="flex flex-col gap-3">
                {[
                  { icon: <Shield className="h-4 w-4" />, text: "Verified performance data" },
                  { icon: <Zap className="h-4 w-4" />, text: "Instant access after payment" },
                  { icon: <MessageSquare className="h-4 w-4" />, text: "Dedicated support channel" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-xs" style={{ color: "#A1A1AA" }}>
                    <span style={{ color: "#10B981" }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
