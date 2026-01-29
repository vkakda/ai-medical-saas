import { openai } from "@/config/OpenAiModel";
import { NextResponse, NextRequest } from "next/server";
import { AiSpecialistsDoctors } from "@/shared/list";

export async function POST(request: NextRequest) {
    const { notes } = await request.json();
    try {
        const completion = await openai.chat.completions.create({
    model: "google/gemini-2.5-flash-preview-09-2025",
    messages: [
        { role: "system", content: JSON.stringify( AiSpecialistsDoctors ) },
      { role: "user", content: "User Notes/Symptoms: " + notes +", Depends on user notes and symptoms, please suggest the list of doctors , return object in json only" }
    ],
  })
  const rawResponse = completion.choices[0].message;

// @ts-ignore
  const resp = rawResponse.content.trim().replace('```json','').replace('```','');

  const parsedResponse = JSON.parse(resp);
  
  return NextResponse.json(parsedResponse);

    } catch (error) {
        
        return NextResponse.json(error);
    }

}