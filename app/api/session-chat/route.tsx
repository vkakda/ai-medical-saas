import { db } from "@/config/db";
import { SessionsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";
import { AiSpecialistsDoctors } from "@/shared/list";
export async function POST(req: NextRequest) {
    const { notes,selectedDoctor } = await req.json();
    const user = await currentUser();

    // FIND the full doctor data from your list to ensure voiceId is included
    const fullDoctorData = AiSpecialistsDoctors.find(doc => doc.id === selectedDoctor.id)

    try{
        const sessionId = uuidv4();
        const result = await db.insert(SessionsTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedDoctor: fullDoctorData || selectedDoctor,
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

    if(sessionId=='all'){

        try {
        const result = await db.select().from(SessionsTable).where(eq(SessionsTable.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(SessionsTable.id));
        return NextResponse.json(result);
    }
    catch (error) {
        return NextResponse.json(error);
    }

    } else{
        try {
        const result = await db.select().from(SessionsTable).where(eq(SessionsTable.sessionId,sessionId));
        return NextResponse.json(result[0]);
    }
    catch (error) {
        return NextResponse.json(error);
    }

    }


    
}