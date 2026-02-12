import React from 'react';
import { timelineData } from '../data/config';

const Timeline = () => {
    return (
        <section id="timeline" className="py-24 relative overflow-hidden z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-tech text-3xl md:text-4xl font-bold mb-16 text-center text-white reveal">Vremenska Crta</h2>
                <div className="relative">
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-brand-purple to-transparent z-0"></div>
                    {timelineData.map((item, index) => (
                        <div key={index} className={`relative mb-12 md:mb-24 reveal md:flex items-center ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                            <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'text-left'} pr-8`}>
                                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                                <p className="text-gray-400 mt-2">{item.description}</p>
                            </div>
                            <div className="z-10 flex items-center justify-center w-8 h-8 bg-dark-bg border-2 border-brand-orange rounded-full shadow-[0_0_10px_#FF9F76] mx-auto md:mx-0 my-4 md:my-0">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div className={`md:w-5/12 ${index % 2 === 0 ? 'text-left' : 'md:text-right'} pl-8`}>
                                <span className={`inline-block py-1 px-3 rounded bg-brand-${item.iconType}/10 text-brand-${item.iconType} text-sm font-mono border border-brand-${item.iconType}/20`}>
                                    {item.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
