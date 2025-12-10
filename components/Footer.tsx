import React from 'react';
import { useCursor } from '../context/CursorContext';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { setCursorState } = useCursor();

  return (
    <footer id="contact" className="bg-[#111] text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex flex-col min-h-[60vh] justify-between">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter mb-12">
              Let's Build <br/>
              <span className="serif italic font-light text-neutral-400">The Future.</span>
            </h2>
            <a
              href="mailto:info@vado.sa"
              className="text-xl md:text-3xl hover:text-neutral-400 transition-colors border-b border-white/20 pb-1 inline-block"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              info@vado.sa
            </a>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8 text-neutral-400">
            <div>
              <h4 className="text-white uppercase tracking-widest text-xs mb-4">Headquarters</h4>
              <p>Al Fardan Tower – Office 401</p>
              <p>Al Khobar, Saudi Arabia</p>
            </div>

            <div>
              <h4 className="text-white uppercase tracking-widest text-xs mb-4">Contact</h4>
              <p>+966 (XX) XXX XXXX</p>
            </div>

             <div>
              <h4 className="text-white uppercase tracking-widest text-xs mb-4">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wider">© 2024 VISION Arch. & Engineering Consultants</p>

          <div className="flex flex-col items-end">
            <p className="text-lg mb-1">Join Our Team</p>
            <a
              href="mailto:careers@vado.sa"
              className="text-xs text-neutral-500 uppercase tracking-widest hover:text-white transition-colors"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              Send CV to Careers
            </a>
          </div>
        </div>

      </div>
      
      {/* Big VADO Text Background */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-5 select-none">
        <h1 className="text-[20vw] font-bold leading-none tracking-tighter text-center translate-y-[20%]">VADO</h1>
      </div>
    </footer>
  );
};

export default Footer;