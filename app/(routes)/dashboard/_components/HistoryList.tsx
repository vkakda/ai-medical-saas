"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { AddNewDialog } from './AddNewDialog'

const HistoryList = () => {

    const [historyList, setHistoryList] = useState([])


  return (
    <div className='mt-10'>
        {historyList.length == 0 ?
        <div className='flex flex-col items-center justify-center p-7 border-2 border-dashed rounded-2xl'>
            <Image className='border rounded-full overflow-hidden' src='/ai-doctor-assistance.png' width={100} height={100} alt='no history' />
            <h2 className='font-bold text-2xl mt-5'>No History Found</h2>   
            <p className='text-gray-500 mt-2'>You have not had any consultations yet. Start a new consultation to see your history here.</p>   
            <AddNewDialog />
        </div>
        : <div>List</div>
        }
    </div>
  )
}

export default HistoryList