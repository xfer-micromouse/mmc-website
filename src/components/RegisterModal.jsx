import React, { useState, useEffect } from 'react';

const RegisterModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const openModal = () => setIsOpen(true);
        const closeModal = () => setIsOpen(false);

        const btns = document.querySelectorAll('a[href="#register"]');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        const modal = document.getElementById('register-modal');
        const closeBtn = document.getElementById('close-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        return () => {
            btns.forEach(btn => {
                btn.removeEventListener('click', openModal);
            });
            if (closeBtn) {
                closeBtn.removeEventListener('click', closeModal);
            }
            if (modal) {
                modal.removeEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
            }
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div id="register-modal" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-dark-card border border-white/10 rounded-xl p-8 max-w-md w-full relative shadow-[0_0_30px_rgba(166,74,245,0.2)]">
                <button id="close-modal" className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h3 className="font-tech text-2xl text-white mb-4">Prijava</h3>
                <p className="text-gray-400 mb-6">Prijave se otvaraju 1. Ožujka 2026. Ostavite email da vas obavijestimo.</p>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Hvala! Obavijestit ćemo vas.'); setIsOpen(false); }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Adresa</label>
                        <input type="email" required className="w-full bg-black/50 border border-white/10 rounded-md py-2 px-3 text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-brand-orange to-brand-pink hover:from-orange-400 hover:to-pink-500 text-white font-bold py-2 px-4 rounded transition-all">
                        Pošalji
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
