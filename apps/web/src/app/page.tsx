"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Mic, FileText, ShieldCheck, Activity, 
  Construction, Users, CheckCircle2, ArrowRight, 
  Play, MapPin, Search, Building2, Scale, 
  FileCheck, Lock, ChevronRight, Star, AlertCircle
} from "lucide-react";
// import { cn } from "@/lib/utils";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 0. Brand Config & Utilities ---
// Hardcoded premium palette to ensure it looks exactly right regardless of your config
const COLORS = {
  bg: "#FAFAF9",      // Stone-50 (Paper)
  surface: "#FFFFFF", // White
  border: "#E7E5E4",  // Stone-200
  textMain: "#292524",// Stone-800 (Espresso)
  textMuted: "#78716C",// Stone-500
  accent: "#A69284",  // Architectural Clay
  success: "#059669", // Emerald
  error: "#B91C1C",   // Red
};

// --- 1. Ultra-Premium Components ---

const SectionHeader = ({ label, title, subtitle }: { label: string, title: string, subtitle?: string }) => (
  <div className="mb-16">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-4"
    >
      <span className="h-px w-8 bg-[#A69284]"></span>
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#A69284]">{label}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-serif text-[#292524] leading-tight mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-[#78716C] max-w-2xl font-light leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FeatureCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "bg-white border border-[#E7E5E4] p-8 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(41,37,36,0.05)] hover:border-[#A69284]/50 group relative overflow-hidden",
    className
  )}>
    {children}
  </div>
);

// --- 2. Realistic UI Mockups (The "Real App" feel) ---

const MockDashboard = () => (
  <div className="w-full bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border border-[#E7E5E4] overflow-hidden">
    {/* App Header */}
    <div className="h-14 border-b border-[#E7E5E4] flex items-center justify-between px-6 bg-[#FAFAF9]">
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#E7E5E4]"></div>
          <div className="w-3 h-3 rounded-full bg-[#E7E5E4]"></div>
        </div>
        <div className="h-5 w-px bg-[#E7E5E4]"></div>
        <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wide">Project: City Center Mall</span>
      </div>
      <div className="flex gap-3">
        <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-100 rounded-sm">Active Site</span>
      </div>
    </div>
    
    {/* App Body */}
    <div className="p-8 grid grid-cols-12 gap-8 bg-white h-[400px]">
      {/* Left Sidebar */}
      <div className="col-span-3 border-r border-[#E7E5E4] pr-6 space-y-6">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-[#A69284] mb-2">Budget</div>
          <div className="text-3xl font-serif text-[#292524]">₹ 12.4 Cr</div>
          <div className="text-xs text-green-600 mt-1 flex items-center gap-1"><CheckCircle2 size={10}/> On Track</div>
        </div>
        <div className="space-y-2">
           <div className="text-[10px] uppercase tracking-widest text-[#A69284]">Phase Status</div>
           {['Excavation', 'Foundation', 'Structure'].map((phase, i) => (
             <div key={phase} className="flex items-center justify-between p-2 rounded bg-[#FAFAF9] border border-[#E7E5E4]">
                <span className="text-xs font-medium text-[#292524]">{phase}</span>
                {i === 2 ? <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div> : <CheckCircle2 size={12} className="text-green-600"/>}
             </div>
           ))}
        </div>
      </div>

      {/* Main Feed */}
      <div className="col-span-9 space-y-4">
        <div className="flex justify-between items-center mb-4">
           <h4 className="font-serif text-lg text-[#292524]">Site Activity Log</h4>
           <span className="text-xs text-[#78716C]">Live Feed</span>
        </div>
        
        {/* Item 1: Voice Note */}
        <div className="flex gap-4 p-4 rounded-lg border border-[#E7E5E4] hover:border-[#A69284] transition-colors cursor-pointer group">
           <div className="w-10 h-10 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] flex items-center justify-center text-[#292524] group-hover:bg-[#292524] group-hover:text-white transition-colors">
              <Mic size={18} />
           </div>
           <div className="flex-1">
              <div className="flex justify-between">
                 <span className="text-sm font-bold text-[#292524]">Voice Log #8821</span>
                 <span className="text-xs text-[#78716C]">10:30 AM</span>
              </div>
              <p className="text-sm text-[#78716C] mt-1 italic">"Unloaded 500 bags of Ultratech Cement at Gate B. Invoice verified."</p>
              {/* Audio Wave Visual */}
              <div className="flex gap-1 mt-2 h-4 items-end opacity-50">
                 {[3, 8, 5, 10, 6, 12, 4, 8].map((h,i) => <div key={i} style={{height: `${h}0%`}} className="w-1 bg-[#292524] rounded-full"></div>)}
              </div>
           </div>
        </div>

        {/* Item 2: Tender Match */}
        <div className="flex gap-4 p-4 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9]">
           <div className="w-10 h-10 rounded-full bg-white border border-[#E7E5E4] flex items-center justify-center text-[#292524]">
              <Scale size={18} />
           </div>
           <div className="flex-1">
              <div className="flex justify-between">
                 <span className="text-sm font-bold text-[#292524]">Tender Allocation Alert</span>
                 <span className="text-xs text-[#78716C]">Yesterday</span>
              </div>
              <p className="text-sm text-[#78716C] mt-1">
                 System flagged <span className="font-medium text-[#292524]">Ramesh Infra</span> as high risk due to 3 previous delays.
              </p>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// --- 3. Main Page Component ---

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"govt" | "engineer" | "supplier">("engineer");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen font-sans selection:bg-[#292524] selection:text-white" style={{ backgroundColor: COLORS.bg, color: COLORS.textMain }}>
      
      {/* Subtle Paper Texture Overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.4] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cardboard.png')]"></div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 bg-[#292524] text-white flex items-center justify-center font-serif font-bold text-xl rounded-sm">B</div>
            <span className="font-serif font-bold text-xl tracking-tight text-[#292524]">BRIXA</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-[#78716C]">
            <a href="#manifesto" className="hover:text-[#292524] transition-colors">Manifesto</a>
            <a href="#platform" className="hover:text-[#292524] transition-colors">Platform</a>
            <a href="#transparency" className="hover:text-[#292524] transition-colors">Transparency</a>
          </div>
          <div className="flex gap-4">
             <button className="text-sm font-medium text-[#292524] hover:underline">Sign In</button>
             <button className="px-6 py-2 bg-[#292524] text-white text-sm font-medium rounded-sm hover:bg-[#44403C] transition-colors shadow-lg">
                Get Started
             </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">
        
        {/* --- Hero Section --- */}
        <section className="relative px-6 max-w-7xl mx-auto mb-32">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Hero Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <div className="inline-block px-3 py-1 mb-6 border border-[#A69284] rounded-full">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#A69284]">The OS for Infrastructure</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-serif font-medium leading-[1.05] text-[#292524] mb-8">
                Construction with <br/>
                <span className="italic text-[#A69284]">Radical Integrity.</span>
              </h1>
              <p className="text-xl text-[#78716C] font-light leading-relaxed mb-10 max-w-lg">
                Connect tenders, engineers, and auditors in one luxurious ecosystem. Verify every brick, every rupee, every deadline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="h-14 px-8 bg-[#292524] text-white font-medium text-lg rounded-sm hover:bg-[#44403C] transition-all shadow-[4px_4px_0px_0px_rgba(166,146,132,0.4)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]">
                  Request Access
                </button>
                <button className="h-14 px-8 border border-[#292524] text-[#292524] font-medium text-lg rounded-sm hover:bg-[#E7E5E4] transition-colors flex items-center gap-2">
                  <Play size={16} fill="currentColor" /> Watch Film
                </button>
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 0.2 }}
               className="lg:col-span-6 relative perspective-1000"
            >
               <div className="absolute top-0 right-0 w-full h-full bg-[#A69284] opacity-10 rounded-full blur-[100px] -z-10"></div>
               <MockDashboard />
               {/* Floating Mobile Mockup */}
               <motion.div 
                  style={{ y }}
                  className="absolute -bottom-12 -left-8 w-48 bg-[#292524] rounded-2xl p-3 border-4 border-white shadow-2xl"
               >
                  <div className="bg-white rounded-xl p-4 h-64 flex flex-col justify-between">
                     <div>
                        <div className="text-[10px] uppercase text-[#78716C] tracking-widest mb-2">Attendance</div>
                        <div className="text-2xl font-serif text-[#292524]">42 / 45</div>
                        <div className="text-xs text-green-600 font-medium">Workers On Site</div>
                     </div>
                     <div className="p-2 bg-[#FAFAF9] rounded border border-[#E7E5E4]">
                        <div className="flex items-center gap-2 mb-1">
                           <div className="w-6 h-6 rounded-full bg-[#A69284]"></div>
                           <span className="text-xs font-bold">Foreman</span>
                        </div>
                        <div className="text-[10px] text-[#78716C]">"Material delivery delayed by 20m."</div>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Ecosystem Section (The Solution) --- */}
        <section id="platform" className="py-32 border-y border-[#E7E5E4] bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              label="Unified Ecosystem" 
              title="Orchestrating the Chaos." 
              subtitle="Construction is fragmented. We bring the Government, Contractors, and Suppliers into a single source of truth."
            />

            <div className="grid lg:grid-cols-12 gap-12">
               {/* Sidebar Navigation */}
               <div className="lg:col-span-4 space-y-2">
                  {[
                    { id: 'govt', label: 'Government & Tenders', icon: Building2 },
                    { id: 'engineer', label: 'Site Engineers', icon: Construction },
                    { id: 'supplier', label: 'Material Suppliers', icon: FileText }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={cn(
                        "w-full text-left px-6 py-5 rounded-lg border transition-all duration-300 flex items-center justify-between group",
                        activeTab === item.id 
                          ? "bg-[#292524] border-[#292524] text-white shadow-xl" 
                          : "bg-[#FAFAF9] border-transparent text-[#78716C] hover:bg-[#F5F5F4]"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={20} className={activeTab === item.id ? "text-[#A69284]" : "text-[#A69284]"} />
                        <span className="font-medium text-lg">{item.label}</span>
                      </div>
                      {activeTab === item.id && <ChevronRight size={16} />}
                    </button>
                  ))}
               </div>

               {/* Content Display Area */}
               <div className="lg:col-span-8 bg-[#FAFAF9] rounded-2xl border border-[#E7E5E4] p-12 relative overflow-hidden min-h-[500px] flex items-center justify-center">
                  <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="w-full max-w-lg"
                    >
                      {activeTab === 'govt' && (
                        <div className="bg-white rounded-xl shadow-xl border border-[#E7E5E4] overflow-hidden">
                          <div className="bg-[#292524] text-white p-6">
                             <h3 className="font-serif text-2xl">Tender Intelligence</h3>
                             <p className="text-[#A69284] text-sm mt-2">AI-Risk Analysis Module</p>
                          </div>
                          <div className="p-6 space-y-4">
                             <div className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded">
                                <div className="flex items-center gap-3">
                                   <AlertCircle className="text-red-600" size={18} />
                                   <div>
                                      <div className="text-sm font-bold text-red-900">Applicant: Star Const.</div>
                                      <div className="text-xs text-red-700">High Risk: 40% History of Delays</div>
                                   </div>
                                </div>
                                <span className="text-xs font-bold text-red-600 px-2 py-1 bg-white rounded border border-red-200">REJECT</span>
                             </div>
                             <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded">
                                <div className="flex items-center gap-3">
                                   <CheckCircle2 className="text-green-600" size={18} />
                                   <div>
                                      <div className="text-sm font-bold text-green-900">Applicant: Apex Infra</div>
                                      <div className="text-xs text-green-700">Excellent: 98% Budget Adherence</div>
                                   </div>
                                </div>
                                <span className="text-xs font-bold text-green-600 px-2 py-1 bg-white rounded border border-green-200">SHORTLIST</span>
                             </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'engineer' && (
                        <div className="bg-white rounded-xl shadow-xl border border-[#E7E5E4] p-8 text-center">
                           <div className="w-24 h-24 mx-auto bg-[#FAFAF9] rounded-full flex items-center justify-center mb-6 border border-[#E7E5E4]">
                              <Construction size={40} className="text-[#292524]" />
                           </div>
                           <h3 className="text-2xl font-serif text-[#292524] mb-2">Digital Reputation Profile</h3>
                           <p className="text-[#78716C] mb-6">
                              Engineers build a verified "CV" of completed projects, efficiency ratings, and material handling scores.
                           </p>
                           <div className="grid grid-cols-3 gap-4 border-t border-[#E7E5E4] pt-6">
                              <div>
                                 <div className="text-2xl font-bold text-[#292524]">12</div>
                                 <div className="text-[10px] uppercase text-[#78716C] tracking-wider">Projects</div>
                              </div>
                              <div>
                                 <div className="text-2xl font-bold text-green-600">98%</div>
                                 <div className="text-[10px] uppercase text-[#78716C] tracking-wider">On Time</div>
                              </div>
                              <div>
                                 <div className="text-2xl font-bold text-[#292524]">A+</div>
                                 <div className="text-[10px] uppercase text-[#78716C] tracking-wider">Rating</div>
                              </div>
                           </div>
                        </div>
                      )}

                      {activeTab === 'supplier' && (
                        <div className="bg-white rounded-xl shadow-xl border border-[#E7E5E4] overflow-hidden">
                           <div className="p-6 border-b border-[#E7E5E4]">
                              <div className="flex justify-between items-center">
                                 <h3 className="font-serif text-xl text-[#292524]">Live Demand Feed</h3>
                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              </div>
                              <p className="text-xs text-[#78716C] mt-1">Nearby construction sites requesting materials</p>
                           </div>
                           <div className="p-2">
                              {[1, 2].map(i => (
                                 <div key={i} className="flex justify-between items-center p-4 hover:bg-[#FAFAF9] rounded transition-colors">
                                    <div>
                                       <div className="text-sm font-bold text-[#292524]">5,000 Red Bricks</div>
                                       <div className="text-xs text-[#78716C] flex items-center gap-1"><MapPin size={10}/> Site: Govt School, Sector 4</div>
                                    </div>
                                    <button className="px-3 py-1 bg-[#292524] text-white text-xs font-bold rounded-sm">BID NOW</button>
                                 </div>
                              ))}
                           </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>
          </div>
        </section>

        {/* --- Bento Grid Features (The Toolkit) --- */}
        <section className="py-32 bg-[#FAFAF9]">
           <div className="max-w-7xl mx-auto px-6">
              <SectionHeader 
                 label="The Toolkit" 
                 title="Built for the Field." 
                 subtitle="Engineers don't need more paperwork. They need tools that work as hard as they do."
              />

              <div className="grid md:grid-cols-3 gap-8">
                 {/* Feature 1: Voice */}
                 <FeatureCard className="md:col-span-2">
                    <div className="flex flex-col md:flex-row justify-between h-full">
                       <div className="space-y-4 max-w-md">
                          <div className="w-12 h-12 bg-[#292524] text-white flex items-center justify-center rounded-lg">
                             <Mic size={24} />
                          </div>
                          <h3 className="text-2xl font-serif text-[#292524]">Voice-to-Ledger</h3>
                          <p className="text-[#78716C] leading-relaxed">
                             Stop typing on dusty screens. Simply speak: <br/>
                             <span className="font-medium italic text-[#292524]">"Unloaded 200 bags of cement."</span> <br/>
                             Our AI parses the audio, verifies the invoice via OCR, and updates the project ledger instantly.
                          </p>
                       </div>
                       <div className="mt-8 md:mt-0 w-full md:w-1/3 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg p-4 flex items-center justify-center">
                          <div className="flex gap-1 items-end h-12">
                             {[4, 7, 3, 9, 5, 8, 3, 6].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  animate={{ height: ["20%", "100%", "20%"] }}
                                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                                  className="w-1.5 bg-[#A69284] rounded-full"
                                />
                             ))}
                          </div>
                       </div>
                    </div>
                 </FeatureCard>

                 {/* Feature 2: Vault */}
                 <FeatureCard>
                    <div className="w-10 h-10 bg-[#E7E5E4] text-[#292524] flex items-center justify-center rounded-lg mb-6">
                       <Lock size={20} />
                    </div>
                    <h3 className="text-xl font-serif text-[#292524] mb-2">Blueprint Vault</h3>
                    <p className="text-sm text-[#78716C] mb-6">
                       Centralized, version-controlled storage for CAD/PDFs. No more building from old drawings.
                    </p>
                    <div className="space-y-2">
                       <div className="flex items-center gap-2 p-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-xs text-[#292524]">
                          <FileCheck size={12} className="text-green-600"/> Structure_v4.dwg
                       </div>
                       <div className="flex items-center gap-2 p-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded text-xs text-[#78716C] opacity-60">
                          <FileText size={12}/> Structure_v3_OLD.dwg
                       </div>
                    </div>
                 </FeatureCard>

                 {/* Feature 3: Transparency */}
                 <FeatureCard className="md:col-span-3 bg-[#292524] text-white group hover:border-[#A69284] border-transparent">
                    <div className="absolute top-0 right-0 p-32 opacity-5">
                       <Building2 size={300} />
                    </div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                       <div>
                          <div className="inline-block px-3 py-1 mb-4 border border-[#A69284] rounded-full text-[#A69284] text-[10px] font-bold tracking-[0.2em] uppercase">
                             Public Trust Protocol
                          </div>
                          <h3 className="text-4xl font-serif mb-4">If you build it right, <br/>show the world.</h3>
                          <p className="text-[#A69284] text-lg font-light mb-8">
                             Every project generates a unique QR code. Citizens can scan to verify budget allocation, deadlines, and see progress photos verified by AI.
                          </p>
                          <button className="px-6 py-3 bg-white text-[#292524] font-medium rounded-sm hover:bg-[#E7E5E4] transition-colors">
                             Explore Public Registry
                          </button>
                       </div>
                       <div className="bg-white p-4 rounded-lg max-w-xs mx-auto text-center transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                          <div className="border-2 border-dashed border-[#292524] p-8 rounded-lg">
                             <div className="w-32 h-32 bg-[#292524] mx-auto mb-4"></div> 
                             {/* In real app, use actual QR code */}
                             <p className="text-[#292524] font-bold text-lg">SCAN TO VERIFY</p>
                             <p className="text-xs text-[#78716C] mt-1">Project ID: #9928-A</p>
                          </div>
                       </div>
                    </div>
                 </FeatureCard>
              </div>
           </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-[#292524] text-[#E7E5E4] py-20">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12 mb-16">
                 <div className="col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                       <div className="h-6 w-6 bg-white text-[#292524] flex items-center justify-center font-serif font-bold rounded-sm">B</div>
                       <span className="font-serif font-bold text-lg tracking-tight text-white">BRIXA</span>
                    </div>
                    <p className="text-[#A69284] text-sm leading-relaxed">
                       Bridging the gap between blueprint and reality. The premium operating system for the modern construction industry.
                    </p>
                 </div>
                 <div>
                    <h4 className="font-serif text-white mb-6">Platform</h4>
                    <ul className="space-y-3 text-sm text-[#A69284]">
                       <li><a href="#" className="hover:text-white transition-colors">Tender Management</a></li>
                       <li><a href="#" className="hover:text-white transition-colors">Supplier Network</a></li>
                       <li><a href="#" className="hover:text-white transition-colors">Public Audit</a></li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-serif text-white mb-6">Company</h4>
                    <ul className="space-y-3 text-sm text-[#A69284]">
                       <li><a href="#" className="hover:text-white transition-colors">Manifesto</a></li>
                       <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                       <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-serif text-white mb-6">Newsletter</h4>
                    <div className="flex gap-2">
                       <input type="email" placeholder="Email Address" className="w-full bg-[#44403C] border-none rounded-sm px-4 py-2 text-sm focus:ring-1 focus:ring-[#A69284]" />
                       <button className="px-3 bg-[#A69284] text-[#292524] rounded-sm"><ArrowRight size={16}/></button>
                    </div>
                 </div>
              </div>
              <div className="border-t border-[#44403C] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#78716C]">
                 <span>© 2025 BRIXA INC.</span>
                 <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy</a>
                    <a href="#" className="hover:text-white">Terms</a>
                    <a href="#" className="hover:text-white">Sitemap</a>
                 </div>
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
}