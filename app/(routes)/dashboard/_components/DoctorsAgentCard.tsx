'use client'

import React from 'react'
import Image from 'next/image'
import { IconArrowRight, IconLock } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth, useUser } from '@clerk/nextjs'

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
}

const DoctorsAgentCard = ({ doctorAgents }:props) => {

  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return null;
  
  const isPremiumUser = user?.publicMetadata?.plan === 'premium';

  const isLocked = doctorAgents.SubscriptionRequired && !isPremiumUser;


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
        disabled={isLocked}
        variant={isLocked ? "secondary" : "default"}
      >
        {isLocked ? 'Upgrade to Unlock' : 'Start Consultation'}
        {isLocked ? <IconLock size={18} /> : <IconArrowRight size={18} />}
      </Button>

    </div>
  )
}

export default DoctorsAgentCard