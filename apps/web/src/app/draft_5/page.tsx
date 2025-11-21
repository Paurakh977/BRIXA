"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@BRIXA/ui/fifth_button"; 
import { Card } from "@BRIXA/ui/fifth_card";
import { 
  Building2, ShieldCheck, FileSpreadsheet, HardHat,  
  Layers, Smartphone, Search, Activity, FileCheck, 
  Users, CreditCard, Play, ArrowRight, QrCode, Mic,
  MessageSquareText, BarChart3, Cloud, LayoutGrid, CheckCircle2, DollarSign, ReceiptText, LineChart,Gavel, AlertTriangle,Truck,TrendingUp
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Mock Logo Component ---
const Logo = () => (
  <div className="flex items-center gap-2">
    {/* Represents your provided chart logo */}
    <div className="flex items-end gap-1 h-8">
      <div className="w-1.5 h-8 bg-brand-800 rounded-sm"></div>
      <div className="w-1.5 h-5 bg-brand-600 rounded-sm"></div>
      <div className="w-1.5 h-6 bg-brand-700 rounded-sm"></div>
      <div className="w-1.5 h-3 bg-brand-500 rounded-sm"></div>
      <div className="w-1.5 h-4 bg-brand-600 rounded-sm"></div>
    </div>
    <span className="font-bold text-xl tracking-tighter text-brand-900">BRIXA</span>
  </div>
);

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"govt" | "engineer" | "supplier" | "public">("govt");

  return (
    <div className="min-h-screen bg-canvas text-brand-900 selection:bg-brand-200 font-sans">
      
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 bg-canvas/80 backdrop-blur-xl border-b border-brand-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex gap-8 text-sm font-medium text-brand-600">
            <a href="#ecosystem" className="hover:text-brand-900 transition-colors">Ecosystem</a>
            <a href="#features" className="hover:text-brand-900 transition-colors">Features</a>
            <a href="#transparency" className="hover:text-brand-900 transition-colors">Transparency</a>
            <a href="#solutions" className="hover:text-brand-900 transition-colors">Solutions</a>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm">Login</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      <main className="pt-32">
        
        {/* --- Hero Section --- */}
        <section className="relative px-6 max-w-7xl mx-auto mb-32 flex flex-col items-center text-center">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold tracking-widest uppercase">
                The Operating System for Infrastructure
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-brand-900 mb-8 leading-[1.1]">
              Build with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-800 via-brand-600 to-brand-800">
                Radical Transparency.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-brand-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Connect tenders, engineers, auditors, and materials in one luxurious ecosystem. 
              From blueprint to brick, verify every step with AI-driven accountability.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">Start Free Trial</Button>
              <Button size="lg" variant="outline">Watch Demo <Play className="w-4 h-4 ml-2 fill-current" /></Button>
            </motion.div>
          </motion.div>

          {/* Abstract Dashboard Hero Image - More detailed and aesthetically pleasing */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="mt-24 w-full aspect-[16/8] bg-white rounded-t-2xl shadow-[0_-20px_60px_-15px_rgba(74,55,40,0.15)] border border-brand-100 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-50/50" />
            
            <div className="p-8 grid grid-cols-12 gap-6 h-full opacity-90">
              {/* Left Sidebar - Navigation/Quick Actions */}
              <div className="col-span-2 bg-brand-50 rounded-xl h-full p-4 flex flex-col gap-5 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <LayoutGrid size={20} className="text-brand-600" />
                    <span className="font-semibold text-brand-900 text-sm">Dashboard</span>
                  </div>
                  <ul className="space-y-3 text-sm font-medium">
                    <li className="flex items-center gap-2 text-brand-800 bg-brand-100 px-3 py-2 rounded-lg">
                      <BarChart3 size={16} /> Analytics
                    </li>
                    <li className="flex items-center gap-2 text-brand-600 hover:text-brand-900 px-3 py-2 rounded-lg">
                      <FileCheck size={16} /> Projects
                    </li>
                    <li className="flex items-center gap-2 text-brand-600 hover:text-brand-900 px-3 py-2 rounded-lg">
                      <Users size={16} /> Team
                    </li>
                    <li className="flex items-center gap-2 text-brand-600 hover:text-brand-900 px-3 py-2 rounded-lg">
                      <Cloud size={16} /> Vault
                    </li>
                    <li className="flex items-center gap-2 text-brand-600 hover:text-brand-900 px-3 py-2 rounded-lg">
                      <CreditCard size={16} /> Billing
                    </li>
                  </ul>
                </div>
                <div className="border-t border-brand-100 pt-4">
                  <div className="flex items-center gap-2 text-brand-600 hover:text-brand-900 px-3 py-2 rounded-lg text-sm font-medium">
                    <QrCode size={16} /> Scan Site
                  </div>
                </div>
              </div>

              {/* Main Content Area - Project Overview & Activity */}
              <div className="col-span-7 bg-brand-50/50 rounded-xl h-full p-6 border border-brand-100 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-brand-900">Project Overview: Grand City Tower</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-brand-500">Status:</span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">On Track</span>
                  </div>
                </div>
                
                {/* Progress Bar & Key Metrics */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-brand-600 mb-2">
                    <span>Progress (Phase 3 of 5)</span>
                    <span>72% Complete</span>
                  </div>
                  <div className="w-full bg-brand-100 rounded-full h-2.5">
                    <div className="bg-brand-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div>
                      <div className="text-sm text-brand-500">Budget Spent</div>
                      <div className="text-xl font-medium text-brand-900">$1.8M / $2.4M</div>
                    </div>
                    <div>
                      <div className="text-sm text-brand-500">Days Remaining</div>
                      <div className="text-xl font-medium text-brand-900">45</div>
                    </div>
                    <div>
                      <div className="text-sm text-brand-500">Team Members</div>
                      <div className="text-xl font-medium text-brand-900">12</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  <h3 className="text-lg font-medium text-brand-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-brand-100 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><CheckCircle2 size={16}/></div>
                          <div>
                            <span className="text-sm font-medium text-brand-800">Foundation Phase Approved</span>
                            <p className="text-xs text-brand-400">Auditor 'R. Patel' verified submission.</p>
                          </div>
                        </div>
                        <span className="text-xs text-brand-400 group-hover:text-brand-600 transition-colors">Just now</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-brand-100 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center"><QrCode size={16}/></div>
                          <div>
                            <span className="text-sm font-medium text-brand-800">Public Scan: Site A-12</span>
                            <p className="text-xs text-brand-400">Viewed by 12 citizens. 3 feedback received.</p>
                          </div>
                        </div>
                        <span className="text-xs text-brand-400 group-hover:text-brand-600 transition-colors">2m ago</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-brand-100 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center"><MessageSquareText size={16}/></div>
                          <div>
                            <span className="text-sm font-medium text-brand-800">New message in 'Design Review'</span>
                            <p className="text-xs text-brand-400">Architect 'A. Khan' updated blueprint v3.1.</p>
                          </div>
                        </div>
                        <span className="text-xs text-brand-400 group-hover:text-brand-600 transition-colors">1h ago</span>
                     </div>
                     <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-brand-100 group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center"><HardHat size={16}/></div>
                          <div>
                            <span className="text-sm font-medium text-brand-800">Daily Log: Material Unloaded</span>
                            <p className="text-xs text-brand-400">500 bags cement, 2000 bricks. Verified by Site Manager.</p>
                          </div>
                        </div>
                        <span className="text-xs text-brand-400 group-hover:text-brand-600 transition-colors">3h ago</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar - Financials & Quick Stats */}
              <div className="col-span-3 bg-brand-900 rounded-xl h-full p-6 text-white flex flex-col justify-between">
                <div>
                  <div className="text-brand-400 text-xs uppercase tracking-widest mb-3">Project Financials</div>
                  <div className="text-4xl font-light mb-2 flex items-baseline gap-1">
                    <DollarSign size={28} className="text-brand-200" /> 
                    <span>1,830,000</span>
                  </div>
                  <p className="text-brand-300 text-sm">Spent out of $2.4M allocated.</p>
                </div>
                
                <div className="mt-8">
                  <div className="text-brand-400 text-xs uppercase tracking-widest mb-3">Cost Variance</div>
                  <div className="h-32 bg-brand-800/50 rounded-lg relative overflow-hidden p-3">
                    <div className="absolute top-0 left-0 w-full h-full flex items-end">
                      {/* Simple bar chart for cost variance */}
                      <div className="flex w-full h-full items-end gap-1">
                        {[0.6, 0.7, 0.8, 0.75, 0.9, 0.85, 0.92, 0.88, 0.95, 0.9, 0.8, 0.7].map((height, i) => (
                          <div key={i} className="flex-1 bg-brand-700/70 rounded-t-sm" style={{ height: `${height * 100}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="absolute top-2 left-3 text-sm text-brand-100 font-medium">
                      <LineChart size={16} className="inline-block mr-1" /> -5.2%
                    </div>
                  </div>
                  <p className="text-xs text-brand-400 mt-3">Below projected cost for current phase.</p>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-700">
                  <div className="text-brand-400 text-xs uppercase tracking-widest mb-3">Next Milestone</div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-700 text-brand-200 flex items-center justify-center"><ReceiptText size={16}/></div>
                    <div>
                      <span className="text-sm font-medium">Material Audit Q3</span>
                      <p className="text-xs text-brand-300">Due: Sep 30, 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- Solution/Problem Tabs --- */}
        <section id="ecosystem" className="py-24 bg-white border-y border-brand-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-semibold text-brand-900 mb-4">Orchestrating the Chaos</h2>
              <p className="text-brand-500 text-lg">A unified platform tailored for every stakeholder in the construction lifecycle.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {(['govt', 'engineer', 'supplier', 'public'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeTab === tab 
                      ? "bg-brand-900 text-white border-brand-900 shadow-lg shadow-brand-900/20 transform scale-105" 
                      : "bg-brand-50 text-brand-600 border-brand-200 hover:bg-brand-100 hover:border-brand-300"
                  }`}
                >
                  {tab === 'govt' && "Government & Tenders"}
                  {tab === 'engineer' && "Engineers & Contractors"}
                  {tab === 'supplier' && "Hardware & Suppliers"}
                  {tab === 'public' && "Public & Transparency"}
                </button>
              ))}
            </div>

            <div className="min-h-[550px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  {/* Left Text Content */}
                  <div className="space-y-8 pl-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-widest">
                       {activeTab === 'govt' && <><Gavel size={14}/> Tender Intelligence</>}
                       {activeTab === 'engineer' && <><HardHat size={14}/> Site Operations</>}
                       {activeTab === 'supplier' && <><Truck size={14}/> Supply Chain</>}
                       {activeTab === 'public' && <><Users size={14}/> Citizen Oversight</>}
                    </div>
                    
                    <h3 className="text-4xl font-medium text-brand-900 leading-tight">
                      {activeTab === 'govt' && "Eliminate Corruption. Automate Accountability."}
                      {activeTab === 'engineer' && "Build Reputation. Streamline Execution."}
                      {activeTab === 'supplier' && "Direct Access. Guaranteed Payments."}
                      {activeTab === 'public' && "Verify Progress. Build Trust."}
                    </h3>
                    
                    <p className="text-lg text-brand-500 leading-relaxed font-light">
                      {activeTab === 'govt' && "Stop assigning projects blindly. Our AI analyzes historical performance, flags financial risks, and ensures tenders are awarded to capable engineers based on merit, not connections."}
                      {activeTab === 'engineer' && "Your work speaks for itself. Create a verifiable digital CV, manage labor via voice logs, and auto-generate material indents. Prove your efficiency to win bigger contracts."}
                      {activeTab === 'supplier' && "Connect directly with site engineers. Receive bulk demands in real-time and compete on a transparent marketplace. Enjoy automated invoicing and secure digital payments."}
                      {activeTab === 'public' && "Scan the QR code at any construction site to view the assigned budget, deadlines, and AI-verified progress photos. Direct feedback ensures public money is well spent."}
                    </p>
                    
                    <ul className="space-y-4 mt-4">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-brand-50 transition-colors cursor-default">
                          <div className="mt-1 w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center text-brand-800 shadow-sm">
                             <CheckCircle2 size={14} strokeWidth={3} />
                          </div>
                          <div>
                             <h4 className="text-brand-900 font-semibold text-sm">
                                {activeTab === 'govt' && i === 1 && "AI-Driven Risk Assessment Score"}
                                {activeTab === 'govt' && i === 2 && "Real-time Fund Utilization Tracking"}
                                {activeTab === 'govt' && i === 3 && "Automated Compliance Audits"}

                                {activeTab === 'engineer' && i === 1 && "Voice-to-Text Daily Logging"}
                                {activeTab === 'engineer' && i === 2 && "Digital Labor & Payroll Management"}
                                {activeTab === 'engineer' && i === 3 && "One-Click Material Indents"}

                                {activeTab === 'supplier' && i === 1 && "Predictive Demand Forecasting"}
                                {activeTab === 'supplier' && i === 2 && "GST-Compliant Auto-Invoicing"}
                                {activeTab === 'supplier' && i === 3 && "Direct-to-Site Logistics"}

                                {activeTab === 'public' && i === 1 && "QR Code Site Verification"}
                                {activeTab === 'public' && i === 2 && "Visual Progress Timelines"}
                                {activeTab === 'public' && i === 3 && "Direct Grievance Redressal"}
                             </h4>
                             <p className="text-xs text-brand-400 mt-0.5">
                                {activeTab === 'govt' && i === 1 && "Detects bidder collusion and past delivery failures."}
                                {activeTab === 'engineer' && i === 1 && "Speak naturally; the system fills the forms."}
                                {activeTab === 'supplier' && i === 1 && "Know what projects need before they ask."}
                                {activeTab === 'public' && i === 1 && "Instant access to budget and deadline data."}
                             </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Visual Content - The "Luxurious" Cards */}
                  <div className="bg-brand-50/50 rounded-3xl aspect-square md:aspect-[4/3] relative flex items-center justify-center overflow-hidden border border-brand-100/50 shadow-inner">
                    
                    {/* Background Abstract Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-brand-100 to-transparent opacity-40 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-brand-200 to-transparent opacity-30 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                    {/* -- GOVERNMENT CARD -- */}
                    {activeTab === 'govt' && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 relative z-10"
                      >
                        <div className="flex justify-between items-center mb-6 border-b border-brand-100 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-brand-900 text-white p-2 rounded-lg shadow-lg shadow-brand-900/20"><ShieldCheck size={20}/></div>
                            <div>
                              <div className="text-xs text-brand-500 font-bold uppercase tracking-wide">Tender Review</div>
                              <div className="text-brand-900 font-bold text-lg">#TND-2024-88</div>
                            </div>
                          </div>
                          <div className="px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded text-xs font-bold">
                            Analyzing
                          </div>
                        </div>

                        <div className="space-y-3">
                           <div className="text-xs text-brand-400 uppercase tracking-widest mb-1">Top Bidders</div>
                           
                           {/* Bidder 1 - Good */}
                           <div className="group p-3 rounded-xl bg-white border border-brand-100 shadow-sm hover:border-green-200 hover:shadow-md transition-all flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">A1</div>
                                <div>
                                  <div className="text-sm font-bold text-brand-900">Apex Infra</div>
                                  <div className="text-[10px] text-brand-500">Quote: $1.2M</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-bold text-green-600">98/100</div>
                                <div className="text-[10px] text-brand-400">Low Risk</div>
                              </div>
                           </div>

                           {/* Bidder 2 - Bad */}
                           <div className="group p-3 rounded-xl bg-red-50/30 border border-red-100 shadow-sm flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-xs font-bold text-red-700">B2</div>
                                <div>
                                  <div className="text-sm font-bold text-brand-900">BuildCo Ltd.</div>
                                  <div className="text-[10px] text-brand-500">Quote: $1.1M</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs font-bold text-red-600 flex items-center gap-1 justify-end"><AlertTriangle size={10}/> Flagged</div>
                                <div className="text-[10px] text-brand-400">Delay History</div>
                              </div>
                           </div>
                        </div>

                        {/* AI Insight */}
                        <div className="mt-5 p-3 bg-brand-900 rounded-xl text-white flex items-start gap-3 shadow-lg">
                           <Activity size={16} className="mt-1 text-brand-300 shrink-0" />
                           <p className="text-xs leading-relaxed text-brand-100">
                             <span className="font-bold text-white">AI Recommendation:</span> BuildCo Ltd has a 40% probability of delay based on previous 3 projects. Apex Infra is recommended.
                           </p>
                        </div>
                      </motion.div>
                    )}

                    {/* -- ENGINEER CARD -- */}
                    {activeTab === 'engineer' && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 relative z-10"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h4 className="text-lg font-bold text-brand-900">Site Operations</h4>
                            <p className="text-xs text-brand-500">Project: Metro Station 4</p>
                          </div>
                          <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 border border-brand-100">
                            <Mic size={20}/>
                          </div>
                        </div>

                        {/* Voice Visualizer */}
                        <div className="bg-brand-900 rounded-xl p-4 mb-5 text-white relative overflow-hidden shadow-lg">
                           <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] text-brand-300 uppercase tracking-widest">Recording Log...</span>
                              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                           </div>
                           <div className="flex items-end gap-1 h-8 justify-center mb-2">
                              {[3, 7, 4, 8, 5, 12, 6, 9, 4, 8, 5, 10, 4, 7, 3].map((h, i) => (
                                <motion.div 
                                  key={i}
                                  animate={{ height: [6, 24, 6] }}
                                  transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
                                  className="w-1.5 bg-brand-200 rounded-full opacity-80"
                                />
                              ))}
                           </div>
                           <p className="text-xs text-brand-100 italic text-center">"Unloaded 500 bags of UltraTech cement. Shift B attendance marked complete."</p>
                        </div>

                        {/* Task Checklist */}
                        <div className="space-y-2">
                           <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
                              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white"><CheckCircle2 size={12}/></div>
                              <span className="text-xs font-bold text-brand-800 line-through decoration-brand-400 decoration-2">Morning Pouring</span>
                           </div>
                           <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-brand-200 shadow-sm">
                              <div className="w-5 h-5 border-2 border-brand-300 rounded-full"></div>
                              <span className="text-xs font-bold text-brand-900">Material Audit (Pending)</span>
                           </div>
                        </div>
                      </motion.div>
                    )}

                    {/* -- SUPPLIER CARD -- */}
                    {activeTab === 'supplier' && (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 relative z-10"
                      >
                         <div className="flex justify-between items-center mb-6">
                           <h4 className="text-lg font-bold text-brand-900 flex items-center gap-2">
                             <Truck size={20} className="text-brand-600"/> Live Orders
                           </h4>
                           <div className="flex gap-1">
                             <span className="w-2 h-2 bg-brand-200 rounded-full"></span>
                             <span className="w-2 h-2 bg-brand-400 rounded-full"></span>
                             <span className="w-2 h-2 bg-brand-900 rounded-full"></span>
                           </div>
                         </div>

                         {/* Incoming Order */}
                         <div className="relative bg-white border border-brand-200 rounded-xl p-4 shadow-lg mb-4 overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-900"></div>
                            <div className="flex justify-between items-start mb-3">
                               <div>
                                  <div className="text-xs text-brand-400 uppercase font-bold">New Demand</div>
                                  <div className="text-brand-900 font-bold text-lg">Cement (Grade 53)</div>
                                  <div className="text-xs text-brand-500">Grand City Tower • <span className="text-brand-700 font-medium">2km away</span></div>
                               </div>
                               <div className="bg-brand-50 px-2 py-1 rounded text-center border border-brand-100">
                                  <div className="text-lg font-bold text-brand-900">500</div>
                                  <div className="text-[10px] text-brand-500 uppercase">Bags</div>
                               </div>
                            </div>
                            <div className="flex gap-3 pt-2 border-t border-brand-50">
                               <button className="flex-1 bg-brand-900 text-white text-xs font-bold py-2 rounded-lg shadow-lg hover:bg-brand-800 transition-colors">Accept Order</button>
                               <button className="px-4 border border-brand-200 text-brand-600 text-xs font-bold py-2 rounded-lg hover:bg-brand-50">Details</button>
                            </div>
                         </div>

                         {/* Market Ticker */}
                         <div className="bg-brand-50 rounded-xl p-3 flex justify-between items-center border border-brand-100">
                            <div>
                               <div className="text-[10px] text-brand-400 uppercase font-bold">Market Price</div>
                               <div className="text-sm font-bold text-brand-900">₹340 / bag</div>
                            </div>
                            <div className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded flex items-center gap-1">
                               <TrendingUp size={12}/> +2.4%
                            </div>
                         </div>
                      </motion.div>
                    )}

                    {/* -- PUBLIC CARD -- */}
                    {activeTab === 'public' && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="w-[280px] bg-brand-900 rounded-[2.5rem] p-3 shadow-2xl relative z-10 border-4 border-brand-800"
                      >
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-brand-950 rounded-b-xl z-20"></div>
                        
                        {/* Screen */}
                        <div className="bg-gray-50 w-full h-[480px] rounded-[2rem] overflow-hidden flex flex-col relative">
                           
                           {/* App Header / Camera View */}
                           <div className="h-2/5 bg-gray-300 relative">
                              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <Building2 size={64} className="text-brand-900"/>
                              </div>
                              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg flex items-center gap-3">
                                 <div className="bg-green-100 p-1.5 rounded-md text-green-700"><ShieldCheck size={16}/></div>
                                 <div>
                                    <div className="text-[10px] text-brand-500 uppercase font-bold">Govt Verified</div>
                                    <div className="text-xs font-bold text-brand-900">Library Project #89</div>
                                 </div>
                              </div>
                           </div>

                           {/* App Body */}
                           <div className="p-4 flex-1 bg-white">
                              <div className="mb-4">
                                 <div className="flex justify-between text-xs font-bold text-brand-900 mb-1">
                                    <span>Completion</span>
                                    <span>72%</span>
                                 </div>
                                 <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full w-[72%] rounded-full"></div>
                                 </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mb-4">
                                 <div className="p-2 bg-brand-50 rounded-lg border border-brand-100">
                                    <div className="text-[10px] text-brand-400 uppercase">Budget</div>
                                    <div className="text-sm font-bold text-brand-900">$2.4M</div>
                                 </div>
                                 <div className="p-2 bg-brand-50 rounded-lg border border-brand-100">
                                    <div className="text-[10px] text-brand-400 uppercase">End Date</div>
                                    <div className="text-sm font-bold text-brand-900">Dec 30</div>
                                 </div>
                              </div>

                              <button className="w-full py-3 bg-brand-900 text-white rounded-xl text-xs font-bold shadow-lg mt-auto">
                                 Report Grievance
                              </button>
                           </div>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- Core Solutions Section (New Section) --- */}
        <section id="solutions" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-brand-900 mb-4">Powerful Solutions for Every Role</h2>
            <p className="text-brand-500 max-w-2xl mx-auto">BRIXA empowers every stakeholder with tailored tools designed to enhance efficiency and transparency.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Solution for Architects */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-50 w-fit p-3 rounded-full mb-4 text-blue-700">
                <LayoutGrid size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-900">Architects: Collaborative Design Vault</h3>
              <p className="text-brand-500 text-sm leading-relaxed mb-4">
                Upload, organize, and version all drawings (AutoCAD, Revit, PDFs) in a secure, cloud-based vault. Enable secure sharing with contractors, engineers, and project managers.
              </p>
              <ul className="space-y-2 text-sm text-brand-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Real-Time Collaboration & Markups</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Threaded Discussions on Plans</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Automated Version Control</li>
              </ul>
            </Card>

            {/* Solution for Auditors/Finance */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <div className="bg-red-50 w-fit p-3 rounded-full mb-4 text-red-700">
                <DollarSign size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-900">Auditors: Unwavering Financial Oversight</h3>
              <p className="text-brand-500 text-sm leading-relaxed mb-4">
                Set and allocate project budgets to phases (excavation, RCC, finishing). Predict cost overruns with analytics and gain powerful cashflow forecasting.
              </p>
              <ul className="space-y-2 text-sm text-brand-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> AI-Powered Invoice & Bill Verification (OCR)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Real-time Payment Tracking & Approvals</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Comprehensive Financial Reporting</li>
              </ul>
            </Card>

            {/* Solution for Engineers/Contractors (Enhanced) */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <div className="bg-yellow-50 w-fit p-3 rounded-full mb-4 text-yellow-700">
                <HardHat size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-900">Engineers: Project Execution Excellence</h3>
              <p className="text-brand-500 text-sm leading-relaxed mb-4">
                Define 15-day milestone plans and track daily progress. Record logs via AI voice notes, upload photos as proof, and manage all site communications efficiently.
              </p>
              <ul className="space-y-2 text-sm text-brand-600">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> AI Voice & OCR for Daily Reports</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Plan vs. Actual Progress Tracking</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Labor Attendance & Performance Monitoring</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* --- Features Grid (Rich Content) --- */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="col-span-1 md:col-span-2 bg-brand-900 text-white border-none">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="bg-brand-800 w-fit p-2 rounded-lg mb-4">
                    <Mic size={24} className="text-brand-200"/>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">AI Voice & OCR Automation</h3>
                  <p className="text-brand-300 leading-relaxed">
                    Engineers don't have time to type. Record daily logs via voice ("Unloaded 500 bags of cement"). 
                    Scan paper invoices with your phone, and our OCR automatically digitizes rates, GST, and quantities for the auditor, streamlining data entry and verification.
                  </p>
                </div>
                <div className="mt-8 flex gap-2 flex-wrap">
                   <div className="bg-brand-800/50 px-3 py-1 rounded text-xs border border-brand-700">Voice-to-Text Logs</div>
                   <div className="bg-brand-800/50 px-3 py-1 rounded text-xs border border-brand-700">Automated Ledger</div>
                   <div className="bg-brand-800/50 px-3 py-1 rounded text-xs border border-brand-700">Invoice Digitization</div>
                </div>
              </div>
            </Card>

            <Card>
               <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                  <BarChart3 size={24} />
               </div>
               <h3 className="text-xl font-medium mb-2 text-brand-900">Plan vs. Actual Analytics</h3>
               <p className="text-brand-500 text-sm leading-relaxed">
                 Define detailed 15-day milestone plans for each project phase. The system tracks daily uploads and alerts you if progress, material usage, or labor deviates from the baseline schedule, ensuring proactive management.
               </p>
            </Card>

            <Card>
               <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                  <Search size={24} />
               </div>
               <h3 className="text-xl font-medium mb-2 text-brand-900">Smart Tender Matching & Ranking</h3>
               <p className="text-brand-500 text-sm leading-relaxed">
                 Advanced algorithms analyze past project data, performance metrics, and compliance records to recommend the most capable and reputable engineers for specific government tenders, promoting fair competition and quality outcomes.
               </p>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                   <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                      <Users size={24} />
                   </div>
                   <h3 className="text-2xl font-medium mb-2 text-brand-900">Collaborative Project Vault</h3>
                   <p className="text-brand-500 leading-relaxed mb-6">
                     A single source of truth for all project documentation including blueprints (CAD/PDF), contracts, daily logs, and financial records. Architects upload revisions, Engineers comment on site feasibility, and Auditors track budget implications of design changes – all in real-time.
                   </p>
                   <Button variant="outline" size="sm">Explore Vault</Button>
                </div>
                <div className="flex-1 w-full bg-brand-50 rounded-lg border border-brand-100 p-4 space-y-3">
                   {/* Mock File List */}
                   {['Site_Elevation_v2.pdf', 'Foundation_Details.dwg', 'Budget_Forecast_Q3.xlsx', 'Daily_Progress_Report_08-22.jpeg'].map((file, i) => (
                     <div key={i} className="flex items-center justify-between bg-white p-3 rounded border border-brand-100">
                        <div className="flex items-center gap-3">
                           {i % 2 === 0 ? <FileCheck size={16} className="text-green-600"/> : <FileSpreadsheet size={16} className="text-brand-400"/>}
                           <span className="text-sm text-brand-700">{file}</span>
                        </div>
                        <span className={`text-xs ${i % 2 === 0 ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'} px-2 py-0.5 rounded`}>
                          {i % 2 === 0 ? 'Verified' : 'Pending Review'}
                        </span>
                     </div>
                   ))}
                </div>
              </div>
            </Card>

            {/* New Card: Chat & AI Assistant */}
            <Card>
               <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                  <MessageSquareText size={24} />
               </div>
               <h3 className="text-xl font-medium mb-2 text-brand-900">Integrated Chat & AI Assistant</h3>
               <p className="text-brand-500 text-sm leading-relaxed">
                 Communicate seamlessly with all project entities – architects, auditors, suppliers, and labor. Our integrated AI chatbot provides instant answers, training, and support, guiding users through complex workflows.
               </p>
            </Card>

            {/* New Card: KYC & Performance Tracking */}
            <Card>
               <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                  <ShieldCheck size={24} />
               </div>
               <h3 className="text-xl font-medium mb-2 text-brand-900">KYC Verification & Performance Registry</h3>
               <p className="text-brand-500 text-sm leading-relaxed">
                 Ensure trust and compliance with mandatory KYC verification for all entities. Track individual employee and team performance, login registries, and project contributions to build comprehensive, verifiable profiles.
               </p>
            </Card>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-32 bg-brand-800 text-white relative overflow-hidden">
           <div className="absolute inset-0 opacity-10">
              {/* Subtle pattern */}
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           </div>
           
           <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
             <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">Start Building with Integrity.</h2>
             <p className="text-brand-200 text-lg mb-10 max-w-2xl mx-auto">
               Whether you are a government body seeking accountability, an engineer seeking recognition, or a supplier seeking new markets—join the BRIXA network that rewards quality and transparency.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="h-14 px-8 rounded-sm bg-white text-brand-900 font-medium hover:bg-brand-100 transition-colors">
                   Register Organization
                </button>
                <button className="h-14 px-8 rounded-sm border border-brand-600 text-white font-medium hover:bg-brand-700 transition-colors">
                   Contact Sales
                </button>
             </div>
           </div>
        </section>

      </main>

    {/* --- Footer --- */}
          <footer className="bg-brand-50 py-16 px-8 border-t border-brand-100/70">
            <div className="max-w-8xl mx-auto grid md:grid-cols-5 lg:grid-cols-6 gap-12 text-base">
              <div className="col-span-2">
                 <Logo />
                 <p className="mt-6 text-brand-500 leading-relaxed text-sm max-w-sm">
                   The premium operating system for modern construction, bridging the gap between blueprint and reality with unwavering transparency and efficiency.
                 </p>
                 <div className="mt-8 flex gap-4 text-brand-400">
                    {/* Social Icons Placeholder */}
                    <a href="#" aria-label="LinkedIn" className="hover:text-brand-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
                    <a href="#" aria-label="Twitter" className="hover:text-brand-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4.9 9 5.1 0-2.3 1.9-4.3 4.5-4.5C19.5 2.5 22 2 22 4z"/></svg></a>
                    <a href="#" aria-label="Facebook" className="hover:text-brand-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                 </div>
              </div>
    
              <div>
                <h4 className="font-bold text-brand-900 mb-5 uppercase tracking-wider text-xs">Platform</h4>
                <ul className="space-y-3 text-brand-600">
                  <li><a href="#features" className="hover:text-brand-900 transition-colors">Tender Management</a></li>
                  <li><a href="#features" className="hover:text-brand-900 transition-colors">Supplier Marketplace</a></li>
                  <li><a href="#features" className="hover:text-brand-900 transition-colors">Project Tracking</a></li>
                  <li><a href="#transparency" className="hover:text-brand-900 transition-colors">Public Audit</a></li>
                  <li><a href="#ecosystem" className="hover:text-brand-900 transition-colors">Ecosystem View</a></li>
                </ul>
              </div>
    
              <div>
                <h4 className="font-bold text-brand-900 mb-5 uppercase tracking-wider text-xs">Resources</h4>
                <ul className="space-y-3 text-brand-600">
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Customer Stories</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Implementation Guides</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">API Documentation</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Security & Compliance</a></li>
                </ul>
              </div>
    
              <div>
                <h4 className="font-bold text-brand-900 mb-5 uppercase tracking-wider text-xs">Company</h4>
                <ul className="space-y-3 text-brand-600">
                  <li><a href="#about" className="hover:text-brand-900 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Contact</a></li>
                </ul>
              </div>
    
              <div className="col-span-full md:col-span-1 lg:col-span-2"> {/* Make newsletter span correctly */}
                 <h4 className="font-bold text-brand-900 mb-5 uppercase tracking-wider text-xs">Stay Connected</h4>
                 <p className="text-sm text-brand-500 mb-4">Subscribe to our newsletter for the latest updates and insights.</p>
                 <div className="flex gap-3">
                   <input type="email" placeholder="Your email address" className="bg-white border border-brand-200 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-500 text-brand-800 placeholder-brand-400" />
                   <Button size="md" variant="primary" className="shadow-md shadow-brand-200/50 flex-shrink-0"><ArrowRight size={20}/></Button>
                 </div>
              </div>
            </div>
            <div className="max-w-8xl mx-auto mt-20 pt-10 border-t border-brand-200/70 flex flex-col sm:flex-row justify-between text-brand-400 text-sm gap-4">
              <span>© {new Date().getFullYear()} BRIXA Inc. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-brand-700 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-brand-700 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-brand-700 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </footer>
    </div>
  );
}

