import React from 'react';
import { sponsorsData } from '../data/config';

const Sponsors = () => {
    return (
        <section id="sponsors" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-tech text-3xl md:text-4xl font-bold mb-12 text-white reveal">Sponzori</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal" style={{ transitionDelay: '100ms' }}>
                    {sponsorsData.map((sponsor, index) => (
                        <div key={index} className="h-40 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center group hover:bg-white/10 transition-all cursor-default">
                            {sponsor.logoUrl ? (
                                <img src={sponsor.logoUrl} alt={sponsor.name} className="max-h-16" />
                            ) : (
                                <>
                                    <span className="font-tech text-2xl text-gray-600 group-hover:text-brand-orange transition-colors">{sponsor.name}</span>
                                    <span className="text-xs text-gray-600 mt-2">{sponsor.placeholderText}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <p className="mt-12 text-gray-500 reveal">
                    Želite postati sponzor? <a href="#" className="text-brand-orange hover:underline">Kontaktirajte nas</a>.
                </p>
            </div>
        </section>
    );
};

export default Sponsors;
