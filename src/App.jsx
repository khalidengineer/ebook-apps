// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './config/AppContext';
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import RecentlyViewedPage from './pages/RecentlyViewedPage';
import SavedPdfsPage from './pages/SavedPdfsPage';
import SettingsPage from './pages/SettingsPage';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';
import InstallPrompt from './components/InstallPrompt';
import UpdatePopup from './components/UpdatePopup';
import ToastProvider from './components/ToastProvider';

// Pages that show the TopBar + BottomNav layout
const LAYOUT_PAGES = ['/', '/categories', '/recently-viewed', '/saved', '/settings'];

function AppLayout({ children, showNav }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      {showNav && <TopBar />}
      <main style={{ flex: 1 }}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          {!splashDone ? (
            <SplashScreen onDone={() => setSplashDone(true)} />
          ) : (
            <>
              <Routes>
                <Route path="/" element={
                  <AppLayout showNav>
                    <HomePage />
                  </AppLayout>
                } />
                <Route path="/product/:id" element={
                  <AppLayout showNav={false}>
                    <ProductDetailPage />
                  </AppLayout>
                } />
                <Route path="/categories" element={
                  <AppLayout showNav>
                    <CategoriesPage />
                  </AppLayout>
                } />
                <Route path="/recently-viewed" element={
                  <AppLayout showNav>
                    <RecentlyViewedPage />
                  </AppLayout>
                } />
                <Route path="/saved" element={
                  <AppLayout showNav>
                    <SavedPdfsPage />
                  </AppLayout>
                } />
                <Route path="/settings" element={
                  <AppLayout showNav>
                    <SettingsPage />
                  </AppLayout>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <InstallPrompt />
              <UpdatePopup />
            </>
          )}
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  );
}
