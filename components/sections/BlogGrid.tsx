"use client";

/**
 * Blog Grid Component
 * ===================
 * Four-column responsive grid of blog post cards.
 *
 * Each card has:
 * - Featured image with hover scale
 * - Title
 * - Category tag
 * - Date
 */

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Architecture",
    category: "Design",
    date: "September 15, 2023",
    image: "/images/blog-1.png",
  },
  {
    id: 2,
    title: "Sustainable Building Materials",
    category: "Sustainability",
    date: "September 10, 2023",
    image: "/images/blog-2.png",
  },
  {
    id: 3,
    title: "Urban Planning for the Future",
    category: "Urban",
    date: "September 5, 2023",
    image: "/images/blog-3.png",
  },
  {
    id: 4,
    title: "Interior Design Trends 2024",
    category: "Interior",
    date: "August 28, 2023",
    image: "/images/blog-4.png",
  },
];

export default function BlogGrid() {
  return (
    <section id="blog" className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                Latest news
              </span>
            </div>
            <h2>From the blog</h2>
          </div>

          <Link
            href="#"
            className="
              mt-6 md:mt-0
              text-sm tracking-widest uppercase
              underline-hover
              text-gray-600 hover:text-black
              transition-colors duration-300
            "
          >
            View all posts
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              className="group"
            >
              {/* Image Container */}
              <Link href="#" className="block overflow-hidden mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="
                    w-full aspect-[4/3] object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-105
                  "
                />
              </Link>

              {/* Category */}
              <span className="text-xs tracking-widest uppercase text-gray-500 mb-2 block">
                {post.category}
              </span>

              {/* Title */}
              <h4 className="text-lg font-light mb-2">
                <Link
                  href="#"
                  className="hover:text-gray-600 transition-colors duration-300"
                >
                  {post.title}
                </Link>
              </h4>

              {/* Date */}
              <p className="text-sm text-gray-400">{post.date}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
