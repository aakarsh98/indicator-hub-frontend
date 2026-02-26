"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TIERS = [
  {
    name: "Explorer",
    popular: false,
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    features: [
      "Browse marketplace",
      "2 community indicators",
      "Basic alerts",
    ],
    cta: "Get Started Free",
    href: "/signup",
  },
  {
    name: "Starter",
    popular: false,
    monthlyPrice: 199,
    annualPrice: 149,
    annualTotal: 1788,
    features: [
      "1 paid indicator",
      "Standard alerts",
      "Community support",
      "Cancel anytime",
    ],
    cta: "Start with Starter",
    href: "/signup?plan=starter",
  },
  {
    name: "Trader",
    popular: true,
    monthlyPrice: 499,
    annualPrice: 374,
    annualTotal: 4488,
    features: [
      "3 indicators",
      "All alert conditions",
      "Creator support",
      "Setup guides",
      "Cancel anytime",
    ],
    cta: "Start Trading",
    href: "/signup?plan=trader",
  },
  {
    name: "Pro",
    popular: false,
    monthlyPrice: 999,
    annualPrice: 749,
    annualTotal: 8988,
    features: [
      "7 indicators",
      "Priority support",
      "Early access to new indicators",
      "Cancel anytime",
    ],
    cta: "Go Pro",
    href: "/signup?plan=pro",
  },
  {
    name: "Unlimited",
    popular: false,
    monthlyPrice: 1999,
    annualPrice: 1499,
    annualTotal: 17988,
    features: [
      "All indicators",
      "VIP support",
      "Exclusive beta access",
      "Cancel anytime",
    ],
    cta: "Go Unlimited",
    href: "/signup?plan=unlimited",
  },
];

export default function HomePricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-white mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center mb-8" style={{ color: "#71717A" }}>
          No hidden fees. Pick the plan that fits your trading style.
        </p>

        {/* Monthly / Annual Toggle */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex rounded-xl p-1"
            style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
          >
            <button
              onClick={() => setAnnual(false)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: !annual ? "#10B981" : "transparent",
                color: !annual ? "white" : "#A1A1AA",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              style={{
                backgroundColor: annual ? "#10B981" : "transparent",
                color: annual ? "white" : "#A1A1AA",
              }}
            >
              Annual
              <span
                className="text-xs px-1.5 py-0.5 rounded font-semibold"
                style={{
                  backgroundColor: annual ? "rgba(255,255,255,0.25)" : "rgba(16,185,129,0.2)",
                  color: annual ? "white" : "#10B981",
                }}
              >
                −25%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {TIERS.map((tier) => {
            const price = annual ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.name}
                className="rounded-2xl p-6 border flex flex-col relative"
                style={{
                  backgroundColor: "#18181B",
                  borderColor: tier.popular ? "#10B981" : "#27272A",
                  boxShadow: tier.popular
                    ? "0 0 40px rgba(16,185,129,0.12)"
                    : "none",
                }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      style={{ backgroundColor: "#10B981", color: "white" }}
                      className="text-xs px-3 font-semibold whitespace-nowrap"
                    >
                      Most Popular
                    </Badge>
                  </div>
                )}

                <h3 className="text-base font-semibold text-white mb-3">
                  {tier.name}
                </h3>

                {/* Price display */}
                <div className="mb-1">
                  {price === null ? (
                    <span className="text-3xl font-bold text-white">Free</span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-white">
                        ₹{price.toLocaleString()}
                      </span>
                      <span className="text-sm" style={{ color: "#71717A" }}>
                        /mo
                      </span>
                    </div>
                  )}
                </div>

                {/* Annual billing note */}
                <div className="mb-5 min-h-[20px]">
                  {annual && tier.annualTotal && (
                    <p className="text-xs" style={{ color: "#71717A" }}>
                      ₹{tier.annualTotal.toLocaleString()}/yr billed annually
                    </p>
                  )}
                </div>

                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs"
                      style={{ color: "#A1A1AA" }}
                    >
                      <CheckCircle2
                        className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: "#10B981" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="w-full font-semibold h-10 text-sm"
                  style={
                    tier.popular
                      ? { backgroundColor: "#10B981", color: "white" }
                      : {
                          backgroundColor: "transparent",
                          borderColor: "#3F3F46",
                          color: "#A1A1AA",
                        }
                  }
                  variant={tier.popular ? "default" : "outline"}
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: "#71717A" }}>
          All plans include instant access after signup. Cancel anytime.{" "}
          <Link href="/pricing" style={{ color: "#10B981" }}>
            See full feature comparison →
          </Link>
        </p>
      </div>
    </section>
  );
}
