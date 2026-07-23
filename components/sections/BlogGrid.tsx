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
 *
 * Animation (GSAP via useReveals on the section root):
 * - Header subtitle ("Latest news") and the "View all posts" link fade + rise
 *   in on scroll (data-reveal).
 * - The "From the blog" heading does a SplitText masked line reveal
 *   (data-headline).
 * - Blog cards fade + rise in with an automatic sibling stagger (data-reveal).
 * - Each card's image wrapper runs a clip-path wipe while the inner image
 *   scales 1.25 -> 1, then hands transform control back to CSS so the
 *   group-hover:scale-105 zoom still works (data-img-reveal).
 * - Reduced-motion users get all content fully visible with no animation.
 */

import { useRef } from "react";
import { useReveals } from "@/lib/gsap/reveals";
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
  const root = useRef<HTMLElement>(null);
  useReveals(root);

  return (
    <section ref={root} id="blog" className="section bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div data-reveal className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-black rounded-full" />
              <span className="text-sm tracking-widest uppercase text-gray-600">
                Latest news
              </span>
            </div>
            <h2 data-headline>From the blog</h2>
          </div>

          <Link
            href="#"
            data-reveal
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
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              data-reveal
              className="group"
            >
              {/* Image Container */}
              <Link
                href="#"
                data-img-reveal
                className="block overflow-hidden mb-6"
              >
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
