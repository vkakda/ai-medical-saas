import { db } from "@/config/db";
import { SessionsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
export async function POST(req: NextRequest) {
    const { notes,selectedDoctor } = await req.json();
    const user = await currentUser();
    try{
        const sessionId = uuidv4();
        const result = await db.insert(SessionsTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdAt: new Date().toISOString(),
        }). returning({SessionsTable});

        return NextResponse.json( result[0]?.SessionsTable );
    } catch (error) {
        return NextResponse.json(error);

    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const user = await currentUser();
    try {
        const result = await db.select().from(SessionsTable).where(eq(SessionsTable.sessionId,sessionId));
        return NextResponse.json(result[0]);
    }
    catch (error) {
        return NextResponse.json(error);
    }
}