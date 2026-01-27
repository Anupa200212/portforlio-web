import React, { useState, useEffect, useRef } from 'react';
import ResearchCarousel from './ResearchCarousel';
import { Microscope, Activity, GitBranch, Beaker, Code, Play, ExternalLink, ArrowRight } from 'lucide-react';

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
                        RESEARCH <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">LAB_01</span>
                    </h1>

                    <div className="grid md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
                        <div className="space-y-2">
                            <div className="text-xs text-slate-500 font-mono uppercase">Primary Focus</div>
                            <div className="text-xl text-white font-medium">Deep Learning & <br /> Plant Pathology</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs text-slate-500 font-mono uppercase">Current Status</div>
                            <div className="text-xl text-cyan-400 font-mono">
                                MODEL_TRAINING <br />
                                <span className="text-xs text-slate-500">Validation Acc: 94%+</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-xs text-slate-500 font-mono uppercase">Affiliation</div>
                            <div className="text-xl text-white font-medium">University of Ruhuna <br /> Department Of Computer Science</div>
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
                                { title: "Data Collection", desc: "Gathering real-world leaf images of Rice & Chilli crops in diverse field conditions.", icon: <Beaker size={28} /> },
                                { title: "Preprocessing", desc: "Data cleaning, augmentation, and labeling to ensure robust model training.", icon: <Code size={28} /> },
                                { title: "Model Design", desc: "Training Convolutional Neural Networks (CNNs) to identify disease patterns.", icon: <Play size={28} /> },
                                { title: "Evaluation", desc: "Validating detection accuracy and refining the architecture for real-world use.", icon: <Activity size={28} /> }
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

export default ResearchView;
