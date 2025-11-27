"use client";

import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  useScroll, 
  ScrollControls, 
  Scroll, 
  Environment, 
  Float, 
  ContactShadows,
  Text,
  MeshTransmissionMaterial
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Menu, ArrowRight, Droplets, ShieldCheck, Thermometer, Wind } from "lucide-react";

// --- CONFIGURATION ---
const COLORS = [
  { name: "Obsidian Black", hex: "#111111", price: 55, bg: "bg-gray-900", accent: "text-gray-900" },
  { name: "Arctic White", hex: "#f5f5f5", price: 55, bg: "bg-gray-100", accent: "text-gray-400" },
  { name: "Nebula Blue", hex: "#405880", price: 59, bg: "bg-blue-900", accent: "text-blue-700" },
  { name: "Sage Green", hex: "#8da399", price: 59, bg: "bg-emerald-800", accent: "text-emerald-700" },
];

// --- 3D COMPONENTS ---

const FallingWater = () => {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      x: (Math.random() - 0.5) * 0.8, // Random width near bottle
      y: Math.random() * 2,           // Start at different heights
      z: (Math.random() - 0.5) * 0.8, // Depth
      speed: 0.02 + Math.random() * 0.05,
      scale: 0.05 + Math.random() * 0.05
    }));
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      // Move down
      particle.y -= particle.speed;
      
      // Reset if too low
      if (particle.y < -2.5) {
        particle.y = 0; // Reset to just below bottle center
        particle.x = (Math.random() - 0.5) * 0.8;
        particle.z = (Math.random() - 0.5) * 0.8;
      }

      dummy.position.set(particle.x, particle.y - 1, particle.z);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <MeshTransmissionMaterial 
        backside
        thickness={0.2}
        roughness={0}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.1}
        color="#cceeff"
      />
    </instancedMesh>
  );
};

const Bottle = ({ color }: { color: string }) => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  // Materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.4,
    roughness: 0.2,
  });

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: "#e0e0e0",
    metalness: 0.9,
    roughness: 0.2,
  });

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating rotation + Scroll rotation
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        -Math.PI / 4 + scroll.offset * (Math.PI * 2), // Full 360 spin over scroll
        2,
        delta
      );
    }

    // Only move the cap slightly to show it's separate, no explosion
    const openAmount = scroll.range(0.2, 0.3) * 0.5; // Only moves up 0.5 units
    if (capRef.current) {
        capRef.current.position.y = THREE.MathUtils.damp(capRef.current.position.y, 1.75 + openAmount, 4, delta);
    }

    // Liquid subtle wobble
    if (liquidRef.current) {
         liquidRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
         liquidRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      
      {/* CAP */}
      <mesh ref={capRef} position={[0, 1.75, 0]} castShadow receiveShadow material={steelMaterial}>
        <cylinderGeometry args={[0.36, 0.36, 0.3, 32]} />
        <mesh position={[0, 0.2, 0]}>
           <torusGeometry args={[0.15, 0.04, 16, 32]} />
           <meshStandardMaterial color="#111" />
        </mesh>
      </mesh>

      {/* BODY */}
      <group>
        {/* Main Shell */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow material={bodyMaterial}>
          <cylinderGeometry args={[0.7, 0.7, 3, 64]} />
        </mesh>
        
        {/* Steel Rim */}
        <mesh position={[0, 1.51, 0]} material={steelMaterial}>
             <cylinderGeometry args={[0.35, 0.7, 0.1, 64]} />
        </mesh>
        
        {/* Glass/Liquid Layer (Subtle shine) */}
        <mesh ref={liquidRef} position={[0, 0, 0]} scale={[1.02, 1, 1.02]}>
           <cylinderGeometry args={[0.7, 0.7, 2.9, 32]} />
           <MeshTransmissionMaterial 
              transmission={0.5} 
              opacity={0.5} 
              transparent 
              roughness={0.1} 
              color={color} 
              metalness={0.1}
           />
        </mesh>
      </group>

      {/* Falling Water Droplets */}
      <FallingWater />

    </group>
  );
};

const BackgroundText = () => (
    <Text
      position={[0, 0, -2]}
      fontSize={3}
      color="#f0f0f0"
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      anchorX="center"
      anchorY="middle"
    >
      AQUA
    </Text>
);

// --- UI COMPONENTS ---

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 text-slate-900 pointer-events-auto bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm">
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 text-white p-1 rounded-lg">
        <Droplets className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold tracking-tight">AQUA<span className="text-blue-600">Pure</span></span>
    </div>
    
    <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-slate-500">
      {["Features", "Engineering", "Reviews"].map((item) => (
        <a key={item} href="#" className="hover:text-blue-600 transition-colors">
          {item}
        </a>
      ))}
    </div>

    <div className="flex items-center gap-6">
      <button onClick={onOpenCart} className="relative group">
        <ShoppingBag className="w-6 h-6 hover:scale-110 transition-transform" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            {cartCount}
          </span>
        )}
      </button>
      <Menu className="w-6 h-6 md:hidden" />
    </div>
  </nav>
);

const CartDrawer = ({ isOpen, onClose, cartItems, removeItem }: any) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
        />
        <motion.div 
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
        >
          <div className="p-6 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold">Your Bag ({cartItems.length})</h2>
            <button onClick={onClose}><X className="w-5 h-5"/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-slate-400 mt-20 text-sm">Your bag is empty.</div>
            ) : (
              cartItems.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                   <div className={`w-16 h-20 rounded-lg ${item.bg}`} />
                   <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500 mb-2">500ml / Insulated</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">${item.price}</span>
                        <button onClick={() => removeItem(idx)} className="text-[10px] text-red-500 uppercase font-bold tracking-wider">Remove</button>
                      </div>
                   </div>
                </div>
              ))
            )}
          </div>
          <div className="p-6 border-t bg-slate-50">
            <div className="flex justify-between mb-4 text-lg font-bold">
               <span>Subtotal</span>
               <span>${cartItems.reduce((acc: number, item: any) => acc + item.price, 0)}</span>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/10">
              Checkout Now
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Section = ({ children, align = "left", delay = 0 }: any) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={`min-h-screen w-full flex flex-col justify-center px-8 md:px-32 pointer-events-none 
    ${align === "left" ? "items-start" : align === "right" ? "items-end text-right" : "items-center text-center"}`}
  >
    <div className="max-w-xl pointer-events-auto">
      {children}
    </div>
  </motion.section>
);

// --- MARQUEE COMPONENT ---
const Marquee = () => (
    <div className="w-full bg-slate-900 text-white py-4 overflow-hidden absolute top-[110vh] left-0 rotate-1 z-0 opacity-10 md:opacity-100">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-6xl font-black uppercase tracking-tighter opacity-30">
            <span>Keep it cold</span><span>Keep it hot</span><span>Sustainable</span><span>Lifetime Warranty</span>
            <span>Keep it cold</span><span>Keep it hot</span><span>Sustainable</span><span>Lifetime Warranty</span>
        </div>
    </div>
);

// --- MAIN PAGE ---

export default function PremiumLanding() {
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = () => {
    setCart([...cart, activeColor]);
    setIsCartOpen(true);
  };

  return (
    <div className="relative w-full h-screen bg-[#FDFDFD] text-slate-900 font-sans overflow-hidden">
      
      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} removeItem={(idx: number) => setCart(cart.filter((_, i) => i !== idx))} />

      {/* 3D SCENE BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas shadows camera={{ position: [0, 0, 7], fov: 30 }} gl={{ preserveDrawingBuffer: true, antialias: true }}>
          <color attach="background" args={['#FDFDFD']} />
          <Environment preset="studio" />
          <ambientLight intensity={0.7} />
          <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={2} castShadow />
          <spotLight position={[-5, 5, -5]} intensity={1} color="#b0dfff" />
          
          <ScrollControls pages={4} damping={0.2}>
            
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Bottle color={activeColor.hex} />
                <BackgroundText />
              </Float>
              <ContactShadows opacity={0.3} scale={20} blur={2.5} far={5} />
            </Suspense>

            {/* DOM OVERLAY */}
            <Scroll html className="w-full">
              
              {/* PAGE 1: HERO */}
              <Section align="left">
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-blue-100">
                    New Arrival
                </div>
                <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-6 tracking-tight text-slate-900">
                  PURE <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">IMPACT.</span>
                </h1>
                <p className="text-lg text-slate-500 max-w-md leading-relaxed mb-8 font-medium">
                  The first self-cleaning water bottle engineered with surgical-grade steel and a minimalistic design philosophy.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-colors uppercase text-xs font-bold tracking-widest shadow-xl shadow-blue-900/10">
                    Shop Collection
                  </button>
                  <button className="px-8 py-4 border border-slate-200 text-slate-600 rounded-full hover:border-slate-900 hover:text-slate-900 transition-all uppercase text-xs font-bold tracking-widest">
                    View Specs
                  </button>
                </div>
                
                {/* Trusted By Strip */}
                <div className="mt-16 pt-8 border-t border-slate-100 w-full">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-4">Trusted by athletes at</p>
                    <div className="flex gap-6 opacity-40 grayscale">
                       {/* Simple placeholders for logos */}
                       <div className="h-6 w-20 bg-slate-800 rounded"></div>
                       <div className="h-6 w-20 bg-slate-800 rounded"></div>
                       <div className="h-6 w-20 bg-slate-800 rounded"></div>
                    </div>
                </div>
              </Section>

              {/* PAGE 2: FEATURES GRID (Filling the empty space) */}
              <Section align="right">
                <div className="relative z-10 bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white shadow-xl max-w-2xl ml-auto">
                    <h2 className="text-4xl font-bold mb-8">Not just a bottle. <br/><span className="text-blue-600">A Hydration System.</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                            <ShieldCheck className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="font-bold text-slate-900">Bacteria Defense</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Silver-ion lining prevents 99% of bacterial growth inside the container.</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                            <Thermometer className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="font-bold text-slate-900">24h Thermal Lock</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Double-wall vacuum insulation keeps water ice-cold for 24 hours.</p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-50">
                            <Wind className="w-8 h-8 text-blue-500 mb-3" />
                            <h3 className="font-bold text-slate-900">Featherweight</h3>
                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">30% lighter than traditional steel bottles without sacrificing durability.</p>
                        </div>
                         <div className="flex items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Lifetime <br/> Warranty</span>
                        </div>
                    </div>
                </div>
              </Section>

              {/* PAGE 3: COLOR SELECTOR */}
              <Section align="center">
                <div className="relative">
                    {/* Decorative Background Blur */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] -z-10" />
                    
                    <div className="bg-white/70 backdrop-blur-2xl p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/50 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-1 ${activeColor.bg}`} />
                        
                        <h2 className="text-5xl md:text-7xl font-bold mb-4 text-slate-900 tracking-tight">
                            {activeColor.name.split(" ")[0]} 
                            <span className={`italic font-serif ml-4 ${activeColor.accent}`}>{activeColor.name.split(" ")[1]}</span>
                        </h2>
                        
                        <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg">
                            Premium powder-coat finish with a sweat-proof grip.
                        </p>
                        
                        {/* Color Bubbles */}
                        <div className="flex justify-center gap-4 mb-12">
                            {COLORS.map((col) => (
                                <button 
                                    key={col.name}
                                    onClick={() => setActiveColor(col)}
                                    className={`w-14 h-14 rounded-full border-4 transition-all duration-300 shadow-sm ${
                                        activeColor.name === col.name 
                                        ? 'border-blue-500 scale-110 shadow-blue-500/30' 
                                        : 'border-white hover:scale-105'
                                    }`}
                                    style={{backgroundColor: col.hex}}
                                    aria-label={col.name}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="text-4xl font-black text-slate-900">${activeColor.price}</div>
                            <button 
                               onClick={addToCart}
                               className="bg-slate-900 text-white px-12 py-5 rounded-full text-sm font-bold tracking-[0.2em] uppercase hover:bg-blue-600 hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-xl"
                            >
                               Add to Order <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
              </Section>

              {/* PAGE 4: FOOTER */}
              <section className="h-screen w-full flex flex-col justify-end pointer-events-none">
                 <div className="w-full bg-slate-950 text-slate-400 py-20 px-8 md:px-32 pointer-events-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div>
                            <h3 className="text-white text-2xl font-bold mb-6">AQUA.</h3>
                            <p className="text-sm leading-relaxed max-w-xs">Redefining how you hydrate with technology and sustainable design.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Shop</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">All Bottles</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Gift Sets</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                             <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Newsletter</h4>
                             <div className="flex gap-2">
                                <input type="email" placeholder="Email address" className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-blue-500" />
                                <button className="bg-white text-slate-950 px-4 rounded-lg font-bold text-xs hover:bg-blue-100">GO</button>
                             </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-8 border-t border-slate-900 text-xs font-medium">
                        <span>© 2024 Aqua Inc. All rights reserved.</span>
                        <div className="flex gap-4">
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                        </div>
                    </div>
                 </div>
              </section>

            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>

      <Marquee />

    </div>
  );
}



