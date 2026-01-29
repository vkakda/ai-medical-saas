import React from 'react'
import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export type doctorAgents = {
    id: number,
    name: string,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId?: string
}

type props = {
    doctorAgents: doctorAgents
}

const DoctorsAgentCard = ({ doctorAgents }:props) => {
  return (
    <div>
        
        <Image src={doctorAgents.image} alt={doctorAgents.name} width={100} height={200} className='w-full h-[200px] object-cover rounded-xl'/>
        <h2 className='font-bold text-gray-900 text-lg mt-2'>{doctorAgents.name}</h2>
        <p className='text-md text-gray-700'>{doctorAgents.specialist}</p>
        <p className='mt-2 text-sm line-clamp-2 text-gray-500'>{doctorAgents.description}</p>
        <Button className='mt-3 cursor-pointer'>Start Consultation <IconArrowRight /></Button>


    </div>
  )
}

export default DoctorsAgentCard