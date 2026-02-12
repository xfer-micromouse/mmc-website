import React from 'react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20">
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-bg to-transparent z-10"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h1 className="font-tech text-6xl md:text-9xl font-bold mb-2 tracking-tighter text-brand-orange reveal active drop-shadow-[0_0_10px_rgba(255,159,118,0.3)]">
                    MicroMouse
                </h1>
                <h2 className="font-tech text-3xl md:text-5xl font-bold mb-6 text-white reveal active" style={{ transitionDelay: '100ms' }}>
                    CROATIA <span className="text-brand-purple">2026</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 reveal active" style={{ transitionDelay: '200ms' }}>
                    Najbrži miš u labirintu pobjeđuje.
                </p>
                <div className="mt-10 flex justify-center gap-6 reveal active" style={{ transitionDelay: '300ms' }}>
                    <a href="#register" className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-md border border-brand-orange text-brand-orange shadow-[0_0_10px_rgba(255,159,118,0.2)] transition-all hover:shadow-[0_0_20px_rgba(255,159,118,0.5)]">
                        <div className="absolute inset-0 w-0 bg-brand-orange transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                        <span className="relative font-bold text-lg">Prijavi Tim</span>
                    </a>
                    <a href="#what-is" className="px-8 py-4 text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        <span>Saznaj više</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
