"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, TrendingUp, Eye as EyeIcon, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function PasswordStrengthBar({ password }: { password: string }) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#EF4444", "#EAB308", "#3B82F6", "#10B981"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all"
            style={{ backgroundColor: i <= strength ? colors[strength] : "#3F3F46" }}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs" style={{ color: colors[strength] || "#71717A" }}>
          {labels[strength]}
        </p>
      )}
    </div>
  );
}

export default function SignupPage() {
  const [role, setRole] = useState<"subscriber" | "creator">("subscriber");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#09090B" }}>
      {/* Left — Branding Panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundColor: "#0A0A0D" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
            style={{ backgroundColor: "#10B981" }}
          />
          <div
            className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full opacity-8 blur-[100px]"
            style={{ backgroundColor: "#3B82F6" }}
          />
        </div>

        <div className="flex items-center gap-2 relative">
          <TrendingUp className="h-6 w-6" style={{ color: "#10B981" }} />
          <span className="text-xl font-bold text-white">IndicatorHub</span>
        </div>

        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Start trading or<br />
            <span style={{ color: "#10B981" }}>selling in minutes</span>
          </h2>
          <p className="text-base mb-8 leading-relaxed" style={{ color: "#71717A" }}>
            Whether you&apos;re looking for better indicators or want to monetize your trading edge, IndicatorHub is the place to be.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "2,400+", desc: "Active Subscribers" },
              { label: "180+", desc: "Indicators Listed" },
              { label: "50+", desc: "Verified Creators" },
              { label: "₹23L", desc: "Top Creator Earnings" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-4" style={{ backgroundColor: "rgba(24,24,27,0.6)", border: "1px solid #27272A" }}>
                <div className="text-xl font-bold text-white">{stat.label}</div>
                <div className="text-xs" style={{ color: "#71717A" }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <p className="text-xs" style={{ color: "#52525B" }}>
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline" style={{ color: "#71717A" }}>Terms of Service</Link>{" "}
            and{" "}
            <Link href="#" className="underline" style={{ color: "#71717A" }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Right — Auth Form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <TrendingUp className="h-5 w-5" style={{ color: "#10B981" }} />
            <span className="text-lg font-bold text-white">IndicatorHub</span>
          </div>

          <div
            className="rounded-2xl p-8 border"
            style={{ backgroundColor: "#18181B", borderColor: "#27272A" }}
          >
            <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-sm mb-6" style={{ color: "#A1A1AA" }}>Start trading or selling in minutes</p>

            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setRole("subscriber")}
                className="p-4 rounded-xl border text-left transition-all"
                style={{
                  backgroundColor: role === "subscriber" ? "rgba(16,185,129,0.1)" : "#27272A",
                  borderColor: role === "subscriber" ? "#10B981" : "#3F3F46",
                }}
              >
                <EyeIcon className="h-5 w-5 mb-2" style={{ color: role === "subscriber" ? "#10B981" : "#71717A" }} />
                <div className="text-sm font-medium text-white">I want to Subscribe</div>
                <div className="text-xs mt-0.5" style={{ color: "#71717A" }}>Access indicators</div>
              </button>
              <button
                onClick={() => setRole("creator")}
                className="p-4 rounded-xl border text-left transition-all"
                style={{
                  backgroundColor: role === "creator" ? "rgba(16,185,129,0.1)" : "#27272A",
                  borderColor: role === "creator" ? "#10B981" : "#3F3F46",
                }}
              >
                <Palette className="h-5 w-5 mb-2" style={{ color: role === "creator" ? "#10B981" : "#71717A" }} />
                <div className="text-sm font-medium text-white">I want to Create</div>
                <div className="text-xs mt-0.5" style={{ color: "#71717A" }}>Sell indicators</div>
              </button>
            </div>

            {/* Google SSO */}
            <Button
              className="w-full h-11 font-medium mb-4 flex items-center gap-3"
              style={{ backgroundColor: "#27272A", color: "white", border: "1px solid #3F3F46" }}
            >
              <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ backgroundColor: "#27272A" }} />
              <span className="text-xs" style={{ color: "#71717A" }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#27272A" }} />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium text-white block mb-1.5">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Trader"
                  className="h-10 border text-white placeholder:text-zinc-600"
                  style={{ backgroundColor: "#27272A", borderColor: "#3F3F46" }}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white block mb-1.5">Email</label>
                <Input
                  type="email"
                  placeholder="trader@example.com"
                  className="h-10 border text-white placeholder:text-zinc-600"
                  style={{ backgroundColor: "#27272A", borderColor: "#3F3F46" }}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white block mb-1.5">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="h-10 border text-white placeholder:text-zinc-600 pr-10"
                    style={{ backgroundColor: "#27272A", borderColor: "#3F3F46" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#71717A" }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <PasswordStrengthBar password={password} />
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className="mt-0.5 h-4 w-4 rounded flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: agreed ? "#10B981" : "transparent",
                    border: `2px solid ₹{agreed ? "#10B981" : "#3F3F46"}`,
                  }}
                >
                  {agreed && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-xs leading-relaxed" style={{ color: "#71717A" }}>
                  I agree to the{" "}
                  <Link href="#" className="underline" style={{ color: "#10B981" }}>Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="#" className="underline" style={{ color: "#10B981" }}>Privacy Policy</Link>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full h-11 font-semibold"
                style={{ backgroundColor: "#10B981", color: "white" }}
              >
                Create Account
              </Button>
            </form>

            <p className="text-sm text-center mt-6" style={{ color: "#71717A" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-medium hover:underline" style={{ color: "#10B981" }}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
