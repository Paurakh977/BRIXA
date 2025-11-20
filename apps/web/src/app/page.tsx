"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Mic, FileText, ShieldCheck, Activity, 
  Construction, Users, CheckCircle2, ArrowRight, 
  Play, MapPin, Search, Building2, Scale, 
  FileCheck, Lock, ChevronRight, Star, AlertCircle,
  TrendingUp, Layers, LayoutGrid, BadgeCheck, Menu, X, DollarSign
} from "lucide-react";
// import { cn } from "@/lib/utils";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 0. LUXURY DESIGN TOKENS ---
const COLORS = {
  bg: "#F5F5F4",        // Stone-100 (Rich Paper)
  surface: "#FFFFFF",   // White
  border: "#D6D3D1",    // Stone-300 (Crisp Lines)
  textMain: "#1C1917",  // Stone-900 (Ink Black)
  textMuted: "#57534E", // Stone-600 (Graphite)
  accent: "#8E857E",    // Clay/Taupe (Brand)
  success: "#047857",   // Emerald-700
  warning: "#B45309",   // Amber-700
};


// --- 1. MICRO-COMPONENTS ---

const SectionLabel = ({ children }: { children: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-px w-8 bg-[#8E857E]"></div>
    <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8E857E]">{children}</span>
  </div>
);

const Badge = ({ children, variant = "neutral" }: { children: React.ReactNode, variant?: "neutral" | "success" | "warning" | "dark" }) => {
  const styles = {
    neutral: "bg-[#F5F5F4] text-[#57534E] border-[#D6D3D1]",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    dark: "bg-[#1C1917] text-white border-[#1C1917]"
  };
  return (
    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 w-fit", styles[variant])}>
      {children}
    </span>
  );
};

// --- 2. RICH UI MOCKUPS (No Blank Spaces) ---

// A. HERO DASHBOARD (The "Control Center")
const HeroDashboard = () => (
  <div className="w-full bg-white rounded-xl shadow-2xl shadow-[#1C1917]/10 border border-[#D6D3D1] overflow-hidden relative z-10">
    {/* Header */}
    <div className="h-12 border-b border-[#D6D3D1] flex items-center justify-between px-4 bg-[#FAFAF9]">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#D6D3D1]"/><div className="w-2.5 h-2.5 rounded-full bg-[#D6D3D1]"/></div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#57534E]">Project: Skyline Tower Ph-1</span>
      </div>
      <div className="flex items-center gap-2">
         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
         <span className="text-[10px] font-bold text-green-700">LIVE</span>
      </div>
    </div>
    
    {/* Body */}
    <div className="p-6 grid grid-cols-12 gap-6 bg-[#F5F5F4]/50">
      {/* Sidebar Metrics */}
      <div className="col-span-4 space-y-4">
        <div className="bg-white p-4 rounded-lg border border-[#D6D3D1] shadow-sm">
          <div className="text-[10px] uppercase text-[#8E857E] mb-1">Budget Utilized</div>
          <div className="text-2xl font-serif text-[#1C1917]">₹ 4.2 Cr</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">▼ 5% Under Budget</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D6D3D1] shadow-sm">
          <div className="text-[10px] uppercase text-[#8E857E] mb-1">Workforce</div>
          <div className="flex items-center gap-2">
             <Users size={16} className="text-[#1C1917]"/>
             <span className="text-xl font-serif text-[#1C1917]">142</span>
          </div>
          <div className="text-[10px] text-[#57534E] mt-1">Active on site</div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="col-span-8 space-y-3">
         <div className="text-[10px] font-bold uppercase text-[#57534E] mb-1">Recent Logs</div>
         
         {/* Log Item 1 */}
         <div className="bg-white p-3 rounded-lg border border-[#D6D3D1] shadow-sm flex gap-3 items-start">
            <div className="p-2 bg-[#F5F5F4] rounded text-[#1C1917]"><Mic size={14}/></div>
            <div className="flex-1">
               <div className="flex justify-between">
                  <span className="text-xs font-bold text-[#1C1917]">Material Unload</span>
                  <span className="text-[10px] text-[#8E857E]">10:42 AM</span>
               </div>
               <p className="text-xs text-[#57534E] italic mt-1">"Unloaded 500 bags Ultratech cement. Invoice #882 verified."</p>
            </div>
         </div>

         {/* Log Item 2 */}
         <div className="bg-white p-3 rounded-lg border border-[#D6D3D1] shadow-sm flex gap-3 items-start">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded"><CheckCircle2 size={14}/></div>
            <div className="flex-1">
               <div className="flex justify-between">
                  <span className="text-xs font-bold text-[#1C1917]">Milestone Reached</span>
                  <span className="text-[10px] text-[#8E857E]">09:15 AM</span>
               </div>
               <p className="text-xs text-[#57534E] mt-1">Foundation Layer B - Completed & Audited.</p>
            </div>
         </div>
      </div>
    </div>
  </div>
);

// B. ECOSYSTEM VISUALS (Dynamic Content)
const EngineerProfileMock = () => (
  <div className="w-full h-full bg-white border border-[#D6D3D1] rounded-xl shadow-lg p-6 relative overflow-hidden flex flex-col justify-between">
     {/* Header */}
     <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-[#1C1917] rounded-full flex items-center justify-center text-white font-serif text-xl">RM</div>
        <div>
           <h4 className="font-bold text-[#1C1917] text-lg">Rajeev Mehta</h4>
           <p className="text-xs text-[#57534E]">Senior Civil Contractor</p>
           <div className="flex text-amber-500 text-[10px] gap-0.5 mt-1">
              <Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/><Star size={10} fill="currentColor"/>
           </div>
        </div>
     </div>
     {/* Stats */}
     <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-[#F5F5F4] rounded">
           <div className="text-[10px] text-[#8E857E] uppercase">Projects</div>
           <div className="text-xl font-bold text-[#1C1917]">42</div>
        </div>
        <div className="p-3 bg-[#F5F5F4] rounded">
           <div className="text-[10px] text-[#8E857E] uppercase">On-Time</div>
           <div className="text-xl font-bold text-emerald-700">98%</div>
        </div>
     </div>
     <div className="mt-4 pt-4 border-t border-[#D6D3D1]">
        <Badge variant="success"><BadgeCheck size={10}/> KYC Verified</Badge>
     </div>
  </div>
);

const SupplierMarketMock = () => (
  <div className="w-full h-full bg-[#1C1917] text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
     <div className="flex justify-between items-center mb-6">
        <h4 className="font-serif text-lg">Live Demand</h4>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"/>
     </div>
     <div className="space-y-3">
        {[1, 2, 3].map((i) => (
           <div key={i} className="p-3 rounded bg-white/10 border border-white/10 flex justify-between items-center hover:bg-white/20 transition-colors cursor-pointer">
              <div>
                 <div className="text-sm font-bold">{i === 1 ? '5000 Red Bricks' : i === 2 ? '200 Bags Cement' : '5 Ton Steel'}</div>
                 <div className="text-[10px] text-white/50 flex items-center gap-1"><MapPin size={8}/> {i * 1.2}km away</div>
              </div>
              <div className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded">BID</div>
           </div>
        ))}
     </div>
  </div>
);

const TenderMock = () => (
  <div className="w-full h-full bg-white border border-[#D6D3D1] rounded-xl shadow-lg p-6 flex flex-col relative">
     <div className="absolute top-0 right-0 p-2"><ShieldCheck className="text-[#8E857E] opacity-20" size={64}/></div>
     <h4 className="font-bold text-[#1C1917] mb-1">Tender Applicant #92</h4>
     <p className="text-xs text-[#57534E] mb-4">AI Risk Assessment</p>
     
     <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
           <span className="text-[#57534E]">Budget History</span>
           <span className="font-bold text-emerald-700">A+ (Clean)</span>
        </div>
        <div className="w-full h-1 bg-[#F5F5F4] rounded-full"><div className="w-[95%] h-full bg-emerald-600 rounded-full"/></div>
        
        <div className="flex justify-between items-center text-sm mt-2">
           <span className="text-[#57534E]">Delay Risk</span>
           <span className="font-bold text-amber-600">Medium</span>
        </div>
        <div className="w-full h-1 bg-[#F5F5F4] rounded-full"><div className="w-[45%] h-full bg-amber-500 rounded-full"/></div>
     </div>
     
     <div className="mt-auto flex gap-2">
        <button className="flex-1 py-2 bg-[#1C1917] text-white text-xs font-bold rounded">View Details</button>
        <button className="px-3 py-2 border border-[#D6D3D1] rounded text-[#1C1917]"><ArrowRight size={14}/></button>
     </div>
  </div>
);

// --- 3. MAIN COMPONENT ---

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"govt" | "engineer" | "supplier" | "public">("govt");
  
  return (
    <div className="min-h-screen font-sans selection:bg-[#1C1917] selection:text-white" style={{ backgroundColor: COLORS.bg, color: COLORS.textMain }}>
      
      {/* Premium Noise Texture Overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply"></div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#F5F5F4]/80 backdrop-blur-md border-b border-[#D6D3D1]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[#1C1917] text-white flex items-center justify-center font-serif font-bold text-xl rounded-sm">B</div>
            <span className="font-serif font-bold text-xl tracking-tight text-[#1C1917]">BRIXA</span>
          </div>
          <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-[#57534E]">
            {['Platform', 'Solutions', 'Market', 'Audit'].map(item => (
               <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#1C1917] transition-colors relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1C1917] transition-all duration-300 group-hover:w-full"></span>
               </a>
            ))}
          </div>
          <div className="flex gap-3">
             <button className="px-5 py-2 border border-[#D6D3D1] text-[#1C1917] text-sm font-medium rounded-sm hover:bg-white transition-colors">Login</button>
             <button className="px-5 py-2 bg-[#1C1917] text-white text-sm font-medium rounded-sm hover:bg-[#333] transition-colors shadow-lg">Get Started</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32">
        
        {/* --- HERO SECTION --- */}
        <section className="relative px-6 max-w-7xl mx-auto mb-32">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Text Content */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-[#8E857E] rounded-full bg-white"
              >
                <span className="w-2 h-2 bg-[#8E857E] rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8E857E]">OS v1.0 Live</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-serif font-medium leading-[1.1] text-[#1C1917] mb-8"
              >
                Build with <br/>
                <span className="italic text-[#8E857E]">Radical Integrity.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[#57534E] font-light leading-relaxed mb-10"
              >
                The operating system for modern infrastructure. Connect tenders, engineers, and materials in one luxurious, tamper-proof ecosystem.
              </motion.p>
              
              <div className="flex gap-4">
                <button className="h-12 px-8 bg-[#1C1917] text-white font-bold text-sm rounded-sm hover:bg-[#333] transition-all shadow-xl flex items-center gap-2">
                   Start Free Trial <ArrowRight size={16}/>
                </button>
                <button className="h-12 px-8 border border-[#D6D3D1] bg-white text-[#1C1917] font-bold text-sm rounded-sm hover:bg-[#FAFAF9] flex items-center gap-2">
                   <Play size={14} fill="currentColor"/> Watch Film
                </button>
              </div>
            </div>
            
            {/* Visual Content (Hero Dashboard) */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1 }}
               className="lg:col-span-7 relative perspective-1000"
            >
               <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#8E857E]/20 to-transparent rounded-full blur-3xl"></div>
               <HeroDashboard />
               {/* Floating Element */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute -bottom-6 -left-6 bg-[#1C1917] text-white p-4 rounded-lg shadow-2xl max-w-[200px] z-20 border border-[#333]"
               >
                  <div className="text-[10px] uppercase tracking-widest text-[#8E857E] mb-2">Real-time Audit</div>
                  <div className="flex items-center gap-3">
                     <div className="text-2xl font-bold">99.8%</div>
                     <Activity size={20} className="text-emerald-500"/>
                  </div>
                  <div className="text-[10px] text-[#8E857E] mt-1">Compliance Score</div>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- SECTION 2: ECOSYSTEM TABS (The Core Value) --- */}
        <section id="solutions" className="py-24 bg-white border-y border-[#D6D3D1]">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16 max-w-2xl mx-auto">
                <SectionLabel>The Network</SectionLabel>
                <h2 className="text-4xl font-serif text-[#1C1917] mb-4">Orchestrating the Chaos.</h2>
                <p className="text-[#57534E]">Construction is fragmented. We unify the Government, Contractors, and Suppliers into a single source of truth.</p>
             </div>

             <div className="grid md:grid-cols-12 gap-12">
                {/* Navigation Tabs */}
                <div className="md:col-span-4 space-y-3">
                   {[
                      { id: 'govt', label: 'Government Body', desc: 'Tender Allocation & Audit', icon: Building2 },
                      { id: 'engineer', label: 'Site Engineers', desc: 'Project Management', icon: Construction },
                      { id: 'supplier', label: 'Material Suppliers', desc: 'Direct Marketplace', icon: Layers },
                      { id: 'public', label: 'Public Citizens', desc: 'Transparency Portal', icon: Users },
                   ].map((tab) => (
                      <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id as any)}
                         className={cn(
                            "w-full text-left p-4 rounded-lg border transition-all duration-300 group",
                            activeTab === tab.id 
                              ? "bg-[#1C1917] border-[#1C1917] text-white shadow-xl" 
                              : "bg-[#F5F5F4] border-transparent text-[#57534E] hover:bg-[#E7E5E4]"
                         )}
                      >
                         <div className="flex items-center gap-3 mb-1">
                            <tab.icon size={18} className={activeTab === tab.id ? "text-[#8E857E]" : "text-[#8E857E]"}/>
                            <span className="font-bold text-sm uppercase tracking-wide">{tab.label}</span>
                         </div>
                         <div className={cn("text-xs pl-7", activeTab === tab.id ? "text-white/60" : "text-[#8E857E]")}>{tab.desc}</div>
                      </button>
                   ))}
                </div>

                {/* Dynamic Content Area */}
                <div className="md:col-span-8 bg-[#F5F5F4] border border-[#D6D3D1] rounded-2xl p-10 relative flex items-center justify-center min-h-[400px] overflow-hidden">
                   <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#1C1917 1px, transparent 1px), linear-gradient(90deg, #1C1917 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                   
                   <AnimatePresence mode="wait">
                      <motion.div
                         key={activeTab}
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.05 }}
                         transition={{ duration: 0.3 }}
                         className="w-full max-w-2xl grid md:grid-cols-2 gap-8 items-center"
                      >
                         {/* Text Description */}
                         <div className="space-y-4">
                            <h3 className="text-2xl font-serif text-[#1C1917]">
                               {activeTab === 'govt' && "Stop Assigning Blindly."}
                               {activeTab === 'engineer' && "Build Your Digital Legacy."}
                               {activeTab === 'supplier' && "Direct Market Access."}
                               {activeTab === 'public' && "Verify, Don't Just Trust."}
                            </h3>
                            <p className="text-sm text-[#57534E] leading-relaxed">
                               {activeTab === 'govt' && "Use AI to analyze applicant history. Flag contractors with a history of delays or budget overruns before awarding the project."}
                               {activeTab === 'engineer' && "Create a verified 'Digital CV' of your completed projects. Prove your efficiency to win bigger tenders and manage labor automatically."}
                               {activeTab === 'supplier' && "Connect directly with site engineers. Receive bulk demands for cement, bricks, and machinery. Compete on quality and price, not connections."}
                               {activeTab === 'public' && "Scan the QR code at any construction site. View the assigned budget, expected completion date, and current progress photos verified by AI."}
                            </p>
                            <div className="flex gap-2 pt-2">
                               <Badge variant="success"><CheckCircle2 size={12}/> Verified Tech</Badge>
                               <Badge variant="neutral">Blockchain Ledger</Badge>
                            </div>
                         </div>

                         {/* Visual Mockup (Specific to Tab) */}
                         <div className="h-64 w-full relative">
                            {activeTab === 'govt' && <TenderMock />}
                            {activeTab === 'engineer' && <EngineerProfileMock />}
                            {activeTab === 'supplier' && <SupplierMarketMock />}
                            {activeTab === 'public' && (
                               <div className="w-full h-full bg-white border border-[#D6D3D1] rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-6">
                                  <div className="p-4 bg-[#1C1917] rounded-lg mb-4">
                                     <LayoutGrid size={48} className="text-white"/> {/* Simulated QR */}
                                  </div>
                                  <h4 className="font-bold text-[#1C1917]">Public Audit Scan</h4>
                                  <p className="text-xs text-[#57534E] mt-2">Citizens verify budget & progress instantly.</p>
                               </div>
                            )}
                         </div>
                      </motion.div>
                   </AnimatePresence>
                </div>
             </div>
          </div>
        </section>

        {/* --- SECTION 3: FEATURES TOOLKIT (Bento Grid) --- */}
        <section id="platform" className="py-24 px-6 max-w-7xl mx-auto">
           <div className="mb-12">
              <SectionLabel>The Toolkit</SectionLabel>
              <h2 className="text-4xl font-serif text-[#1C1917]">Engineered for Reality.</h2>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1: Voice AI */}
              <div className="md:col-span-2 bg-[#1C1917] text-white rounded-xl p-8 relative overflow-hidden group">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                 <div className="relative z-10 flex flex-col md:flex-row gap-8 h-full justify-between">
                    <div className="space-y-4 max-w-sm">
                       <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center"><Mic className="text-[#8E857E]"/></div>
                       <h3 className="text-2xl font-serif">Voice-to-Ledger</h3>
                       <p className="text-white/60 text-sm leading-relaxed">
                          "Unloaded 50 bags of cement." <br/>
                          Our AI parses voice notes, verifies costs, and updates the ledger automatically.
                       </p>
                    </div>
                    <div className="w-full md:w-64 bg-black/30 border border-white/10 rounded-lg p-4 flex flex-col justify-end">
                       <div className="text-[10px] uppercase text-[#8E857E] mb-2">Audio Input</div>
                       <div className="flex items-end gap-1 h-12">
                          {[...Array(15)].map((_,i) => (
                             <motion.div key={i} animate={{height: ["20%", "80%", "20%"]}} transition={{repeat:Infinity, duration: 1.2, delay: i*0.1}} className="w-1 bg-white rounded-full"/>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Card 2: Vault */}
              <div className="bg-white border border-[#D6D3D1] rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
                 <div className="w-10 h-10 bg-[#F5F5F4] rounded flex items-center justify-center mb-6"><Lock className="text-[#1C1917]"/></div>
                 <h3 className="text-xl font-serif text-[#1C1917] mb-2">Blueprint Vault</h3>
                 <p className="text-sm text-[#57534E] mb-6">Version-controlled storage for CAD/PDFs. Ensure crew builds from V4, not V3.</p>
                 <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border border-[#D6D3D1] rounded bg-[#F5F5F4]">
                       <span className="text-xs font-bold">Structure_Final.dwg</span>
                       <Badge variant="success">V4.0</Badge>
                    </div>
                 </div>
              </div>

              {/* Card 3: Plan vs Actual */}
              <div className="bg-white border border-[#D6D3D1] rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
                 <div className="w-10 h-10 bg-[#F5F5F4] rounded flex items-center justify-center mb-6"><TrendingUp className="text-[#1C1917]"/></div>
                 <h3 className="text-xl font-serif text-[#1C1917] mb-2">Plan vs Actual</h3>
                 <p className="text-sm text-[#57534E] mb-6">Track milestones in real-time. Get alerts if budget deviates by 1%.</p>
                 <div className="w-full h-2 bg-[#F5F5F4] rounded-full overflow-hidden mb-1">
                    <div className="w-[75%] h-full bg-[#1C1917]"></div>
                 </div>
                 <div className="flex justify-between text-[10px] text-[#57534E]">
                    <span>Progress: 75%</span>
                    <span className="text-amber-600">2 days behind</span>
                 </div>
              </div>

              {/* Card 4: Marketplace Map */}
              <div className="md:col-span-2 bg-[#F5F5F4] border border-[#D6D3D1] rounded-xl p-8 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-white border border-[#D6D3D1] rounded flex items-center justify-center"><MapPin className="text-[#1C1917]"/></div>
                       <div>
                          <h3 className="text-xl font-serif text-[#1C1917]">Hyper-Local Marketplace</h3>
                          <p className="text-xs text-[#57534E]">Source materials from 500+ verified suppliers nearby.</p>
                       </div>
                    </div>
                 </div>
                 {/* Abstract Map */}
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1C1917 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 <div className="absolute right-10 top-10 w-32 h-32 border border-[#1C1917]/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#1C1917] rounded-full animate-ping"></div>
                 </div>
                 {/* Floating Supplier Tags */}
                 {[1,2,3].map(i => (
                    <div key={i} className="absolute bg-white px-2 py-1 rounded border border-[#D6D3D1] shadow-sm text-[10px] font-bold" style={{ bottom: `${20+i*15}%`, right: `${10+i*10}%` }}>
                       Supplier {String.fromCharCode(64+i)}
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* --- SECTION 4: TRANSPARENCY (The Finale) --- */}
        <section id="audit" className="py-32 bg-[#1C1917] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] border border-white/5 rounded-full translate-x-1/3 -translate-y-1/3"></div>
           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                 <div className="inline-block px-3 py-1 mb-6 border border-[#8E857E] rounded-full text-[#8E857E] text-[10px] font-bold tracking-[0.2em] uppercase">
                    Public Audit Protocol
                 </div>
                 <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                    Trust is not given.<br/>It is verified.
                 </h2>
                 <p className="text-[#8E857E] text-lg font-light mb-10 max-w-md">
                    Every project generates a unique, immutable QR code. Citizens can scan to verify budget allocation, deadlines, and see progress photos verified by AI.
                 </p>
                 <button className="px-8 py-4 bg-white text-[#1C1917] font-bold rounded-sm hover:bg-[#E5E5E5] transition-colors">
                    Access Public Registry
                 </button>
              </div>
              <div className="flex justify-center">
                 <div className="bg-white p-3 rounded-xl rotate-3 hover:rotate-0 transition-transform duration-500 cursor-pointer shadow-2xl max-w-sm w-full">
                    <div className="bg-[#F5F5F4] border-2 border-dashed border-[#1C1917] p-10 rounded-lg text-center">
                       <div className="bg-[#1C1917] p-4 inline-block mb-6"><LayoutGrid size={80} className="text-white"/></div>
                       <div className="font-bold text-[#1C1917] text-2xl mb-1">SCAN TO AUDIT</div>
                       <div className="text-[#57534E] text-xs font-mono">Project ID: #882-ALPHA</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-[#F5F5F4] border-t border-[#D6D3D1] pt-24 pb-12">
           <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-4 gap-12 mb-16">
                 <div className="col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                       <div className="h-6 w-6 bg-[#1C1917] text-white flex items-center justify-center font-serif font-bold rounded-sm">B</div>
                       <span className="font-serif font-bold text-lg tracking-tight text-[#1C1917]">BRIXA</span>
                    </div>
                    <p className="text-[#57534E] text-sm leading-relaxed">
                       Bridging the gap between blueprint and reality. The premium operating system for the modern construction industry.
                    </p>
                 </div>
                 {[
                    { h: 'Platform', l: ['Tender Mgmt', 'Supplier Network', 'Site Tools'] },
                    { h: 'Company', l: ['About Us', 'Manifesto', 'Careers'] },
                    { h: 'Legal', l: ['Privacy', 'Terms', 'Security'] }
                 ].map((col) => (
                    <div key={col.h}>
                       <h4 className="font-bold text-[#1C1917] mb-6 uppercase text-xs tracking-widest">{col.h}</h4>
                       <ul className="space-y-4 text-sm text-[#57534E]">
                          {col.l.map(link => <li key={link}><a href="#" className="hover:text-[#1C1917] transition-colors">{link}</a></li>)}
                       </ul>
                    </div>
                 ))}
              </div>
              <div className="border-t border-[#D6D3D1] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#8E857E]">
                 <span>© 2025 BRIXA INC. All rights reserved.</span>
                 <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-[#1C1917]">Privacy</a>
                    <a href="#" className="hover:text-[#1C1917]">Terms</a>
                 </div>
              </div>
           </div>
        </footer>

      </main>
    </div>
  );
}