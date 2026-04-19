import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealItem } from "@/components/Reveal";

const blogPosts = [
  { id: 1, title: "The Art of Minimalist Architecture", category: "Design", date: "September 15, 2023", image: "/images/blog-1.png", href: "/blog/placeholder" },
  { id: 2, title: "Sustainable Building Materials", category: "Sustainability", date: "September 10, 2023", image: "/images/blog-2.png", href: "/blog/placeholder" },
  { id: 3, title: "Urban Planning for the Future", category: "Urban", date: "September 5, 2023", image: "/images/blog-3.png", href: "/blog/placeholder" },
  { id: 4, title: "Interior Design Trends 2024", category: "Interior", date: "August 28, 2023", image: "/images/blog-4.png", href: "/blog/placeholder" },
];

export default function BlogGrid() {
  return (
    <section id="blog" className="section bg-background">
      <div className="container">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full" aria-hidden="true" />
              <span className="text-sm tracking-widest uppercase text-[var(--color-text-secondary)]">
                Latest news
              </span>
            </div>
            <h2>From the blog</h2>
          </div>
          <Link
            href="/blog"
            className="mt-6 md:mt-0 text-sm tracking-widest uppercase underline-hover text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
          >
            View all posts
          </Link>
        </Reveal>

        <Reveal variant="stagger" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogPosts.map((post) => (
            <RevealItem key={post.id} className="group">
              <Link href={post.href} className="block overflow-hidden mb-6 relative aspect-[4/3]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </Link>
              <span className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2 block">
                {post.category}
              </span>
              <h3 className="text-lg font-normal mb-2">
                <Link href={post.href} className="hover:opacity-70 transition-opacity duration-300">
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{post.date}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
