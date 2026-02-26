import Link from "next/link";
import {
  Search,
  CreditCard,
  LineChart,
  Star,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  TrendingUp,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import IndicatorCard from "@/components/IndicatorCard";
import HomePricingSection from "@/components/HomePricingSection";
import { indicators, testimonials, faqs } from "@/lib/mockData";

export default function HomePage() {
  const featured = indicators.slice(0, 4);

  return (
    <div style={{ backgroundColor: "#09090B", minHeight: "100vh" }}>
      <Navbar />

      {/* =========== HERO =========== */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:pt-28 sm:pb-32">
        {/* Background blobs */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-10 blur-[120px]"
            style={{ backgroundColor: "#10B981" }}
          />
          <div
            className="absolute right-1/4 top-20 h-[400px] w-[400px] rounded-full opacity-8 blur-[100px]"
            style={{ backgroundColor: "#3B82F6" }}
          />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <Badge
            className="mb-6 border px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: "rgba(16,185,129,0.1)",
              borderColor: "rgba(16,185,129,0.3)",
              color: "#10B981",
            }}
          >
            <span className="mr-2">✦</span> Trusted by 2,400+ active traders
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight mb-6">
            Trade Smarter with{" "}
            <span style={{ color: "#10B981" }}>Proven Indicators</span>
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "#A1A1AA" }}>
            Access battle-tested TradingView indicators from top traders.
            Subscribe monthly, get instant Pine Script access, and elevate your
            trading.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="text-base font-semibold px-8 h-12"
              style={{ backgroundColor: "#10B981", color: "white" }}
            >
              <Link href="/marketplace">Browse Indicators</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base font-semibold px-8 h-12"
              style={{ borderColor: "#3F3F46", color: "#A1A1AA" }}
            >
              <Link href="#creators">Become a Creator</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "2,400+ Active Subscribers" },
              { label: "180+ Indicators" },
              { label: "50+ Verified Creators" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#10B981" }}
                />
                <span className="text-sm" style={{ color: "#71717A" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== HOW IT WORKS =========== */}
      <section className="px-4 py-20 border-y" style={{ borderColor: "#18181B" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            How It Works
          </h2>
          <p className="text-center mb-14" style={{ color: "#71717A" }}>
            Get started in minutes. No technical knowledge needed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                icon: <Search className="h-6 w-6" style={{ color: "#10B981" }} />,
                title: "Browse & Compare",
                desc: "Explore indicators with real performance data, reviews, and equity curves.",
              },
              {
                num: "2",
                icon: <CreditCard className="h-6 w-6" style={{ color: "#10B981" }} />,
                title: "Subscribe Monthly",
                desc: "Choose indicators that fit your strategy. No long-term commitments. Cancel anytime.",
              },
              {
                num: "3",
                icon: <LineChart className="h-6 w-6" style={{ color: "#10B981" }} />,
                title: "Trade with Confidence",
                desc: "Get instant TradingView access. Indicators auto-added to your charts.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-xl p-8 border flex flex-col gap-4"
                style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: "#10B981" }}
                  >
                    {step.num}
                  </div>
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#A1A1AA" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== FEATURED INDICATORS =========== */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-white">
              Top Performing Indicators
            </h2>
            <Link
              href="/marketplace"
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#10B981" }}
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((ind) => (
              <IndicatorCard key={ind.id} {...ind} />
            ))}
          </div>
        </div>
      </section>

      {/* =========== CREATOR SPOTLIGHT =========== */}
      <section
        id="creators"
        className="px-4 py-20 border-y"
        style={{ borderColor: "#18181B" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <Badge
                className="mb-4 border px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "rgba(16,185,129,0.1)",
                  borderColor: "rgba(16,185,129,0.3)",
                  color: "#10B981",
                }}
              >
                For Creators
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
                Built by Traders,{" "}
                <span style={{ color: "#10B981" }}>for Traders</span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#A1A1AA" }}>
                Turn your trading edge into income. List your TradingView
                indicators on IndicatorHub and reach thousands of traders looking
                for proven strategies. We handle billing, access management, and
                customer support — you focus on building great indicators.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Zero upfront cost to list",
                  "Keep 85-90% of every subscription",
                  "Real-time analytics dashboard",
                  "Automated TradingView access management",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#A1A1AA" }}>
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "#10B981" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/signup?type=creator"
                className="inline-block font-semibold px-8 py-3 rounded-lg text-white text-center"
                style={{ backgroundColor: "#10B981" }}
              >
                Start Selling →
              </a>
            </div>

            {/* Right — Creator Card */}
            <div
              className="rounded-xl p-6 border-l-4"
              style={{
                backgroundColor: "#18181B",
                borderLeftColor: "#10B981",
                border: "1px solid #27272A",
                borderLeft: "4px solid #10B981",
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: "#10B981" }}
                >
                  A
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">Alex Chen</span>
                    <CheckCircle className="h-4 w-4" style={{ color: "#3B82F6" }} />
                  </div>
                  <span className="text-sm" style={{ color: "#71717A" }}>
                    Full-time Trader & Indicator Creator
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Indicators", value: "12" },
                  { label: "Subscribers", value: "3.4k" },
                  { label: "Revenue", value: "₹23L" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center rounded-lg p-3" style={{ backgroundColor: "#09090B" }}>
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs" style={{ color: "#71717A" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm italic" style={{ color: "#A1A1AA" }}>
                &ldquo;IndicatorHub changed my life. I went from freelancing Pine
                Script gigs to earning ₹8k/month passively while I trade.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========== PRICING =========== */}
      <HomePricingSection />

      {/* =========== TESTIMONIALS =========== */}
      <section className="px-4 py-20 border-y" style={{ borderColor: "#18181B" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-white mb-14">
            Loved by Traders Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-xl p-6 border flex flex-col gap-4"
                style={{
                  backgroundColor: "rgba(24,24,27,0.5)",
                  borderColor: "#27272A",
                }}
              >
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current"
                      style={{ color: "#EAB308" }}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic flex-1" style={{ color: "#D4D4D8" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: "#10B981" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: "#71717A" }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== FAQ =========== */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center mb-12" style={{ color: "#71717A" }}>
            Everything you need to know about IndicatorHub.
          </p>
          <Accordion type="single" collapsible className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl border px-6"
                style={{
                  backgroundColor: "#18181B",
                  borderColor: "#27272A",
                }}
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

      {/* =========== CTA BANNER =========== */}
      <section className="px-4 py-20">
        <div
          className="mx-auto max-w-4xl rounded-2xl p-12 text-center relative overflow-hidden"
          style={{ backgroundColor: "#18181B", border: "1px solid #27272A" }}
        >
          <div
            className="absolute inset-0 -z-10 opacity-20 blur-[80px] rounded-full"
            style={{ backgroundColor: "#10B981", width: "60%", margin: "auto", height: "100%" }}
          />
          <TrendingUp
            className="h-10 w-10 mx-auto mb-6"
            style={{ color: "#10B981" }}
          />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Trade Smarter?
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "#A1A1AA" }}>
            Join 2,400+ traders who have elevated their performance with
            proven, data-backed indicators from top creators.
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

      {/* =========== FOOTER =========== */}
      <footer
        className="border-t px-4 py-16"
        style={{ backgroundColor: "#050507", borderColor: "#18181B" }}
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1 */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5" style={{ color: "#10B981" }} />
                <span className="font-bold text-white">IndicatorHub</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#71717A" }}>
                The marketplace for proven trading indicators. Built by traders,
                for traders.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="flex flex-col gap-3">
                {["Marketplace", "Pricing", "For Creators", "Become a Creator"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "#71717A" }}
                      >
                        {link}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="flex flex-col gap-3">
                {["About", "Blog", "Careers", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#71717A" }}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="flex flex-col gap-3">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "#71717A" }}
                      >
                        {link}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t gap-4"
            style={{ borderColor: "#18181B" }}
          >
            <p className="text-sm" style={{ color: "#71717A" }}>
              © 2026 Octave Finance India. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <ShieldCheck className="h-4 w-4" style={{ color: "#71717A" }} />
              <span className="text-xs" style={{ color: "#71717A" }}>
                Verified Performance Data
              </span>
              <Users className="h-4 w-4" style={{ color: "#71717A" }} />
              <span className="text-xs" style={{ color: "#71717A" }}>
                2,400+ Traders
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
