"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";
import ViewReportDialog from "./ViewReportDialog";
import { 
  ChevronDown, 
  ChevronUp, 
  History, 
  Search, 
  CalendarClock,
  UserRound,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  historyList: SessionDetail[];
};

function HistoryTable({ historyList }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const INITIAL_COUNT = 5;
  const visibleItems = isExpanded ? historyList : historyList.slice(0, INITIAL_COUNT);
  const hasMore = historyList.length > INITIAL_COUNT;

  if (!historyList || historyList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
        <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
            <Search className="h-6 w-6" />
        </div>
        <p className="text-slate-500 font-medium text-sm">No consultation history found</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg shrink-0">
                <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Consultation History</h2>
                <p className="text-xs text-slate-500">Your past medical sessions</p>
            </div>
        </div>
        <div className="text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
            {historyList.length} Total
        </div>
      </div>

      {/* --- MOBILE VIEW --- */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {visibleItems.map((record, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={record.sessionId || index}
            className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                  {/* FIX: Conditional rendering to avoid empty string src */}
                  {record.selectedDoctor?.image ? (
                    <Image 
                      src={record.selectedDoctor.image} 
                      alt="Doctor" 
                      fill 
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <UserRound className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{record.selectedDoctor?.name}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                    <CalendarClock className="h-3 w-3" />
                    <span>{moment(record.createdAt).format('MMM DD, YYYY')}</span>
                    <span className="text-slate-300 mx-0.5">•</span>
                    <span className="text-slate-400 italic">{moment(record.createdAt).fromNow()}</span>
                  </div>
                </div>
              </div>
              <ViewReportDialog record={record} />
            </div>
            
            <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-2">
              <FileText className="h-3 w-3 text-slate-400" />
              <p className="text-[11px] text-slate-600 truncate italic">
                {record.notes || "No notes available"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:block border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-950">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-semibold text-slate-600">Specialist</TableHead>
              <TableHead className="font-semibold text-slate-600">Consultation Notes</TableHead>
              <TableHead className="font-semibold text-slate-600">Date</TableHead>
              <TableHead className="text-right font-semibold pr-6 text-slate-600">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleItems.map((record, index) => (
              <TableRow key={record.sessionId || index} className="group transition-colors hover:bg-slate-50/50">
                <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50">
                            {/* FIX: Conditional rendering to avoid empty string src */}
                            {record.selectedDoctor?.image ? (
                                <Image src={record.selectedDoctor.image} alt="Doc" fill unoptimized className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full w-full">
                                    <UserRound className="h-5 w-5 text-slate-400" />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{record.selectedDoctor?.name || "Unknown"}</span>
                            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">{record.selectedDoctor?.specialist}</span>
                        </div>
                    </div>
                </TableCell>
                <TableCell className="max-w-[250px] text-slate-600 text-sm truncate">
                  {record.notes}
                </TableCell>
                <TableCell className="text-slate-500 text-sm italic">
                  {moment(record.createdAt).fromNow()}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <ViewReportDialog record={record} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Expand Button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-full bg-white text-xs font-semibold px-6 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            {isExpanded ? (
              <span className="flex items-center gap-1">Show Less <ChevronUp className="h-3 w-3" /></span>
            ) : (
              <span className="flex items-center gap-1">View All Records <ChevronDown className="h-3 w-3" /></span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default HistoryTable;