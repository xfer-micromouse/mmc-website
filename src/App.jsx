import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import VideoSection from './components/VideoSection';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';

function App() {
    useEffect(() => {
        const reveal = () => {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 150;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }
        };
        window.addEventListener('scroll', reveal);
        reveal(); // initial check
        return () => window.removeEventListener('scroll', reveal);
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="glow-orb bg-brand-purple w-96 h-96 -top-20 -left-20 animate-float"></div>
                <div className="glow-orb bg-brand-orange w-64 h-64 bottom-20 right-20 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="glow-orb bg-brand-pink w-80 h-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow opacity-20"></div>
            </div>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Timeline />
                <VideoSection />
                <Sponsors />
            </main>
            <Footer />
            <RegisterModal />
        </>
    );
}

export default App;
