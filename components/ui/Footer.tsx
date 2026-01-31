import { Activity, Heart } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
    return (
      <footer className="relative z-10 border-t border-slate-200 bg-white/80 py-8 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          
          {/* Copyright Text */}
          <div className="flex items-center gap-2">
             <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
             </div>
             <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} MediCall AI.
            </p>
          </div>
          
          {/* Links or Socials (Optional) */}
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link>
          </div>
  
          {/* Developer Credit */}
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <span>Developed by</span>
            <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              <Heart className="h-3 w-3 fill-red-500 text-red-500" /> 
              Vishal
            </span>
          </div>
  
        </div>
      </footer>
    )
  }