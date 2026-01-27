import React, { useState, useEffect, useRef } from 'react';
import { Microscope, ChevronLeft, ChevronRight } from 'lucide-react';

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
                <button onClick={prevSlide} className="p-3 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 text-white rounded-full transition-all backdrop-blur-sm"><ChevronLeft size={20} /></button>
                <button onClick={nextSlide} className="p-3 bg-white/5 hover:bg-cyan-500 hover:text-black border border-white/10 text-white rounded-full transition-all backdrop-blur-sm"><ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

export default ResearchCarousel;
