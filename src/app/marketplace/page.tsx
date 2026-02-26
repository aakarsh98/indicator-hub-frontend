"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import IndicatorCard from "@/components/IndicatorCard";
import { indicators as mockIndicators } from "@/lib/mockData";
import { getIndicators, type Indicator } from "@/lib/api";
import { Star, CheckCircle, Users } from "lucide-react";
import SparklineChart from "@/components/SparklineChart";

const CATEGORIES = [
  "All",
  "Trend",
  "Volume",
  "Oscillator",
  "AI/ML",
  "Price Action",
  "Multi-Timeframe",
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
];

// Map API indicator to mock-compatible shape for display
function apiToDisplayIndicator(ind: Indicator) {
  return {
    id: ind.id,
    slug: ind.slug,
    name: ind.name,
    creator: ind.creator,
    creatorVerified: true,
    description: ind.description || "",
    price: ind.price,
    winRate: 70,
    rating: 4.8,
    reviewCount: 50,
    subscribers: 500,
    category: "Price Action",
    sparkline: [10, 14, 12, 18, 16, 22, 20, 26, 24, 30, 28, 35],
    tags: ["TradingView", "Indicator"],
    updatedDaysAgo: 1,
    totalTrades: 500,
    avgProfit: 2.5,
    maxDrawdown: -8,
    sharpeRatio: 2.1,
    profitFactor: 2.3,
  };
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [apiIndicators, setApiIndicators] = useState<ReturnType<typeof apiToDisplayIndicator>[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    getIndicators()
      .then((data) => {
        if (data && data.length > 0) {
          setApiIndicators(data.map(apiToDisplayIndicator));
        } else {
          setUsingMock(true);
        }
      })
      .catch(() => {
        setUsingMock(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const allIndicators = apiIndicators ?? mockIndicators;

  const filtered = allIndicators
    .filter((ind) => {
      const matchSearch =
        !search ||
        ind.name.toLowerCase().includes(search.toLowerCase()) ||
        ind.creator.toLowerCase().includes(search.toLowerCase()) ||
        ind.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
      const matchCat =
        category === "All" || ind.category === category;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      switch (sort) {
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "newest":
          return a.updatedDaysAgo - b.updatedDaysAgo;
        default:
          return (b.subscribers || 0) - (a.subscribers || 0);
      }
    });

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div style={{ backgroundColor: "#09090B", minHeight: "100vh" }}>
      <Navbar />

      {/* =========== SEARCH BAR =========== */}
      <div
        className="border-b px-4 py-8"
        style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-white">Browse Indicators</h1>
            {usingMock && (
              <span className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: "#27272A", color: "#71717A" }}>
                Demo data
              </span>
            )}
          </div>

          {/* Search Input */}
          <div className="relative mb-5">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
              style={{ color: "#71717A" }}
            />
            <Input
              type="text"
              placeholder="Search indicators by name, strategy, or creator..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 pl-12 pr-4 text-base border"
              style={{
                backgroundColor: "#27272A",
                borderColor: "#3F3F46",
                color: "white",
              }}
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
                  style={{
                    backgroundColor:
                      category === cat ? "rgba(16,185,129,0.15)" : "#27272A",
                    borderColor:
                      category === cat ? "#10B981" : "#3F3F46",
                    color:
                      category === cat ? "#10B981" : "#A1A1AA",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="ml-auto">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger
                  className="w-[180px] h-9 border text-sm"
                  style={{
                    backgroundColor: "#27272A",
                    borderColor: "#3F3F46",
                    color: "#A1A1AA",
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-zinc-300">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {activeFilters.map((f) => (
                <Badge
                  key={f}
                  className="gap-1 pr-1"
                  style={{ backgroundColor: "#27272A", color: "#A1A1AA" }}
                >
                  {f}
                  <button onClick={() => removeFilter(f)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <button
                onClick={() => setActiveFilters([])}
                className="text-xs"
                style={{ color: "#71717A" }}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========== RESULTS =========== */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "#A1A1AA" }}>
            {loading ? (
              "Loading indicators..."
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-white">{filtered.length}</span>{" "}
                indicators
              </>
            )}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className="p-1.5 rounded transition-colors"
              style={{
                backgroundColor: viewMode === "grid" ? "#27272A" : "transparent",
                color: viewMode === "grid" ? "white" : "#71717A",
              }}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-1.5 rounded transition-colors"
              style={{
                backgroundColor: viewMode === "list" ? "#27272A" : "transparent",
                color: viewMode === "list" ? "white" : "#71717A",
              }}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ind) => (
              <IndicatorCard key={ind.id} {...ind} />
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="flex flex-col gap-3">
            {filtered.map((ind) => (
              <div
                key={ind.id}
                className="rounded-xl border flex items-center gap-6 p-4 transition-all hover:border-emerald-500/30"
                style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
              >
                {/* Mini Chart */}
                <div className="w-24 h-12 flex-shrink-0 hidden sm:block">
                  <SparklineChart data={ind.sparkline} height={48} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {ind.name}
                    </h3>
                    {ind.creatorVerified && (
                      <CheckCircle
                        className="h-3.5 w-3.5 flex-shrink-0"
                        style={{ color: "#3B82F6" }}
                      />
                    )}
                  </div>
                  <div className="text-xs mb-2" style={{ color: "#71717A" }}>
                    by {ind.creator}
                  </div>
                  <p
                    className="text-xs line-clamp-1"
                    style={{ color: "#A1A1AA" }}
                  >
                    {ind.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-6 text-xs flex-shrink-0">
                  <div className="text-center">
                    <div className="font-semibold" style={{ color: "#10B981" }}>
                      {ind.winRate}%
                    </div>
                    <div style={{ color: "#71717A" }}>Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 font-semibold" style={{ color: "#EAB308" }}>
                      <Star className="h-3 w-3 fill-current" />
                      {ind.rating}
                    </div>
                    <div style={{ color: "#71717A" }}>Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 font-semibold text-white">
                      <Users className="h-3 w-3" />
                      {ind.subscribers >= 1000
                        ? `${(ind.subscribers / 1000).toFixed(1)}k`
                        : ind.subscribers}
                    </div>
                    <div style={{ color: "#71717A" }}>Subs</div>
                  </div>
                </div>

                {/* Price + Action */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="font-bold text-lg" style={{ color: "#10B981" }}>
                    ₹{ind.price}
                    <span className="text-xs font-normal" style={{ color: "#71717A" }}>
                      /mo
                    </span>
                  </span>
                  <Link
                    href={`/indicator/${ind.slug}`}
                    className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:border-emerald-500/50"
                    style={{ borderColor: "#3F3F46", color: "#A1A1AA" }}
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20">
            <SlidersHorizontal
              className="h-12 w-12 mx-auto mb-4"
              style={{ color: "#3F3F46" }}
            />
            <h3 className="text-lg font-semibold text-white mb-2">
              No indicators found
            </h3>
            <p className="text-sm" style={{ color: "#71717A" }}>
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              className="border"
              style={{ borderColor: "#27272A", color: "#A1A1AA", backgroundColor: "transparent" }}
            >
              ← Previous
            </Button>
            {[1, 2, 3].map((p, i) => (
              <Button
                key={i}
                variant={p === 1 ? "default" : "outline"}
                size="sm"
                className="min-w-9 border"
                style={
                  p === 1
                    ? { backgroundColor: "#10B981", color: "white" }
                    : { borderColor: "#27272A", color: "#A1A1AA", backgroundColor: "transparent" }
                }
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="border"
              style={{ borderColor: "#27272A", color: "#A1A1AA", backgroundColor: "transparent" }}
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
