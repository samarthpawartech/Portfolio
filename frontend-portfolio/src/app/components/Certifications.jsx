import { Layers, Code2, Database, Braces, FileText, ExternalLink } from "lucide-react";
import { Reveal } from "./shared/Reveal";
import { SectionHeading } from "./shared/SectionHeading";
import { TiltCard } from "./shared/TiltCard";

const CERTIFICATIONS = [
  {
    title: "Full Stack Development",
    issuer: "Coding Seekho Institute, Nashik",
    icon: Layers,
    link: "/certificates/Full Stack Development.pdf",
    thumb: "/assets/thumbs/fullstack.jpg",
    accent: "cyan",
  },
  {
    title: "Programming in Java",
    issuer: "Coding Seekho Institute, Nashik",
    icon: Code2,
    link: "/certificates/Java Programming.pdf",
    thumb: "/assets/thumbs/java.jpg",
    accent: "orange",
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "Coding Seekho Institute, Nashik",
    icon: Database,
    link: "/certificates/DSA.pdf",
    thumb: "/assets/thumbs/dsa.jpg",
    accent: "purple",
  },
  {
    title: "HTML, CSS, JavaScript & Bootstrap",
    issuer: "Coding Seekho Institute, Nashik",
    icon: Braces,
    link: "/certificates/html css and js.pdf",
    thumb: "/assets/thumbs/webdev.jpg",
    accent: "pink",
  },
  {
    title: "C & C++ Certification",
    issuer: "Coding Seekho Institute, Nashik",
    icon: Code2,
    link: "/certificates/C.pdf",
    thumb: "/assets/thumbs/cpp.jpg",
    accent: "green",
  },
];

const ACCENT = {
  cyan: { text: "text-neon-cyan", ring: "ring-neon-cyan/40", grad: "from-neon-cyan/20" },
  orange: { text: "text-neon-orange", ring: "ring-neon-orange/40", grad: "from-neon-orange/20" },
  purple: { text: "text-neon-purple", ring: "ring-neon-purple/40", grad: "from-neon-purple/20" },
  pink: { text: "text-neon-pink", ring: "ring-neon-pink/40", grad: "from-neon-pink/20" },
  green: { text: "text-neon-green", ring: "ring-neon-green/40", grad: "from-neon-green/20" },
};

export function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          code="verified_credentials.map(cert => cert.badge);"
          title="Certifications"
          accent="orange"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => {
            const a = ACCENT[cert.accent];
            const Icon = cert.icon;
            return (
              <Reveal key={cert.title} delay={i * 0.08}>
                <TiltCard maxTilt={5} className="h-full rounded-2xl">
                  <a
                    href={encodeURI(cert.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="btn-focus-ring glass group block h-full overflow-hidden rounded-2xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-black/30">
                      <img
                        src={cert.thumb}
                        alt={`${cert.title} certificate preview`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${a.grad} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      />
                      <span
                        className={`glass absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${a.ring} ${a.text}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display text-base font-bold leading-snug text-ink">{cert.title}</h3>
                      <p className="mt-1 text-xs text-ink-dim">{cert.issuer}</p>
                      <span
                        className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold ${a.text}`}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View Certificate
                        <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
