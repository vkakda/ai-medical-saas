import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing () {
  return (
    <div className='px-5 md:px-16 lg:px-24 '>
        <h2 className='font-bold text-3xl mb-10'>Join Subscription</h2>
        <PricingTable />
    </div>
  )
}

export default Billing