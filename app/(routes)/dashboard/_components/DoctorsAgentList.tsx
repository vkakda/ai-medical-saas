'use client'

import { AiSpecialistsDoctors } from '@/shared/list'
import React, { useEffect, useState } from 'react'
import DoctorsAgentCard from './DoctorsAgentCard'
import axios from 'axios'

const DoctorsAgentList = () => {
  const [planLoading, setPlanLoading] = useState(true);
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/consultation-eligibility');
        setIsPremiumUser(!!res.data?.isPremium);
      } catch {
        setIsPremiumUser(false);
      } finally {
        setPlanLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className='mt-10'>
        <h2 className='font-bold text-xl'>AI Specialist Doctors Agent</h2>

        <div  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-col-5  gap-10 mt-5'>
            {AiSpecialistsDoctors.map((doctor) => (
                <div key={doctor.id}>
                    <DoctorsAgentCard doctorAgents={doctor} isPremiumUser={isPremiumUser} planLoading={planLoading} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoctorsAgentList