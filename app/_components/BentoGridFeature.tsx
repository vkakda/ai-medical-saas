"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  IconStethoscope,
  IconBrain,
  IconReportMedical,
  IconHeartRateMonitor,
  IconMicrophone,
} from "@tabler/icons-react"; // Make sure to install these or use Lucide equivalents
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function BentoGridFeature() {
  return (
    <div className="py-20 px-4">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose MediCall AI?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Advanced diagnostics met with human-like empathy.</p>
        </div>
        <BentoGrid className="mx-auto max-w-5xl md:auto-rows-[20rem]">
        {items.map((item, i) => (
            <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn("[&>p:text-lg]", item.className)}
            icon={item.icon}
            />
        ))}
        </BentoGrid>
    </div>
  );
}

// --- MEDICAL THEMED VISUALIZATIONS ---

// 1. Scanning Effect (AI Diagnosis)
const SkeletonDiagnosis = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 overflow-hidden relative border border-transparent dark:border-white/[0.1]">
      <div className="absolute inset-0 flex flex-col justify-center px-8 opacity-30">
        <div className="h-2 w-3/4 bg-slate-400 rounded mb-2"></div>
        <div className="h-2 w-full bg-slate-400 rounded mb-2"></div>
        <div className="h-2 w-5/6 bg-slate-400 rounded mb-2"></div>
      </div>
      
      {/* Scanning Beam */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-10"
      />
      
      <div className="absolute bottom-4 right-4 bg-white dark:bg-black rounded-lg px-3 py-1 text-xs font-bold text-blue-600 shadow-sm border border-blue-100">
        Diagnosis: Complete
      </div>
    </div>
  );
};

// 2. Chat Interface (Contextual Suggestions)
const SkeletonChat = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 dark:bg-black flex-col p-4 space-y-3 border border-neutral-200 dark:border-white/[0.1] relative overflow-hidden">
      {/* Doctor Message */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-2"
      >
        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
            <IconBrain className="h-4 w-4 text-blue-600" />
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl rounded-tl-none p-2 text-[10px] shadow-sm max-w-[80%]">
             Based on your symptoms, I recommend seeing a cardiologist.
        </div>
      </motion.div>

      {/* User Message */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="flex items-start gap-2 flex-row-reverse ml-auto"
      >
        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-2 text-[10px] shadow-sm max-w-[80%]">
            Can I schedule that now?
        </div>
      </motion.div>

       {/* Typing Indicator */}
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-4 left-4 flex gap-1"
       >
         <div className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"></div>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-100"></div>
         <div className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce delay-200"></div>
       </motion.div>
    </div>
  );
};

// 3. Heart Rate Wave (Sentiment/Vitals)
const SkeletonVitals = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 flex-col justify-between relative overflow-hidden">
      <div className="flex justify-between items-center z-10">
        <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Live Vitals</span>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>
      
      {/* SVG Heartbeat Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <svg viewBox="0 0 500 150" className="w-full h-20 stroke-blue-400 fill-none stroke-2">
            <motion.path
                d="M0 75 H 100 L 120 20 L 140 130 L 160 75 H 500"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1, x: [-200, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </svg>
      </div>

      <div className="flex gap-4 z-10">
        <div>
            <div className="text-2xl font-bold text-white">72<span className="text-sm text-slate-400 font-normal ml-1">bpm</span></div>
            <div className="text-[10px] text-slate-500">Heart Rate</div>
        </div>
        <div>
            <div className="text-2xl font-bold text-white">98%</div>
            <div className="text-[10px] text-slate-500">O2 Level</div>
        </div>
      </div>
    </div>
  );
};

// 4. Report Generation (Summarization)
const SkeletonReport = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-white/[0.1] p-4 flex-col relative"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
            <IconReportMedical size={18} />
        </div>
        <div className="flex-1">
            <div className="h-2 w-20 bg-gray-200 rounded"></div>
            <div className="h-2 w-12 bg-gray-100 rounded mt-1"></div>
        </div>
      </div>
      
      <div className="space-y-2">
        <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            className="h-2 bg-slate-100 rounded" 
        />
        <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80%" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-2 bg-slate-100 rounded" 
        />
        <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "90%" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-2 bg-slate-100 rounded" 
        />
      </div>
      
      <div className="mt-auto flex justify-end">
        <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">Ready for download</span>
      </div>
    </motion.div>
  );
};

// 5. Voice Analysis (Voice Recognition)
const SkeletonVoice = () => {
    return (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-tr from-violet-500 to-purple-500 p-4 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Sound Waves */}
        <div className="flex items-center gap-1 h-12 z-10">
            {[1,2,3,4,5].map((i) => (
                <motion.div 
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 bg-white/80 rounded-full"
                />
            ))}
        </div>
        <div className="absolute bottom-2 text-[10px] text-white/80 font-medium tracking-widest uppercase">Recording...</div>
      </div>
    );
};

// --- DATA ITEMS ---

const items = [
  {
    title: "AI Diagnosis Engine",
    description: (
      <span className="text-sm text-slate-500">
        Advanced symptom checking algorithms powered by state-of-the-art medical LLMs.
      </span>
    ),
    header: <SkeletonDiagnosis />,
    className: "md:col-span-1",
    icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Smart Prescriptions",
    description: (
      <span className="text-sm text-slate-500">
        Automated prescription analysis and drug interaction warnings.
      </span>
    ),
    header: <SkeletonReport />,
    className: "md:col-span-1",
    icon: <IconReportMedical className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Real-time Consultation",
    description: (
      <span className="text-sm text-slate-500">
        Chat seamlessly with our AI doctors who remember your full medical history.
      </span>
    ),
    header: <SkeletonChat />,
    className: "md:col-span-1",
    icon: <IconStethoscope className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Vitals Monitoring",
    description: (
      <span className="text-sm text-slate-500">
        Connect wearable devices to track heart rate, O2, and stress levels in real-time.
      </span>
    ),
    header: <SkeletonVitals />,
    className: "md:col-span-2",
    icon: <IconHeartRateMonitor className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Voice-to-Text Records",
    description: (
      <span className="text-sm text-slate-500">
        Dictate symptoms and receive structured medical summaries instantly.
      </span>
    ),
    header: <SkeletonVoice />,
    className: "md:col-span-1",
    icon: <IconMicrophone className="h-4 w-4 text-neutral-500" />,
  },
];