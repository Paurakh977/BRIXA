"use client";

import Link from 'next/link';
import { ArrowLeft, Instagram, Facebook, Globe, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const founders = [
    {
      name: "Paurakh Raj Pandey",
      role: "Founder",
      bio: "Visionary leader driving BRIXA's mission to revolutionize infrastructure.",
      email: "paurakh@brixa.com",
      socials: {
        instagram: "#",
        facebook: "#",
        portfolio: "#",
      },
      phone: "+977 9800000000",
      color: "bg-[#E6DCC3] text-[#5D4037]",
      borderColor: "border-[#C1A87D]"
    },
    {
      name: "Muskan Singh",
      role: "Co-Founder",
      bio: "Tech innovator ensuring BRIXA's platform is robust and scalable.",
      email: "muskan@brixa.com",
      socials: {
        instagram: "#",
        facebook: "#",
        portfolio: "#",
      },
      phone: "+977 9800000000",
      color: "bg-[#F5F5DC] text-[#4E342E]",
      borderColor: "border-[#D7CCC8]"
    },
    {
      name: "Yawat Malla",
      role: "Co-Founder",
      bio: "Strategic mastermind behind BRIXA's growth and operations.",
      email: "yawat@brixa.com",
      socials: {
        instagram: "#",
        facebook: "#",
        portfolio: "#",
      },
      phone: "+977 9800000000",
      color: "bg-[#FFF8E1] text-[#3E2723]",
      borderColor: "border-[#FFE57F]"
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.1 
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#4E342E] font-sans selection:bg-[#5D4037] selection:text-[#FFF8E1] overflow-x-hidden relative">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#EFEBE9] rounded-full blur-[120px] opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D7CCC8] rounded-full blur-[120px] opacity-40"></div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 relative z-10">
        {/* Header / Navigation */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="mb-20"
        >
          <Link href="/draft_7" className="inline-flex items-center gap-2 text-[#8D6E63] hover:text-[#4E342E] transition-colors mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <h1 className="font-serif text-5xl md:text-7xl text-[#3E2723] mb-6 tracking-tight">
            About <span className="text-[#6D4C41]">BRIXA</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8D6E63] max-w-3xl leading-relaxed font-light">
            We are building the <span className="font-medium text-[#4E342E]">operating system</span> for the modern construction industry. <br className="hidden md:block"/>
            <span className="italic text-[#6D4C41]">Radical integrity, verified trust, and streamlined execution.</span>
          </p>
        </motion.div>

        {/* Founders Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={sectionVariants} className="font-serif text-3xl text-[#3E2723] mb-12 border-b border-[#D7CCC8] pb-4">Our Founders</motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                className={`bg-white rounded-2xl p-8 border ${founder.borderColor} shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(93,64,55,0.1)] transition-all duration-500 group`}
              >
                <div className="overflow-hidden">
                  <motion.div variants={textVariants} className={`w-24 h-24 ${founder.color} rounded-full mb-6 flex items-center justify-center text-2xl font-serif font-bold shadow-inner`}>
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                </div>
                
                <motion.h3 variants={textVariants} className="text-2xl font-bold text-[#3E2723] mb-1 font-serif">{founder.name}</motion.h3>
                <motion.p variants={textVariants} className="text-xs font-bold text-[#A1887F] uppercase tracking-widest mb-6">{founder.role}</motion.p>
                <motion.p variants={textVariants} className="text-[#5D4037] mb-8 leading-relaxed text-sm">
                  {founder.bio}
                </motion.p>

                <div className="space-y-3 pt-6 border-t border-[#EFEBE9]">
                   <motion.div variants={textVariants} className="flex items-center gap-3 text-sm text-[#795548] group-hover:text-[#3E2723] transition-colors">
                      <Mail size={16} className="text-[#A1887F]" />
                      <span>{founder.email}</span>
                   </motion.div>
                   <motion.div variants={textVariants} className="flex items-center gap-3 text-sm text-[#795548] group-hover:text-[#3E2723] transition-colors">
                      <Phone size={16} className="text-[#A1887F]" />
                      <span>{founder.phone}</span>
                   </motion.div>
                   
                   <motion.div variants={textVariants} className="pt-4 flex gap-4">
                      <a href={founder.socials.instagram} className="p-2 bg-[#EFEBE9] rounded-full text-[#6D4C41] hover:bg-[#3E2723] hover:text-white transition-all transform hover:scale-110" title="Instagram">
                        <Instagram size={18} />
                      </a>
                      <a href={founder.socials.facebook} className="p-2 bg-[#EFEBE9] rounded-full text-[#6D4C41] hover:bg-[#3E2723] hover:text-white transition-all transform hover:scale-110" title="Facebook">
                        <Facebook size={18} />
                      </a>
                      <a href={founder.socials.portfolio} className="p-2 bg-[#EFEBE9] rounded-full text-[#6D4C41] hover:bg-[#3E2723] hover:text-white transition-all transform hover:scale-110" title="Portfolio">
                        <Globe size={18} />
                      </a>
                   </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Info Footer */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mt-24 pt-12"
        >
             <motion.div 
               variants={cardVariants}
               className="bg-[#3E2723] rounded-[2rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl"
             >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4E342E] rounded-full blur-[80px] opacity-40 translate-x-1/3 -translate-y-1/3"></div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12">
                   <div>
                      <motion.h3 variants={textVariants} className="font-serif text-4xl mb-6">Get in touch</motion.h3>
                      <motion.p variants={textVariants} className="text-[#D7CCC8] mb-8 max-w-xl text-lg font-light">
                         Interested in learning more about BRIXA? We'd love to hear from you.
                      </motion.p>
                      <motion.button variants={textVariants} className="px-8 py-3 bg-[#EFEBE9] text-[#3E2723] rounded-full font-bold hover:bg-white transition-colors shadow-lg">
                        Contact Sales
                      </motion.button>
                   </div>
                   
                   <div className="flex flex-col gap-8 justify-center">
                      <motion.div variants={textVariants} className="group">
                         <div className="text-xs text-[#A1887F] uppercase tracking-widest mb-2 group-hover:text-[#D7CCC8] transition-colors">Email</div>
                         <div className="text-xl md:text-2xl font-serif">contact@brixa.com</div>
                      </motion.div>
                      <motion.div variants={textVariants} className="group">
                         <div className="text-xs text-[#A1887F] uppercase tracking-widest mb-2 group-hover:text-[#D7CCC8] transition-colors">Address</div>
                         <div className="text-xl md:text-2xl font-serif">Kathmandu, Nepal</div>
                      </motion.div>
                   </div>
                </div>
             </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
