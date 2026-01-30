import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // Added this
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'
import { Calendar, ClipboardList, Stethoscope, User, AlertCircle, Pill, CheckCircle2, Printer, Mail, X } from 'lucide-react'
import { DialogDescription } from '@radix-ui/react-dialog'

type props = {
  record: SessionDetail
}

function ViewReportDialog({ record }: props) {
  const report = record?.report as any;

  if (!report) return <Button variant='ghost' disabled>No Report</Button>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-all'>
          View Report
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto p-0 gap-0 border-none rounded-xl">
        
        {/* Header Section */}
        <div className="bg-slate-900 p-6 text-white sticky top-0 z-10 print:bg-white print:text-slate-900">
          
          {/* Close Button - Top Right Corner */}
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground print:hidden">
            <X className="h-5 w-5 text-slate-400 hover:text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="flex justify-between items-center pr-8">
            <div>
              <h1 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest print:text-blue-600">Medical Summary</h1>
              <DialogTitle className="text-xl font-bold leading-tight">Consultation Report</DialogTitle>
              <DialogDescription className="text-slate-400 text-[11px] mt-1 print:text-slate-500">
                Detailed clinical summary and recommendations for the patient session.
              </DialogDescription>

              <div className="flex items-center gap-3 mt-1 text-slate-400 print:text-slate-500 text-xs">
                 <span className="flex items-center gap-1"><Mail size={12}/> {record?.createdBy}</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="print:hidden bg-white/10 border-none hover:bg-white/20 text-white" onClick={() => window.print()}>
              <Printer size={16} className="mr-2" /> Print
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-5 bg-white text-slate-800 print:p-4">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100 print:bg-transparent print:border-slate-200">
            <div className="space-y-4 text-xs items-center text-slate-600">
              <p className="flex  gap-2"><Stethoscope className="text-blue-600 mt-1" size={14} /> <strong>Doctor:</strong> {record.selectedDoctor?.name} ({record.selectedDoctor?.specialist})</p>
              <p className="flex  gap-2"><User className="text-blue-600" size={14} /> <strong>Patient:</strong> {report.user || 'Anonymous'} ({report.age || 'Age N/A'})</p>
            </div>
            <div className="space-y-4 text-xs text-right md:text-left text-slate-600">
              <p className="flex  gap-2 md:justify-start justify-end">
                <Calendar className="text-blue-600 mt-1" size={14} /> 
                <span>{moment(record?.createdAt).format('DD MMM YYYY, h:mm a')} ({moment(record?.createdAt).fromNow()})</span>
              </p>
              <p className="flex  gap-2 md:justify-start justify-end">
                <AlertCircle className="text-blue-600 mt-1" size={14} /> 
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${report.severity?.toLowerCase() === 'moderate' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                  {report.severity}
                </span>
              </p>
            </div>
          </div>

          {/* Chief Complaint */}
          <section className="bg-blue-50/50 p-3 border-l-4 border-blue-500 rounded-r-md">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-tighter">Chief Complaint</h4>
            <p className="text-sm text-slate-900 font-semibold leading-snug italic">"{report.chiefComplaint}"</p>
          </section>

          {/* Summary Section */}
          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-1 tracking-widest flex items-center gap-1">
              <ClipboardList size={12}/> Summary
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed text-justify">{report.summary}</p>
          </section>

          {/* Two Column Section for Lists */}
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-100">
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Stethoscope size={12}/> Symptoms</h4>
              <ul className="flex flex-wrap gap-1">
                {report.symptoms?.map((s: string, i: number) => (
                  <li key={i} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-slate-700">{s}</li>
                ))}
              </ul>
              <p className="text-[9px] text-slate-400 italic">Duration: {report.duration}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Pill size={12}/> Medications</h4>
              <ul className="text-[11px] space-y-1">
                {report.medicationsMentioned?.map((m: string, i: number) => (
                  <li key={i} className="flex items-center gap-1 text-slate-600">• {m}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations Block */}
          <section className="bg-slate-900 p-4 rounded-lg text-white print:bg-slate-100 print:text-slate-900">
            <h4 className="text-[10px] font-bold text-blue-400 uppercase mb-3 flex items-center gap-1">
              <CheckCircle2 size={12}/> AI Recommendations
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {report.recommendations?.map((r: string, i: number) => (
                <div key={i} className="flex gap-2 text-[11px] leading-tight opacity-90">
                  <span className="text-blue-400 font-bold shrink-0">{i + 1}.</span>
                  <p>{r}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="text-center pt-4 border-t border-dotted text-[9px] text-slate-400 italic">
            Disclaimer: AI-generated reports are preliminary. Verify with a healthcare professional before making medical decisions.
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ViewReportDialog