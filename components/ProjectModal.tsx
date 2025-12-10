import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, User } from 'lucide-react';
import { Project } from '../types';
import { useCursor } from '../context/CursorContext';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { setCursorState } = useCursor();

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={handleBackdropClick}
        >
          {/* Dark backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-[#F8F8F8] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorState('default')}
              onMouseLeave={() => setCursorState('default')}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X size={24} className="text-[#1A1A1A]" />
            </button>

            {/* Project image */}
            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Title overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="text-white/70 text-sm uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Project details */}
            <div className="p-6 md:p-10">
              {/* Metadata row */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-neutral-200">
                {project.year && project.year !== 'TBD' && (
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Calendar size={18} />
                    <span className="text-sm">{project.year}</span>
                  </div>
                )}
                {project.location && project.location !== 'TBD' && (
                  <div className="flex items-center gap-2 text-neutral-600">
                    <MapPin size={18} />
                    <span className="text-sm">{project.location}</span>
                  </div>
                )}
                {project.client && project.client !== 'TBD' && (
                  <div className="flex items-center gap-2 text-neutral-600">
                    <User size={18} />
                    <span className="text-sm">{project.client}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {project.description && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
                    About This Project
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-neutral-700">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Contact CTA */}
              <div className="mt-10 pt-8 border-t border-neutral-200">
                <p className="text-neutral-500 mb-4">Interested in a similar project?</p>
                <a
                  href="#contact-form"
                  onClick={onClose}
                  onMouseEnter={() => setCursorState('hover')}
                  onMouseLeave={() => setCursorState('default')}
                  className="inline-block px-8 py-4 bg-black text-white rounded-full uppercase text-sm tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
