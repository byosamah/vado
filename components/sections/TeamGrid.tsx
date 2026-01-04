"use client";

/**
 * Team Grid Component
 * ===================
 * Four-column grid showcasing team members.
 *
 * Features:
 * - Hover effect: image scales 1.05 with overflow hidden
 * - Name and role displayed below each image
 */

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";

const teamMembers = [
  {
    id: 1,
    name: "Arch. Khalid Al Mulla",
    role: "President",
    image: "/images/team-khalid.jpg",
  },
  {
    id: 2,
    name: "Arch. Mutaz Al Mulla",
    role: "Vice President & Chief Architect",
    image: "/images/team-mutaz.jpg",
  },
];

export default function TeamGrid() {
  return (
    <section id="team" className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span className="text-sm tracking-widest uppercase text-gray-600">
              Leadership
            </span>
          </div>
          <h2>Meet our people</h2>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={fadeInUp}
              className="group"
            >
              {/* Image Container with hover scale */}
              <div className="overflow-hidden mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="
                    w-full aspect-[3/4] object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Name & Role */}
              <h4 className="text-xl font-light mb-1">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
