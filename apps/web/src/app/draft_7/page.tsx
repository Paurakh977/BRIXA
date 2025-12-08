"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Building2, ShieldCheck, FileSpreadsheet, HardHat,
  Layers, Smartphone, Search, Activity, FileCheck,
  Users, Play, ArrowRight, QrCode, Mic, Trophy,
  Lock, FileDigit, MapPin, CheckCircle2, TrendingUp,
  Menu, X, ChevronRight,
  LineChart,
  ReceiptText,
  Cloud,
  BarChart3,
  LayoutGrid,
  MessageSquareText
} from "lucide-react";
import { cn } from "@BRIXA/utils";


// --- UI Components (Embedded for single-file portability) ---


const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'glass' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: "bg-brand-900 text-brand-50 hover:bg-brand-800 shadow-xl shadow-brand-900/20 border border-transparent",
      outline: "bg-transparent border border-brand-200 text-brand-900 hover:bg-brand-50 hover:border-brand-300",
      ghost: "bg-transparent text-brand-600 hover:text-brand-900 hover:bg-brand-100/50",
      glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
    };
    return (
      <button
        ref={ref}
        className={cn("inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 h-11 px-6 active:scale-95 disabled:opacity-50", variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";


const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "relative overflow-hidden rounded-2xl border border-brand-100 bg-white p-6 shadow-[0_4px_20px_-4px_rgba(38,28,21,0.05)] transition-all duration-500 hover:shadow-[0_8px_30px_-4px_rgba(38,28,21,0.1)] hover:border-brand-200",
    className
  )}>
    {children}
  </div>
);


// --- Brand Logo ---
const Logo = () => (
  <div className="flex items-center gap-3 select-none group cursor-pointer">
    <div className="relative flex items-end gap-1 h-8 overflow-hidden">
      <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "circOut" }} className="w-1.5 h-8 bg-brand-900 rounded-sm" />
      <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }} className="w-1.5 h-5 bg-brand-600 rounded-sm group-hover:bg-brand-500 transition-colors" />
      <motion.div initial={{ y: 10 }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }} className="w-1.5 h-6 bg-brand-800 rounded-sm" />
    </div>
    <span className="font-serif font-bold text-2xl tracking-tight text-brand-900">BRIXA</span>
  </div>
);


// --- Main Page ---
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"govt" | "engineer" | "supplier" | "public">("govt");
  const { scrollY } = useScroll();


  // Parallax Effects
  const dashboardRef = useRef<HTMLDivElement>(null);
 
    // 2. Track scroll progress of the dashboard container
    const { scrollYProgress: dashboardProgress } = useScroll({
      target: dashboardRef,
      offset: ["start end", "center center"] // Start animation when top of dashboard hits bottom of screen
    });
 
  // 3. Define the "Bulge" and Rotate effects
  // Scale: Starts at 0.9, Bulges to 1.05 when centered
  const dashScale = useTransform(dashboardProgress, [0, 1], [0.8, 1.05]);
  // Rotate: Starts tilted back 25deg, lands flat at 0deg
  const dashRotate = useTransform(dashboardProgress, [0, 1], [25, 0]);
  // Y: Moves up to meet the scroll slightly
  const dashY = useTransform(dashboardProgress, [0, 1], [100, 0]);
  // Opacity: Fades in
  const dashOpacity = useTransform(dashboardProgress, [0, 0.5], [0, 1]);
 
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);




  return (
    <div className="min-h-screen bg-brand-50 text-brand-900 font-sans selection:bg-brand-900 selection:text-brand-50 overflow-x-hidden">


      {/* Noise Texture Overlay for "Paper" Feel */}
      <div className="fixed inset-0 z-0 pointer-events-none mix-blend-multiply bg-noise opacity-70"></div>


      {/* --- Navigation --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 bg-brand-50/80 backdrop-blur-xl border-b border-brand-100/50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex gap-8 text-sm font-medium text-brand-600">
            {['Ecosystem', 'Toolkit', 'Audit', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative hover:text-brand-900 transition-colors group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="sm">Login</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>
        </div>
      </motion.nav>


      <main className="relative z-10 pt-32">


        {/* --- Hero Section --- */}
        <section className="relative px-6 max-w-7xl mx-auto mb-32 flex flex-col items-center text-center perspective-800">
          {/* TEXT HERO SECTION - PRESERVED FROM CODE 1 */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-5xl z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <span className="px-4 py-1.5 rounded-full bg-white border border-brand-200 text-brand-600 text-xs font-bold tracking-[0.2em] uppercase shadow-sm">
                The OS for Infrastructure
              </span>
            </motion.div>


            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-6xl md:text-8xl font-medium tracking-tight text-brand-900 mb-8 leading-[1.05]"
            >
              Build with <br />
              <span className="italic text-brand-600">Radical Integrity.</span>
            </motion.h1>


            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl text-brand-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            >
              Connect tenders, engineers, and auditors in one luxurious ecosystem.
              From <span className="font-medium text-brand-900">blueprint</span> to <span className="font-medium text-brand-900">billing</span>, verify every step with AI.
            </motion.p>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="h-14 px-10 text-base">Start Free Trial</Button>
              <Button variant="outline" className="h-14 px-10 text-base">View Demo</Button>
            </motion.div>
          </motion.div>


          {/* 3D DASHBOARD - SUPER MINIMAL PAGE LOAD ANIMATION */}
          <motion.div
          ref={dashboardRef}
            initial={{ opacity: 0, y: 60, scale: 0.92, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, scale: 1.01, rotateX: -2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            style={{
              scale: dashScale,
              rotateX: dashRotate,
              y: dashY,
              opacity: dashOpacity
            }}
            className="mt-20 w-full max-w-7xl relative z-10 group perspective-1000"
          >


            <div className="relative bg-white rounded-t-2xl shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.1)] border border-brand-200 overflow-hidden aspect-[16/10] md:aspect-[21/10] transition-all duration-500 group-hover:shadow-[0_-30px_100px_-20px_rgba(0,0,0,0.15)] group-hover:border-brand-300">


              {/* Top Bar Decoration (Optional from Code 1 to keep aesthetic) */}
              <div className="h-8 bg-brand-50 border-b border-brand-100 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-200"></div>
                </div>
              </div>


              {/* DASHBOARD BODY - SCROLL TRIGGERED ANIMATIONS */}
              <div className="p-4 md:p-6 grid grid-cols-12 gap-4 h-full bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">


                {/* Left Sidebar - Navigation - Scroll Animation */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="col-span-2 hidden md:flex flex-col gap-4 bg-brand-50/80 rounded-xl p-4 border border-brand-100 h-[90%]"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-brand-900 font-semibold text-sm">
                      <LayoutGrid size={18} className="text-brand-600" /> Dashboard
                    </div>
                    <ul className="space-y-2 text-xs font-medium">
                      <li className="flex items-center gap-2 text-brand-800 bg-white shadow-sm border border-brand-100 px-3 py-2 rounded-lg">
                        <BarChart3 size={14} /> Analytics
                      </li>
                      <li className="flex items-center gap-2 text-brand-500 hover:bg-white/50 px-3 py-2 rounded-lg transition-colors">
                        <FileCheck size={14} /> Projects
                      </li>
                      <li className="flex items-center gap-2 text-brand-500 hover:bg-white/50 px-3 py-2 rounded-lg transition-colors">
                        <Users size={14} /> Team
                      </li>
                      <li className="flex items-center gap-2 text-brand-500 hover:bg-white/50 px-3 py-2 rounded-lg transition-colors">
                        <Cloud size={14} /> Vault
                      </li>
                    </ul>
                  </div>
                  <div className="mt-auto pt-4 border-t border-brand-200">
                    <div className="flex items-center gap-2 text-brand-600 bg-brand-100/50 px-3 py-2 rounded-lg text-xs font-medium">
                      <QrCode size={14} /> Scan Site
                    </div>
                  </div>
                </motion.div>


                {/* Main Content Area - Project Overview & Activity - Scroll Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="col-span-12 md:col-span-7 bg-white rounded-xl border border-brand-100 shadow-sm p-5 flex flex-col h-[90%]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-brand-900">Overview: Grand City Tower</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 border border-green-100">Active</span>
                  </div>


                  {/* Progress Section - Subtle Animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-6 p-4 bg-brand-50/50 rounded-lg border border-brand-50"
                  >
                    <div className="flex justify-between text-xs text-brand-600 mb-2 font-medium">
                      <span>Phase 3 of 5 (Structure)</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full bg-brand-200/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '72%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                        className="bg-brand-600 h-2 rounded-full shadow-sm"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center divide-x divide-brand-200">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-brand-400">Budget</div>
                        <div className="text-sm font-bold text-brand-900 mt-1">₹1.8 Cr</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-brand-400">Timeline</div>
                        <div className="text-sm font-bold text-brand-900 mt-1">45 Days Left</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-brand-400">Team</div>
                        <div className="text-sm font-bold text-brand-900 mt-1">12 On-site</div>
                      </div>
                    </div>
                  </motion.div>


                  {/* Activity Feed - Staggered Animations */}
                  <div className="flex-1 overflow-hidden relative">
                    <motion.h3
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="text-xs font-bold text-brand-900 uppercase tracking-wider mb-3"
                    >Live Feed</motion.h3>
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex gap-3 p-3 bg-white hover:bg-brand-50 transition-colors rounded-lg border border-brand-100"
                      >
                        <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 border border-green-100 flex items-center justify-center shrink-0"><CheckCircle2 size={14} /></div>
                        <div className="min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-sm font-semibold text-brand-900 truncate">Foundation Verified</span>
                            <span className="text-[10px] text-brand-400 whitespace-nowrap ml-2">Just now</span>
                          </div>
                          <p className="text-xs text-brand-500 truncate">Auditor verified submission #402.</p>
                        </div>
                      </motion.div>


                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex gap-3 p-3 bg-white hover:bg-brand-50 transition-colors rounded-lg border border-brand-100"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0"><MessageSquareText size={14} /></div>
                        <div className="min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-sm font-semibold text-brand-900 truncate">Design Update</span>
                            <span className="text-[10px] text-brand-400 whitespace-nowrap ml-2">1h ago</span>
                          </div>
                          <p className="text-xs text-brand-500 truncate">Architect uploaded blueprint v3.1.</p>
                        </div>
                      </motion.div>


                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex gap-3 p-3 bg-white hover:bg-brand-50 transition-colors rounded-lg border border-brand-100"
                      >
                        <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100 flex items-center justify-center shrink-0"><HardHat size={14} /></div>
                        <div className="min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-sm font-semibold text-brand-900 truncate">Material Log</span>
                            <span className="text-[10px] text-brand-400 whitespace-nowrap ml-2">3h ago</span>
                          </div>
                          <p className="text-xs text-brand-500 truncate">500 bags cement unloaded at Block C.</p>
                        </div>
                      </motion.div>
                    </div>
                    {/* Fade at bottom of list */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                </motion.div>


                {/* Right Sidebar - Financials - Scroll Animation */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="col-span-3 hidden md:flex flex-col gap-4 bg-brand-900 rounded-xl p-5 text-white shadow-xl h-[90%]"
                >
                  <div>
                    <div className="text-brand-400 text-[10px] uppercase tracking-widest mb-2">Financials</div>
                    <div className="text-3xl font-light flex items-baseline gap-1 text-white">
                      <span className="text-lg text-brand-400">₹</span> 1.83 Cr
                    </div>
                    <p className="text-brand-400 text-xs mt-1">Spent of ₹2.4 Cr allocated.</p>
                  </div>


                  <div className="flex-1 flex flex-col justify-end relative">
                    <div className="absolute top-0 left-0 right-0 bottom-8 flex items-end gap-1 opacity-80">
                      {[0.4, 0.6, 0.5, 0.7, 0.6, 0.8, 0.75, 0.9].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h * 100}%` }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1.2, delay: 0.8 + (i * 0.15), ease: [0.16, 1, 0.3, 1] }}
                          className="flex-1 bg-brand-700/50 rounded-t-sm hover:bg-brand-600 transition-colors"
                        />
                      ))}
                    </div>
                    <div className="relative z-10 pt-4 border-t border-brand-800">
                      <div className="flex items-center gap-2 text-green-400 text-xs font-medium">
                        <LineChart size={14} /> -5.2% Cost Variance
                      </div>
                    </div>
                  </div>


                  <div className="bg-brand-800/50 rounded-lg p-3 border border-brand-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-brand-700 flex items-center justify-center text-brand-300"><ReceiptText size={16} /></div>
                      <div>
                        <div className="text-xs text-brand-300">Next Audit</div>
                        <div className="text-sm font-medium text-white">Sep 30</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>


            {/* Glow behind dashboard - PRESERVED FROM CODE 1 */}
            <div className="absolute -bottom-10 left-10 right-10 h-40 bg-brand-900 blur-[100px] opacity-10 -z-10"></div>
          </motion.div>
        </section>


        {/* --- Dynamic Tabs Section --- */}
        <section id="ecosystem" className="py-32 bg-white border-y border-brand-100 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16">


              {/* Left: Navigation */}
              <div className="md:w-1/3 space-y-2">
                <h2 className="font-serif text-3xl text-brand-900 mb-8">Orchestrating<br />the Chaos.</h2>


                {(['govt', 'engineer', 'supplier', 'public'] as const).map((tab) => (
                  <div
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "group cursor-pointer p-4 rounded-xl transition-all duration-300 border border-transparent",
                      activeTab === tab ? "bg-brand-50 border-brand-100" : "hover:bg-brand-50/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("font-medium text-lg capitalize", activeTab === tab ? "text-brand-900" : "text-brand-400")}>
                        {tab === 'govt' && "Government Body"}
                        {tab === 'engineer' && "Site Engineer"}
                        {tab === 'supplier' && "Material Supplier"}
                        {tab === 'public' && "Public Citizen"}
                      </span>
                      {activeTab === tab && <ChevronRight size={16} className="text-brand-900" />}
                    </div>
                    <AnimatePresence>
                      {activeTab === tab && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="text-sm text-brand-500 leading-relaxed overflow-hidden"
                        >
                          {tab === 'govt' && "Eliminate corruption with AI-analyzed tenders and real-time budget oversight."}
                          {tab === 'engineer' && "Build a digital reputation. Manage labor, blueprints, and tasks in one app."}
                          {tab === 'supplier' && "Access hyper-local demand. Sell bricks and cement directly to sites."}
                          {tab === 'public' && "Scan QR codes to verify if public money is being spent correctly."}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>


              {/* Right: Dynamic Visual */}
              <div className="md:w-2/3 bg-brand-50 rounded-2xl border border-brand-100 p-8 relative overflow-hidden flex items-center justify-center min-h-[500px]">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>


                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                  >
                    {/* Abstract Card UI based on Tab */}
                    <div className="bg-white rounded-xl shadow-2xl border border-brand-100 overflow-hidden">
                      {/* Header */}
                      <div className="h-32 bg-brand-900 relative p-6 flex items-end">
                        <div className="absolute top-0 right-0 p-6 opacity-10 text-white">
                          {activeTab === 'govt' && <Building2 size={100} />}
                          {activeTab === 'engineer' && <HardHat size={100} />}
                          {activeTab === 'supplier' && <Layers size={100} />}
                          {activeTab === 'public' && <QrCode size={100} />}
                        </div>
                        <div className="text-white relative z-10">
                          <div className="text-xs uppercase tracking-widest text-brand-300 mb-1">System View</div>
                          <h3 className="text-2xl font-serif">
                            {activeTab === 'govt' && "Tender Analyzer"}
                            {activeTab === 'engineer' && "Engineer Profile"}
                            {activeTab === 'supplier' && "Marketplace Feed"}
                            {activeTab === 'public' && "Public Audit Scan"}
                          </h3>
                        </div>
                      </div>


                      {/* Body */}
                      <div className="p-6 space-y-4">
                        {activeTab === 'govt' && (
                          <>
                            <div className="flex justify-between items-center p-3 bg-green-50 border border-green-100 rounded-lg">
                              <span className="text-sm font-medium text-green-800">Applicant Match Score</span>
                              <span className="font-bold text-green-700 text-lg">98.5%</span>
                            </div>
                            <div className="space-y-2">
                              <div className="h-2 w-full bg-brand-100 rounded-full"><div className="h-full w-3/4 bg-brand-400 rounded-full"></div></div>
                              <div className="h-2 w-full bg-brand-100 rounded-full"><div className="h-full w-1/2 bg-brand-300 rounded-full"></div></div>
                            </div>
                          </>
                        )}


                        {activeTab === 'engineer' && (
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-brand-200 rounded-full overflow-hidden border-2 border-white shadow-md">
                              <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-brand-900">Rajiv Mehta</div>
                              <div className="text-xs text-brand-500">Senior Civil Engineer</div>
                              <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-3 h-3 bg-yellow-400 rounded-full"></div>)}
                              </div>
                            </div>
                          </div>
                        )}


                        {activeTab === 'supplier' && (
                          <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-brand-50 pb-2">
                              <div className="text-sm font-medium text-brand-900">5,000 Bricks</div>
                              <Button size="sm" variant="outline" className="h-8 text-xs">Bid</Button>
                            </div>
                            <div className="flex justify-between items-center border-b border-brand-50 pb-2">
                              <div className="text-sm font-medium text-brand-900">200 Bags Cement</div>
                              <Button size="sm" variant="outline" className="h-8 text-xs">Bid</Button>
                            </div>
                          </div>
                        )}


                        {activeTab === 'public' && (
                          <div className="text-center py-4">
                            <div className="inline-block p-4 bg-white border-2 border-dashed border-brand-200 rounded-lg mb-4">
                              <QrCode size={80} className="text-brand-900" />
                            </div>
                            <p className="text-xs text-brand-400">Last verified: Today, 10:00 AM</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>


        {/* --- Bento Grid Toolkit --- */}
        <section id="toolkit" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-900 mb-6">The Engineer's Toolkit</h2>
            <p className="text-brand-500 max-w-2xl mx-auto text-lg">Advanced tools to manage the chaos of construction, packaged in a premium interface.</p>
          </div>


          <div className="grid md:grid-cols-4 gap-6 grid-auto-rows-[200px]">


            {/* Large Card: AI Voice */}
            <Card className="md:col-span-2 md:row-span-2 bg-brand-900 text-white border-none group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                    <Mic className="text-brand-100" size={24} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-brand-800 border border-brand-700 text-xs font-mono text-brand-200">AI ACTIVE</div>
                </div>


                <div className="space-y-4">
                  <h3 className="text-3xl font-serif">Voice-to-Ledger</h3>
                  <p className="text-brand-200 font-light leading-relaxed">
                    "Recorded 50 bags of cement unloaded at Site B." <br />
                    <span className="text-sm opacity-60">System automatically updates inventory and expense logs.</span>
                  </p>
                  {/* Audio Visualizer */}
                  <div className="flex gap-1 h-8 items-end">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["20%", "100%", "20%"] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                        className="w-2 bg-brand-400 rounded-full opacity-80"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>


            {/* Small Card: Vault */}
            <Card className="md:col-span-1 group hover:border-brand-400 transition-colors">
              <div className="mb-4 p-2 bg-brand-50 w-fit rounded-lg text-brand-700 group-hover:bg-brand-900 group-hover:text-white transition-colors">
                <Lock size={20} />
              </div>
              <h3 className="font-serif text-xl text-brand-900 mb-2">Secure Vault</h3>
              <p className="text-xs text-brand-500">Blueprint version control & storage.</p>


              <div className="mt-6 relative">
                <div className="absolute top-0 left-0 w-full h-12 bg-white border border-brand-200 rounded-lg shadow-sm transform rotate-3 z-10"></div>
                <div className="absolute top-2 left-2 w-full h-12 bg-white border border-brand-200 rounded-lg shadow-sm z-20 flex items-center px-3 gap-2">
                  <FileDigit size={16} className="text-brand-400" />
                  <span className="text-[10px] font-mono text-brand-900">Structure_v2.dwg</span>
                </div>
              </div>
            </Card>


            {/* Small Card: Rankings */}
            <Card className="md:col-span-1 bg-gradient-to-br from-brand-50 to-white">
              <div className="mb-4 p-2 bg-yellow-100 w-fit rounded-lg text-yellow-700">
                <Trophy size={20} />
              </div>
              <h3 className="font-serif text-xl text-brand-900 mb-2">Rankings</h3>
              <p className="text-xs text-brand-500">Gamified regional leaderboards.</p>


              <div className="mt-4 flex items-center gap-3">
                <span className="text-3xl font-bold text-brand-900">#1</span>
                <div className="text-xs">
                  <div className="font-bold">Sharma Cons.</div>
                  <div className="text-green-600">Top Rated</div>
                </div>
              </div>
            </Card>


            {/* Wide Card: Analytics */}
            <Card className="md:col-span-2 flex items-center justify-between bg-white">
              <div className="max-w-[50%]">
                <h3 className="font-serif text-2xl text-brand-900 mb-2">Plan vs Actual</h3>
                <p className="text-sm text-brand-500">
                  Real-time deviation tracking. Know if you are over budget before it happens.
                </p>
              </div>
              <div className="w-32 h-32 relative">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path className="text-brand-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.75 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-brand-900"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="100, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xs text-brand-400 uppercase">Budget</span>
                  <span className="font-bold text-brand-900">75%</span>
                </div>
              </div>
            </Card>


          </div>
        </section>


        {/* --- Transparency / Dark Mode Section --- */}
        <section id="audit" className="py-32 bg-brand-900 text-brand-50 relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] border border-brand-700 rounded-full opacity-30"></div>
          <div className="absolute top-20 right-20 w-[400px] h-[400px] border border-brand-700 rounded-full opacity-30"></div>


          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-700 text-brand-300 text-xs font-mono mb-6">
                <ShieldCheck size={12} />
                PUBLIC AUDIT PROTOCOL
              </div>
              <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">Trust is not given.<br />It is verified.</h2>
              <p className="text-brand-300 text-lg mb-10 leading-relaxed max-w-md font-light">
                Every project generates a unique, immutable QR code. Citizens can scan to verify budget allocation, deadlines, and progress photos.
              </p>
              <Button variant="glass" className="h-14 px-8">Explore Public Records</Button>
            </div>


            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-brand-500 blur-3xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white p-2 rounded-3xl rotate-3 transition-transform duration-500 group-hover:rotate-0 shadow-2xl">
                <div className="border-2 border-dashed border-brand-200 rounded-2xl p-12 flex flex-col items-center text-center bg-brand-50">
                  <QrCode size={200} className="text-brand-900 mb-6" />
                  <p className="font-mono text-xs text-brand-400 uppercase tracking-widest">Scan for Transparency</p>
                  <h3 className="mt-4 font-bold text-2xl text-brand-900">Hwy-402 Extension</h3>
                  <div className="mt-2 flex gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">ON TIME</span>
                    <span className="px-2 py-1 bg-brand-200 text-brand-800 text-xs font-bold rounded">AUDITED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* --- Footer --- */}
        <footer className="bg-brand-50 pt-24 pb-12 border-t border-brand-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-4">
                <Logo />
                <p className="mt-6 text-brand-500 leading-relaxed font-light">
                  Bridging the gap between blueprint and reality. The premium operating system for the modern construction industry.
                </p>
              </div>


              <div className="md:col-span-2">
                <h4 className="font-serif text-brand-900 mb-6">Platform</h4>
                <ul className="space-y-4 text-sm text-brand-600">
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Tenders</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Marketplace</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Verification</a></li>
                </ul>
              </div>


              <div className="md:col-span-2">
                <h4 className="font-serif text-brand-900 mb-6">Company</h4>
                <ul className="space-y-4 text-sm text-brand-600">
                  <li><a href="#" className="hover:text-brand-900 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-brand-900 transition-colors">Contact</a></li>
                </ul>
              </div>


              <div className="md:col-span-4">
                <h4 className="font-serif text-brand-900 mb-6">Newsletter</h4>
                <div className="flex gap-2">
                  <input type="email" placeholder="Enter your email" className="flex-1 bg-white border border-brand-200 rounded-md px-4 text-sm outline-none focus:border-brand-900 transition-colors" />
                  <Button className="w-12"><ArrowRight size={18} /></Button>
                </div>
              </div>
            </div>


            <div className="border-t border-brand-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-400 font-mono">
              <span>&copy; 2025 BRIXA INC. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#">PRIVACY</a>
                <a href="#">TERMS</a>
                <a href="#">SITEMAP</a>
              </div>
            </div>
          </div>
        </footer>


      </main>
    </div>
  );
}
