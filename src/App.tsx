import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AiChatProvider } from './context/AiChatContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SitemapPage } from './pages/SitemapPage';
import {
  DisclaimerPage,
  NotFoundPage,
  PrivacyPolicyPage,
  TermsPage,
} from './pages/LegalPages';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AiChatProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<AllToolsPage />} />
            <Route path="/tools/:slug" element={<ToolDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AiChatProvider>
    </BrowserRouter>
  );
}
