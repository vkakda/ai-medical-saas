'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { IconArrowRight, IconLock } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export type doctorAgents = {
    id: number,
    name: string,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId?: string,
    SubscriptionRequired: boolean
}

type props = {
    doctorAgents: doctorAgents
    isPremiumUser?: boolean
    planLoading?: boolean
}

const DoctorsAgentCard = ({ doctorAgents, isPremiumUser = false, planLoading = false }:props) => {

  const router = useRouter();
  const [starting, setStarting] = useState(false);

  const isLocked = doctorAgents.SubscriptionRequired && !isPremiumUser;

  const onClick = async () => {
    if (isLocked) {
      toast.error('This doctor is Premium. Please upgrade to unlock.');
      router.push('/dashboard/billing');
      return;
    }

    try {
      setStarting(true);
      const result = await axios.post('/api/session-chat', {
        notes: '',
        selectedDoctor: doctorAgents,
      });

      if (result.data?.sessionId) {
        router.push('/dashboard/medical-agent/' + result.data.sessionId);
      } else {
        toast.error('Failed to start consultation');
      }
    } catch (err: any) {
      if (err?.response?.status === 402) {
        toast.error('Free plan allows only 1 consultation. Please upgrade to Premium.');
        router.push('/dashboard/billing');
        return;
      }
      toast.error('Failed to start consultation');
    } finally {
      setStarting(false);
    }
  };


  return (
    <div className='relative'>

      {doctorAgents.SubscriptionRequired && 
      <Badge className='absolute m-2 right-0'>
        Premium
      </Badge>
        }
        <Image src={doctorAgents.image} alt={doctorAgents.name} width={100} height={200} className='w-full h-[200px] object-cover rounded-xl'/>
        <h2 className='font-bold text-gray-900 text-lg mt-2'>{doctorAgents.name}</h2>
        <p className='text-md text-gray-700'>{doctorAgents.specialist}</p>
        <p className='mt-2 text-sm line-clamp-2 text-gray-500'>{doctorAgents.description}</p>
        
        <Button 
        className='mt-4 w-full justify-between' 
        disabled={starting || planLoading}
        variant={isLocked ? "secondary" : "default"}
        onClick={onClick}
      >
        {starting ? 'Starting...' : (isLocked ? 'Upgrade to Unlock' : 'Start Consultation')}
        {starting ? <Loader2 className="animate-spin" size={18} /> : (isLocked ? <IconLock size={18} /> : <IconArrowRight size={18} />)}
      </Button>

    </div>
  )
}

export default DoctorsAgentCard