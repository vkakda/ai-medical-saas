"use client"

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { doctorAgents } from '../../_components/DoctorsAgentCard';
import { Circle, Loader, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { AiSpecialistsDoctors } from '@/shared/list';
import { toast } from 'sonner';


export type SessionDetail = {
    id: number,
    notes: string,
    sessionId: string,
    report: JSON,
    selectedDoctor: doctorAgents,
    createdAt: string,
    createdBy: string;
}

type messages = {
    role: string,
    text: string
}

function MedicalVoiceAgent() {
  const { sessionId } =  useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>()
const [callStarted, setCallStarted] = useState(false)
const [loading, setLoading] = useState(false)
const [vapiInstance, setVapiInstance] = useState<any>()
const [currentRole, setCurrentRole] = useState<string | null>()
const [liveTranscript, setLiveTranscript] = useState<string>()
const [messages, setMessages] = useState<messages[]>([])
const router = useRouter();
  

 

  useEffect(()=>{
    sessionId && GetSessionDetails();
  },[sessionId])

  const GetSessionDetails= async ()=>{
    
    const result = await axios.get('/api/session-chat?sessionId='+sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  }

  // const  StartCall = () => {
  //   const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
  //   setVapiInstance(vapi);

  
  //   vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANCE_ID);

    
  //   vapi.on('call-start', () => {
  //     console.log('Call started');
  //     setCallStarted(true);
  //   });

  //   vapi.on('call-end', () => {
  //     console.log('Call ended');
  //     setCallStarted(false);
  //   });

  //   vapi.on('message', (message) => {
  //     if (message.type === 'transcript') {
  //       console.log(`${message.role}: ${message.transcript}`);
  //     }
  //   });

    
  // }

  const StartCall = async () => {
    setLoading(true)
  // 1. Immediately update UI to show "Connecting..."
  setCallStarted(true); 

  // 1. Get the doctor object from the database session
  const dbDoctor = sessionDetail?.selectedDoctor;

  // 2. Find the "Fresh" version of this doctor from your local list
  // We match by name or ID to get the correct, hardcoded voiceId
  const freshDoctorData = AiSpecialistsDoctors.find(doc => doc.id === dbDoctor?.id);

  // 3. Final Voice Selection Logic
  const finalVoiceId = freshDoctorData?.voiceId || dbDoctor?.voiceId || "en-US-JennyNeural";
  
  // console.log("--- VOICE DEBUG ---");
  // console.log("Doctor Name:", dbDoctor?.name);
  // console.log("Database VoiceId:", dbDoctor?.voiceId);
  // console.log("List VoiceId:", freshDoctorData?.voiceId);
  // console.log("Using Voice:", finalVoiceId);

  try {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    

    const vapiAgentConfig = {
      name:dbDoctor?.name || 'Medical Agent',
      firstMessage:"Hello! I'm here to assist you with your medical concerns. How can I help you today?",
      transcriber: {
        provider:'assembly-ai' as const,
        language:"en"
      },
      voice:{
        provider:'azure' as const,
       voiceId: finalVoiceId
      },
      model:{
        provider:'openai' as const,
        model:'gpt-4o',
        messages:[
          { role: "system", 
            content: freshDoctorData?.agentPrompt || dbDoctor?.agentPrompt || "You are a helpful medical assistant." 
          }
        ]
      }
    };

    // await vapi.start(vapiAgentConfig);

    // 2. Set listeners BEFORE calling .start()
    vapi.on('call-start', () => {
      setLoading(false)
      console.log('Call started');
      setCallStarted(true); // Confirms connection
    });

    vapi.on('call-end', () => {

      setCallStarted(false);
      console.log('Call ended');
    });

   

    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const {role, transcriptType, transcript} = message;
        console.log(`${message.role}: ${message.transcript}`);
        if(transcriptType === 'partial'){
        setLiveTranscript(transcript);
        setCurrentRole(role);
        } else if(transcriptType === 'final'){
          // Final transcript
          setMessages((prev:any) => [...prev, {role:role, text: transcript}]);
          setLiveTranscript('');
          setCurrentRole(null);
        }

      }
    });

     vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole('assistant');
    });

    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user');
    });



    // 3. Trigger the browser permission prompt
    // await vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANCE_ID);
    // console.log("FINAL CONFIG SENT TO VAPI:", vapiAgentConfig);
    await vapi.start(vapiAgentConfig as any);

  } catch (err) {
    // 4. Reset UI if permission is denied or key is missing
    setCallStarted(false);
    console.error("Connection failed:", err);
    alert("Microphone access is required to start the call.");
  }
}


  const endCall = async () => {

    if (!vapiInstance) return;
          vapiInstance.stop();

          // vapiInstance.off('call-start');
          // vapiInstance.off('call-end');
          // vapiInstance.off('message');

          //remove all the instances
          vapiInstance.removeAllListeners();

          //reset call state
          setCallStarted(false);
          setVapiInstance(null);
          
          toast.success('Your report is generated')
          router.replace('/dashboard');
          


    }

    const generateReport = async () => {
      const result = await axios.post('/api/medical-report', {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId
      });

      console.log(result.data)
      return result.data;
      
     }

  return (
    <div className='p-6 border rounded-xl bg-secondary'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className="p-1 px-2 border rounded-md flex gap-2"> <Circle className={`h-2 w-2 rounded-full ${callStarted? 'bg-green-500':'bg-red-500'}`} />{callStarted? 'Connected...': 'Not connected'} </h2>
        <h2 className='font-bold text-xl text-gray-400'>19:20</h2>
      </div>
     {sessionDetail &&  
      <div className='flex items-center flex-col mt-10'>
        <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.name} width={120} 
        height={120}
        className='h-[100px] w-[100px] object-cover rounded-full mb-4'
        />
        <h2 className='mt-2 textlg`'>{sessionDetail?.selectedDoctor?.name}</h2>
        <p className='text-sm text-gray-400'>AI Medical voice agent</p>

        <div className='mt-20 space-y-2 overflow-y-auto flex flex-col items-center  px-10 md:px-33 lg:px-52'>
          {messages?.slice(-4).map((msg:messages, index) => (
            
              <h2   key={index} className='text-gray-400'>{msg.role}:{msg.text}</h2>
            
          ))}
          
         {liveTranscript && liveTranscript?.length>0 && <h2 className='text-lg'>{currentRole}:{liveTranscript}</h2>}

        </div>

        {!callStarted ?
        
        <Button className='mt-10'
          onClick={StartCall} disabled={loading || !sessionDetail?.selectedDoctor?.name}
        >{loading ? <Loader className='animate-spin' /> : <PhoneCall />} Start Call</Button>
        : 
        <Button variant={'destructive'} onClick={endCall} className='mt-10' disabled={loading}>
          {loading ? <Loader className='animate-spin' /> : <PhoneOff />} Disconnect</Button>
        }

      </div>
      }
    </div>
  )
}

export default MedicalVoiceAgent