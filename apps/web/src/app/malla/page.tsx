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
  ArrowDown,
  MoveRight,
  Asterisk,
  Search
} from "lucide-react";

// --- GLOBAL STYLES & FONTS ---
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Italiana&family=Manrope:wght@200;300;400;500;600;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    
    :root {
      --bg-color: #050505;
      --text-color: #f2f2f2;
      --accent-color: #D4FF00; /* Premium Cyber Lime */
    }
    
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: 'Manrope', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }

    h1, h2, h3, .serif {
      font-family: 'Italiana', serif;
    }

    .mono {
      font-family: 'Space Grotesk', monospace;
    }

    /* Noise Texture */
    .noise-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
      background: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.03;
      mix-blend-mode: overlay;
    }
    
    ::selection {
      background-color: var(--accent-color);
      color: black;
    }
  `}</style>
);

// --- MOCK DATA ---
const JOBS = [
  { id: 1, role: "Art Director", company: "Vogue Italia", location: "Milan", type: "Hybrid", image: "https://images.unsplash.com/photo-1550614000-4b9519e02a29?q=80&w=2000&auto=format&fit=crop" },
  { id: 2, role: "Spatial Designer", company: "Apple Vision", location: "Cupertino", type: "On-site", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" },
  { id: 3, role: "Sonic Architect", company: "Teenage Eng.", location: "Stockholm", type: "Remote", image: "https://images.unsplash.com/photo-1593106578502-27fa8479d060?q=80&w=2573&auto=format&fit=crop" },
  { id: 4, role: "Brand Narrative", company: "Aesop", location: "London", type: "Hybrid", image: "https://images.unsplash.com/photo-1628143997784-0a6712398539?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, role: "AI Ethicist", company: "OpenAI", location: "San Francisco", type: "Remote", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop" },
];

// --- HOOKS ---
const useMousePosition = () => {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);
  return mouse;
};

// --- UTILS: MAGNETIC BUTTON COMPONENT ---
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.1);
    position.y.set(middleY * 0.1);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='stick']")) {
        setCursorVariant("stick");
      } else if (target.closest("[data-cursor='text']")) {
        setCursorVariant("text");
        setCursorText(target.closest("[data-cursor='text']")?.getAttribute("data-cursor-text") || "VIEW");
      } else if (target.closest("a") || target.closest("button")) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  const variants = {
    default: { height: 16, width: 16, backgroundColor: "#D4FF00", mixBlendMode: "difference" as any },
    hover: { height: 64, width: 64, backgroundColor: "#D4FF00", mixBlendMode: "difference" as any },
    text: { height: 100, width: 100, backgroundColor: "#f0f0f0", mixBlendMode: "difference" as any },
    stick: { height: 80, width: 80, backgroundColor: "transparent", border: "1px solid #D4FF00" },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={cursorVariant}
      variants={variants}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {cursorVariant === "text" && (
        <span className="text-black text-xs font-bold uppercase tracking-widest">{cursorText}</span>
      )}
    </motion.div>
  );
};

// --- PRELOADER ---
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.83, 0, 0.17, 1], delay: 2.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-[#D4FF00] flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }}
            className="text-9xl text-black font-bold tracking-tighter mix-blend-multiply serif"
          >
            ARCHIVE
          </motion.h1>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-[2px] bg-black w-full mt-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-black font-mono uppercase text-xs tracking-[0.5em]"
        >
          Curating Legacy
        </motion.p>
      </div>
    </motion.div>
  );
};

// --- HERO SECTION ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden border-b border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-900/10 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-1000" />
      </div>

      <nav className="relative z-20 flex justify-between items-center text-white">
        <Magnetic><div className="text-2xl font-bold tracking-tighter serif cursor-pointer" data-cursor="stick">ARCHIVE.</div></Magnetic>
        <div className="hidden md:flex gap-12 text-xs font-mono uppercase tracking-widest mix-blend-difference">
          {["Work", "Talent", "Journal", "Access"].map((item) => (
            <Magnetic key={item}>
              <a href="#" className="hover:text-[#D4FF00] transition-colors relative group" data-cursor="hover">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4FF00] transition-all group-hover:w-full" />
              </a>
            </Magnetic>
          ))}
        </div>
        <Magnetic>
          <button className="px-6 py-2 rounded-full border border-white/20 text-xs uppercase tracking-widest hover:bg-[#D4FF00] hover:text-black hover:border-transparent transition-all duration-300" data-cursor="stick">
            Sign In
          </button>
        </Magnetic>
      </nav>

      <div className="relative z-10 flex flex-col justify-center items-center flex-grow mt-20">
        <motion.div style={{ y: y2 }} className="text-center relative">
          <h1 className="text-[14vw] leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-light tracking-tighter serif z-10 relative">
            DEFINING
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 3 }}
            className="w-full h-[1px] bg-white/30 my-4"
          />
          <h1 className="text-[14vw] leading-[0.8] text-white font-light tracking-tighter serif italic z-10 relative">
            FUTURE
          </h1>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full flex items-center justify-center z-0"
          >
            <div className="w-2 h-2 bg-[#D4FF00] rounded-full absolute top-0 left-1/2 -translate-x-1/2 box-shadow-[0_0_20px_#D4FF00]" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div style={{ y: y1 }} className="relative z-20 flex justify-between items-end mt-20">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <Asterisk className="w-4 h-4 animate-spin-slow" />
          <span>SCROLL TO EXPLORE</span>
        </div>
        <p className="max-w-md text-sm text-zinc-400 font-light leading-relaxed text-right">
          We curate the invisible. The roles that shape culture, code, and spaces.
          <br /><span className="text-white">Strictly for the obsessed.</span>
        </p>
      </motion.div>
    </section>
  );
};

// --- X-RAY SEARCH SECTION ---
const XRaySection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      className="relative h-[80vh] bg-[#0a0a0a] flex items-center justify-center overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-8 left-8 z-30 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-[#D4FF00]' : 'bg-red-500'} transition-colors`} />
        <span className="text-xs font-mono text-zinc-500 uppercase">System Status: {isHovered ? 'REVEALING' : 'LOCKED'}</span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 select-none">
        <div className="grid grid-cols-4 gap-4 w-full h-full p-8 opacity-30">
          {Array.from({ length: 32 }).map((_, i) => (
            <div key={i} className="border border-white/10 rounded flex items-center justify-center">
              <span className="text-[10px] uppercase font-mono text-white/20">Resume_0{i}.pdf</span>
            </div>
          ))}
        </div>
        <h2 className="absolute text-5xl md:text-8xl font-bold text-white/10 text-center pointer-events-none z-10">
          TRADITIONAL<br />HIRING IS<br />BROKEN
        </h2>
      </div>

      <motion.div
        className="absolute inset-0 z-20 bg-[#D4FF00] flex items-center justify-center pointer-events-none"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-multiply" />

        <div className="text-center px-4 mix-blend-multiply max-w-4xl">
          <h2 className="text-6xl md:text-9xl font-bold text-black leading-[0.85] tracking-tighter serif mb-8">
            FIND THE <br />UNTOUCHED
          </h2>
          <p className="text-black font-mono text-sm md:text-lg font-bold uppercase tracking-widest border-t-2 border-black pt-8 inline-block">
            Don't apply. Be discovered.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

// --- DIAGONAL SCROLL GALLERY ---
const DiagonalGallery = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Move track Up and Left to simulate moving Down and Right
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#050505] z-10">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x, y }}
          className="absolute top-0 left-0 flex items-start gap-20 p-12 md:p-24 min-w-max"
        >
          {/* Title Block */}
          <div className="w-[80vw] md:w-[40vw] flex-shrink-0 mt-12 md:mt-24">
            <h2 className="text-6xl md:text-9xl serif text-white mb-8 leading-[0.85]">
              Curated <br /> <span className="text-[#D4FF00] italic">Spaces</span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-md font-light border-l border-[#D4FF00] pl-6">
              Environments designed for breakthrough. We place talent where they can thrive.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <ArrowDown className="w-6 h-6 text-[#D4FF00] animate-bounce" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Scroll Diagonally</span>
            </div>
          </div>

          {/* Diagonal Images */}
          {[
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505569127510-bde15360d7f6?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2000&auto=format&fit=crop"
          ].map((src, i) => (
            <div
              key={i}
              className="relative w-[70vw] md:w-[50vw] h-[50vh] md:h-[70vh] flex-shrink-0 group"
              style={{ marginTop: `${(i + 1) * 12}vh` }} // Stagger downwards
            >
              <div className="w-full h-full overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700 ease-out border border-white/10 group-hover:border-[#D4FF00]/50">
                <img src={src} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Floating Label */}
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 z-20 mix-blend-difference pointer-events-none">
                <span className="text-6xl md:text-9xl serif italic text-white/50 group-hover:text-[#D4FF00] transition-colors duration-500">0{i + 1}</span>
              </div>
            </div>
          ))}

          {/* End CTA */}
          <div
            className="w-[30vw] h-[50vh] flex items-center justify-center flex-shrink-0"
            style={{ marginTop: '60vh' }}
          >
            <div className="w-40 h-40 md:w-64 md:h-64 rounded-full border border-white/10 flex items-center justify-center group hover:bg-[#D4FF00] hover:border-transparent transition-all cursor-pointer relative overflow-hidden" data-cursor="stick">
              <div className="absolute inset-0 bg-[#D4FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 text-xs md:text-sm font-mono uppercase tracking-widest group-hover:text-black transition-colors">View All Spaces</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

// --- INTERACTIVE JOB LIST (Sticky Layout) ---
const InteractiveJobs = () => {
  const [hoveredJob, setHoveredJob] = useState(JOBS[0]);

  return (
    <section className="py-32 px-4 md:px-12 bg-[#050505] relative">
      <div className="max-w-[90rem] mx-auto">
        <div className="flex justify-between items-end mb-24 border-b border-white/10 pb-8">
          <h2 className="text-7xl md:text-9xl serif text-white">Index</h2>
          <span className="font-mono text-zinc-500 hidden md:block">(2025 Collection)</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left: List */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {JOBS.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredJob(job)}
                className="group relative border-b border-white/10 py-10 transition-all duration-300 hover:pl-8 cursor-pointer"
                data-cursor="text"
                data-cursor-text="APPLY"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl md:text-5xl text-zinc-500 group-hover:text-white transition-colors serif">
                    {job.role}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-mono text-zinc-600 group-hover:text-[#D4FF00] transition-colors uppercase tracking-widest">{job.company}</span>
                    <span className="text-xs border border-white/10 rounded-full px-3 py-1 text-zinc-500 group-hover:border-[#D4FF00] group-hover:text-[#D4FF00] transition-colors">{job.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Sticky Image Preview */}
          <div className="hidden lg:block w-1/2 relative">
            <div className="sticky top-32 h-[600px] w-full overflow-hidden rounded-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredJob.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img src={hoveredJob.image} className="w-full h-full object-cover grayscale opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <h4 className="text-4xl text-white serif italic mb-2">{hoveredJob.company}</h4>
                    <p className="text-sm font-mono text-[#D4FF00] uppercase tracking-widest">Open Position</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- VIDEO / MANIFESTO ---
const Manifesto = () => {
  return (
    <section className="relative py-40 px-6 flex items-center justify-center bg-[#050505] border-t border-white/5">
      <div className="max-w-5xl w-full text-center relative z-10">
        <div className="mb-12 inline-block">
          <div className="w-20 h-20 rounded-full border border-zinc-700 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <div className="w-2 h-2 bg-[#D4FF00] rounded-full" />
          </div>
          <p className="font-mono text-xs text-[#D4FF00] tracking-[0.3em] uppercase">The Philosophy</p>
        </div>

        <h2 className="text-5xl md:text-8xl leading-tight text-white serif">
          "We don't match resumes. <br />
          <span className="text-zinc-600">We match ambitions."</span>
        </h2>

        <div className="mt-16 flex justify-center gap-8">
          <button className="px-8 py-4 bg-white text-black text-sm uppercase font-bold tracking-widest hover:bg-[#D4FF00] transition-colors" data-cursor="stick">
            Start Process
          </button>
          <button className="px-8 py-4 border border-white/20 text-white text-sm uppercase font-bold tracking-widest hover:border-white transition-colors" data-cursor="stick">
            Read Manifesto
          </button>
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">
        <img src="https://media.giphy.com/media/l41lFw057lAJcYt0Y/giphy.gif" className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

// --- GIANT FOOTER ---
const Footer = () => {
  return (
    <footer className="relative bg-[#D4FF00] pt-24 pb-12 px-6 md:px-12 overflow-hidden text-black selection:bg-black selection:text-[#D4FF00]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-widest mb-8 border-b border-black/10 pb-4 inline-block">Get in Touch</h3>
          <p className="text-4xl md:text-6xl serif leading-tight max-w-lg mb-12">
            For those who are ready to build the next era.
          </p>
          <div className="flex gap-4 items-center">
            <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
            <span className="font-mono text-sm">NYC — LDN — TKY</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 font-mono text-xs uppercase tracking-widest">
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:underline" data-cursor="stick">LinkedIn</a>
            <a href="#" className="hover:underline" data-cursor="stick">Instagram</a>
            <a href="#" className="hover:underline" data-cursor="stick">Are.na</a>
          </div>
          <div className="flex flex-col gap-4">
            <a href="#" className="hover:underline" data-cursor="stick">Legal</a>
            <a href="#" className="hover:underline" data-cursor="stick">Privacy</a>
            <a href="#" className="hover:underline" data-cursor="stick">Credits</a>
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-black/10 pt-4 flex justify-between items-end">
        <h1 className="text-[20vw] leading-[0.75] font-black tracking-tighter opacity-100 mix-blend-overlay">
          ARCHIVE
        </h1>
        <p className="hidden md:block text-xs font-mono mb-4">© 2025</p>
      </div>
    </footer>
  );
};

// --- MAIN PAGE ---
export default function PremiumJobPortal() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <GlobalStyles />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="noise-overlay" />
      <CustomCursor />

      {!loading && (
        <main className="min-h-screen bg-[#050505]">
          <Hero />

          {/* Marquee with High Velocity */}
          <div className="py-6 bg-[#D4FF00] text-black overflow-hidden flex whitespace-nowrap rotate-1 border-y border-black">
            <motion.div
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              className="flex gap-12 items-center text-4xl font-bold uppercase tracking-tight"
            >
              {Array(10).fill("Open Roles • Senior Positions • Executive Search • ").map((text, i) => (
                <span key={i} className="flex items-center gap-4">{text} <Zap className="w-6 h-6 fill-black" /></span>
              ))}
            </motion.div>
          </div>

          <XRaySection />
          <DiagonalGallery />
          <InteractiveJobs />
          <Manifesto />
          <Footer />
        </main>
      )}
    </>
  );
}