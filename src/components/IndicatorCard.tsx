import Link from "next/link";
import { Star, Users, CheckCircle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SparklineChart from "./SparklineChart";

interface IndicatorCardProps {
  id: number;
  slug: string;
  name: string;
  creator: string;
  creatorVerified: boolean;
  description: string;
  price: number;
  winRate: number;
  rating: number;
  reviewCount: number;
  subscribers: number;
  category: string;
  sparkline: number[];
  compact?: boolean;
}

export default function IndicatorCard({
  slug,
  name,
  creator,
  creatorVerified,
  description,
  price,
  winRate,
  rating,
  subscribers,
  sparkline,
  compact = false,
}: IndicatorCardProps) {
  const formatSubs = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n.toString();

  return (
    <div
      className="rounded-xl border flex flex-col transition-all duration-200 hover:border-emerald-500/50 group relative overflow-hidden"
      style={{
        backgroundColor: "#18181B",
        borderColor: "#27272A",
      }}
    >
      {/* Favorite Button */}
      <button className="absolute top-3 right-3 z-10 text-zinc-600 hover:text-zinc-300 transition-colors">
        <Heart className="h-4 w-4" />
      </button>

      {/* Sparkline Chart */}
      <div className="px-4 pt-4 pb-2" style={{ height: compact ? "56px" : "72px" }}>
        <SparklineChart data={sparkline} height={compact ? 48 : 60} />
      </div>

      {/* Content */}
      <div className="px-4 pb-4 flex flex-col flex-1 gap-3">
        {/* Name + Creator */}
        <div>
          <h3 className="font-semibold text-white text-base leading-tight mb-1 pr-6">
            {name}
          </h3>
          <div className="flex items-center gap-1">
            <span className="text-sm" style={{ color: "#71717A" }}>
              {creator}
            </span>
            {creatorVerified && (
              <CheckCircle className="h-3.5 w-3.5" style={{ color: "#3B82F6" }} />
            )}
          </div>
          {!compact && (
            <p
              className="text-xs mt-1 line-clamp-2 leading-relaxed"
              style={{ color: "#A1A1AA" }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs">
          <span style={{ color: "#10B981" }} className="font-medium">
            {winRate}% WR
          </span>
          <span className="flex items-center gap-1" style={{ color: "#A1A1AA" }}>
            <Users className="h-3 w-3" />
            {formatSubs(subscribers)}
          </span>
          <span className="flex items-center gap-1" style={{ color: "#EAB308" }}>
            <Star className="h-3 w-3 fill-current" />
            {rating}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-1 border-t" style={{ borderColor: "#27272A" }}>
          <span className="font-bold text-base" style={{ color: "#10B981" }}>
            ${price}
            <span className="text-xs font-normal" style={{ color: "#71717A" }}>
              /mo
            </span>
          </span>
          <Link
            href={`/indicator/${slug}`}
            className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            style={{ borderColor: "#3F3F46", color: "#A1A1AA" }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
