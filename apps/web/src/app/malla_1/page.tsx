"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  useInView
} from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Zap,
  Play,
  ArrowDown
} from "lucide-react";

// --- GLOBAL STYLES & FONTS INJECTION ---
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Manrope:wght@200;300;400;500;600;800&display=swap');
    
    :root {
      --cursor-size: 20px;
    }
    
    body {
      background-color: #050505;
      color: #e1e1e1;
      font-family: 'Manrope', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }

    h1, h2, h3, .serif {
      font-family: 'Cormorant Garamond', serif;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .grain {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
      background: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.05;
      mix-blend-mode: overlay;
    }
  `}</style>
);

// --- MOCK DATA ---
const JOBS = [
  { id: 1, role: "Art Director", company: "Vogue", location: "New York", salary: "$180k", image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop", tags: ["Fashion", "Editorial"] },
  { id: 2, role: "Senior AI Engineer", company: "Neuralink", location: "San Francisco", salary: "$350k", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop", tags: ["Brain-Computer", "Python"] },
  { id: 3, role: "Product Designer", company: "Teenage Eng.", location: "Stockholm", salary: "€110k", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop", tags: ["Hardware", "Synth"] },
  { id: 4, role: "Spatial Architect", company: "Apple", location: "Cupertino", salary: "$280k", image: "https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?q=80&w=2070&auto=format&fit=crop", tags: ["Vision Pro", "3D"] },
  { id: 5, role: "Brand Lead", company: "Aesop", location: "Melbourne", salary: "$160k", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop", tags: ["Retail", "Luxury"] },
];

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white/90 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center backdrop-blur-sm"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <div className="w-1 h-1 bg-black rounded-full" />
    </motion.div>
  );
};

// --- PRELOADER ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 2 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center flex-col"
    >
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="text-6xl md:text-9xl font-light text-white serif italic tracking-tighter"
        >
          ELEVATE
        </motion.h1>
      </div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-[1px] bg-white/30 mt-8"
      />
    </motion.div>
  );
};

// --- HERO SECTION ---
const Hero = () => {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-60"
          alt="Office"
        />
      </div>

      <nav className="relative z-20 flex justify-between items-center mix-blend-difference text-white">
        <div className="text-xl font-bold tracking-tight">ARCHIVE.</div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          {["Work", "Agency", "Expertise", "Contact"].map((item) => (
            <a key={item} href="#" className="hover:line-through decoration-white transition-all">{item}</a>
          ))}
        </div>
        <button className="flex items-center gap-2 uppercase text-sm border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
          Sign In <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </button>
      </nav>

      <div className="relative z-20 mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="flex flex-col gap-0"
        >
          <h1 className="text-[14vw] leading-[0.85] text-white font-light tracking-tighter mix-blend-overlay">
            FUTURE
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <h1 className="text-[14vw] leading-[0.85] text-white serif italic pr-4">
              CAREERS
            </h1>
            <div className="max-w-md pb-4 md:pb-8 space-y-6">
              <p className="text-zinc-400 text-lg leading-relaxed">
                We curate the most exceptional roles in design, technology, and architecture.
                Not for the average. Only for the visionaries.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-black px-8 py-4 rounded-none uppercase font-bold tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2">
                  Find Role <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- [NEW SECTION] SPOTLIGHT TRUTH ---
// This section implements the "Flashlight" effect. 
// The content is hidden in darkness and revealed by the cursor.
const SpotlightSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative flex h-[80vh] items-center justify-center bg-zinc-950 px-4 py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

      {/* Dimmed Background Text (Barely Visible) */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none opacity-10">
        <p className="max-w-4xl text-center text-4xl md:text-7xl font-bold leading-tight text-white/20 serif blur-[2px]">
          WE DO NOT BELIEVE IN RESUMES. WE BELIEVE IN <br />
          <span className="italic">RAW TALENT,</span> <br />
          <span className="italic">UNFILTERED VISION,</span> <br />
          AND <span className="italic">PURE AMBITION.</span>
        </p>
      </div>

      {/* The Flashlight Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      >
        <p className="max-w-4xl text-center text-4xl md:text-7xl font-bold leading-tight text-white serif">
          WE DO NOT BELIEVE IN RESUMES. WE BELIEVE IN <br />
          <span className="text-purple-300 italic">RAW TALENT,</span> <br />
          <span className="text-blue-300 italic">UNFILTERED VISION,</span> <br />
          AND <span className="text-emerald-300 italic">PURE AMBITION.</span>
        </p>

        <div className="mt-12 flex gap-4 text-sm font-mono text-zinc-400 uppercase tracking-widest">
          <span>[ Drag to explore ]</span>
        </div>
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-10 left-10 w-4 h-4 border-l border-t border-white/20" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-r border-b border-white/20" />
    </div>
  );
};

// --- JOB LIST SECTION ---
const JobList = () => {
  const [activeJob, setActiveJob] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-32 px-4 md:px-12 bg-[#050505] overflow-hidden"
    >
      <motion.div
        className="pointer-events-none fixed z-30 w-[300px] h-[400px] rounded-lg overflow-hidden hidden md:block grayscale brightness-75 contrast-125"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          position: "absolute",
          opacity: activeJob ? 1 : 0,
          scale: activeJob ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {activeJob && (
          <img
            src={JOBS.find(j => j.id === activeJob)?.image}
            className="w-full h-full object-cover"
            alt="preview"
          />
        )}
      </motion.div>

      <div className="mb-20 border-b border-white/10 pb-8 flex justify-between items-end">
        <h2 className="text-6xl md:text-8xl text-white serif">Selected Roles</h2>
        <span className="text-zinc-500 uppercase tracking-widest text-sm mb-2">( 05 Active )</span>
      </div>

      <div className="flex flex-col">
        {JOBS.map((job) => (
          <div
            key={job.id}
            onMouseEnter={() => setActiveJob(job.id)}
            onMouseLeave={() => setActiveJob(null)}
            className="group relative border-b border-white/10 py-12 cursor-pointer transition-all duration-500 hover:bg-white/5"
          >
            <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 px-4 z-10 relative">
              <h3 className="text-4xl md:text-5xl text-zinc-400 group-hover:text-white group-hover:italic group-hover:translate-x-4 transition-all duration-500 serif">
                {job.role}
              </h3>
              <div className="flex items-center gap-8 md:gap-24 text-zinc-500 font-mono uppercase text-sm tracking-wider">
                <span className="w-32">{job.company}</span>
                <span className="w-32">{job.location}</span>
                <span className="w-24 text-right text-white">{job.salary}</span>
              </div>
            </div>
            <div className="absolute left-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {job.tags.map(tag => (
                <span key={tag} className="text-xs border border-white/20 px-2 py-1 rounded-full text-zinc-400">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <button className="group relative px-8 py-3 rounded-full border border-white/20 overflow-hidden">
          <span className="relative z-10 text-sm uppercase tracking-widest text-white group-hover:text-black transition-colors">Load More</span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </button>
      </div>
    </section>
  );
};

// --- [NEW SECTION] MINIMALIST PROCESS ---
const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Curation", desc: "We manually vet every listing." },
    { num: "02", title: "Match", desc: "AI algorithms align your ethos." },
    { num: "03", title: "Legacy", desc: "Build a career that matters." }
  ];

  return (
    <section className="py-24 bg-zinc-900 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="w-full h-[1px] bg-white/20 mb-8 group-hover:bg-white transition-colors duration-500" />
              <span className="text-xs font-mono text-zinc-500 mb-4 block">{step.num}</span>
              <h3 className="text-3xl text-white mb-4 serif group-hover:italic transition-all">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">{step.desc}</p>
              <ArrowDown className="absolute top-0 right-0 w-4 h-4 text-zinc-600 -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FEATURES SECTION ---
const Features = () => {
  return (
    <section className="py-20 px-4 md:px-12 bg-[#050505]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto h-auto md:h-[600px]">
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 p-8 flex flex-col justify-end">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-black">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-4xl text-white mb-2 serif italic">Global Reach</h3>
            <p className="text-zinc-300 max-w-md">Access opportunities in over 40 countries. Remote, hybrid, or relocation packages included.</p>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 p-8">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Zap className="w-8 h-8 text-yellow-400 mb-4" />
          <h3 className="text-2xl text-white mb-2">Instant Apply</h3>
          <p className="text-zinc-500 text-sm">One click. No cover letters.</p>
        </div>
        <div className="relative group overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 p-8 flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950 opacity-50" />
          <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-700 relative z-10">10k+</h3>
          <p className="text-zinc-400 relative z-10 mt-2 uppercase text-xs tracking-widest">Premium Companies</p>
        </div>
      </div>
    </section>
  );
};

// --- [NEW SECTION] VIDEO MANIFESTO ---
const Manifesto = () => {
  return (
    <section className="relative py-32 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Manifesto" />
      </motion.div>
      <div className="mt-12 space-y-4">
        <h2 className="text-3xl md:text-5xl serif italic text-white">"Work is not a place."</h2>
        <p className="text-zinc-500 uppercase tracking-widest text-xs">Watch the film (01:24)</p>
      </div>
    </section>
  );
}

// --- FOOTER ---
const Footer = () => {
  return (
    <footer className="bg-white text-black pt-20 pb-12 px-4 md:px-12 rounded-t-[3rem] mt-20">
      <div className="flex flex-col justify-between min-h-[60vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8">
              Ready to define <br /><span className="serif italic">your legacy?</span>
            </h2>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent border-b border-black/20 py-3 w-64 outline-none placeholder:text-black/40 focus:border-black transition-colors"
              />
              <button className="bg-black text-white px-6 rounded-full hover:scale-110 transition-transform">
                Join
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm uppercase tracking-wider font-medium">
            <ul className="space-y-4">
              <li><a href="#" className="hover:opacity-50">Jobs</a></li>
              <li><a href="#" className="hover:opacity-50">Talent</a></li>
              <li><a href="#" className="hover:opacity-50">Pricing</a></li>
            </ul>
            <ul className="space-y-4">
              <li><a href="#" className="hover:opacity-50">Instagram</a></li>
              <li><a href="#" className="hover:opacity-50">LinkedIn</a></li>
              <li><a href="#" className="hover:opacity-50">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/10 pt-8 mt-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-[15vw] leading-none tracking-tighter font-bold opacity-10 select-none">
            ARCHIVE.
          </h1>
          <p className="text-xs uppercase text-black/50">© 2025 Archive Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN PAGE ---
// --- [NEW SECTION] STATS IMPACT ---
const StatsSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: "Total Placed", value: "8,400", suffix: "+" },
            { label: "Market Value", value: "1.2", suffix: "B" },
            { label: "Partner Studios", value: "140", suffix: "+" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col pl-8 group"
            >
              {/* Vertical Line Animation */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut", delay: 0.5 }}
                className="absolute left-0 top-0 w-[1px] bg-gradient-to-b from-white/50 to-transparent"
              />

              <div className="overflow-hidden">
                <motion.h3
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 + 0.3, ease: "circOut" }}
                  className="text-7xl md:text-9xl text-white serif font-thin tracking-tighter"
                >
                  {stat.value}<span className="text-zinc-600 text-5xl md:text-7xl ml-1 italic">{stat.suffix}</span>
                </motion.h3>
              </div>
              <p className="text-zinc-500 uppercase tracking-widest text-xs mt-6 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- [NEW SECTION] TESTIMONIALS ---
const Testimonials = () => {
  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/20 via-[#050505] to-[#050505]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto px-6 text-center relative z-10"
      >
        <div className="mb-12 opacity-30">
          <Globe className="w-12 h-12 mx-auto text-white font-thin stroke-[0.5]" />
        </div>

        <h2 className="text-4xl md:text-7xl text-white serif font-light leading-[1.1] tracking-tight mb-16">
          <span className="text-zinc-600">"</span>The only platform that understands the <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">nuance of creative leadership.</span><span className="text-zinc-600">"</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full p-[1px] bg-gradient-to-b from-white/20 to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-white uppercase tracking-widest text-sm font-bold">Elena R.</p>
            <p className="text-zinc-600 text-xs uppercase tracking-widest">Design Director @ Spotify</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- [NEW SECTION] MEMBERSHIP CTA ---
const Membership = () => {
  return (
    <section className="py-32 px-4 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[90rem] mx-auto bg-zinc-900/30 backdrop-blur-sm rounded-[2rem] p-12 md:p-32 relative overflow-hidden border border-white/5 group"
      >
        {/* Subtle animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-white/80">Limited Intake 2025</span>
            </div>

            <h2 className="text-6xl md:text-8xl text-white serif font-thin leading-[0.9]">
              Join the <br />
              <span className="italic font-normal bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">Inner Circle.</span>
            </h2>

            <p className="text-zinc-400 text-xl leading-relaxed max-w-xl font-light">
              Get early access to unlisted roles, salary insights, and direct introductions to hiring managers.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-white text-black px-12 py-6 rounded-full text-lg font-medium overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Apply for Membership <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default function PremiumJobPortal() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="grain" />
      <CustomCursor />

      {!loading && (
        <main className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
          <Hero />

          {/* Scrolling Marquee */}
          <div className="py-12 border-y border-white/5 bg-black overflow-hidden flex whitespace-nowrap">
            <motion.div
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex gap-20 items-center opacity-30 text-2xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white"
            >
              <span>Google</span><span>Spotify</span><span>Nike</span><span>Apple</span><span>Tesla</span><span>Pentagram</span><span>IDEO</span>
              <span>Google</span><span>Spotify</span><span>Nike</span><span>Apple</span><span>Tesla</span><span>Pentagram</span><span>IDEO</span>
            </motion.div>
          </div>

          <SpotlightSection />
          <JobList />
          <ProcessSection />
          <Features />
          <StatsSection />
          <Testimonials />
          <Manifesto />
          <Membership />
          <Footer />
        </main>
      )}
    </>
  );
}