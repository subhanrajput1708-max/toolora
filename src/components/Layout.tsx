import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { TooloraAiChat } from './TooloraAiChat';

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, search, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 40);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search, hash, key]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#10243E]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#12345A] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <TooloraAiChat />
    </div>
  );
}
