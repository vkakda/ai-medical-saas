"use client"

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { doctorAgents } from '../../_components/DoctorsAgentCard';
import { Circle, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';

type SessionDetail = {
    id: number,
    notes: string,
    sessionId: string,
    report: JSON,
    selectedDoctor: doctorAgents,
    createdAt: string
}

type messages = {
    role: string,
    text: string
}

function MedicalVoiceAgent() {
  const { sessionId } =  useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>()
const [callStarted, setCallStarted] = useState(false)
const [vapiInstance, setVapiInstance] = useState<any>()
const [currentRole, setCurrentRole] = useState<string | null>()
const [liveTranscript, setLiveTranscript] = useState<string>()
const [messages, setMessages] = useState<messages[]>([])
  

 

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
  // 1. Immediately update UI to show "Connecting..."
  setCallStarted(true); 

  try {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const vapiAgentConfig = {
      name:'AI Medical Voice Agent',
      firstMessage:"Hello! I'm here to assist you with your medical concerns. How can I help you today?",
      transcriber: {
        provider:'assembly-ai',
        language:"en"
      },
      voice:{
        provider:'Azure',
        voiceId: sessionDetail?.selectedDoctor?.voiceId
      },
      model:{
        provider:'openai',
        modelName:'gpt-4',
        messages:[
          { role: "system", content: sessionDetail?.selectedDoctor?.agentPrompt }
        ]
      }
    };

    // vapi.start(vapiAgentConfig);

    // 2. Set listeners BEFORE calling .start()
    vapi.on('call-start', () => {
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

     vapiInstance.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole('assistant');
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user');
    });



    // 3. Trigger the browser permission prompt
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANCE_ID);
    // await vapi.start(vapiAgentConfig);

  } catch (err) {
    // 4. Reset UI if permission is denied or key is missing
    setCallStarted(false);
    console.error("Connection failed:", err);
    alert("Microphone access is required to start the call.");
  }
}


  const endCall = () => {
    if (!vapiInstance) return;
          vapiInstance.stop();

          // vapiInstance.off('call-start');
          // vapiInstance.off('call-end');
          // vapiInstance.off('message');

          vapiInstance.removeAllListeners();

          //reset call state
          setCallStarted(false);
          setVapiInstance(null);
    }

    cost 

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
          onClick={StartCall}
        > <PhoneCall />Start Call</Button>
        : 
        <Button variant={'destructive'} onClick={endCall} className='mt-10'><PhoneOff />Disconnect</Button>
        }

      </div>
      }
    </div>
  )
}

export default MedicalVoiceAgent