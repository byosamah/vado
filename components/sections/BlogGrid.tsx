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
import type { Dictionary } from "@/lib/i18n/get-dictionary";

/**
 * Post imagery, paired with dict.hidden.blog.posts BY INDEX.
 *
 * NOTE: the posts themselves are PLACEHOLDER content with invented 2023 dates.
 * This section is commented out of the homepage. Before enabling it, replace the
 * entries in both dictionaries with real articles and give each one a real URL
 * (every link here currently points at "#").
 */
const IMAGES = [
  "/images/blog-1.png",
  "/images/blog-2.png",
  "/images/blog-3.png",
  "/images/blog-4.png",
];

export default function BlogGrid({
  blog,
}: {
  blog: Dictionary["hidden"]["blog"];
}) {
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
                {blog.kicker}
              </span>
            </div>
            <h2 data-headline>{blog.heading}</h2>
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
            {blog.viewAll}
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blog.posts.map((post, index) => (
            <article
              key={IMAGES[index]}
              data-reveal
              className="group"
            >
              {/* Image Container */}
              <Link
                href="#"
                data-img-reveal
                className="block overflow-hidden mb-6"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES[index]}
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
              <h4 className="mb-2">
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
