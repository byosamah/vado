import Image from "next/image";
import { Reveal, RevealItem } from "@/components/Reveal";

const features = [
  {
    id: 1,
    title: "Architectural Design",
    description:
      "Comprehensive architectural solutions that balance form, function, and identity — transforming concepts into refined, buildable spaces.",
    image: "/images/feature-1.png",
  },
  {
    id: 2,
    title: "Engineering Excellence",
    description:
      "Integrated engineering across structural, mechanical, electrical, and plumbing disciplines for safe, sustainable performance.",
    image: "/images/feature-2.png",
  },
];

export default function FeatureCards() {
  return (
    <section className="section bg-background">
      <div className="container">
        <Reveal variant="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <RevealItem
              key={feature.id}
              className="group relative overflow-hidden aspect-[4/3] dark-surface"
            >
              <Image
                src={feature.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-base md:text-lg max-w-sm">
                  {feature.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
