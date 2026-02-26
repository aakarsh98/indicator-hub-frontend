const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://indicator-hub-nine.vercel.app';

export interface Indicator {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  creator: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  indicatorName: string;
}

export interface VerifyResponse {
  purchaseId: string;
  indicatorName: string;
  customerEmail: string;
  status: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: { message: res.statusText } }));
    throw new Error(error?.error?.message || `API error ${res.status}`);
  }
  const json = await res.json();
  return json.data as T;
}

// --- Indicators ---

export async function getIndicators(): Promise<Indicator[]> {
  return apiFetch<Indicator[]>('/api/indicators');
}

export async function getIndicator(slug: string): Promise<Indicator> {
  return apiFetch<Indicator>(`/api/indicators/${slug}`);
}

// --- Subscriptions / Razorpay ---

export async function createCheckout(params: {
  indicatorSlug?: string;
  indicatorId?: string;
  customerEmail: string;
}): Promise<CheckoutResponse> {
  return apiFetch<CheckoutResponse>('/api/subscriptions/checkout', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function verifyPayment(params: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<VerifyResponse> {
  return apiFetch<VerifyResponse>('/api/subscriptions/verify', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
