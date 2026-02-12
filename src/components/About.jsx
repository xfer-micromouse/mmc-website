import React from 'react';
import { competitionStats } from '../data/config';

const About = () => {
    return (
        <section id="about" className="py-24 bg-dark-card/30 backdrop-blur-sm border-y border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="reveal">
                        <h2 className="font-tech text-3xl md:text-4xl font-bold mb-6 text-white">Brzina. Inteligencija. <span className="text-brand-pink">Preciznost.</span></h2>
                        <div className="space-y-4 text-gray-300 text-lg">
                            <p>
                                Micromouse je natjecanje u kojem mali, potpuno autonomni roboti moraju pronaći put do središta nepoznatog labirinta.
                            </p>
                            <p>
                                Robot mora samostalno mapirati labirint, izračunati najbržu rutu i zatim odjuriti do cilja u rekordnom vremenu. Nema daljinskih upravljača, nema pomoći izvana. Samo kod i inženjerstvo.
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                            {competitionStats.map((stat, index) => (
                                <div key={index} className={`p-4 rounded-lg bg-dark-card border border-white/10 hover:border-brand-${stat.color}/50 transition-colors`}>
                                    <div className={`text-2xl font-bold text-brand-${stat.color}`}>{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-96 w-full flex items-center justify-center reveal" style={{ transitionDelay: '200ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/20 to-brand-orange/20 rounded-2xl blur-xl"></div>
                        <div className="absolute inset-0 border border-white/10 bg-dark-card rounded-2xl p-6 overflow-hidden flex items-center justify-center">
                            <img src="/mms_logo.svg" alt="Micromouse Logo" className="w-48 h-48 animate-pulse-slow" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
