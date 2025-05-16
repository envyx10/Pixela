'use client';

import { DiscoverGrid } from './DiscoverGrid';
import { useDiscoverStore } from '../store';
import { DiscoverSelector } from './DiscoverSelector';

export const DiscoverContent = () => {
    const activeType = useDiscoverStore((state) => state.activeType);
    const setActiveType = useDiscoverStore((state) => state.setActiveType);

    return (
        <div id="discover" className="relative w-full min-h-screen bg-pixela-dark flex flex-col overflow-hidden">
            {/* Gradiente principal - con overflow controlado */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
                <div className="absolute top-1/2 left-[60%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pixela-accent/20 blur-[150px]" />
                <div className="absolute top-1/2 left-[70%] -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pixela-accent/30 blur-[100px]" />
            </div>
            
            <div className="flex-grow flex flex-col justify-center relative z-10">
                <div className="w-[80%] mx-auto flex items-center gap-8">
                    {/* Lado izquierdo - 40% */}
                    <div className="w-[50%] pr-8">
                        <h2 className="text-[128px] font-[900] text-pixela-accent font-outfit tracking-wider uppercase leading-none mb-8">
                            Descubre
                        </h2>
                        <p className="text-pixela-light text-xl mb-10 max-w-[90%] leading-relaxed">
                            Explora nuestro exclusivo catálogo y encuentra tu próxima obsesión cinematográfica.
                            <span className="block mt-2 text-pixela-light/80">Con historias cuidadosamente seleccionadas para inspirarte.</span>
                        </p>
                        <div className="flex items-center gap-6">
                            <button className="group bg-gradient-to-r from-pixela-accent to-pixela-accent/80 text-pixela-dark px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-pixela-accent/30 relative overflow-hidden">
                                <span className="relative z-10 flex items-center">
                                    Explorar más
                                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <span className="absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300"></span>
                            </button>
                            <DiscoverSelector 
                                activeType={activeType}
                                onTypeChange={setActiveType}
                            />
                        </div>
                    </div>
                    
                    {/* Lado derecho - 60% */}
                    <div className="w-[50%]">
                        <DiscoverGrid type={activeType} />
                    </div>
                </div>
            </div>
        </div>
    );
}; 