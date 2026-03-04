import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionsTable } from "@/config/schema";
import { AiSpecialistsDoctors } from "@/shared/list";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor ai agent info and conversation between AI doctor agent and user, generate a structured report with the following fields:
1. sessionld: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided and also his age should be there
4. timestamp: current date and time in ISO format
5. chief Complaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned along with their doses and composition measurement
11. recommendations: list of Al suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
"sessionld": "string",
"agent": "string",
"user": "string",
"age": "number"
"timestamp": "ISO Date string",
"chiefComplaint": "string",
"summary": "string",
"symptoms": ["symptom1", "symptom2"],
"duration": "string",
"severity": "string",
"medicationsMentioned": ["med1", "med2"],
"recommendations": ["rec1", "rec2"],
} 
Only include valid fields. Respond with nothing else.

`

export async function POST(req: NextRequest) {
    const { sessionId, sessionDetail, messages } = await req.json();

    try {

        const UserInput = "AI Doctor Agent Info:"+JSON.stringify(sessionDetail)+", conversation: "+JSON.stringify(messages);

        const completion = await openai.chat.completions.create({
            // model: "google/gemini-2.5-flash-preview-09-2025",
            model: "google/gemini-3.1-flash-lite-preview",
            messages: [
                { role: "system", content: REPORT_GEN_PROMPT },
                { role: "user", content: UserInput }
            ],
        })
        const rawResponse = completion.choices[0].message;

        // @ts-ignore
        const resp = rawResponse.content.trim().replace('```json', '').replace('```', '');
        const parsedResponse = JSON.parse(resp);

        //database saving this report
        const result = await db.update(SessionsTable).set({
            report: parsedResponse,
            conversation:messages
        }).where(eq(SessionsTable.sessionId,sessionId));

        return NextResponse.json(parsedResponse)

    } catch (error) {
        return NextResponse.json(error)
    }
}