import React, { useState, useEffect } from 'react';
import { X, Activity, Shield, CheckCircle2, Cpu, Layers, Github } from 'lucide-react';

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
                                            <Shield size={16} /> The Problem
                                        </h4>
                                        <p className="text-slate-400 text-sm leading-relaxed">{details.problem}</p>
                                    </div>
                                    <div className="bg-green-500/5 border border-green-500/10 p-5 rounded-xl">
                                        <h4 className="text-green-400 font-bold mb-2 text-sm uppercase flex items-center gap-2">
                                            <CheckCircle2 size={16} /> The Solution
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
                                        <Cpu size={16} className="text-cyan-400" /> Tech Stack
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
                                        <Layers size={16} className="text-purple-400" /> My Contributions
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

export default ProjectModal;
