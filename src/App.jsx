import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Database, 
  Server, 
  Layout, 
  GitBranch, 
  Terminal, 
  Microscope, 
  FileText, 
  ExternalLink, 
  Github, 
  Linkedin, 
  ChevronDown,
  Play, 
  Activity, 
  ArrowRight, 
  Beaker, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  Box,
  Filter,
  Layers,
  Shield,
  CheckCircle2,
  Cpu,
  User,
  Zap,
  Globe
} from 'lucide-react';

// --- Custom Components ---

// 1. High-Tech HUD Card (Glassmorphism + Tech Borders)
const GlassCard = ({ children, className = "" }) => (
  <div className={`relative group bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30 ${className}`}>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl-lg"></div>
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr-lg"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl-lg"></div>
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br-lg"></div>
    {children}
  </div>
);

// 2. Animated Research Carousel (Cinema Mode)
const ResearchCarousel = ({ items, type = 'gallery' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  const handleTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <div 
      className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl border border-white/10 bg-black group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cinematic Image Layer */}
      {items.map((item, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
          
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[10s]"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          {/* Fallback Icon Overlay (Always rendered, hidden if image loads) */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center bg-slate-900">
             <Microscope size={64} className="text-slate-700 animate-pulse" />
          </div>

          {/* Floating Content */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 flex flex-col justify-end h-full">
            <div className={`transform transition-all duration-700 delay-300 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
               <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-cyan-500"></span>
                  <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">{type === 'publication' ? 'Published Research' : 'Experiment Log'}</span>
               </div>
               <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
                 {item.title}
               </h3>
               {item.description && (
                 <p className="text-slate-300 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-white/20 pl-6">
                   {item.description}
                 </p>
               )}
               {type === 'publication' && (
                 <div className="mt-6 flex flex-wrap gap-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-slate-300">{item.venue}</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-slate-300">{item.year}</span>
                 </div>
               )}
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-cyan-500 transition-all duration-300 z-30" style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}></div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-2">
        <button onClick={prevSlide} className="p-3 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 text-white rounded-full transition-all backdrop-blur-sm"><ChevronLeft size={20}/></button>
        <button onClick={nextSlide} className="p-3 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 text-white rounded-full transition-all backdrop-blur-sm"><ChevronRight size={20}/></button>
      </div>
    </div>
  );
};


// 3. Expanded Project Modal
const ProjectModal = ({ project, onClose }) => {
  const [activeSlide, setActiveSlide] = useState(0);
    
  // Auto-play for gallery
  useEffect(() => {
    if (!project?.details?.gallery) return;
    const interval = setInterval(() => {
       setActiveSlide(prev => (prev + 1) % project.details.gallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [project]);

  if (!project) return null;

  const { details } = project;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/50 z-20">
           <div>
              <div className="text-xs font-mono text-cyan-400 mb-1 tracking-wider uppercase">Project Details</div>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
             <X size={24} />
           </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
           {/* Gallery Section */}
           {details?.gallery && (
             <div className="relative aspect-video w-full bg-black group">
                {details.gallery.map((slide, idx) => (
                  <div key={idx} className={`absolute inset-0 transition-opacity duration-700 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.url} alt={slide.caption} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <p className="text-white text-lg font-medium">{slide.caption}</p>
                    </div>
                  </div>
                ))}
                {/* Dots */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                   {details.gallery.map((_, idx) => (
                     <button 
                       key={idx} 
                       onClick={() => setActiveSlide(idx)}
                       className={`w-2 h-2 rounded-full transition-all ${idx === activeSlide ? 'bg-cyan-400 w-6' : 'bg-white/30'}`} 
                     />
                   ))}
                </div>
             </div>
           )}

           {details ? (
             <div className="p-8 grid md:grid-cols-3 gap-10">
                {/* Main Content (Left 2/3) */}
                <div className="md:col-span-2 space-y-8">
                   
                   {/* Overview */}
                   <section>
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <Activity size={20} className="text-cyan-400" /> Project Overview
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg font-light">
                        {details.overview}
                      </p>
                   </section>

                   {/* Problem & Solution */}
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-xl">
                         <h4 className="text-red-400 font-bold mb-2 text-sm uppercase flex items-center gap-2">
                            <Shield size={16}/> The Problem
                         </h4>
                         <p className="text-slate-400 text-sm leading-relaxed">{details.problem}</p>
                      </div>
                      <div className="bg-green-500/5 border border-green-500/10 p-5 rounded-xl">
                         <h4 className="text-green-400 font-bold mb-2 text-sm uppercase flex items-center gap-2">
                            <CheckCircle2 size={16}/> The Solution
                         </h4>
                         <p className="text-slate-400 text-sm leading-relaxed">{details.solution}</p>
                      </div>
                   </div>

                   {/* Key Features */}
                   <section>
                      <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {details.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                   </section>

                   {/* Outcome */}
                   <section className="border-t border-white/10 pt-6">
                      <h3 className="text-lg font-bold text-white mb-2">Project Outcome</h3>
                      <p className="text-slate-400 italic">"{details.outcome}"</p>
                   </section>
                </div>

                {/* Sidebar (Right 1/3) */}
                <div className="space-y-8">
                   {/* Tech Stack */}
                   <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                         <Cpu size={16} className="text-cyan-400"/> Tech Stack
                      </h3>
                      <div className="space-y-4">
                         <div>
                            <div className="text-xs text-slate-500 mb-1">Frontend</div>
                            <div className="text-slate-200 font-mono text-sm">{details.techStack.frontend}</div>
                         </div>
                         <div>
                            <div className="text-xs text-slate-500 mb-1">Backend</div>
                            <div className="text-slate-200 font-mono text-sm">{details.techStack.backend}</div>
                         </div>
                         <div>
                            <div className="text-xs text-slate-500 mb-1">Database</div>
                            <div className="text-slate-200 font-mono text-sm">{details.techStack.database}</div>
                         </div>
                      </div>
                   </div>

                   {/* My Role */}
                   <div className="bg-slate-800/50 rounded-xl p-6 border border-white/5">
                      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                         <Layers size={16} className="text-purple-400"/> My Contributions
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {details.role}
                      </p>
                   </div>
                   
                   <button className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2">
                      <Github size={18} /> View Repository
                   </button>
                </div>
             </div>
           ) : (
             <div className="p-12 text-center text-slate-500">
               Detailed content not available for this project yet.
             </div>
           )}
        </div>
      </div>
    </div>
  );
};


// --- Views ---

// 1. Main Portfolio View 
const MainView = ({ scrollTo, navigateToResearch }) => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const aboutSectionRef = useRef(null);
  const [aboutSectionInView, setAboutSectionInView] = useState(false);
  const skillsSectionRef = useRef(null);
  const [skillsSectionInView, setSkillsSectionInView] = useState(false);

  useEffect(() => {
    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAboutSectionInView(true);
          aboutObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutSectionRef.current) {
      aboutObserver.observe(aboutSectionRef.current);
    }

    const skillsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsSectionInView(true);
          skillsObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillsSectionRef.current) {
      skillsObserver.observe(skillsSectionRef.current);
    }

    return () => {
      if (aboutObserver) aboutObserver.disconnect();
      if (skillsObserver) skillsObserver.disconnect();
    };
  }, []);

  // Skill Nodes Data for Hero Section
  const skillNodes = [
    { name: 'React', icon: Code, color: 'cyan' },
    { name: 'Java', icon: Server, color: 'orange' },
    { name: 'Spring Boot', icon: Database, color: 'green' },
    { name: 'CNN', icon: Cpu, color: 'purple' },
    { name: 'MySQL', icon: Database, color: 'blue' },
    { name: 'Tailwind CSS', icon: Layout, color: 'teal' },
    { name: 'Node.js', icon: Zap, color: 'emerald' },
    { name: 'Git', icon: GitBranch, color: 'rose' },
  ];

  // Structured Project Data for Filtering
  const projectsData = [
    {
      id: 1,
      category: 'dev',
      title: "Symphoni Music Institute",
      description: "A modern web platform designed for a music institute to present classes, programs, and institute information. Built with a focus on clean UI, readability, and responsiveness.",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2070&auto=format&fit=crop",
      tags: ["React", "Node.js", "Tailwind"],
      featured: true,
      color: "cyan",
      details: {
        overview: "Symphoni Music Institute needed a modern digital presence to effectively present their music programs and class details to potential students. This project focused on building a clean, responsive website that serves as the institute's primary digital touchpoint.",
        problem: "The institute lacked a centralized digital platform, making it difficult for potential students and parents to find accurate information regarding curriculum, class schedules, and institute details.",
        solution: "We designed and developed a responsive website that organizes information into an intuitive layout, serving as a digital brochure that enhances the institute's professional image and credibility.",
        features: [
          "Responsive Landing Page",
          "Comprehensive Classes & Programs Section",
          "Institute Information & About Us",
          "Mobile-Optimized Design",
          "Clean & Modern UI"
        ],
        techStack: {
           frontend: "React / Tailwind CSS",
           backend: "Node.js (Server-side rendering)",
           database: "N/A (Static Content)"
        },
        role: "I led the frontend design and implementation, translating UI/UX concepts into code. My focus was on ensuring the site was fully responsive across devices and maintaining a consistent visual identity.",
        outcome: "The project established a credible online identity for Symphoni Music Institute, significantly improving information accessibility for students and streamlining the inquiry process.",
        gallery: [
          { url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=2070", caption: "Main landing page highlighting the institute identity" },
          { url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=2070", caption: "List of music programs and class details" },
          { url: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=2070", caption: "Responsive design optimized for mobile devices" }
        ]
      }
    },
    {
      id: 2,
      category: 'dev',
      title: "Maths Tuition Management",
      description: "A web-based system for managing student registration, payments, and attendance using QR codes. Replaces manual registers with a digital solution.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
      tags: ["Full Stack", "UX Design"],
      featured: false,
      color: "purple",
      details: {
        overview: "This web-based management system digitizes the administrative operations of a maths tuition class. It handles the entire student lifecycle from registration to attendance tracking via QR codes and monthly fee management.",
        problem: "Managing student records, attendance, and fee payments using manual paper-based registers was time-consuming, prone to human error, and lacked real-time tracking capabilities.",
        solution: "A centralized web application that automates attendance using unique student QR codes and provides a dashboard for tracking payments and student analytics, eliminating manual paperwork.",
        features: [
          "Digital Student Registration",
          "QR Code Generation & Scanning for Attendance",
          "Fee Payment Tracking",
          "Real-time Attendance Analytics",
          "Payment Status Dashboards"
        ],
        techStack: {
           frontend: "React",
           backend: "Node.js / Express",
           database: "MySQL"
        },
        role: "I worked as a Full Stack developer, implementing the core logic for QR code generation and scanning integration. I also designed the database schema for handling student records and payment history.",
        outcome: "The system successfully replaced manual registers, streamlining the check-in process during classes and provided instant financial oversight for the tuition management.",
        gallery: [
          { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070", caption: "Registering students into the system" },
          { url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070", caption: "Tracking class fees and payment status" },
          { url: "https://images.unsplash.com/photo-1595079676339-1534801fafde?auto=format&fit=crop&q=80&w=2070", caption: "Unique QR codes generated for student entry" },
          { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070", caption: "Attendance and payment analysis overview" }
        ]
      }
    },
    {
      id: 3,
      category: 'research',
      title: "Plant Leaf Disease Detection",
      description: "A research-focused application utilizing CNNs to detect diseases in Rice and Chilli crops. Designed to validate deep learning models on real-world agricultural data.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
      tags: ["Research Tool", "Data Mgmt"],
      featured: false,
      color: "teal",
      details: {
        overview: "This research project focuses on applying deep learning techniques to agriculture. The application uses Convolutional Neural Networks (CNN) to detect and classify diseases in Rice and Chilli leaves based on real-world field images.",
        problem: "Manual identification of plant diseases is labor-intensive, requires expert knowledge, and is difficult to scale, leading to delayed treatments and crop loss.",
        solution: "An AI-powered system that automates disease detection. By training CNNs on a curated dataset of real-world leaf images, the system can classify healthy vs. diseased leaves with high accuracy.",
        features: [
          "Multi-crop Disease Detection (Rice & Chilli)",
          "CNN Model Integration",
          "Real-world Dataset Training",
          "Healthy vs. Diseased Classification",
          "Scalable Architecture for Future Crops"
        ],
        techStack: {
           frontend: "Python / Streamlit (Prototype UI)",
           backend: "TensorFlow / Keras",
           database: "Local Image Dataset"
        },
        role: "My primary role was in the research and experimental phase. I curated the dataset, performed image preprocessing, and trained the CNN models. I also developed the evaluation pipeline to test model accuracy.",
        outcome: "The project validated the effectiveness of CNNs on noisy, real-world agricultural data and established a scalable framework that can be extended to other tree species and crop types.",
        gallery: [
          { url: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=2072", caption: "Sample real-world leaf images used for training" },
          { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070", caption: "Preprocessing steps applied to leaf images" },
          { url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2070", caption: "CNN-based disease detection pipeline" },
          { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070", caption: "Model predictions for leaf disease classification" }
        ]
      }
    },
    {
      id: 4,
      category: 'dev',
      title: "Health Monitoring System",
      description: "A centralized digital platform designed to replace inconsistency in manual tracking with structured health data analysis. Built using React, Spring Boot, and MySQL.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      tags: ["Java Spring Boot", "React", "MySQL"],
      featured: false,
      color: "blue",
      details: {
        overview: "This project is a group-developed Health Monitoring System designed to collect, monitor, and analyze basic health-related data. The system focuses on providing a structured and reliable way to track health information using a software-based solution, replacing outdated manual methods.",
        problem: "Manual health data tracking is often inconsistent, difficult to manage, and prone to errors, especially when handled across multiple individuals or paper-based records.",
        solution: "The system provides a centralized digital platform where health data can be recorded, stored, and monitored efficiently. It improves data organization, accessibility, and consistency for both patients and administrators.",
        features: [
          "Health data recording and management",
          "Basic health parameter monitoring",
          "Structured data storage",
          "User-friendly interface",
          "Secure and reliable data handling"
        ],
        techStack: {
           frontend: "React / Web-based UI",
           backend: "Java Spring Boot / Node.js",
           database: "MySQL"
        },
        role: "I contributed to feature development and implementation, focusing on both backend logic and frontend integration. My role involved collaborating closely with team members to ensure seamless system connectivity.",
        outcome: "The project resulted in a functional health monitoring system that demonstrates effective teamwork, sound system design skills, and the ability to apply technical concepts to real-world application development.",
        gallery: [
          { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070", caption: "System Dashboard Overview" },
          { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070", caption: "Patient Data Entry Interface" },
          { url: "https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&q=80&w=2070", caption: "Real-time Health Analytics" }
        ]
      }
    }
  ];

  const filteredProjects = projectsData.filter(project => filter === 'all' || project.category === filter);

  // Floating Particle Generator
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    icon: [Code, Terminal, Database, Cpu, Globe, Zap, Layers, Server][i % 8],
    delay: i * 0.8,
    duration: 10 + Math.random() * 10,
    top: Math.random() * 80 + 10,
    left: Math.random() * 80 + 10,
  }));

  return (
  <div className="animate-fade-in relative">
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-slate-950">
        
        {/* Advanced Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_60%)] animate-pulse-slow"></div>
          
          {/* Floating Tech Particles */}
          {particles.map((p) => (
             <div 
               key={p.id}
               className="absolute text-slate-800 opacity-20 animate-float-slow"
               style={{
                 top: `${p.top}%`,
                 left: `${p.left}%`,
                 animationDelay: `${p.delay}s`,
                 animationDuration: `${p.duration}s`
               }}
             >
               <p.icon size={32} />
             </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-up relative">
             {/* Decorative Background Blur behind text */}
             <div className="absolute -left-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-400 text-sm font-mono shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              FULL-STACK & RESEARCH
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
              I am <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-gradient-x">
                Anupa Supul
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-xl border-l-2 border-slate-800 pl-6 relative">
              <span className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-500 to-transparent"></span>
              A <strong>Computer Science Undergraduate</strong> at the University of Ruhuna. 
              I am a <span className="text-slate-200 font-semibold">full-stack–leaning developer</span> focused on building real-world systems, not just academic demos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-4 text-slate-500">
                <Code size={28} className="animate-float-slow" />
                <Database size={28} className="animate-float-slow animation-delay-2000" />
                <Server size={28} className="animate-float-slow animation-delay-4000" />
                <GitBranch size={28} className="animate-float-slow" />
              </div>
            </div>
          </div>
          
          {/* Visual Element: Profile Photo Container */}
          <div className="relative flex items-center justify-center h-96 lg:h-[600px] w-full lg:w-auto perspective-1000">
             {/* Orbiting Skill Nodes Wrapper */}
             <div className="absolute inset-0 flex items-center justify-center animate-orbit-parent">
               {skillNodes.map((skill, index) => {
                 // Calculate responsive radius based on smaller of width/height
                 const radius = 'min(15rem, 40vw)'; // Using min for responsive radius
                 const angle = index * (2 * Math.PI / skillNodes.length);
                 return (
                   <div
                     key={skill.name}
                     className={`absolute w-10 h-10 rounded-full border border-${skill.color}-500/50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center text-${skill.color}-400 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer group animate-orbit-float`}
                     style={{
                       top: `calc(50% + ${radius} * ${Math.sin(angle)} - 20px)`,
                       left: `calc(50% + ${radius} * ${Math.cos(angle)} - 20px)`,
                       animationDelay: `${index * 0.3}s`,
                       animationDuration: `${7 + (index * 0.5)}s`,
                       animationDirection: index % 2 === 0 ? 'normal' : 'reverse',
                     }}
                   >
                     <skill.icon size={18} />
                     {/* Skill Name on Hover */}
                     <div className={`absolute -top-8 px-2 py-1 bg-slate-800/80 backdrop-blur-sm text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-${skill.color}-300`}>
                       {skill.name}
                     </div>
                   </div>
                 );
               })}
             </div>

             <div className="relative w-64 h-80 sm:w-80 sm:h-96 group transition-all duration-500 hover:rotate-y-12 preserve-3d">
                
                {/* Rotating Rings */}
                <div className="absolute -inset-10 border border-dashed border-cyan-500/20 rounded-full animate-spin-slow pointer-events-none"></div>
                <div className="absolute -inset-20 border border-dotted border-purple-500/20 rounded-full animate-spin-reverse-slow pointer-events-none"></div>
                
                {/* Glow Behind */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                {/* Main Frame */}
                <div className="absolute inset-0 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* Placeholder for Profile Photo */}
                    <img 
                        src="/profile.jpeg" 
                        alt="Anupa Supul" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Scanning Line Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-scan pointer-events-none"></div>
                    
                    {/* Tech Badge Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/90 backdrop-blur-xl rounded-xl border border-white/10 flex items-center gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400 relative overflow-hidden">
                           <div className="absolute inset-0 bg-cyan-400/20 animate-pulse"></div>
                           <Code size={18} className="relative z-10"/>
                        </div>
                        <div>
                           <div className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest">System_ID</div>
                           <div className="text-sm font-bold text-white">Anupa.Dev</div>
                        </div>
                        <div className="ml-auto flex gap-1">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                           <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                        </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
                </div>
             </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500 cursor-pointer hover:text-cyan-400 transition-colors" onClick={() => scrollTo('about')}>
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ABOUT SECTION (REDESIGNED) */}
      <section id="about" ref={aboutSectionRef} className="py-32 bg-slate-950 relative overflow-hidden">
        
        {/* Enhanced Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] animate-pulse"></div>
        
        {/* Animated Connecting Lines */}
        <div className={`absolute top-1/2 left-1/2 w-px h-[500px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent transition-all duration-1000 ${aboutSectionInView ? 'opacity-30' : 'opacity-0'}`} style={{ transform: 'translateY(-50%)', transitionDelay: '500ms' }}></div>
        <div className={`absolute top-1/2 left-1/2 h-px w-[80%] max-w-4xl bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-all duration-1000 ${aboutSectionInView ? 'opacity-30' : 'opacity-0'}`} style={{ transform: 'translate(-50%, -50%)', transitionDelay: '500ms' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center mb-24">
            <h2 className={`text-5xl md:text-6xl font-bold text-white leading-tight transition-all duration-700 ${aboutSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Syntax</span>
            </h2>
            <p className={`text-lg text-slate-400 mt-4 max-w-2xl mx-auto transition-all duration-700 delay-200 ${aboutSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              I operate at the intersection of engineering and inquiry, building robust systems informed by a research-driven mindset.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* LEFT: BUILDER IDENTITY */}
            <div 
              className={`relative group transition-all duration-700 ${aboutSectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} 
              style={{ transitionDelay: '400ms' }}
            >
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 h-full">
                <div className="flex items-start gap-6">
                    <div className="p-3 bg-slate-800 border border-white/10 rounded-lg text-cyan-400">
                        <Terminal size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">The Builder</h3>
                        <p className="text-slate-400 text-base leading-relaxed">
                            I build and deploy complete systems with a focus on clean architecture and user-centric design. My toolkit includes Java Spring Boot and Node.js for the backend, and React with Tailwind for creating responsive, intuitive frontends.
                        </p>
                    </div>
                </div>
              </div>
            </div>

            {/* RIGHT: NARRATIVE 1 */}
            <div 
              className={`text-lg text-slate-300 leading-relaxed font-light transition-all duration-700 ${aboutSectionInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '600ms' }}
            >
              I'm a Computer Science undergraduate from Sri Lanka, creating systems that are not only well-engineered but also informed by analytical rigor. My work bridges the gap between full-stack development and academic research.
            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">

            {/* LEFT: NARRATIVE 2 */}
            <div 
              className={`text-lg text-slate-300 leading-relaxed font-light lg:text-right transition-all duration-700 ${aboutSectionInView ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '800ms' }}
            >
              I believe the most durable solutions come from a deep understanding of the problem. That's why I apply a research-oriented mindset to software, and a systems-building approach to research.
            </div>
            
            {/* RIGHT: RESEARCHER IDENTITY */}
            <div 
              className={`relative group transition-all duration-700 ${aboutSectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} 
              style={{ transitionDelay: '1000ms' }}
            >
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500 to-rose-500 rounded-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg"></div>
              <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-8 h-full">
                <div className="flex items-start gap-6">
                    <div className="p-3 bg-slate-800 border border-white/10 rounded-lg text-purple-400">
                        <Microscope size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-3">The Researcher</h3>
                        <p className="text-slate-400 text-base leading-relaxed">
                            My current research involves using Convolutional Neural Networks (CNNs) to detect and classify leaf diseases in rice and chilli plants—a tangible application of machine learning to solve real-world problems in agriculture.
                        </p>
                    </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* REIMAGINED RESEARCH TEASER (HOME PAGE) */}
      <section id="research" className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-950 to-black">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex items-center justify-between mb-16">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">The Research Lab</h2>
                    <p className="text-slate-400 max-w-lg">
                        My core research focuses on plant leaf disease detection using deep learning (CNN). 
                        Currently validating models on <strong>Rice and Chilli</strong> crops, with future extensions to other species.
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm border border-cyan-500/20 px-4 py-2 rounded-full bg-cyan-900/10 animate-pulse">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        LAB STATUS: ACTIVE
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 h-auto lg:h-[500px]">
                {/* Main Interactive Card */}
                <div
                    onClick={navigateToResearch}
                    className="lg:col-span-2 group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer h-auto min-h-[300px] lg:h-[500px]"
                >
                    <img
                        src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=2072"
                        alt="Rice Plant Research"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-0"></div>

                    {/* Content */}
                    <div className="relative inset-0 p-10 flex flex-col justify-between z-10 h-full">
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                                <Microscope size={32} className="text-cyan-400" />
                            </div>
                            <ArrowRight size={32} className="text-white/50 -rotate-45 group-hover:rotate-0 group-hover:text-cyan-400 transition-all duration-300" />
                        </div>

                        <div className="mt-auto">
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                Explore the <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Findings</span>
                            </h3>
                            <p className="text-slate-300 max-w-md group-hover:text-slate-200 transition-colors">
                                Access datasets, CNN model details, and experimental results for crop disease classification.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secondary Stats Column */}
                <div className="flex flex-col gap-6 h-full">
                    {/* Stat Card 1 */}
                    <div className="flex-1 relative bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-end hover:bg-slate-800/50 transition-colors overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop"
                            alt="Abstract AI"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                        />
                        <div className="relative z-10">
                            <div className="text-4xl font-bold text-white mb-2 font-mono">02</div>
                            <div className="text-sm text-slate-300 font-mono uppercase tracking-wider">Crops Studied (Rice & Chilli)</div>
                        </div>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="flex-1 relative bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-end hover:bg-slate-800/50 transition-colors overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070"
                            alt="Data visualization"
                            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                        />
                        <div className="relative z-10">
                            <div className="text-4xl font-bold text-white mb-2 font-mono">100%</div>
                            <div className="text-sm text-slate-300 font-mono uppercase tracking-wider">Real-World Data</div>
                        </div>
                    </div>

                    {/* Latest Update */}
                    <div className="flex-1 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-cyan-400 font-bold uppercase mb-1">Model Status</div>
                            <div className="text-white font-medium text-sm">Training Active</div>
                        </div>
                        <Activity size={20} className="text-cyan-400" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SKILLS SECTION (REDESIGNED) */}
      <section id="skills" ref={skillsSectionRef} className="py-32 relative overflow-hidden bg-gradient-to-b from-black to-slate-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.04),transparent_40%)]"></div>
        
        {/* Animated Connecting Lines */}
        <div className={`absolute left-1/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent transition-opacity duration-1000 delay-500 ${skillsSectionInView ? 'opacity-20' : 'opacity-0'}`}></div>
        <div className={`absolute left-2/3 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent transition-opacity duration-1000 delay-500 ${skillsSectionInView ? 'opacity-20' : 'opacity-0'}`}></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <h2 className={`text-5xl md:text-6xl font-bold text-white transition-all duration-700 ${skillsSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Technical System
                </h2>
                <p className={`text-lg text-slate-400 mt-4 max-w-3xl mx-auto transition-all duration-700 delay-200 ${skillsSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    A modular skill set designed for building and scaling complex systems, from backend architecture to frontend interactions and data management.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
                {/* Module 1: Backend */}
                <div 
                  className={`space-y-8 transition-all duration-700 ease-out ${skillsSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                  style={{ transitionDelay: '200ms' }}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 border-2 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                          <Server size={28} />
                        </div>
                        <h3 className="text-3xl font-bold text-white">Backend</h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-lg font-light">
                        Clean architecture and robust APIs built for performance and scalability.
                    </p>
                    <div className="space-y-4 pt-4 border-t-2 border-slate-800">
                        {[
                          { name: 'Java', icon: Code }, { name: 'Spring Boot', icon: Server },
                          { name: 'Node.js', icon: Zap }, { name: 'REST APIs', icon: Globe }
                        ].map((skill, i) => (
                           <div key={i} className={`group relative flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-800/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] will-change-transform ${skillsSectionInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${500 + i * 100}ms` }}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400"><skill.icon size={20} /></div>
                            <span className="font-mono text-base text-slate-300">{skill.name}</span>
                            <div className="absolute -left-4 top-1/2 h-px w-4 bg-slate-700 transition-all group-hover:w-8 group-hover:bg-cyan-500"></div>
                           </div>
                        ))}
                    </div>
                </div>

                {/* Module 2: Frontend */}
                <div 
                  className={`space-y-8 transition-all duration-700 ease-out ${skillsSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                  style={{ transitionDelay: '400ms' }}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500/10 text-teal-400 border-2 border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.3)]"><Layout size={28} /></div>
                        <h3 className="text-3xl font-bold text-white">Frontend</h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-lg font-light">
                        Intuitive interfaces that translate complex data into user-friendly experiences.
                    </p>
                    <div className="space-y-4 pt-4 border-t-2 border-slate-800">
                        {[
                          { name: 'React', icon: Code }, { name: 'Tailwind CSS', icon: Layout },
                          { name: 'JavaScript', icon: Code }, { name: 'Responsive UI', icon: Layout }
                        ].map((skill, i) => (
                           <div key={i} className={`group relative flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-800/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] will-change-transform ${skillsSectionInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${700 + i * 100}ms` }}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400"><skill.icon size={20} /></div>
                            <span className="font-mono text-base text-slate-300">{skill.name}</span>
                            <div className="absolute left-1/2 -top-4 h-4 w-px bg-slate-700 transition-all group-hover:h-8 group-hover:bg-cyan-500"></div>
                           </div>
                        ))}
                    </div>
                </div>

                {/* Module 3: Data & Tools */}
                <div 
                  className={`space-y-8 transition-all duration-700 ease-out ${skillsSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} 
                  style={{ transitionDelay: '600ms' }}
                >
                     <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border-2 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.3)]"><Database size={28} /></div>
                        <h3 className="text-3xl font-bold text-white">Data & Tools</h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-lg font-light">
                        Ensuring data integrity, version control, and efficient development workflows.
                    </p>
                    <div className="space-y-4 pt-4 border-t-2 border-slate-800">
                        {[
                          { name: 'MySQL', icon: Database }, { name: 'MongoDB', icon: Database },
                          { name: 'Git', icon: GitBranch }, { name: 'IntelliJ', icon: Terminal }, { name: 'VS Code', icon: Terminal }
                        ].map((skill, i) => (
                           <div key={i} className={`group relative flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-800/50 hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] will-change-transform ${skillsSectionInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${900 + i * 100}ms` }}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400"><skill.icon size={20} /></div>
                            <span className="font-mono text-base text-slate-300">{skill.name}</span>
                            <div className="absolute -right-4 top-1/2 h-px w-4 bg-slate-700 transition-all group-hover:w-8 group-hover:bg-cyan-500"></div>
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* PROJECTS SECTION (UPDATED with Filtering) */}
      <section id="projects" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Engineering Projects</h2>
            <p className="text-slate-400 text-lg mb-8">Translating requirements into reliable software.</p>
            
            {/* Filter Buttons */}
            <div className="inline-flex bg-slate-900/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-sm">
              {[
                { id: 'all', label: 'All Systems' },
                { id: 'dev', label: 'Development' },
                { id: 'research', label: 'Research Tools' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === tab.id 
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/25' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 min-h-[400px]">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className={`group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-${project.color}-500/50 transition-all hover:shadow-[0_0_40px_rgba(var(--${project.color}-rgb),0.15)] flex flex-col h-full animate-fade-in cursor-pointer`}
              >
                <div className="h-48 md:h-64 relative overflow-hidden bg-slate-800">
                    <div className="absolute inset-0 bg-slate-900/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cyan-400 border border-cyan-500/30">
                        Featured
                      </div>
                    )}
                </div>
                
                <div className={`p-8 flex flex-col flex-grow ${project.category === 'research' ? 'border-t-2 border-teal-500' : ''}`}>
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className={`inline-flex items-center text-sm font-bold text-${project.color}-400 hover:text-${project.color}-300 transition-colors w-max`}>
                    View Source Code <ExternalLink size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
             <div className="text-center py-20 text-slate-500 italic">
               No projects found in this category.
             </div>
          )}
        </div>
      </section>
  </div>
)};

// 2. Next-Level Research View
const ResearchView = () => {
  const publicationsRef = useRef(null);
  const [publicationsInView, setPublicationsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPublicationsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    let currentRef = publicationsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const publications = [
    {
      title: 'Deep CNN for Plant Disease Detection in Rice Crops',
      description: 'A novel approach to identifying Brown Spot and Leaf Blast diseases using transfer learning.',
      venue: 'IEEE International Conference on Image Processing (ICIP)',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1581092921462-698338d35393?q=80&w=2070&auto=format&fit=crop',
      scholarLink: 'https://scholar.google.com/scholar?q=deep+cnn+plant+disease',
    },
    {
      title: 'Scalable Framework for Multi-Crop Disease Classification',
      description: 'An extendable architecture for applying CNN-based disease detection to new crop types.',
      venue: 'Journal of Agricultural AI',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
      scholarLink: 'https://scholar.google.com/scholar?q=scalable+framework+crop+disease',
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-300 font-sans animate-fade-in relative">
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_70%)]"></div>
          <div className="absolute w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[60vh] flex flex-col justify-center px-6">
          <div className="max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-4 mb-6">
                  <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="font-mono text-red-400 text-sm tracking-widest uppercase">Live Environment</span>
              </div>
              
              <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none mix-blend-screen">
                  RESEARCH <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">LAB_01</span>
              </h1>
              
              <div className="grid md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                  <div className="space-y-2">
                      <div className="text-xs text-slate-500 font-mono uppercase">Primary Focus</div>
                      <div className="text-xl text-white font-medium">Deep Learning & <br/> Plant Pathology</div>
                  </div>
                  <div className="space-y-2">
                      <div className="text-xs text-slate-500 font-mono uppercase">Current Status</div>
                      <div className="text-xl text-cyan-400 font-mono">
                          MODEL_TRAINING <br/>
                          <span className="text-xs text-slate-500">Validation Acc: 94%+</span>
                      </div>
                  </div>
                  <div className="space-y-2">
                      <div className="text-xs text-slate-500 font-mono uppercase">Affiliation</div>
                      <div className="text-xl text-white font-medium">University of Ruhuna <br/> Department Of Computer Science</div>
                  </div>
              </div>
          </div>
      </section>

      {/* Methodology Pipeline (REDESIGNED) */}
      <section className="py-32 bg-slate-900/50 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                    <GitBranch className="text-cyan-500" /> Research Pipeline
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">A systematic, four-stage process from data acquisition to model validation.</p>
              </div>
              
              <div className="relative">
                  {/* The static track and animated connector line */}
                  <div className="absolute top-10 left-0 w-full h-0.5 bg-slate-700"></div>
                  <div className="absolute top-10 left-0 w-full h-0.5">
                      <div className="w-full h-full bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0 animate-flow-beam"></div>
                  </div>

                  <div className="relative flex flex-wrap justify-center gap-y-12 sm:justify-between">
                      {[
                          { title: "Data Collection", desc: "Gathering real-world leaf images of Rice & Chilli crops in diverse field conditions.", icon: <Beaker size={28}/> },
                          { title: "Preprocessing", desc: "Data cleaning, augmentation, and labeling to ensure robust model training.", icon: <Code size={28}/> },
                          { title: "Model Design", desc: "Training Convolutional Neural Networks (CNNs) to identify disease patterns.", icon: <Play size={28}/> },
                          { title: "Evaluation", desc: "Validating detection accuracy and refining the architecture for real-world use.", icon: <Activity size={28}/> }
                      ].map((item, idx) => (
                          <div key={idx} className="relative group flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/4 max-w-[280px]">
                              <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                                  {/* Static outer ring */}
                                  <div className="absolute inset-0 rounded-full bg-slate-800 border-2 border-slate-700"></div>
                                  {/* Animated inner rings/glow on hover */}
                                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow transition-opacity duration-300"></div>
                                  <div className="absolute inset-2 rounded-full bg-slate-900 group-hover:bg-cyan-900/40 transition-colors duration-300"></div>
                                  <div className="relative z-10 text-cyan-400 group-hover:text-white transition-colors duration-300">
                                      {item.icon}
                                  </div>
                              </div>
                              <div className="text-center">
                                <div className="font-mono text-cyan-400 text-sm">STEP {`0${idx + 1}`}</div>
                                <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
                                <p className="text-slate-400 text-base mt-3 h-0 opacity-0 group-hover:h-24 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                  {item.desc}
                                </p>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* Image Swipe Component */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <ResearchCarousel items={[
            {
              image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=2072',
              title: 'Rice Leaf Analysis',
              description: 'High-resolution imagery of rice crops used for training disease detection models.'
            },
            {
              image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
              title: 'Chilli Crop Inspection',
              description: 'Field data collection for chilli plants, capturing various stages of growth and health.'
            },
            {
              image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2070',
              title: 'CNN Model Architecture',
              description: 'Visualizing the convolutional neural network pipeline for image processing and classification.'
            }
          ]} />
        </div>
      </section>

      {/* NEW PUBLICATIONS SECTION */}
      <section ref={publicationsRef} className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Publications & Citations</h2>
            <p className="text-slate-400 max-w-2xl text-lg">
              A selection of peer-reviewed papers and articles. For a complete list, please view my Google Scholar profile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {publications.map((pub, i) => (
              <div
                key={i}
                className={`group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-500 ease-out ${publicationsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img src={pub.image} alt="Abstract representation" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
                </div>
                <div className="relative p-8 h-full flex flex-col">
                  <div className="flex-grow">
                    <p className="text-sm font-mono text-cyan-400 mb-2">{pub.year} / {pub.venue}</p>
                    <h3 className="text-2xl font-bold text-white mb-3 relative">
                      {pub.title}
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full"></span>
                    </h3>
                    <p className="text-slate-400 leading-relaxed">{pub.description}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-800/50">
                    <a href={pub.scholarLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors group/link">
                      Read on Google Scholar
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="https://scholar.google.com/citations?user=your-scholar-id" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-slate-700 rounded-full text-lg font-bold text-white transition-all duration-300 overflow-hidden hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <span className="absolute inset-0 w-0 bg-cyan-500/20 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">View Full Scholar Profile</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};


// --- Main Component ---

const App = () => {
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'research'
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Only track sections in main view
      if (currentView === 'main') {
        const sections = ['home', 'about', 'skills', 'research', 'projects', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top >= -200 && rect.top <= 400;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  const handleNavigation = (id) => {
    setMobileMenuOpen(false);
    
    // If navigating to Research page
    if (id === 'research-page') {
      setCurrentView('research');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('research');
      return;
    }

    // If navigating to standard sections
    if (currentView === 'research') {
      setCurrentView('main');
      // Wait for render then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  const NavLink = ({ id, label, isAction = false }) => (
    <button
      onClick={() => handleNavigation(id)}
      className={`text-sm font-medium transition-all duration-300 relative px-2 ${
        isAction 
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded-full px-4 py-1 hover:bg-cyan-500 hover:text-black' 
          : activeSection === id || (id === 'research-page' && currentView === 'research')
            ? 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
            : 'text-slate-400 hover:text-cyan-300'
      }`}
    >
      {label}
      {!isAction && (activeSection === id || (id === 'research-page' && currentView === 'research')) && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] rounded-full"></span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
      {/* Global Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-pattern {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out 3s infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        /* NEW ANIMATIONS FOR NEXT-LEVEL HERO */
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
          background: linear-gradient(to bottom, transparent, rgba(6,182,212,0.5), transparent);
        }
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin 20s linear infinite reverse;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient-x {
           0% { background-position: 0% 50%; }
           50% { background-position: 100% 50%; }
           100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
           background-size: 200% 200%;
           animation: gradient-x 5s ease infinite;
           will-change: background-position;
        }
        @keyframes pulse-slow {
           0%, 100% { opacity: 0.3; }
           50% { opacity: 0.6; }
        }
        .animate-pulse-slow {
           animation: pulse-slow 6s ease-in-out infinite;
        }
        .perspective-1000 {
           perspective: 1000px;
        }
        .preserve-3d {
           transform-style: preserve-3d;
        }
        .rotate-y-12 {
           transform: rotateY(12deg);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes orbit-parent {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes orbit-float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(-8px, 8px); }
            100% { transform: translate(0, 0); }
        }
        @keyframes signal-scan {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left {
            animation: slide-in-left 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
            animation: slide-in-right 0.8s ease-out forwards;
        }
        @keyframes flow-beam {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-flow-beam {
          animation: flow-beam 4s ease-in-out infinite;
        }
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg py-4 border-b border-white/5' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer z-50 group" 
            onClick={() => handleNavigation('home')}
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-cyan-500 transition-colors">
              {/* Navbar Profile Photo Placeholder */}
              <img 
                src="/profile.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xl font-bold text-slate-100 tracking-tight">
              Anupa Supul
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink id="home" label="Home" />
            <NavLink id="about" label="About" />
            <NavLink id="skills" label="Tech Stack" />
            <NavLink id="projects" label="Projects" />
            <NavLink id="research-page" label="Research Lab" isAction={true} />
            <NavLink id="contact" label="Contact" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-300 hover:text-white"
            >
                <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-8 animate-fade-in md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
                >
                    <X size={28} />
                </button>
                <button onClick={() => handleNavigation('home')} className="text-3xl font-bold text-slate-200 hover:text-cyan-400 transition-colors">Home</button>
                <button onClick={() => handleNavigation('about')} className="text-3xl font-bold text-slate-200 hover:text-cyan-400 transition-colors">About</button>
                <button onClick={() => handleNavigation('skills')} className="text-3xl font-bold text-slate-200 hover:text-cyan-400 transition-colors">Skills</button>
                <button onClick={() => handleNavigation('projects')} className="text-3xl font-bold text-slate-200 hover:text-cyan-400 transition-colors">Projects</button>
                <button onClick={() => handleNavigation('research-page')} className="text-3xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">Research Lab</button>
                <button onClick={() => handleNavigation('contact')} className="text-3xl font-bold text-slate-200 hover:text-cyan-400 transition-colors">Contact</button>
            </div>
        )}
      </nav>

      {/* VIEW SWITCHER */}
      {currentView === 'main' ? (
        <MainView scrollTo={handleNavigation} navigateToResearch={() => handleNavigation('research-page')} />
      ) : (
        <ResearchView />
      )}

      {/* FOOTER (Shared across views) */}
      <footer id="contact" className="bg-gradient-to-b from-slate-900 to-black pt-32 pb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none opacity-[0.03] pointer-events-none select-none">
          <span className="text-[20vw] font-bold text-white whitespace-nowrap animate-float-slow">CONNECT</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 mb-24">
             <div className="space-y-8">
                 <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                   Ready to <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Innovate?</span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-md font-light">
                   I'm available for research collaborations, full-stack opportunities, or just a chat about systems architecture.
                 </p>
                 
                 <a href="mailto:supulanupa@gmail.com" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-colors text-lg group">
                   Start a Conversation
                   <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                 </a>
             </div>

             <div className="flex flex-col justify-center gap-6">
                 <a href="https://www.linkedin.com/in/anupa-supul-a511822ab/" className="group flex items-center justify-between p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-cyan-500/50 hover:bg-slate-900 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                        <Linkedin size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">LinkedIn</div>
                        <div className="text-sm text-slate-500">Professional Network</div>
                      </div>
                    </div>
                    <ExternalLink className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                 </a>

                 <a href="https://github.com/Anupa200212" className="group flex items-center justify-between p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-purple-500/50 hover:bg-slate-900 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                        <Github size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-white">GitHub</div>
                        <div className="text-sm text-slate-500">Code Repositories</div>
                      </div>
                    </div>
                    <ExternalLink className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                 </a>
             </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-slate-600">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span>System.status: <span className="text-green-500">Online</span></span>
            </div>
            <div>
               © {new Date().getFullYear()} Anupa Supul. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;