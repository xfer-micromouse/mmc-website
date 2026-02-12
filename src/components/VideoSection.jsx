import React from 'react';

const VideoSection = () => {
    return (
        <section id="what-is" className="py-24 bg-dark-card/30 backdrop-blur-sm border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 reveal">
                    <h2 className="font-tech text-3xl md:text-4xl font-bold mb-4 text-white">Što je Micromouse?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Od 1970-ih, inženjeri se natječu u stvaranju najbržeg miša. Pogledajte Veritasiumov video koji savršeno objašnjava povijest i fiziku ovog fascinantnog natjecanja.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto reveal" style={{ transitionDelay: '200ms' }}>
                    <div className="relative" style={{ paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 0 30px rgba(166, 74, 245, 0.15)', border: '1px solid rgba(255, 159, 118, 0.2)' }}>
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/ZMQbHMgK2rw?rel=0&modestbranding=1"
                            title="Veritasium Micromouse Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        ></iframe>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">Video ljubaznošću kanala Veritasium</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
