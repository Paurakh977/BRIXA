"use client";
import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useScroll,
  ScrollControls,
  Scroll,
  Environment,
  Float,
  ContactShadows,
  Text
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// --- CONFIGURATION ---
// IMPORTANT: This array has been updated with 'domBg' and 'textColor'.
// Ensure this specific version is used to prevent errors.
const COLORS = [
  { 
    name: "Carbon Black", 
    hex: "#111111", 
    price: 85, 
    domBg: "#101010",       // Background color for the HTML site
    textColor: "#ffffff",   // Text color for the HTML site
    accent: "bg-white"
  },
  { 
    name: "Titanium White", 
    hex: "#F0F0F0", 
    price: 85, 
    domBg: "#e8e8e8",       
    textColor: "#111111",   
    accent: "bg-black"
  },
  { 
    name: "Midnight Blue", 
    hex: "#0a1a2f", 
    price: 95, 
    domBg: "#050e1a",       
    textColor: "#bfdbfe",   
    accent: "bg-blue-400"
  },
];

// --- 3D COMPONENTS ---

const Bottle = ({ color }: { color: string }) => {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);

  // Materials
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: color,
    metalness: 0.2,
    roughness: 0.2,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    reflectivity: 1,
  });

  const steelMaterial = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    metalness: 1,
    roughness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });

  useFrame((state, delta) => {
    const tl = state.clock.elapsedTime;

    if (groupRef.current) {
      const r_offset = scroll.offset;

      // Curve Functions
      const x = Math.sin(r_offset * Math.PI * 2) * -1.5;
      const z = Math.cos(r_offset * Math.PI * 2) * 0.5;
      const y = -0.5 + Math.sin(tl * 0.5) * 0.1;

      const rotY = -Math.PI / 6 + r_offset * Math.PI * 4; 
      const rotZ = Math.sin(r_offset * Math.PI * 2) * 0.2;

      const targetPos = new THREE.Vector3(x, y, z);
      const targetRot = new THREE.Euler(0, rotY, rotZ);

      let targetScale = 1;
      if (r_offset > 0.5 && r_offset < 0.75) targetScale = 1.4; 

      groupRef.current.position.lerp(targetPos, delta * 1.5);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRot.y, 1.5, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRot.z, 1.5, delta);

      const currentScale = groupRef.current.scale.x;
      const newScale = THREE.MathUtils.damp(currentScale, targetScale, 1.5, delta);
      groupRef.current.scale.setScalar(newScale);
    }

    const openAmount = scroll.range(0.2, 0.1) * 0.5;
    if (capRef.current) {
      capRef.current.position.y = THREE.MathUtils.damp(capRef.current.position.y, 1.75 + openAmount, 4, delta);
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
        <mesh position={[0, 0, 0]} castShadow receiveShadow material={bodyMaterial}>
          <cylinderGeometry args={[0.7, 0.7, 3, 128]} />
        </mesh>
        <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} material={bodyMaterial}>
          <torusGeometry args={[0.69, 0.01, 16, 128]} />
        </mesh>
        <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]} material={bodyMaterial}>
          <torusGeometry args={[0.69, 0.01, 16, 128]} />
        </mesh>
        <mesh position={[0, 1.51, 0]} material={steelMaterial}>
          <cylinderGeometry args={[0.35, 0.7, 0.1, 128]} />
        </mesh>
      </group>
    </group>
  );
};

// Background text that adapts color slightly for effect
const BackgroundText = ({ isDark }: { isDark: boolean }) => (
  <Text
    position={[0, 0, -2]}
    fontSize={3}
    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
    anchorX="center"
    anchorY="middle"
  >
    AQUA
    <meshBasicMaterial color={isDark ? "#ffffff" : "#000000"} transparent opacity={0.05} />
  </Text>
);

// Syncs the 3D Background with the DOM Background
const DynamicScene = ({ bgHex }: { bgHex: string }) => {
  const bgColorRef = useRef(new THREE.Color(bgHex));

  useFrame((state, delta) => {
    // Smoothly transition the WebGL background color to match the HTML background
    const target = new THREE.Color(bgHex);
    bgColorRef.current.lerp(target, delta * 2);
    state.gl.setClearColor(bgColorRef.current);
  });

  return null;
};

// --- UI COMPONENTS ---

const Navbar = ({ cartCount, onOpenCart, textColor }: any) => (
  <nav 
    className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-8 pointer-events-auto transition-colors duration-700"
    style={{ color: textColor }} // Apply text color explicitly
  >
    <div className="flex items-center gap-2">
      <span className="text-xl font-serif italic tracking-widest">AQUA.</span>
    </div>

    <div className="hidden md:flex gap-16 text-[10px] font-medium tracking-[0.3em] uppercase">
      {["Collection", "Atelier", "Journal"].map((item) => (
        <a key={item} href="#" className="hover:underline underline-offset-8 decoration-[0.5px] transition-all opacity-80 hover:opacity-100">
          {item}
        </a>
      ))}
    </div>

    <div className="flex items-center gap-8">
      <button onClick={onOpenCart} className="relative group flex items-center gap-2 hover:opacity-70 transition-opacity">
        <span className="text-[10px] font-medium tracking-widest uppercase">Bag</span>
        <span className="text-xs font-serif italic">({cartCount})</span>
      </button>
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
          className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white text-black z-[70] shadow-2xl flex flex-col"
        >
          <div className="p-6 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold">Your Bag ({cartItems.length})</h2>
            <button onClick={onClose}><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-slate-400 mt-20 text-sm">Your bag is empty.</div>
            ) : (
              cartItems.map((item: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-16 h-20 rounded-lg" style={{ backgroundColor: item.hex }} />
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
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: false, margin: "-20%" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`min-h-screen w-full flex flex-col justify-center px-8 md:px-32 pointer-events-none 
    ${align === "left" ? "items-start" : align === "right" ? "items-end text-right" : "items-center text-center"}`}
  >
    <div className="max-w-2xl pointer-events-auto">
      {children}
    </div>
  </motion.section>
);

// --- MARQUEE COMPONENT ---
const Marquee = ({ textColor }: { textColor: string }) => (
  <div 
    className="w-full bg-transparent py-4 overflow-hidden absolute top-[40vh] left-0 -rotate-12 z-0 opacity-10 pointer-events-none transition-colors duration-700"
    style={{ color: textColor }}
  >
    <div className="animate-marquee whitespace-nowrap flex gap-32 text-9xl font-black uppercase tracking-tighter">
      <span>Pure</span><span>Impact</span><span>Design</span>
      <span>Pure</span><span>Impact</span><span>Design</span>
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

  // Helper to determine if theme is dark (for text inversion)
  // SAFETY CHECK: Ensure domBg exists before calling toLowerCase
  const domBg = activeColor?.domBg || "#e8e8e8";
  const isDarkTheme = domBg.toLowerCase() !== "#e8e8e8";

  return (
    <div 
      className="relative w-full h-screen font-sans overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ 
        backgroundColor: activeColor.domBg, 
        color: activeColor.textColor 
      }}
    >

      <Navbar 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        textColor={activeColor.textColor} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        removeItem={(idx: number) => setCart(cart.filter((_, i) => i !== idx))} 
      />

      {/* 3D SCENE BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 7], fov: 35 }} 
          gl={{ preserveDrawingBuffer: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          {/* Sync 3D background with DOM background */}
          <DynamicScene bgHex={activeColor.domBg} />

          <Environment preset="studio" environmentIntensity={1} />
          
          {/* Lighting optimized for both dark and light themes */}
          <ambientLight intensity={0.5} />
          
          {/* Key Light */}
          <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
          
          {/* Rim Light - Crucial for seeing dark bottle on dark background */}
          <spotLight 
            position={[0, 0, -8]} 
            intensity={8} // High intensity rim light
            angle={1} 
            color="#ffffff" 
          />
          
          {/* Fill Light */}
          <pointLight position={[0, -5, 2]} intensity={0.5} />

          <ScrollControls pages={4} damping={0.2}>
            <Suspense fallback={null}>
              <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Bottle color={activeColor.hex} />
                <BackgroundText isDark={isDarkTheme} />
              </Float>
              <ContactShadows opacity={0.3} scale={20} blur={2.5} far={5} />
            </Suspense>

            {/* DOM OVERLAY */}
            <Scroll html className="w-full">

              {/* PAGE 1: HERO */}
              <Section align="center">
                <h1 className="text-[15vw] font-serif italic leading-[0.8] tracking-tighter mb-8 opacity-90 transition-colors duration-700">
                  AQUA
                </h1>
                <p 
                  className="text-[10px] font-medium tracking-[0.5em] uppercase max-w-xs mx-auto mb-12 border-t pt-8 transition-colors duration-700"
                  style={{ borderColor: activeColor.textColor }}
                >
                  The Art of Hydration
                </p>
                <button 
                  className="text-[10px] font-bold tracking-widest uppercase border-b pb-1 hover:pb-2 transition-all"
                  style={{ borderColor: activeColor.textColor }}
                >
                  Discover Collection
                </button>
              </Section>

              {/* PAGE 2: FEATURES */}
              <Section align="right">
                <div className="max-w-md space-y-16">
                  <div>
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Surgical Grade.</h2>
                    <p className="opacity-70 leading-relaxed">Constructed from 18/8 stainless steel. Impervious to corrosion. Designed to last a lifetime.</p>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Thermal Lock.</h2>
                    <p className="opacity-70 leading-relaxed">Double-wall vacuum insulation. Keeps contents ice-cold for 24 hours or piping hot for 12.</p>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Pure Taste.</h2>
                    <p className="opacity-70 leading-relaxed">Electropolished interior ensures no flavor transfer. Taste your drink, not the bottle.</p>
                  </div>
                </div>
              </Section>

              {/* PAGE 3: COLOR SELECTOR */}
              <Section align="center">
                <div className="text-center w-full">
                  <h2 className="text-[10px] font-bold tracking-[0.5em] uppercase mb-24 opacity-80">Select Finish</h2>

                  <div className="flex justify-center gap-12 mb-24">
                    {COLORS.map((col) => (
                      <button
                        key={col.name}
                        onClick={() => setActiveColor(col)}
                        className={`w-8 h-8 rounded-full transition-all duration-500 ${
                          activeColor.name === col.name
                            ? 'scale-150 ring-2 ring-offset-4'
                            : 'hover:scale-125 opacity-40 hover:opacity-100'
                        }`}
                        style={{ 
                          backgroundColor: col.hex,
                          borderColor: activeColor.textColor,
                          // Use dynamic ring offset color to match background
                          boxShadow: activeColor.name === col.name ? `0 0 0 4px ${activeColor.domBg}, 0 0 0 6px ${activeColor.textColor}` : 'none'
                        }}
                      />
                    ))}
                  </div>

                  <h3 className="text-5xl font-serif italic tracking-tight mb-8">{activeColor.name}</h3>

                  <div className="flex flex-col items-center gap-4">
                    <span className="text-sm font-medium tracking-widest opacity-80">${activeColor.price} USD</span>
                    <button
                      onClick={addToCart}
                      className="px-16 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all duration-300 border hover:opacity-80"
                      style={{ 
                        backgroundColor: activeColor.textColor, 
                        color: activeColor.domBg,
                        borderColor: activeColor.textColor
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </Section>

              {/* PAGE 4: FOOTER */}
              <section className="h-screen w-full flex flex-col justify-end pointer-events-none">
                <div 
                  className="w-full py-20 px-8 md:px-32 pointer-events-auto transition-colors duration-700"
                  style={{ backgroundColor: isDarkTheme ? '#000' : '#fff', color: isDarkTheme ? '#fff' : '#000' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div>
                      <h3 className="text-2xl font-serif italic mb-6">AQUA.</h3>
                      <p className="text-xs leading-relaxed max-w-xs opacity-50">Redefining how you hydrate with technology and sustainable design.</p>
                    </div>
                    {/* Simplified Footer Lists for brevity */}
                    {['Shop', 'Company', 'Support'].map(title => (
                      <div key={title}>
                        <h4 className="font-bold mb-4 uppercase text-[10px] tracking-widest opacity-50">{title}</h4>
                        <ul className="space-y-2 text-xs">
                           <li className="opacity-70 hover:opacity-100 cursor-pointer">Link One</li>
                           <li className="opacity-70 hover:opacity-100 cursor-pointer">Link Two</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-8 border-t opacity-40" style={{ borderColor: activeColor.textColor }}>
                    <span className="text-[10px] font-medium">© 2024 Aqua Inc.</span>
                  </div>
                </div>
              </section>

            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>

      <Marquee textColor={activeColor.textColor} />

    </div>
  );
}