import Image from "next/image";
import { Reveal, RevealItem } from "@/components/Reveal";

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
    <section id="team" className="section bg-background">
      <div className="container">
        {/* Intro varies from the dot-prefix pattern used elsewhere —
            numbered index keeps typographic rhythm without repetition. */}
        <Reveal className="mb-16 flex items-baseline gap-6 flex-wrap">
          <span className="text-sm font-mono text-[var(--color-text-muted)] tracking-widest">
            02 ·
          </span>
          <h2>The founders</h2>
        </Reveal>

        <Reveal
          variant="stagger"
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto list-none p-0"
        >
          {teamMembers.map((member) => (
            <RevealItem key={member.id} className="group">
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-6">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-normal mb-1">{member.name}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{member.role}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
