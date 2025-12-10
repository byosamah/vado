import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight, Plus } from 'lucide-react';
import ProjectModal from './ProjectModal';

const Projects: React.FC = () => {
  const { setCursorState } = useCursor();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [visibleCount, setVisibleCount] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);

  // Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected project
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleViewAll = () => {
    if (visibleCount < PROJECTS.length) {
      setVisibleCount(PROJECTS.length);
    } else {
      // Optional: Collapse back
      // setVisibleCount(5); 
      // But usually "View All" implies showing everything, navigation away would be "Back".
      // We will keep it expanded or maybe link to a contact form if this was a multi-page.
      // For this interaction, let's toggle just for demo purposes or keep expanding.
    }
  };

  const visibleProjects = PROJECTS.slice(0, visibleCount);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-black/10 pb-4">
          <h2 className="text-sm tracking-widest uppercase">Selected Works</h2>
          <span className="text-sm text-neutral-400">
            {visibleCount < 10 ? `0${visibleCount}` : visibleCount} / {PROJECTS.length < 10 ? `0${PROJECTS.length}` : PROJECTS.length}
          </span>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative"
        >
          <AnimatePresence>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative border-b border-neutral-200 py-12 md:py-16 flex justify-between items-center cursor-pointer transition-colors hover:bg-neutral-50"
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => {
                  setCursorState('hover');
                  setActiveImage(project.image);
                }}
                onMouseLeave={() => {
                  setCursorState('default');
                  setActiveImage(null);
                }}
              >
                <div className="z-10 relative">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-2 group-hover:translate-x-4 transition-transform duration-500 ease-out">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400 group-hover:translate-x-4 transition-transform duration-500 ease-out delay-75">
                    {project.category}
                  </p>
                </div>
                
                <div className="z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={48} strokeWidth={1} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Floating Image */}
          <AnimatePresence>
            {activeImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'grayscale(100%)' }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: 'grayscale(0%)',
                  x: cursorPos.x - 200, // Center 400px width
                  y: cursorPos.y - 150  // Center 300px height
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                  filter: { duration: 0.4 },
                  x: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
                  y: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }
                }}
                className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block w-[400px] h-[300px] overflow-hidden shadow-2xl"
              >
                <img 
                  src={activeImage} 
                  alt="Project Preview" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {visibleCount < PROJECTS.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={handleViewAll}
              className="group px-8 py-4 border border-black rounded-full uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2"
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <span>View All Works</span>
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;