/**
 * App shell. A one-time preloader gates the first paint, then the persistent
 * chrome (navbar, footer) frames the routed content. ScrollManager handles
 * top-on-navigate and hash targets. Routes: home descent plus three archives.
 */

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { ScrollManager } from './components/ScrollManager';
import { Home } from './pages/Home';
import { Gallery } from './pages/Gallery';
import { Videos } from './pages/Videos';
import { Media } from './pages/Media';

function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <ScrollManager />
      <Navbar />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
