import React from 'react'
import { doctorAgents } from './DoctorsAgentCard'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type props = {
    doctorAgents: doctorAgents,
    setSelectedDoctor: any,
    selectedDoctor:doctorAgents
}

function SuggestedDoctors({ doctorAgents,setSelectedDoctor,selectedDoctor }: props) {


  return (
    <div className={`flex flex-col items-center  border-2 p-4 rounded-2xl shadow-sm hover:border-blue-400 hover:shadow-md transition cursor-pointer ${ selectedDoctor?.id == doctorAgents.id && 'border-blue-800 shadow-md'}`} 
    onClick={() => setSelectedDoctor(doctorAgents)}>

      <div className="relative w-14 h-14 mb-2 shrink-0">
      <Image src={doctorAgents.image} alt={doctorAgents.name} 
          sizes="56px"
          className="object-cover rounded-full"
          priority 
      />
      </div>
      
        <h3 className="font-bold text-sm text-neutral-900 text-center">{doctorAgents.name}</h3>
        <p className="text-xs text-gray-600 text-center">{doctorAgents.specialist}</p>
        <p className="mt-1 text-xs text-gray-500 text-center line-clamp-2">{doctorAgents.description}</p>
        
    </div>
  )
}

export default SuggestedDoctors