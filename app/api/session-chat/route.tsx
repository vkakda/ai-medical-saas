// import { db } from "@/config/db";
// import { SessionsTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import { desc, eq } from "drizzle-orm";
// import { AiSpecialistsDoctors } from "@/shared/list";
// export async function POST(req: NextRequest) {
//     const { notes,selectedDoctor } = await req.json();
//     const user = await currentUser();

//     // FIND the full doctor data from your list to ensure voiceId is included
//     const fullDoctorData = AiSpecialistsDoctors.find(doc => doc.id === selectedDoctor.id)

//     try{
//         const sessionId = uuidv4();
//         const result = await db.insert(SessionsTable).values({
//             sessionId: sessionId,
//             createdBy: user?.primaryEmailAddress?.emailAddress,
//             notes: notes,
//             selectedDoctor: fullDoctorData || selectedDoctor,
//             createdAt: new Date().toISOString(),
//         }).returning();

//         return NextResponse.json( result[0]?.SessionsTable );
//     } catch (error) {
//         return NextResponse.json(error);

//     }
// }

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const sessionId = searchParams.get('sessionId');
//     const user = await currentUser();

//     if(sessionId=='all'){

//         try {
//         const result = await db.select().from(SessionsTable).where(eq(SessionsTable.createdBy,user?.primaryEmailAddress?.emailAddress)).orderBy(desc(SessionsTable.id));
//         return NextResponse.json(result);
//     }
//     catch (error) {
//         return NextResponse.json(error);
//     }

//     } else{
//         try {
//         const result = await db.select().from(SessionsTable).where(eq(SessionsTable.sessionId,sessionId));
//         return NextResponse.json(result[0]);
//     }
//     catch (error) {
//         return NextResponse.json(error);
//     }

//     }


    
// }

import { db } from "@/config/db";
import { SessionsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";
import { AiSpecialistsDoctors } from "@/shared/list";

export async function POST(req: NextRequest) {
    try {
        const { notes, selectedDoctor } = await req.json();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // FIND the full doctor data from your list to ensure voiceId is included
        const fullDoctorData = AiSpecialistsDoctors.find(doc => doc.id === selectedDoctor.id);

        const sessionId = uuidv4();
        
        // FIX: .returning() returns an array of the inserted row(s)
        const result = await db.insert(SessionsTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress as string,
            notes: notes,
            selectedDoctor: fullDoctorData || selectedDoctor,
            // Ensure your schema actually expects a string for createdAt if using toISOString()
            createdAt: new Date().toISOString(), 
        }).returning();

        // FIX: result[0] is the object containing your columns
        return NextResponse.json(result[0]);
        
    } catch (error: any) {
        console.error("POST ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = user?.primaryEmailAddress?.emailAddress as string;

        if (sessionId === 'all') {
            const result = await db.select()
                .from(SessionsTable)
                .where(eq(SessionsTable.createdBy, email))
                .orderBy(desc(SessionsTable.id));
            
            return NextResponse.json(result);
        } else if (sessionId) {
            const result = await db.select()
                .from(SessionsTable)
                .where(eq(SessionsTable.sessionId, sessionId));
            
            return NextResponse.json(result[0] || { error: "Session not found" });
        }

        return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

    } catch (error: any) {
        console.error("GET ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}