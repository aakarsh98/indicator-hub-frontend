"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createCheckout, verifyPayment } from "@/lib/api";

interface SubscribeButtonProps {
  indicatorSlug: string;
  indicatorName: string;
  price: number;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function SubscribeButton({ indicatorSlug, indicatorName, price }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    loadRazorpayScript().then(setScriptReady);
  }, []);

  const handleSubscribe = async () => {
    if (!scriptReady) {
      setStatus("error");
      setMessage("Payment system not loaded. Please refresh and try again.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      // Step 1: Get Razorpay order from backend
      const checkout = await createCheckout({
        indicatorSlug,
        customerEmail: "user@example.com", // In production: get from auth session
      });

      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || checkout.keyId;

      // Step 2: Open Razorpay checkout popup
      const options: RazorpayOptions = {
        key: razorpayKeyId,
        amount: checkout.amount,
        currency: checkout.currency,
        name: "IndicatorHub",
        description: `${indicatorName} — Monthly Subscription`,
        order_id: checkout.orderId,
        handler: async (response: RazorpayPaymentResponse) => {
          // Step 3: Verify payment with backend
          try {
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setStatus("success");
            setMessage(`🎉 Subscribed! Welcome to ${verification.indicatorName}. Check your TradingView account.`);
          } catch {
            setStatus("error");
            setMessage("Payment received but verification failed. Please contact support.");
          }
        },
        prefill: {
          email: "user@example.com",
        },
        theme: {
          color: "#10B981",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus("error");
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="w-full">
        <div
          className="w-full rounded-xl p-4 text-center text-sm font-medium"
          style={{ backgroundColor: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid #10B981" }}
        >
          {message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Button
        className="w-full h-12 text-base font-semibold mb-3"
        style={{ backgroundColor: "#10B981", color: "white", opacity: loading ? 0.7 : 1 }}
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? "Processing..." : `Subscribe — ₹${price}/month`}
      </Button>
      {status === "error" && message && (
        <p className="text-xs text-center mt-2" style={{ color: "#EF4444" }}>
          {message}
        </p>
      )}
    </div>
  );
}
