import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import CardDetail from './pages/CardDetail';
import Daily from './pages/Daily';
import About from './pages/About';
import GlobalFooter from './components/GlobalFooter';


const App: React.FC = () => {

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--bg)] text-[color:var(--text)]"> {/* Main flex container for sticky footer */}
      <div className="gold-dust-particles"></div> {/* Particles background */}
      <div className="flex-grow flex flex-col overflow-x-hidden relative z-10" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}> {/* Original content wrapper, with safe area padding, now flex-grow */}
        <TopBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/card/:slug" element={<CardDetail />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
      <GlobalFooter />
    </div>

  );
};

export default App;