import { clerkClient } from "@clerk/nextjs/server";

export const PREMIUM_PLAN_SLUG = "premium";

/**
 * Strict check: returns true ONLY if the Premium subscription item is currently `active`.
 * This will treat `canceled` as NOT premium immediately (even if Clerk retains access until period end).
 */
export async function isPremiumActiveForUser(userId: string, planSlug: string = PREMIUM_PLAN_SLUG) {
  const client: any = typeof clerkClient === "function" ? await (clerkClient as any)() : (clerkClient as any);

  if (!client?.billing?.getUserBillingSubscription) return false;

  const subscription = await client.billing.getUserBillingSubscription(userId);
  const items = subscription?.subscriptionItems ?? [];

  return items.some((item: any) => item?.plan?.slug === planSlug && item?.status === "active");
}

