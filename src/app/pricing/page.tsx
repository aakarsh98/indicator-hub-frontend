"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";

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

type FeatureValue = boolean | string;

interface ComparisonRow {
  feature: string;
  explorer: FeatureValue;
  starter: FeatureValue;
  trader: FeatureValue;
  pro: FeatureValue;
  unlimited: FeatureValue;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Indicators included",
    explorer: "2 community",
    starter: "1 paid",
    trader: "3 paid",
    pro: "7 paid",
    unlimited: "All",
  },
  {
    feature: "Browse marketplace",
    explorer: true,
    starter: true,
    trader: true,
    pro: true,
    unlimited: true,
  },
  {
    feature: "Basic alerts",
    explorer: true,
    starter: true,
    trader: true,
    pro: true,
    unlimited: true,
  },
  {
    feature: "All alert conditions",
    explorer: false,
    starter: false,
    trader: true,
    pro: true,
    unlimited: true,
  },
  {
    feature: "Community support",
    explorer: false,
    starter: true,
    trader: true,
    pro: true,
    unlimited: true,
  },
  {
    feature: "Creator support",
    explorer: false,
    starter: false,
    trader: true,
    pro: true,
    unlimited: true,
  },
  {
    feature: "Setup guides",
    explorer: false,
    starter: false,
    trader: true,
    pro: true,
    unlimited: true,
  },
  {
    feature: "Priority support",
    explorer: false,
    starter: false,
    trader: false,
    pro: true,
    unlimited: true,
  },
  {
    feature: "Early access to indicators",
    explorer: false,
    starter: false,
    trader: false,
    pro: true,
    unlimited: true,
  },
  {
    feature: "VIP support",
    explorer: false,
    starter: false,
    trader: false,
    pro: false,
    unlimited: true,
  },
  {
    feature: "Exclusive beta access",
    explorer: false,
    starter: false,
    trader: false,
    pro: false,
    unlimited: true,
  },
];

const FAQS = [
  {
    q: "How does billing work?",
    a: "You pay for your chosen plan monthly or annually. Annual billing saves you 25%. You can cancel anytime and retain access until the end of your billing period.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately with prorated billing. Downgrades apply at the next renewal date.",
  },
  {
    q: "What counts as an indicator slot?",
    a: "Each paid indicator subscription from a creator counts as one slot. Community (free) indicators don't count against your limit.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards (Visa, Mastercard, Amex), UPI, and net banking via Razorpay.",
  },
  {
    q: "Is there a free trial?",
    a: "Some creators offer 7-day free trials on individual indicators. Look for the 'Free Trial' badge in the marketplace. The Explorer plan is always free.",
  },
  {
    q: "What happens when I cancel?",
    a: "When you cancel, you retain full access until the end of your current billing period. No partial refunds are issued.",
  },
];

function CellValue({ val, highlight }: { val: FeatureValue; highlight?: boolean }) {
  if (typeof val === "boolean") {
    return val ? (
      <CheckCircle2 className="h-4 w-4 mx-auto" style={{ color: "#10B981" }} />
    ) : (
      <X className="h-4 w-4 mx-auto" style={{ color: "#3F3F46" }} />
    );
  }
  return (
    <span
      className="text-sm"
      style={{ color: highlight ? "#10B981" : "#A1A1AA" }}
    >
      {val}
    </span>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ backgroundColor: "#09090B", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="px-4 pt-20 pb-12 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg mb-10" style={{ color: "#A1A1AA" }}>
            Pick the plan that matches your trading ambitions. No hidden fees, cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex justify-center">
            <div
              className="inline-flex rounded-xl p-1"
              style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
            >
              <button
                onClick={() => setAnnual(false)}
                className="px-6 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: !annual ? "#10B981" : "transparent",
                  color: !annual ? "white" : "#A1A1AA",
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className="px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                style={{
                  backgroundColor: annual ? "#10B981" : "transparent",
                  color: annual ? "white" : "#A1A1AA",
                }}
              >
                Annual
                <span
                  className="text-xs px-1.5 py-0.5 rounded font-semibold"
                  style={{
                    backgroundColor: annual
                      ? "rgba(255,255,255,0.25)"
                      : "rgba(16,185,129,0.2)",
                    color: annual ? "white" : "#10B981",
                  }}
                >
                  −25%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
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
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Full Feature Comparison
          </h2>
          <div
            className="rounded-xl border overflow-hidden"
            style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid #27272A" }}>
                    <th
                      className="text-left p-4 text-sm font-medium"
                      style={{ color: "#71717A", width: "28%" }}
                    >
                      Feature
                    </th>
                    {TIERS.map((t) => (
                      <th
                        key={t.name}
                        className="text-center p-4 text-sm font-semibold"
                        style={{ color: t.popular ? "#10B981" : "#A1A1AA" }}
                      >
                        {t.name}
                        {t.popular && (
                          <span
                            className="block text-xs font-normal mt-0.5"
                            style={{ color: "#10B981" }}
                          >
                            ★ Popular
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr
                      key={row.feature}
                      style={{
                        borderBottom:
                          i < COMPARISON_ROWS.length - 1
                            ? "1px solid #27272A"
                            : "none",
                        backgroundColor:
                          i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                      }}
                    >
                      <td
                        className="p-4 text-sm text-white font-medium"
                      >
                        {row.feature}
                      </td>
                      <td className="p-4 text-center">
                        <CellValue val={row.explorer} />
                      </td>
                      <td className="p-4 text-center">
                        <CellValue val={row.starter} />
                      </td>
                      <td
                        className="p-4 text-center"
                        style={{ backgroundColor: "rgba(16,185,129,0.03)" }}
                      >
                        <CellValue val={row.trader} highlight />
                      </td>
                      <td className="p-4 text-center">
                        <CellValue val={row.pro} />
                      </td>
                      <td className="p-4 text-center">
                        <CellValue val={row.unlimited} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p
            className="text-center mb-12"
            style={{ color: "#71717A" }}
          >
            Everything you need to know about pricing.
          </p>
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border px-6"
                style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
              >
                <AccordionTrigger className="text-left text-white hover:no-underline py-5 text-sm font-medium hover:text-emerald-400 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm pb-5 leading-relaxed"
                  style={{ color: "#A1A1AA" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-24">
        <div
          className="mx-auto max-w-2xl text-center rounded-2xl p-12"
          style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
        >
          <TrendingUp
            className="h-10 w-10 mx-auto mb-4"
            style={{ color: "#10B981" }}
          />
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="mb-8" style={{ color: "#A1A1AA" }}>
            Join thousands of traders and creators on IndicatorHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="font-semibold px-8 h-12"
              style={{ backgroundColor: "#10B981", color: "white" }}
            >
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-semibold px-8 h-12"
              style={{ borderColor: "#3F3F46", color: "#A1A1AA" }}
            >
              <Link href="/signup?type=creator">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
