"use client";

import { motion } from "motion/react";
import { BentoGridFeature } from "./_components/BentoGridFeature";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Sparkles, Heart } from "lucide-react";

export default function HeroSectionOne() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]"></div>
      <div className="absolute top-0 left-0 right-0 h-[500px] w-full bg-gradient-to-b from-blue-50/50 to-transparent blur-3xl dark:from-blue-900/20 pointer-events-none" />

      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-32 pb-20">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-600 backdrop-blur-md dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-300"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI-Powered Healthcare 2.0</span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="mx-auto max-w-5xl text-center text-5xl font-bold tracking-tight text-slate-900 md:text-7xl lg:leading-[1.1] dark:text-white">
          {"Get Your Medical Consultations with"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-2 block bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 bg-clip-text text-transparent bg-[200%_auto] animate-gradient"
          >
             AI Doctor
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-600 dark:text-slate-400"
        >
          Experience the future of telemedicine. Get instant, personalized health insights and 24/7 access to expert AI medical advice in a secure, private environment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link href={'/dashboard'}>
            <button className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-blue-500/50">
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 -z-10 translate-y-[100%] bg-gradient-to-t from-indigo-600 to-transparent opacity-0 transition-transform duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
            </button>
          </Link>
          
          <Link href={'/sign-in'}>
            <button className="flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
              <ShieldCheck className="h-4 w-4" />
              Patient Login
            </button>
          </Link>
        </motion.div>

        {/* Dashboard Preview (Glassmorphism + Tilt) */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
          className="mt-20 w-full max-w-6xl perspective-1000"
        >
          <div className="relative rounded-xl border border-slate-200/50 bg-slate-100/50 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/50 lg:rounded-2xl lg:p-4">
            <div className="absolute -top-10 left-10 h-32 w-32 rounded-full bg-blue-500/30 blur-[60px]" />
            <div className="absolute -bottom-10 right-10 h-32 w-32 rounded-full bg-violet-500/30 blur-[60px]" />
            
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm dark:border-slate-700">
              <img
                src="https://assets.aceternity.com/pro/aceternity-landing.webp"
                alt="MediCall Dashboard Interface"
                className="h-auto w-full object-cover dark:opacity-90"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 bg-white/50 backdrop-blur-3xl dark:bg-slate-950/50">
         <BentoGridFeature />
      </div>

      <Footer />

    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 mx-auto mt-4 max-w-7xl px-4"
    >
      <div className="flex items-center justify-between rounded-full border border-white/20 bg-white/60 px-6 py-3 shadow-lg shadow-black/[0.03] backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/60">
        <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 shadow-md">
                <Activity className="size-5 text-white" />
            </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Medi<span className="text-blue-600">Call</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
                <Link href={"/sign-in"} className="hidden text-sm font-medium text-slate-600 hover:text-blue-600 md:block dark:text-slate-300">
                    Sign In
                </Link>
                <Link href={"/sign-up"}>
                    <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                    Register
                    </button>
                </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href={'/dashboard'}>
                <Button variant="ghost" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">Dashboard</Button>
              </Link>
              <UserButton appearance={{
                elements: {
                    avatarBox: "h-9 w-9 ring-2 ring-white dark:ring-slate-900"
                }
              }}/>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

const Footer = () => {
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