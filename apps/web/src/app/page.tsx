"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@repo/ui/button"; // Adjust path
import { Card } from "@repo/ui/card";     // Adjust path
import { 
  Building2, ShieldCheck, FileSpreadsheet, HardHat, 
  Layers, Smartphone, Search, Activity, FileCheck, 
  Users, Play, ArrowRight, QrCode, Mic, Scale, 
  Zap, FolderLock, TrendingUp, CheckCircle2
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// --- Brand Assets ---
const Logo = () => (
  <div className="flex items-center gap-2.5 cursor-pointer group">
    <div className="flex items-end gap-0.5 h-7">
      <motion.div initial={{ h: 10 }} animate={{ height: 28 }} className="w-1.5 bg-brand-900 rounded-sm" />
      <motion.div initial={{ h: 10 }} animate={{ height: 18 }} className="w-1.5 bg-brand-600 rounded-sm group-hover:bg-brand-500 transition-colors" />
      <motion.div initial={{ h: 10 }} animate={{ height: 24 }} className="w-1.5 bg-brand-800 rounded-sm" />
    </div>
    <span className="font-bold text-xl tracking-tighter text-brand-900">BRIXA</span>
  </div>
);

// --- Main Component ---
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"govt" | "engineer" | "supplier" | "public">("govt");
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen bg-canvas text-brand-900 font-sans overflow-x-hidden selection:bg-brand-900 selection:text-brand-50">
      
      {/* --- Textured Background --- */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>

      {/* --- Navigation --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-canvas/80 backdrop-blur-md border-b border-brand-100/50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-600">
            <a href="#solutions" className="hover:text-brand-900 transition-colors">Solutions</a>
            <a href="#platform" className="hover:text-brand-900 transition-colors">Platform</a>
            <a href="#transparency" className="hover:text-brand-900 transition-colors">Transparency</a>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">Log in</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10 pt-32">
        
        {/* --- Hero Section --- */}
        <section className="relative px-6 max-w-7xl mx-auto mb-24 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100/50 border border-brand-200 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
                </span>
                <span className="text-xs font-bold tracking-wide uppercase text-brand-800">Live Tender Intelligence</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-brand-900 mb-6 leading-[1.1]">
                Construction with <br/>
                <span className="text-brand-500 italic font-serif">Radical Integrity.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg text-brand-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                The operating system connecting Governments, Engineers, and Suppliers. 
                From <strong>Tender Allocation</strong> to <strong>Material Logistics</strong>, 
                verify every brick with AI-driven accountability.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="default" className="h-14 px-8 text-base">Start Free Trial</Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base group">
                  See How It Works 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-brand-400 text-sm font-medium">
                 <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600"/> AI Invoice OCR</div>
                 <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600"/> Geo-Fenced Attendance</div>
                 <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-600"/> Public Audit QR</div>
              </motion.div>
            </motion.div>

            {/* Right Visualization (Abstract Dashboard) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
               <div className="relative z-10 bg-white p-2 rounded-2xl shadow-2xl shadow-brand-900/10 border border-brand-100/50 rotate-3 hover:rotate-0 transition-all duration-500">
                  <img 
                    src="/api/placeholder/600/700" 
                    alt="App Dashboard Interface" 
                    className="rounded-xl w-full h-auto bg-brand-50"
                    style={{ aspectRatio: "4/5", objectFit: "cover", background: "#F7F5F3" }} 
                  />
                  
                  {/* Floating Element: Live Status */}
                  <div className="absolute -left-8 top-20 bg-brand-900 text-white p-4 rounded-lg shadow-xl max-w-[200px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase text-brand-300 font-bold">Project Alpha</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="text-sm font-medium">Milestone 3: Foundation</div>
                    <div className="w-full bg-brand-700 h-1.5 rounded-full mt-2">
                      <div className="bg-green-400 h-1.5 rounded-full w-[75%]" />
                    </div>
                    <div className="mt-2 text-[10px] text-brand-300 flex justify-between">
                      <span>Budget: On Track</span>
                      <span>+12% Efficency</span>
                    </div>
                  </div>

                   {/* Floating Element: Voice Note */}
                   <div className="absolute -right-6 bottom-32 bg-white p-3 rounded-lg shadow-lg border border-brand-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-800">
                        <Mic size={20} />
                      </div>
                      <div>
                        <div className="text-xs text-brand-500">Voice Note Added</div>
                        <div className="text-sm font-medium text-brand-900">"Unloaded 500 bags..."</div>
                      </div>
                   </div>
               </div>
               {/* Background blobs */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-200/30 to-transparent rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </section>

        {/* --- Interactive Ecosystem Tabs --- */}
        <section id="solutions" className="py-24 bg-white relative border-y border-brand-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold text-brand-900 mb-4">Unified Construction Cloud</h2>
              <p className="text-brand-500 text-lg">Most construction delays happen in the gaps between stakeholders. Brixa closes the loop.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-12 p-1 bg-brand-50 rounded-xl max-w-3xl mx-auto border border-brand-100">
              {(['govt', 'engineer', 'supplier', 'public'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab 
                      ? "bg-white text-brand-900 shadow-sm ring-1 ring-black/5" 
                      : "text-brand-500 hover:text-brand-700 hover:bg-brand-100/50"
                  }`}
                >
                  {tab === 'govt' && "Government"}
                  {tab === 'engineer' && "Contractors"}
                  {tab === 'supplier' && "Suppliers"}
                  {tab === 'public' && "Public"}
                </button>
              ))}
            </div>

            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-16 items-center"
                >
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif italic text-brand-900 mb-4">
                        {activeTab === 'govt' && "Eliminate Tender Fraud."}
                        {activeTab === 'engineer' && "Build Your Digital Legacy."}
                        {activeTab === 'supplier' && "Access High-Volume Demand."}
                        {activeTab === 'public' && "Trust Through Verification."}
                      </h3>
                      <p className="text-lg text-brand-600 leading-relaxed">
                        {activeTab === 'govt' && "Stop assigning projects blindly. Use our AI to analyze past performance, budget adherence, and material quality before awarding contracts. Ensure tax money is built to last."}
                        {activeTab === 'engineer' && "Good work often goes unnoticed. We create a verified 'Digital CV' for your firm. Track labor, manage blueprints, and showcase your efficiency to win bigger tenders."}
                        {activeTab === 'supplier' && "No more middlemen. Receive direct material requests from site engineers. Compete on quality and price, manage GST invoicing automatically, and get paid faster."}
                        {activeTab === 'public' && "Scan the QR code at any construction site. See the budget, the deadline, and real-time progress photos. Report issues directly to the oversight committee."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="p-4 border-l-4 border-l-brand-500 border-y-0 border-r-0 rounded-r-lg rounded-l-none bg-brand-50/50 hover:bg-brand-50 transition-colors">
                          <h4 className="font-semibold text-brand-900 mb-1">
                            {activeTab === 'govt' && i === 1 && "Historical Performance Analytics"}
                            {activeTab === 'govt' && i === 2 && "Automated Budget vs Actual Alerts"}
                            {activeTab === 'govt' && i === 3 && "Digital Audit Trails & Compliance"}
                            
                            {activeTab === 'engineer' && i === 1 && "Unified Project Dashboard"}
                            {activeTab === 'engineer' && i === 2 && "Labor & Material Tracking"}
                            {activeTab === 'engineer' && i === 3 && "Blueprint Version Control"}

                            {activeTab === 'supplier' && i === 1 && "Live Demand Marketplace"}
                            {activeTab === 'supplier' && i === 2 && "E-Invoicing & GST Integration"}
                            {activeTab === 'supplier' && i === 3 && "Payment Reconciliation"}

                            {activeTab === 'public' && i === 1 && "Site QR Scanning"}
                            {activeTab === 'public' && i === 2 && "Citizen Reporting Portal"}
                            {activeTab === 'public' && i === 3 && "Progress Timelines"}
                          </h4>
                          <p className="text-sm text-brand-500">
                            {activeTab === 'govt' && i === 1 && "View a contractor's efficiency rating across all previous government jobs."}
                            {activeTab === 'engineer' && i === 1 && "Manage finances, tasks, and teams in one view."}
                            {activeTab === 'supplier' && i === 1 && "See exactly what materials are needed nearby."}
                            {activeTab === 'public' && i === 1 && "Transparency at your fingertips via smartphone."}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Illustration Area */}
                  <div className="relative aspect-square bg-brand-900 rounded-2xl overflow-hidden p-8 flex items-center justify-center shadow-2xl">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    
                    {/* Iconography */}
                    <motion.div 
                      key={activeTab + "icon"}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative z-10 text-brand-100"
                    >
                       {activeTab === 'govt' && <Scale size={140} strokeWidth={1} />}
                       {activeTab === 'engineer' && <HardHat size={140} strokeWidth={1} />}
                       {activeTab === 'supplier' && <Zap size={140} strokeWidth={1} />}
                       {activeTab === 'public' && <QrCode size={140} strokeWidth={1} />}
                    </motion.div>

                    {/* Floating UI Card inside Illustration */}
                    <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg text-white"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs uppercase tracking-wider text-brand-200">Live Data</span>
                        <Activity size={14} className="text-green-400" />
                      </div>
                      <div className="text-lg font-medium">
                        {activeTab === 'govt' && "Audit Score: 98/100"}
                        {activeTab === 'engineer' && "Material Request Sent"}
                        {activeTab === 'supplier' && "Order #402 Confirmed"}
                        {activeTab === 'public' && "Phase 1: Completed"}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- Feature Bento Grid --- */}
        <section id="platform" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-semibold text-brand-900 mb-4">The Engineer's Toolkit</h2>
             <p className="text-brand-500">Powerful tools to manage chaos, built for the field, not just the office.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
            
            {/* Feature 1: Voice & OCR (Large) */}
            <Card className="col-span-1 md:col-span-2 row-span-2 bg-brand-900 text-brand-50 border-none relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-0" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center mb-6 border border-brand-700">
                      <Mic className="text-brand-200" size={24} />
                   </div>
                   <h3 className="text-3xl font-medium mb-4">"Voice-to-Ledger" AI</h3>
                   <p className="text-brand-300 text-lg max-w-md leading-relaxed">
                     Stop typing on dusty screens. Simply record: <br/>
                     <span className="italic text-white">"Unloaded 2000 bricks at Site B, cost 15,000 rupees."</span> <br/>
                     Our AI parses this into your inventory, deducts the cash, and updates the daily log instantly.
                   </p>
                </div>
                
                <div className="mt-8 p-4 bg-brand-800/50 rounded-lg border border-brand-700/50 backdrop-blur-sm flex items-center gap-4">
                   <div className="w-2 h-8 bg-green-500 rounded-full animate-pulse" />
                   <div className="flex-1">
                      <div className="h-2 bg-brand-700 rounded-full w-full mb-2" />
                      <div className="h-2 bg-brand-700 rounded-full w-2/3" />
                   </div>
                   <span className="text-xs text-brand-400 font-mono">PROCESSING AUDIO...</span>
                </div>
              </div>
            </Card>

            {/* Feature 2: Blueprint Vault */}
            <Card className="bg-brand-50 p-8 flex flex-col justify-between hover:border-brand-300 transition-colors">
               <div>
                 <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4 text-brand-800">
                    <FolderLock size={20} />
                 </div>
                 <h3 className="text-xl font-semibold mb-2">Blueprint Vault</h3>
                 <p className="text-sm text-brand-500 leading-relaxed">
                   Centralized storage for CAD/PDFs. Version control ensures no one builds off old drawings.
                 </p>
               </div>
               <div className="mt-6 space-y-2">
                 <div className="flex items-center gap-2 text-xs text-brand-600 bg-white p-2 rounded border border-brand-100">
                    <FileCheck size={12} /> Structural_v4.dwg
                 </div>
                 <div className="flex items-center gap-2 text-xs text-brand-400 bg-white/50 p-2 rounded border border-brand-100">
                    <FileCheck size={12} /> Electric_Grid.pdf
                 </div>
               </div>
            </Card>

            {/* Feature 3: Milestones */}
            <Card className="bg-white p-8 flex flex-col justify-between hover:border-brand-300 transition-colors">
               <div>
                 <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4 text-brand-800">
                    <TrendingUp size={20} />
                 </div>
                 <h3 className="text-xl font-semibold mb-2">Plan vs. Actual</h3>
                 <p className="text-sm text-brand-500 leading-relaxed">
                   Set 15-day milestones. If progress lags, the system alerts the engineer and owner immediately.
                 </p>
               </div>
               <div className="mt-4 h-16 flex items-end gap-1">
                  {[40, 70, 50, 90, 30, 80].map((h, i) => (
                    <div key={i} className="w-full bg-brand-100 rounded-t-sm relative group">
                       <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-brand-800 rounded-t-sm transition-all duration-500" />
                    </div>
                  ))}
               </div>
            </Card>

            {/* Feature 4: Supplier Connect (Wide) */}
            <Card className="col-span-1 md:col-span-3 bg-gradient-to-r from-brand-100 to-white p-8 flex flex-col md:flex-row items-center gap-8">
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-4">
                    <Users className="text-brand-700" size={24}/>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Marketplace</span>
                 </div>
                 <h3 className="text-2xl font-semibold mb-4 text-brand-900">Local Supplier Discovery</h3>
                 <p className="text-brand-600 mb-6 max-w-xl">
                   Need 50 bags of cement urgently? Broadcast a demand signal to verified hardware stores within 5km. Compare quotes, check quality ratings, and order instantly.
                 </p>
                 <Button variant="default">View Suppliers Demo</Button>
               </div>
               <div className="flex-1 w-full max-w-sm bg-white rounded-xl shadow-xl border border-brand-100 p-4 space-y-3 rotate-2">
                  <div className="flex justify-between items-center border-b border-brand-50 pb-2">
                     <span className="text-xs font-bold text-brand-400">INCOMING QUOTES</span>
                     <span className="text-xs bg-brand-100 px-2 py-0.5 rounded text-brand-800">Live</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs font-bold">A</div>
                        <div>
                           <div className="text-sm font-medium">Apex Hardware</div>
                           <div className="text-xs text-brand-400">2.4km away</div>
                        </div>
                     </div>
                     <span className="font-bold text-brand-900">$420</span>
                  </div>
                  <div className="flex items-center justify-between opacity-60">
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">B</div>
                        <div>
                           <div className="text-sm font-medium">BuildRight Supplies</div>
                           <div className="text-xs text-brand-400">5.1km away</div>
                        </div>
                     </div>
                     <span className="font-bold text-brand-900">$445</span>
                  </div>
               </div>
            </Card>
          </div>
        </section>

        {/* --- Trust & Transparency (QR Code Focus) --- */}
        <section id="transparency" className="py-24 bg-brand-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 opacity-5">
            <QrCode size={400} />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
               <div className="inline-block px-3 py-1 border border-brand-600 rounded-full text-xs font-medium text-brand-200 mb-6">
                 PUBLIC ACCOUNTABILITY PROTOCOL
               </div>
               <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                 If you build it right, <br/> show it to the world.
               </h2>
               <p className="text-brand-200 text-lg mb-8 leading-relaxed">
                 Every project generates a unique public QR code. Citizens can scan to view the project details, assigned budget, and verify if the progress matches the promise.
               </p>
               <ul className="space-y-4 mb-8">
                 <li className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><ShieldCheck size={16}/></div>
                   <span>Fraud-proof immutable records</span>
                 </li>
                 <li className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Users size={16}/></div>
                   <span>Citizen complaint redressal system</span>
                 </li>
               </ul>
            </div>
            <div className="bg-white rounded-2xl p-2 max-w-sm mx-auto rotate-1 shadow-2xl shadow-black/50">
               <div className="bg-brand-50 border-2 border-dashed border-brand-200 rounded-xl p-8 flex flex-col items-center text-center">
                  <QrCode size={180} className="text-brand-900 mb-4" />
                  <div className="font-mono text-xs text-brand-400 mb-2">SCAN TO VERIFY PROJECT</div>
                  <h3 className="font-bold text-xl text-brand-900">Kathmandu City Road #402</h3>
                  <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                     <div className="bg-green-500 h-full w-[65%]" />
                  </div>
                  <div className="flex justify-between w-full mt-2 text-xs font-bold text-brand-600">
                     <span>65% DONE</span>
                     <span>ON TIME</span>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-32 bg-brand-50 text-center px-6">
           <div className="max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-semibold text-brand-900 mb-6 tracking-tight">Ready to upgrade your infrastructure?</h2>
             <p className="text-brand-500 text-xl mb-10">
               Join the network of forward-thinking governments and engineers.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-brand-900/10">Get Started Now</Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg bg-white">Contact Sales</Button>
             </div>
           </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-brand-100 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm mb-16">
          <div className="col-span-1 space-y-4">
             <Logo />
             <p className="text-brand-500 leading-relaxed">
               Building trust in construction through data, transparency, and connection.
             </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-900 mb-6">Platform</h4>
            <ul className="space-y-3 text-brand-500">
              <li><a href="#" className="hover:text-brand-800 transition-colors">For Government</a></li>
              <li><a href="#" className="hover:text-brand-800 transition-colors">For Contractors</a></li>
              <li><a href="#" className="hover:text-brand-800 transition-colors">For Suppliers</a></li>
              <li><a href="#" className="hover:text-brand-800 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-900 mb-6">Company</h4>
            <ul className="space-y-3 text-brand-500">
              <li><a href="#" className="hover:text-brand-800 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-800 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-800 transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-brand-800 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-brand-900 mb-6">Stay Updated</h4>
             <div className="flex gap-2">
               <input type="email" placeholder="Email address" className="bg-brand-50 border border-brand-200 rounded-md px-4 py-2 w-full focus:outline-none focus:border-brand-500 transition-colors" />
               <Button size="sm"><ArrowRight size={16}/></Button>
             </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-brand-100 flex flex-col md:flex-row justify-between items-center text-brand-400 text-xs gap-4">
          <span>© 2025 BRIXA Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-600">Privacy Policy</a>
            <a href="#" className="hover:text-brand-600">Terms of Service</a>
            <a href="#" className="hover:text-brand-600">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}