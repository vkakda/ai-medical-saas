import React from 'react'
import HistoryList from './_components/HistoryList'

import DoctorsAgentList from './_components/DoctorsAgentList'
import { AddNewDialog } from './_components/AddNewDialog'

const Dashboard = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
            <h2 className='font-bold text-2xl'>My Dashboard</h2>
            <AddNewDialog />
        </div>
        
        <HistoryList />

        <DoctorsAgentList />    
    </div>
  )
}

export default Dashboard