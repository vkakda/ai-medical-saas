
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import { Button } from '@/components/ui/button'
import moment from 'moment';

type Props = {
    historyList: SessionDetail[]
}

function HistoryTable({historyList}: Props)  {
  return (
   <Table>
  <TableCaption>Previous consultation Reports</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>AI Medical Specialists</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {historyList.map((record: SessionDetail, index: number) => (
      <TableRow key={record.sessionId ?? index}>
        <TableCell className="font-medium">
          {record.selectedDoctor?.name ?? 'Unknown'}
        </TableCell>
        <TableCell>{record.notes}</TableCell>
        <TableCell>{moment(new Date(record.createdAt)).fromNow()}</TableCell>
        <TableCell className="text-right">
          <Button variant={'ghost'} className='cursor-pointer'>View Report</Button>
        </TableCell>
      </TableRow>
    ))}
    
  </TableBody>
</Table>
  )
}

export default HistoryTable