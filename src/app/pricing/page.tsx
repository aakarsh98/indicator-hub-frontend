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

const SUBSCRIBER_TIERS = [
  {
    name: "Starter Indicators",
    price: "₹9–15",
    period: "/mo",
    desc: "Basic trend & momentum tools",
    popular: false,
    features: [
      "1 indicator access",
      "Standard alerts",
      "Community support",
      "Cancel anytime",
    ],
  },
  {
    name: "Pro Indicators",
    price: "₹19–35",
    period: "/mo",
    desc: "Advanced multi-factor strategies",
    popular: true,
    features: [
      "1 indicator access",
      "All alert conditions",
      "Creator support channel",
      "Setup guide included",
      "Cancel anytime",
    ],
  },
  {
    name: "Elite Indicators",
    price: "₹39–49",
    period: "/mo",
    desc: "AI-powered & institutional-grade",
    popular: false,
    features: [
      "1 indicator access",
      "Priority alerts",
      "1-on-1 creator support",
      "Custom settings",
      "Early access to updates",
    ],
  },
];

const CREATOR_TIERS = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    desc: "Get started selling",
    popular: false,
    features: [
      "List unlimited indicators",
      "15% platform fee",
      "Monthly payouts",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Creator Pro",
    price: "₹29",
    period: "/mo",
    desc: "Scale your business",
    popular: true,
    features: [
      "List unlimited indicators",
      "10% platform fee",
      "Weekly payouts",
      "Advanced analytics dashboard",
      "Priority support",
      "Featured placement",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For teams & firms",
    popular: false,
    features: [
      "Everything in Pro",
      "5% platform fee",
      "Custom integrations",
      "Dedicated account manager",
      "API access",
      "White-label options",
    ],
  },
];

const COMPARISON_ROWS = [
  { feature: "Platform Fee", free: "15%", pro: "10%", enterprise: "5%" },
  { feature: "Payout Frequency", free: "Monthly", pro: "Weekly", enterprise: "Daily" },
  { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom" },
  { feature: "Support", free: "Email", pro: "Priority", enterprise: "Dedicated" },
  { feature: "Featured Placement", free: false, pro: true, enterprise: true },
  { feature: "API Access", free: false, pro: false, enterprise: true },
  { feature: "Custom Branding", free: false, pro: true, enterprise: true },
];

const FAQS = [
  { q: "How does billing work for subscribers?", a: "You pay for each indicator separately on a monthly subscription basis. There are no bundles or minimum commitments — subscribe to exactly what you want and cancel anytime." },
  { q: "When do creators get paid?", a: "Free plan creators receive monthly payouts processed on the 1st of each month. Creator Pro subscribers get weekly payouts every Monday. Enterprise plans can negotiate custom payout schedules." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as PayPal and crypto (USDT, BTC) for creator payouts." },
  { q: "Can I switch between plans?", a: "Yes, you can upgrade or downgrade your creator plan at any time. Changes take effect on the next billing cycle. Upgrading is immediate with prorated billing." },
  { q: "Is there a free trial for indicators?", a: "Some creators offer 7-day free trials at their discretion. Look for the 'Free Trial' badge on indicator cards in the marketplace." },
  { q: "What happens when I cancel?", a: "When you cancel, you retain access until the end of your current billing period. For creators, your listings remain active for 30 days after cancellation to allow subscribers to transition." },
];

export default function PricingPage() {
  const [mode, setMode] = useState<"subscriber" | "creator">("subscriber");
  const tiers = mode === "subscriber" ? SUBSCRIBER_TIERS : CREATOR_TIERS;

  return (
    <div style={{ backgroundColor: "#09090B", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section className="px-4 pt-20 pb-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg mb-10" style={{ color: "#A1A1AA" }}>
            No hidden fees. Creators earn, subscribers save.
          </p>

          {/* Toggle */}
          <div
            className="inline-flex rounded-xl p-1 mx-auto mb-4"
            style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
          >
            <button
              onClick={() => setMode("subscriber")}
              className="px-6 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: mode === "subscriber" ? "#10B981" : "transparent",
                color: mode === "subscriber" ? "white" : "#A1A1AA",
              }}
            >
              I&apos;m a Subscriber
            </button>
            <button
              onClick={() => setMode("creator")}
              className="px-6 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: mode === "creator" ? "#10B981" : "transparent",
                color: mode === "creator" ? "white" : "#A1A1AA",
              }}
            >
              I&apos;m a Creator
            </button>
          </div>

          {mode === "subscriber" && (
            <p className="text-sm" style={{ color: "#71717A" }}>
              Indicators are priced individually by creators. You only pay for what you use.
            </p>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl p-8 border flex flex-col relative"
                style={{
                  backgroundColor: "#18181B",
                  borderColor: tier.popular ? "#10B981" : "#27272A",
                  boxShadow: tier.popular ? "0 0 40px rgba(16,185,129,0.1)" : "none",
                }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge style={{ backgroundColor: "#10B981", color: "white" }} className="text-xs px-3 font-semibold">
                      Popular
                    </Badge>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-white">{tier.price}</span>
                  {tier.period && (
                    <span className="text-sm" style={{ color: "#71717A" }}>{tier.period}</span>
                  )}
                </div>
                <p className="text-sm mb-6" style={{ color: "#A1A1AA" }}>{tier.desc}</p>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#A1A1AA" }}>
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "#10B981" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full font-semibold h-11"
                  style={
                    tier.popular
                      ? { backgroundColor: "#10B981", color: "white" }
                      : { backgroundColor: "transparent", borderColor: "#3F3F46", color: "#A1A1AA" }
                  }
                  variant={tier.popular ? "default" : "outline"}
                >
                  {mode === "subscriber" ? "Browse Indicators" : tier.name === "Enterprise" ? "Contact Us" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator Comparison Table */}
      {mode === "creator" && (
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}>
              <div className="p-6 border-b" style={{ borderColor: "#27272A" }}>
                <h2 className="text-xl font-bold text-white">Feature Comparison</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #27272A" }}>
                      <th className="text-left p-4 text-sm font-medium" style={{ color: "#71717A" }}>Feature</th>
                      <th className="text-center p-4 text-sm font-medium" style={{ color: "#71717A" }}>Free</th>
                      <th className="text-center p-4 text-sm font-medium" style={{ color: "#10B981" }}>Creator Pro</th>
                      <th className="text-center p-4 text-sm font-medium" style={{ color: "#71717A" }}>Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr key={row.feature} style={{ borderBottom: i < COMPARISON_ROWS.length - 1 ? "1px solid #27272A" : "none" }}>
                        <td className="p-4 text-sm text-white">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.free === "boolean" ? (
                            row.free
                              ? <CheckCircle2 className="h-4 w-4 mx-auto" style={{ color: "#10B981" }} />
                              : <X className="h-4 w-4 mx-auto" style={{ color: "#71717A" }} />
                          ) : (
                            <span className="text-sm" style={{ color: "#A1A1AA" }}>{row.free}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.pro === "boolean" ? (
                            row.pro
                              ? <CheckCircle2 className="h-4 w-4 mx-auto" style={{ color: "#10B981" }} />
                              : <X className="h-4 w-4 mx-auto" style={{ color: "#71717A" }} />
                          ) : (
                            <span className="text-sm font-medium" style={{ color: "#10B981" }}>{row.pro}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.enterprise === "boolean" ? (
                            row.enterprise
                              ? <CheckCircle2 className="h-4 w-4 mx-auto" style={{ color: "#10B981" }} />
                              : <X className="h-4 w-4 mx-auto" style={{ color: "#71717A" }} />
                          ) : (
                            <span className="text-sm" style={{ color: "#A1A1AA" }}>{row.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-center mb-12" style={{ color: "#71717A" }}>Everything you need to know about pricing.</p>
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-₹{i}`}
                className="rounded-xl border px-6"
                style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
              >
                <AccordionTrigger className="text-left text-white hover:no-underline py-5 text-sm font-medium hover:text-emerald-400 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm pb-5 leading-relaxed" style={{ color: "#A1A1AA" }}>
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-2xl text-center rounded-2xl p-12" style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}>
          <TrendingUp className="h-10 w-10 mx-auto mb-4" style={{ color: "#10B981" }} />
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="mb-8" style={{ color: "#A1A1AA" }}>Join thousands of traders and creators on IndicatorHub.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-semibold px-8 h-12" style={{ backgroundColor: "#10B981", color: "white" }}>
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold px-8 h-12" style={{ borderColor: "#3F3F46", color: "#A1A1AA" }}>
              <Link href="/signup">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
