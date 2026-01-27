import React, { useState, useEffect, useRef } from 'react';
import {
    Code,
    Database,
    Server,
    Layout,
    GitBranch,
    Terminal,
    Microscope,
    Globe,
    Zap,
    Layers,
    Cpu,
    ChevronDown,
    ArrowRight,
    ExternalLink,
    Linkedin,
    Activity
} from 'lucide-react';
import ProjectModal from './ProjectModal';

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
                                        <Code size={18} className="relative z-10" />
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
                                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${filter === tab.id
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
    )
};

export default MainView;
