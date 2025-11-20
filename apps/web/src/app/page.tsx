"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@repo/ui/button"; 
import { Card } from "@repo/ui/card";
import { 
  Building2, ShieldCheck, FileSpreadsheet, HardHat, 
  Layers, Smartphone, Search, Activity, FileCheck, 
  Users, Play, ArrowRight, QrCode, Mic, Trophy, 
  Lock, FileDigit, MapPin, CheckCircle2
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom Bezier for "Premium" feel
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2 select-none">
    <div className="flex items-end gap-1 h-8">
      <motion.div initial={{ height: 10 }} animate={{ height: 32 }} transition={{ duration: 1 }} className="w-1.5 bg-brand-900 rounded-sm"></motion.div>
      <motion.div initial={{ height: 10 }} animate={{ height: 20 }} transition={{ duration: 1.2 }} className="w-1.5 bg-brand-600 rounded-sm"></motion.div>
      <motion.div initial={{ height: 10 }} animate={{ height: 24 }} transition={{ duration: 0.8 }} className="w-1.5 bg-brand-700 rounded-sm"></motion.div>
    </div>
    <span className="font-bold text-xl tracking-tighter text-brand-900">BRIXA</span>
  </div>
);

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-800 border border-brand-200 ${className}`}>
    {children}
  </span>
);

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"govt" | "engineer" | "supplier" | "public">("govt");

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-brand-900 font-sans selection:bg-brand-900 selection:text-white overflow-x-hidden">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAFAF9]/80 backdrop-blur-xl border-b border-brand-100/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex gap-8 text-sm font-medium text-brand-600">
            <a href="#ecosystem" className="hover:text-brand-900 transition-colors">Ecosystem</a>
            <a href="#features" className="hover:text-brand-900 transition-colors">Toolkit</a>
            <a href="#audit" className="hover:text-brand-900 transition-colors">Public Audit</a>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm">Login</Button>
            <Button className="bg-brand-900 text-white hover:bg-brand-800 shadow-lg shadow-brand-900/20" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        
        {/* --- Hero Section --- */}
        <section className="relative px-6 max-w-7xl mx-auto mb-32 flex flex-col items-center text-center">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-8">
              <div className="px-4 py-2 rounded-full bg-white border border-brand-200 shadow-sm text-brand-600 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Tender Intelligence System
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-brand-900 mb-8 leading-[1.05]">
              Construction with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-brand-600 to-brand-800">
                Radical Integrity.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-brand-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              The operating system for the new era of infrastructure. 
              Connect <span className="text-brand-900 font-medium">Government</span>, <span className="text-brand-900 font-medium">Contractors</span>, and <span className="text-brand-900 font-medium">Citizens</span> in one transparent ledger.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button size="lg" className="h-14 px-8 bg-brand-900 text-white hover:bg-brand-800 text-base shadow-xl">Start Free Trial</Button>
              <Button size="lg" variant="outline" className="h-14 px-8 border-brand-200 hover:bg-white text-base">
                <Play className="w-4 h-4 mr-2 fill-current" /> Watch 2-min Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* --- 3D Perspective Dashboard --- */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-5xl relative perspective-1000 group"
          >
             {/* Main Dashboard Image Container */}
            <div className="relative z-10 bg-white rounded-t-2xl border border-brand-200 shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-white pointer-events-none"></div>
              
              {/* Mock UI Interface */}
              <div className="p-6 grid grid-cols-12 gap-6 h-full">
                {/* Sidebar */}
                <div className="hidden md:block col-span-2 space-y-4 border-r border-brand-100 pr-4">
                   <div className="h-8 w-8 rounded-lg bg-brand-900 mb-6"></div>
                   <div className="h-2 w-20 bg-brand-100 rounded-full"></div>
                   <div className="h-2 w-16 bg-brand-100 rounded-full"></div>
                   <div className="h-2 w-24 bg-brand-100 rounded-full"></div>
                </div>
                
                {/* Main Content */}
                <div className="col-span-12 md:col-span-7 space-y-6 pt-2">
                   <div className="flex justify-between items-end border-b border-brand-100 pb-4">
                      <div>
                        <div className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1">Project Alpha-9</div>
                        <div className="text-2xl font-semibold text-brand-900">Highway Expansion Phase II</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-700"><CheckCircle2 size={10} className="mr-1"/> KYC Verified</Badge>
                        <Badge>On Schedule</Badge>
                      </div>
                   </div>

                   {/* Graph Mock */}
                   <div className="h-32 w-full bg-brand-50 rounded-lg border border-brand-100 relative overflow-hidden flex items-end px-4 pb-0 gap-2">
                      {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 1 + (i * 0.1), duration: 1 }}
                          className="w-full bg-brand-200 rounded-t-sm opacity-60 hover:opacity-100 hover:bg-brand-400 transition-colors"
                        />
                      ))}
                   </div>

                   {/* Recent Activity List */}
                   <div className="space-y-3">
                      <div className="flex items-center gap-4 p-3 bg-white border border-brand-100 rounded-lg shadow-sm">
                         <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Mic size={14} /></div>
                         <div className="flex-1">
                            <div className="text-sm font-medium text-brand-900">Site Engineer Log (Voice)</div>
                            <div className="text-xs text-brand-500">"Unloaded 500 bags cement, Invoice #8892 verified."</div>
                         </div>
                         <span className="text-xs font-mono text-brand-400">10:42 AM</span>
                      </div>
                   </div>
                </div>

                {/* Right Panel (Auditor View) */}
                <div className="hidden md:block col-span-3 bg-brand-900 rounded-xl p-5 text-white flex flex-col justify-between relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-700 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                   <div>
                      <div className="text-brand-300 text-xs uppercase tracking-widest mb-2">Budget Utilized</div>
                      <div className="text-3xl font-light">₹ 4.2 Cr</div>
                      <div className="text-xs text-brand-400 mt-1">of ₹ 12.0 Cr Allocated</div>
                   </div>
                   <div className="space-y-2">
                      <div className="w-full bg-brand-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-400 h-full w-[35%]"></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-brand-400">
                        <span>Spent</span>
                        <span>35%</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Glowing Underlight */}
            <div className="absolute -bottom-10 left-10 right-10 h-20 bg-brand-900 blur-[80px] opacity-20 z-0"></div>
          </motion.div>
        </section>

        {/* --- Ecosystem Tabs (Problem Solution) --- */}
        <section id="ecosystem" className="py-24 bg-white border-y border-brand-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-brand-900 mb-4">Orchestrating the Chaos</h2>
              <p className="text-brand-500 max-w-2xl mx-auto">A unified platform solving the fragmentation between tender allocation and brick-laying.</p>
            </div>

            {/* Tab Triggers */}
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {(['govt', 'engineer', 'supplier', 'public'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeTab === tab 
                      ? "bg-brand-900 text-white border-brand-900 shadow-lg transform scale-105" 
                      : "bg-white text-brand-600 border-brand-100 hover:border-brand-300 hover:bg-brand-50"
                  }`}
                >
                  {tab === 'govt' && "Government & Tenders"}
                  {tab === 'engineer' && "Engineers & Contractors"}
                  {tab === 'supplier' && "Suppliers & Hardware"}
                  {tab === 'public' && "Public & Transparency"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  {/* Text Content */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-4xl font-medium text-brand-900 leading-tight">
                        {activeTab === 'govt' && <span>End Tender Corruption.<br/><span className="text-brand-500">Award based on data, not connections.</span></span>}
                        {activeTab === 'engineer' && <span>Build Your Reputation.<br/><span className="text-brand-500">Your digital CV for every project.</span></span>}
                        {activeTab === 'supplier' && <span>Direct Market Access.<br/><span className="text-brand-500">Sell bulk materials without middlemen.</span></span>}
                        {activeTab === 'public' && <span>Verify Progress Instantly.<br/><span className="text-brand-500">Trust, but verify with QR.</span></span>}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 items-start group">
                          <div className="w-10 h-10 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 group-hover:bg-brand-900 group-hover:text-white transition-colors">
                            {i === 1 ? <Search size={18}/> : i === 2 ? <Activity size={18}/> : <ShieldCheck size={18}/>}
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-900 text-sm">
                              {activeTab === 'govt' && i === 1 && "AI-Analyzed Past Performance"}
                              {activeTab === 'govt' && i === 2 && "Real-time Inspection Dashboard"}
                              {activeTab === 'govt' && i === 3 && "Budget Overrun Alerts"}
                              
                              {activeTab === 'engineer' && i === 1 && "Verified Digital Portfolio"}
                              {activeTab === 'engineer' && i === 2 && "Labor Attendance & Output"}
                              {activeTab === 'engineer' && i === 3 && "Integrated Material Requests"}

                              {activeTab === 'supplier' && i === 1 && "Hyper-local Demand Forecasting"}
                              {activeTab === 'supplier' && i === 2 && "Digital GST Invoicing"}
                              {activeTab === 'supplier' && i === 3 && "Guaranteed Payment Escrow"}

                              {activeTab === 'public' && i === 1 && "Scan Site QR Code"}
                              {activeTab === 'public' && i === 2 && "View Approved Budget vs Actual"}
                              {activeTab === 'public' && i === 3 && "Lodge Verified Complaints"}
                            </h4>
                            <p className="text-sm text-brand-500 mt-1 leading-relaxed">
                              {/* Generic subtitle for demo, would be dynamic in real app */}
                              Enabled by our secure, blockchain-backed ledger ensuring no data tampering is possible.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Content (Cards) */}
                  <div className="bg-brand-50/50 rounded-2xl border border-brand-100 p-8 relative h-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    
                    {/* Dynamic Card Mockups based on Tab */}
                    {activeTab === 'engineer' && (
                      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm border border-brand-100 relative z-10">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-brand-200 rounded-full overflow-hidden">
                              <img src="https://i.pravatar.cc/150?img=11" alt="Engineer" />
                            </div>
                            <div>
                               <h4 className="font-bold text-brand-900">Rajesh Civil Works</h4>
                               <div className="flex gap-1 text-yellow-500 text-xs">★★★★★ <span className="text-brand-400 ml-2">(42 Projects)</span></div>
                            </div>
                         </div>
                         <div className="space-y-3">
                            <div className="flex justify-between text-sm border-b border-brand-50 pb-2">
                              <span className="text-brand-500">On-Time Rate</span>
                              <span className="font-mono font-bold text-green-600">98.2%</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-brand-50 pb-2">
                              <span className="text-brand-500">Material Efficiency</span>
                              <span className="font-mono font-bold text-brand-900">A+</span>
                            </div>
                         </div>
                         <Button className="w-full mt-6 bg-brand-900 text-white" size="sm">View Full CV</Button>
                      </div>
                    )}

                    {activeTab === 'supplier' && (
                      <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-sm border border-brand-100 relative z-10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-brand-400 uppercase">New Demand Nearby</div>
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </div>
                        <div className="p-3 bg-brand-50 rounded border border-brand-100 flex justify-between items-center">
                           <div>
                             <div className="font-bold text-brand-900">5,000 Red Bricks</div>
                             <div className="text-xs text-brand-500">Site: Govt School, Block B</div>
                           </div>
                           <Button size="sm" variant="outline">Bid Now</Button>
                        </div>
                        <div className="p-3 bg-brand-50 rounded border border-brand-100 flex justify-between items-center">
                           <div>
                             <div className="font-bold text-brand-900">200 Bags Cement</div>
                             <div className="text-xs text-brand-500">Site: Highway 42</div>
                           </div>
                           <Button size="sm" variant="outline">Bid Now</Button>
                        </div>
                      </div>
                    )}

                    {activeTab === 'public' && (
                      <div className="relative z-10 text-center">
                         <div className="bg-white p-6 rounded-2xl shadow-2xl inline-block mb-4 border border-brand-200">
                            <QrCode size={140} className="text-brand-900"/>
                         </div>
                         <p className="text-sm font-medium text-brand-600">Scan to View Site Audit</p>
                      </div>
                    )}

                    {activeTab === 'govt' && (
                       <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm border border-brand-100 relative z-10">
                          <div className="flex items-center gap-3 mb-4 border-b border-brand-100 pb-4">
                             <Building2 className="text-brand-600" />
                             <span className="font-bold text-brand-900">Tender Allocator AI</span>
                          </div>
                          <div className="space-y-2">
                             <div className="flex items-center justify-between text-sm p-2 hover:bg-brand-50 rounded cursor-pointer">
                                <span>Applicant A</span>
                                <span className="text-red-500 font-bold text-xs">Risk: High</span>
                             </div>
                             <div className="flex items-center justify-between text-sm p-2 bg-green-50 border border-green-100 rounded cursor-pointer">
                                <span>Applicant B</span>
                                <span className="text-green-600 font-bold text-xs">Match: 98%</span>
                             </div>
                             <div className="flex items-center justify-between text-sm p-2 hover:bg-brand-50 rounded cursor-pointer">
                                <span>Applicant C</span>
                                <span className="text-yellow-500 font-bold text-xs">Risk: Med</span>
                             </div>
                          </div>
                       </div>
                    )}

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- Features Bento Grid (Rich Content) --- */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-900 mb-4">The Modern Engineer's Toolkit</h2>
            <p className="text-brand-500">Everything you need to manage complex projects, from Blueprint to Billing, in one premium dashboard.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Card 1: AI Voice (Large) */}
            <Card className="md:col-span-2 md:row-span-2 bg-brand-900 text-white border-none overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-700 rounded-full blur-[80px] opacity-40 -translate-y-1/2 translate-x-1/2 group-hover:opacity-60 transition-opacity"></div>
              <div className="p-8 h-full flex flex-col justify-between relative z-10">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/10">
                    <Mic className="text-brand-200" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Voice-to-Ledger AI</h3>
                  <p className="text-brand-300 text-sm leading-relaxed max-w-sm">
                    Don't type. Just speak. <br/>
                    <span className="italic text-white opacity-80">"Added 50 bags of cement today."</span> <br/>
                    Our AI parses your voice, updates inventory, and calculates costs automatically.
                  </p>
                </div>
                {/* Audio Wave Visual */}
                <div className="flex items-end gap-1 h-12 opacity-80">
                   {[20, 40, 60, 30, 70, 40, 80, 50, 30, 60, 40].map((h,i)=>(
                      <motion.div 
                        key={i} 
                        animate={{ height: [10, h, 10] }} 
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                        className="w-1.5 bg-brand-400 rounded-full" 
                      />
                   ))}
                </div>
              </div>
            </Card>

            {/* Card 2: Plan vs Actual */}
            <Card className="md:col-span-1 bg-white p-6 hover:shadow-lg transition-shadow duration-300">
               <div className="bg-brand-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-brand-800">
                  <FileSpreadsheet size={20} />
               </div>
               <h3 className="text-lg font-semibold text-brand-900 mb-1">Plan vs. Actual</h3>
               <p className="text-xs text-brand-500 mb-4">Track milestones vs reality.</p>
               <div className="w-full bg-gray-100 h-1.5 rounded-full mb-2 overflow-hidden">
                 <div className="bg-brand-300 h-full w-full"></div>
               </div>
               <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-red-500 h-full w-[70%]"></div>
               </div>
               <div className="mt-2 text-[10px] text-red-500 font-medium">⚠ 3 Days Behind Schedule</div>
            </Card>

            {/* Card 3: Document Vault */}
            <Card className="md:col-span-1 bg-white p-6 hover:shadow-lg transition-shadow duration-300 group">
               <div className="bg-brand-50 w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-brand-800">
                  <Lock size={20} />
               </div>
               <h3 className="text-lg font-semibold text-brand-900 mb-1">Secure Vault</h3>
               <p className="text-xs text-brand-500 mb-4">Encrypted storage for Blueprints.</p>
               <div className="space-y-2">
                 <div className="flex items-center gap-2 text-xs p-2 bg-brand-50 rounded border border-brand-100 group-hover:border-brand-300 transition-colors">
                    <FileDigit size={14} className="text-brand-600"/>
                    <span>Site_Plan_v2.dwg</span>
                 </div>
                 <div className="flex items-center gap-2 text-xs p-2 bg-brand-50 rounded border border-brand-100 group-hover:border-brand-300 transition-colors">
                    <FileDigit size={14} className="text-brand-600"/>
                    <span>Budget.pdf</span>
                 </div>
               </div>
            </Card>

            {/* Card 4: Regional Rankings (Wide) */}
            <Card className="md:col-span-2 bg-gradient-to-br from-brand-50 to-white p-6 flex items-center justify-between relative overflow-hidden">
               <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="text-yellow-600" size={20} />
                    <span className="text-xs font-bold uppercase text-brand-500 tracking-widest">Leaderboards</span>
                  </div>
                  <h3 className="text-xl font-semibold text-brand-900 mb-2">Regional Rankings</h3>
                  <p className="text-sm text-brand-600 max-w-xs">
                    Gamify quality. Top-rated engineers get priority on Govt tenders.
                  </p>
               </div>
               <div className="relative z-10 bg-white p-3 rounded-lg shadow-md border border-brand-100 w-48">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="font-bold text-2xl text-brand-900">#1</div>
                     <div className="text-xs leading-tight">
                       <div className="font-bold">Sharma Builders</div>
                       <div className="text-green-600">Kathmandu Region</div>
                     </div>
                  </div>
                  <div className="w-full bg-brand-100 h-1 rounded-full">
                     <div className="w-[98%] bg-yellow-500 h-full rounded-full"></div>
                  </div>
               </div>
               <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent"></div>
            </Card>

             {/* Card 5: KYC & Chat */}
             <Card className="md:col-span-2 bg-white p-6 flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="text-green-600" size={20} />
                      <h3 className="text-xl font-semibold text-brand-900">KYC & Verification</h3>
                   </div>
                   <p className="text-sm text-brand-500">
                      Every entity—Contractor, Laborer, Supplier—is verified via Govt ID before entering the ecosystem.
                   </p>
                </div>
                <div className="flex gap-2">
                   <div className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Verified Profile
                   </div>
                   <div className="px-4 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded-full border border-brand-100 flex items-center gap-1">
                      <Users size={12} /> 45 Employees Linked
                   </div>
                </div>
             </Card>

          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-32 bg-brand-900 text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-20">
              {/* Subtle pattern */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           </div>
           
           <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
             <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">Start Building with Integrity.</h2>
             <p className="text-brand-200 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
               Whether you are a government body seeking accountability, or a contractor seeking recognition—join the network that rewards quality.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="h-14 px-8 rounded-md bg-white text-brand-900 font-bold hover:bg-brand-50 transition-all transform hover:-translate-y-1 shadow-xl">
                   Register Organization
                </button>
                <button className="h-14 px-8 rounded-md border border-brand-600 text-white font-medium hover:bg-brand-800 transition-colors">
                   Contact Sales
                </button>
             </div>
           </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-brand-50 py-16 px-6 border-t border-brand-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm">
          <div className="col-span-1">
             <Logo />
             <p className="mt-6 text-brand-500 leading-relaxed">
               The premium operating system for modern construction, bridging the gap between blueprint and reality.
             </p>
             <div className="mt-6 flex gap-4 text-brand-400">
                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center hover:bg-brand-200 cursor-pointer transition-colors"><span className="sr-only">Twitter</span>X</div>
                <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center hover:bg-brand-200 cursor-pointer transition-colors"><span className="sr-only">LinkedIn</span>in</div>
             </div>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-900 mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-3 text-brand-600">
              <li><a href="#" className="hover:text-brand-900 transition-colors">Tender Management</a></li>
              <li><a href="#" className="hover:text-brand-900 transition-colors">Supplier Marketplace</a></li>
              <li><a href="#" className="hover:text-brand-900 transition-colors">Project Tracking</a></li>
              <li><a href="#" className="hover:text-brand-900 transition-colors">Public Audit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-900 mb-6 uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-3 text-brand-600">
              <li><a href="#" className="hover:text-brand-900 transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-brand-900 transition-colors">Government Protocols</a></li>
              <li><a href="#" className="hover:text-brand-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-900 transition-colors">API Documentation</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-brand-900 mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
             <p className="text-brand-500 mb-4">Get the latest construction tech updates.</p>
             <div className="flex gap-2">
               <input type="email" placeholder="Email address" className="bg-white border border-brand-200 rounded-md px-3 py-2 w-full focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all" />
               <Button size="sm" className="bg-brand-900 text-white"><ArrowRight size={16}/></Button>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-200 flex flex-col md:flex-row justify-between text-brand-400 text-xs items-center gap-4">
          <span>© 2025 BRIXA Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-900">Privacy Policy</a>
            <a href="#" className="hover:text-brand-900">Terms of Service</a>
            <a href="#" className="hover:text-brand-900">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}