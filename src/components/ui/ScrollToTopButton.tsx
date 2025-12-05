import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.8;
      const isScrolled = window.scrollY > scrollThreshold;
      setIsVisible(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      aria-label="Voltar para o topo"
      className={`fixed bottom-8 right-8 md:bottom-12 md:right-12 z-40 group
        bg-gradient-to-br from-primary-500 via-primary-400 to-secondary-500
        text-dark-950 rounded-full p-3 md:p-4
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
        hover:-translate-y-1 active:scale-95
        flex items-center justify-center`}
    >
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="sr-only">Voltar para o topo da página</span>
    </button>
  );
}
