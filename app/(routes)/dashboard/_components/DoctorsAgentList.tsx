import { AiSpecialistsDoctors } from '@/shared/list'
import React from 'react'
import DoctorsAgentCard from './DoctorsAgentCard'

const DoctorsAgentList = () => {
  return (
    <div className='mt-10'>
        <h2 className='font-bold text-xl'>AI Specialist Doctors Agent</h2>

        <div  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-col-5  gap-10 mt-5'>
            {AiSpecialistsDoctors.map((doctor) => (
                <div key={doctor.id}>
                    <DoctorsAgentCard doctorAgents={doctor} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoctorsAgentList