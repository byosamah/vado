import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Team from './components/Team';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { CursorProvider } from './context/CursorContext';

const App: React.FC = () => {
  // Using native browser scrolling for instant response

  return (
    <CursorProvider>
      <div className="relative w-full overflow-x-hidden">
        <CustomCursor />
        <Navigation />
        <main>
          <Hero />
          <Projects />
          <About />
          <Team />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </CursorProvider>
  );
};

export default App;