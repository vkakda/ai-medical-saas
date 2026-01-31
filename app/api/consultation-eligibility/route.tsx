import { db } from "@/config/db";
import { SessionsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isPremiumActiveForUser } from "@/lib/billing";

const FREE_CONSULTATION_LIMIT = 1;

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isPremium = await isPremiumActiveForUser(user.id);

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return NextResponse.json({ error: "Missing user email" }, { status: 400 });
    }

    const sessions = await db
      .select({ id: SessionsTable.id })
      .from(SessionsTable)
      .where(eq(SessionsTable.createdBy, email));

    const used = sessions.length;
    const limit = isPremium ? null : FREE_CONSULTATION_LIMIT;

    return NextResponse.json({
      isPremium,
      used,
      limit,
      canStartConsultation: isPremium ? true : used < FREE_CONSULTATION_LIMIT,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Unknown error" }, { status: 500 });
  }
}

