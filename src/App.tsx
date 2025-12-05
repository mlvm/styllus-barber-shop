import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './components/layout';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';
import { 
  HeroSection, 
  AboutSection, 
  ServicesSection, 
  GallerySection, 
  BookingSection 
} from './components/sections';
import { LoginPage } from './components/auth';
import { DashboardPage } from './components/dashboard';

// Componente Home (Landing Page)
function HomePage() {
  return (
    <>
      <Layout>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <BookingSection />
      </Layout>
      <ScrollToTopButton />
    </>
  );
}

// Componente de rota protegida para o Admin
function AdminRoute({ 
  isAuthenticated, 
  onLogout 
}: { 
  isAuthenticated: boolean; 
  onLogout: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname === '/admin') {
      navigate('/login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <DashboardPage onLogout={onLogout} />;
}

// Componente de Login com navegação
function LoginRoute({ 
  isAuthenticated, 
  onLogin 
}: { 
  isAuthenticated: boolean; 
  onLogin: () => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    onLogin();
    navigate('/admin');
  };

  return <LoginPage onLogin={handleLogin} />;
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('styllus_auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('styllus_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('styllus_auth');
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/login" 
        element={
          <LoginRoute 
            isAuthenticated={isAuthenticated} 
            onLogin={handleLogin} 
          />
        } 
      />
      <Route 
        path="/admin" 
        element={
          <AdminRoute 
            isAuthenticated={isAuthenticated} 
            onLogout={handleLogout} 
          />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
