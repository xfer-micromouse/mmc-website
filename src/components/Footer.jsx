import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark-bg border-t border-white/10 py-12 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <span className="font-tech text-xl font-bold text-white">MICROMOUSE</span>
                    <p className="text-gray-500 text-sm mt-2">© 2026 Sva prava pridržana.</p>
                </div>
                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Pravila</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Kontakt</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
