import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AdminApp from './pages/admin/AdminApp';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import LoadingScreen from './components/LoadingPage';
import usePageTransition from './hooks/usePageTransition';
import PageTransitionOverlay from './components/PageTransitionOverlay';
import ProgressOnRouteChange from "./components/ProgressOnRouteChange";

// ✅ Lazy loading des pages
const HomePage = lazy(() => import('./pages/HomePage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const TransfersPage = lazy(() => import('./pages/TransfersPage'));
const TrainStationTransfersPage = lazy(() => import('./pages/TrainStationTransfersPage'));
const DisneylandTransfersPage = lazy(() => import('./pages/DisneylandTransfersPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'));

// ✅ Vérifie si c’est une route admin
const isAdminPath = window.location.pathname.startsWith('/admin');

// ✅ Composant interne pour afficher l’overlay pendant la transition
function TransitionOverlay() {
  const transitioning = usePageTransition(350); // durée en ms
  return transitioning ? <PageTransitionOverlay /> : null;
}

function App() {
  // Si on est sur une route admin, afficher seulement l’app admin
  if (isAdminPath) {
    return <AdminApp />;
  }

  return (
    <Router>
      {/* ✅ Barre de progression à chaque changement d’URL */}
      <ProgressOnRouteChange />
      {/* ✅ Overlay fluide entre pages */}
      <TransitionOverlay />

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/transfers" element={<TransfersPage />} />
              <Route path="/transfers/airports" element={<TransfersPage />} />
              <Route path="/transfers/train-stations" element={<TrainStationTransfersPage />} />
              <Route path="/transfers/disneyland" element={<DisneylandTransfersPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/success" element={<PaymentSuccessPage />} />
              {/* Redirection sécurité pour /admin */}
              <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </Suspense>
        </main>
        <WhatsAppButton />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
