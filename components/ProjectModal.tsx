import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { useCursor } from '../context/CursorContext';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { setCursorState } = useCursor();

  // State for image slider - tracks which image is currently shown
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images for this project (use images array if available, otherwise just the single image)
  const projectImages = project?.images || (project?.image ? [project.image] : []);
  const hasMultipleImages = projectImages.length > 1;

  // Go to next image in slider
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  // Go to previous image in slider
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  // Reset to first image when modal opens with new project
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, project?.id]);

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

            {/* Project image slider */}
            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
              {/* Current image with fade animation */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={projectImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Navigation arrows - only show if multiple images */}
              {hasMultipleImages && (
                <>
                  {/* Previous button */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors z-10"
                    onMouseEnter={() => setCursorState('hover')}
                    onMouseLeave={() => setCursorState('default')}
                  >
                    <ChevronLeft size={24} className="text-white" />
                  </button>
                  {/* Next button */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors z-10"
                    onMouseEnter={() => setCursorState('hover')}
                    onMouseLeave={() => setCursorState('default')}
                  >
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </>
              )}

              {/* Dot indicators - only show if multiple images */}
              {hasMultipleImages && (
                <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {projectImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-6'  // Active dot is wider
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      onMouseEnter={() => setCursorState('hover')}
                      onMouseLeave={() => setCursorState('default')}
                    />
                  ))}
                </div>
              )}

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
