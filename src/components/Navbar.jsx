import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/95 shadow-lg' : 'bg-dark-bg/80'} backdrop-blur-md border-b border-white/5`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src="/mms_logo.svg" alt="Micromouse Logo" className="h-16 w-16 mr-2" />
                        <span className="font-tech text-xl font-bold tracking-wider text-white">MICROMOUSE</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#about" className="hover:text-brand-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">O Natjecanju</a>
                            <a href="#timeline" className="hover:text-brand-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">Raspored</a>
                            <a href="#what-is" className="hover:text-brand-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">Što je Micromouse?</a>
                            <a href="#sponsors" className="hover:text-brand-orange transition-colors px-3 py-2 rounded-md text-sm font-medium">Sponzori</a>
                        </div>
                    </div>
                    <div>
                        <a href="#register" className="bg-gradient-to-r from-brand-orange to-brand-pink hover:from-orange-400 hover:to-pink-500 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(255,159,118,0.4)]">
                            Prijavi se
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
