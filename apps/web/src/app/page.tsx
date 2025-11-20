"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@repo/ui/button"; 
import { Card } from "@repo/ui/card";
import { 
  Building2, ShieldCheck, FileSpreadsheet, HardHat, 
  Layers, Smartphone, Search, Activity, FileCheck, 
  Users, CreditCard, Play, ArrowRight, QrCode, Mic
} from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

          {/* Abstract Dashboard Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: 0.4, duration: 1, type: "spring" }}
            className="mt-24 w-full aspect-[16/8] bg-white rounded-t-2xl shadow-[0_-20px_60px_-15px_rgba(74,55,40,0.15)] border border-brand-100 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-50/50" />
            {/* Mock UI Elements for "Minimalistic Dashboard" */}
            <div className="p-8 grid grid-cols-12 gap-6 h-full opacity-80">
              <div className="col-span-3 bg-brand-50 rounded-xl h-full p-4 flex flex-col gap-4">
                <div className="h-8 w-24 bg-brand-200/50 rounded animate-pulse" />
                <div className="h-4 w-full bg-brand-100 rounded" />
                <div className="h-4 w-2/3 bg-brand-100 rounded" />
              </div>
              <div className="col-span-6 bg-brand-50/50 rounded-xl h-full p-6 border border-brand-100">
                <div className="flex justify-between mb-8">
                  <div className="h-10 w-32 bg-brand-800 rounded" />
                  <div className="h-10 w-10 bg-brand-200 rounded-full" />
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-brand-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><ShieldCheck size={16}/></div>
                        <span className="text-sm font-medium">Foundation Phase Approved</span>
                      </div>
                      <span className="text-xs text-brand-400">Just now</span>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-brand-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center"><QrCode size={16}/></div>
                        <span className="text-sm font-medium">Public Scan: Site A-12</span>
                      </div>
                      <span className="text-xs text-brand-400">2m ago</span>
                   </div>
                </div>
              </div>
              <div className="col-span-3 bg-brand-900 rounded-xl h-full p-6 text-white flex flex-col justify-between">
                <div>
                  <div className="text-brand-400 text-xs uppercase tracking-widest mb-2">Budget</div>
                  <div className="text-3xl font-light">$2.4M</div>
                </div>
                <div className="h-32 bg-brand-800/50 rounded-lg relative overflow-hidden">
                   <div className="absolute bottom-0 left-0 w-full h-2/3 bg-brand-700/50" />
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
              <p className="text-brand-500">A unified platform for every stakeholder in the construction lifecycle.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {(['govt', 'engineer', 'supplier', 'public'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab 
                      ? "bg-brand-800 text-white shadow-lg" 
                      : "bg-brand-50 text-brand-600 hover:bg-brand-100"
                  }`}
                >
                  {tab === 'govt' && "Government & Tenders"}
                  {tab === 'engineer' && "Engineers & Contractors"}
                  {tab === 'supplier' && "Hardware & Suppliers"}
                  {tab === 'public' && "Public & Transparency"}
                </button>
              ))}
            </div>

            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  <div className="space-y-6">
                    <h3 className="text-3xl font-medium text-brand-900">
                      {activeTab === 'govt' && "End Tender Corruption."}
                      {activeTab === 'engineer' && "Build Your Reputation."}
                      {activeTab === 'supplier' && "Direct Market Access."}
                      {activeTab === 'public' && "Verify Progress Instantly."}
                    </h3>
                    <p className="text-lg text-brand-500 leading-relaxed">
                      {activeTab === 'govt' && "Stop assigning projects blindly. View verified historical performance, analyze past delays, and enforce budget adherence before awarding tenders."}
                      {activeTab === 'engineer' && "Your work speaks for itself. Create a digital CV of completed projects, prove your efficiency to win more bids, and manage labor/materials in one app."}
                      {activeTab === 'supplier' && "Connect directly with site engineers. Receive bulk demands for cement, bricks, and machinery. Compete on quality and price, not connections."}
                      {activeTab === 'public' && "Scan the QR code at any construction site. View the assigned budget, expected completion date, and current progress photos verified by AI."}
                    </p>
                    <ul className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3 text-brand-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-800" />
                          <span>
                            {activeTab === 'govt' && i === 1 && "AI-Analyzed Past Performance"}
                            {activeTab === 'govt' && i === 2 && "Real-time Inspection Dashboard"}
                            {activeTab === 'govt' && i === 3 && "Digital Audit Trails"}
                            
                            {activeTab === 'engineer' && i === 1 && "Digital Portfolio & Credentials"}
                            {activeTab === 'engineer' && i === 2 && "Labor Attendance & Output Tracking"}
                            {activeTab === 'engineer' && i === 3 && "Smart Material Procurement"}

                            {activeTab === 'supplier' && i === 1 && "Demand Forecasting"}
                            {activeTab === 'supplier' && i === 2 && "Digital Invoicing & GST"}
                            {activeTab === 'supplier' && i === 3 && "Verified Payment Gateway"}

                            {activeTab === 'public' && i === 1 && "Site QR Scanning"}
                            {activeTab === 'public' && i === 2 && "Complaint Redressal System"}
                            {activeTab === 'public' && i === 3 && "Government Accountability View"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-brand-50 rounded-2xl aspect-square border border-brand-100 p-8 relative overflow-hidden flex items-center justify-center">
                    {/* Abstract Illustration based on Tab */}
                    {activeTab === 'govt' && <Building2 size={120} className="text-brand-200" />}
                    {activeTab === 'engineer' && <HardHat size={120} className="text-brand-200" />}
                    {activeTab === 'supplier' && <Layers size={120} className="text-brand-200" />}
                    {activeTab === 'public' && <Smartphone size={120} className="text-brand-200" />}
                    
                    <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs border border-brand-100">
                      <div className="flex items-center gap-2 mb-2 text-brand-800 font-medium">
                        <Activity size={16} />
                        <span>System Alert</span>
                      </div>
                      <p className="text-xs text-brand-500">
                        {activeTab === 'govt' && "Tender #892 completed 15% under budget."}
                        {activeTab === 'engineer' && "Material request approved by Auditor."}
                        {activeTab === 'supplier' && "New demand: 5000 Bricks at Site B."}
                        {activeTab === 'public' && "Project is 12 days ahead of schedule."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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
                  <h3 className="text-2xl font-medium mb-2">AI Voice & OCR</h3>
                  <p className="text-brand-300 leading-relaxed">
                    Engineers don't have time to type. Record daily logs via voice ("Unloaded 500 bags of cement"). 
                    Scan paper invoices with your phone, and our OCR automatically digitizes rates, GST, and quantities for the auditor.
                  </p>
                </div>
                <div className="mt-8 flex gap-2">
                   <div className="bg-brand-800/50 px-3 py-1 rounded text-xs border border-brand-700">Voice-to-Text</div>
                   <div className="bg-brand-800/50 px-3 py-1 rounded text-xs border border-brand-700">Auto-Ledger</div>
                </div>
              </div>
            </Card>

            <Card>
               <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                  <FileSpreadsheet size={24} />
               </div>
               <h3 className="text-xl font-medium mb-2 text-brand-900">Plan vs. Actual</h3>
               <p className="text-brand-500 text-sm leading-relaxed">
                 Define the 15-day milestone plan. The system tracks daily uploads and alerts you if progress deviates from the baseline schedule.
               </p>
            </Card>

            <Card>
               <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                  <Search size={24} />
               </div>
               <h3 className="text-xl font-medium mb-2 text-brand-900">Smart Tender Matching</h3>
               <p className="text-brand-500 text-sm leading-relaxed">
                 Algorithms analyze past project data to recommend the most capable engineers for specific government projects.
               </p>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                   <div className="bg-brand-50 w-fit p-2 rounded-lg mb-4 text-brand-800">
                      <Users size={24} />
                   </div>
                   <h3 className="text-2xl font-medium mb-2 text-brand-900">Collaborative Vault</h3>
                   <p className="text-brand-500 leading-relaxed mb-6">
                     A single source of truth for blueprints (CAD/PDF). Architects upload revisions, Engineers comment on site feasibility, and Auditors track budget implications of design changes.
                   </p>
                   <Button variant="outline" size="sm">Explore Vault</Button>
                </div>
                <div className="flex-1 w-full bg-brand-50 rounded-lg border border-brand-100 p-4 space-y-3">
                   {/* Mock File List */}
                   {['Site_Elevation_v2.pdf', 'Foundation_Details.dwg', 'Budget_Forecast_Q3.xlsx'].map((file, i) => (
                     <div key={i} className="flex items-center justify-between bg-white p-3 rounded border border-brand-100">
                        <div className="flex items-center gap-3">
                           <FileCheck size={16} className="text-brand-400"/>
                           <span className="text-sm text-brand-700">{file}</span>
                        </div>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">Verified</span>
                     </div>
                   ))}
                </div>
              </div>
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
               Whether you are a government body seeking accountability, or a contractor seeking recognition—join the network that rewards quality.
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
      <footer className="bg-brand-50 py-16 px-6 border-t border-brand-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm">
          <div className="col-span-1">
             <Logo />
             <p className="mt-4 text-brand-500 leading-relaxed">
               The premium operating system for modern construction, bridging the gap between blueprint and reality.
             </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-900 mb-4 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-2 text-brand-600">
              <li><a href="#" className="hover:text-brand-900">Tender Management</a></li>
              <li><a href="#" className="hover:text-brand-900">Supplier Marketplace</a></li>
              <li><a href="#" className="hover:text-brand-900">Project Tracking</a></li>
              <li><a href="#" className="hover:text-brand-900">Public Audit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-900 mb-4 uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-2 text-brand-600">
              <li><a href="#" className="hover:text-brand-900">Success Stories</a></li>
              <li><a href="#" className="hover:text-brand-900">Government Protocols</a></li>
              <li><a href="#" className="hover:text-brand-900">Help Center</a></li>
              <li><a href="#" className="hover:text-brand-900">API Documentation</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold text-brand-900 mb-4 uppercase tracking-wider text-xs">Newsletter</h4>
             <div className="flex gap-2">
               <input type="email" placeholder="Email address" className="bg-white border border-brand-200 rounded-sm px-3 py-2 w-full focus:outline-none focus:border-brand-500" />
               <Button size="sm" variant="primary"><ArrowRight size={16}/></Button>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-200 flex justify-between text-brand-400 text-xs">
          <span>© 2025 BRIXA Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}