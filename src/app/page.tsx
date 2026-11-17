import Image from "next/image";
import CopyButton from "@/components/CopyButton";
import { Card, Enter, SectionTitle, Typewriter } from "@/components/Motion";
import Nav from "@/components/Nav";
import Starfield from "@/components/Starfield";
import { contact, profile, projects, skillGroups, timeline } from "@/data/site";

function Portrait() {
  return (
    <div className="relative mx-auto aspect-square w-[min(72vw,22rem)] lg:w-full lg:max-w-[26rem]">
      <div
        aria-hidden
        className="glow-breathe absolute -inset-8 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(161 161 170 / 0.5), transparent 72%)" }}
      />
      <svg aria-hidden viewBox="0 0 100 100" className="ring-spin absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]">
        <circle cx="50" cy="50" r="49" fill="none" stroke="var(--accent)" strokeWidth="0.35" strokeDasharray="1.2 3.2" />
      </svg>
      <div className="absolute inset-0 overflow-hidden rounded-full border border-accent/40 bg-gradient-to-b from-[#fafafa] via-[#a1a1aa] to-[#0a0a0b]">
        {profile.portrait ? (
          <Image
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 26rem, 72vw"
            className="object-cover object-top"
          />
        ) : (
          <div
            role="img"
            aria-label={`${profile.name}, portrait to be added`}
            className="flex h-full w-full items-center justify-center font-mono text-[clamp(3.5rem,14vw,7rem)] font-bold tracking-tighter text-[#0a0a0b]/80"
          >
            {profile.initials}
          </div>
        )}
      </div>
    </div>
  );
}

function GitHubMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.300.7-4-1.600-4-1.600-.6-1.400-1.400-1.800-1.400-1.800-1.100-.7.1-.7.1-.7 1.200.1 1.800 1.200 1.800 1.200 1.100 1.800 2.800 1.300 3.500 1 .1-.8.4-1.300.8-1.600-2.700-.3-5.500-1.300-5.500-5.900 0-1.300.5-2.400 1.200-3.200-.1-.3-.5-1.500.1-3.200 0 0 1-.3 3.300 1.200a11.500 11.500 0 016 0c2.300-1.500 3.300-1.200 3.300-1.200.7 1.700.2 2.900.1 3.200.8.8 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.400.8 1.100.8 2.200v3.300c0 .3.200.7.800.6A12 12 0 0012 .3" />
    </svg>
  );
}

function Icon({ name }: { name: "mail" | "download" | "arrow" }) {
  const paths = {
    mail: <path d="M2.5 5.5h15v10h-15zM2.5 6l7.5 5.5L17.5 6" />,
    download: <path d="M10 3v10m0 0l-4-4m4 4l4-4M3.500 16.500h13" />,
    arrow: <path d="M4 10h12m0 0l-5-5m5 5l-5 5" />,
  };
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const nameLines = profile.name.split(" ");
  // Hero typing: the name lines type one after another, then the role.
  const NAME_START = 250;
  const NAME_SPEED = 75;

  return (
    <>
      <Starfield />
      <Nav />

      <main id="main" className="relative z-10">
        {/* Hero */}
        <section id="top" className="flex min-h-dvh items-center pb-16 pt-28">
          <div
            className={`wrap grid items-center gap-14 lg:gap-10 ${profile.showPortrait ? "lg:grid-cols-[1.35fr_1fr]" : ""}`}
          >
            <div>
              <Enter>
                <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card/70 px-3.5 py-2 font-mono text-sm text-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
                  </span>
                  {profile.status}
                </p>
              </Enter>

              <h1
                aria-label={`${profile.name}, ${profile.role}`}
                className="mt-7 font-mono font-bold tracking-tight"
              >
                {nameLines.map((line, i) => (
                  <Typewriter
                    key={line}
                    text={line}
                    delay={NAME_START + nameLines.slice(0, i).join("").length * NAME_SPEED}
                    speed={NAME_SPEED}
                    className="text-gradient block pb-[0.08em] text-[clamp(3.25rem,9vw,7.25rem)] leading-[1.02]"
                  />
                ))}
                <Typewriter
                  text={`> ${profile.role}`}
                  markChars={1}
                  delay={NAME_START + nameLines.join("").length * NAME_SPEED + 150}
                  speed={45}
                  className="mt-4 block text-[clamp(1.25rem,3.2vw,2.25rem)] leading-tight text-text"
                />
              </h1>

              <Enter delay={0.6}>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="#contact" className="btn btn-primary">
                    Contact me <Icon name="arrow" />
                  </a>
                  <a href={profile.cv} download className="btn btn-ghost">
                    <Icon name="download" /> Download CV
                  </a>
                </div>
              </Enter>
            </div>

            {profile.showPortrait && (
              <Enter delay={0.35}>
                <Portrait />
              </Enter>
            )}
          </div>
        </section>

        {/* Facts strip */}
        <section aria-label="At a glance" className="border-y border-line bg-card/40 backdrop-blur-sm">
          <dl className="wrap grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:flex lg:items-start lg:justify-between lg:gap-x-10">
            {profile.facts.map((f) => (
              <div key={f.label}>
                <dd className="font-mono text-xl font-bold text-accent md:text-2xl">{f.value}</dd>
                <dt className="mt-1.5 text-sm text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 md:py-32">
          <div className="wrap">
            <SectionTitle
              index="01"
              title="Skills"
              lead="The stack I use to design, build and ship backend systems."
            />
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
              {skillGroups.map((g) => (
                <Card key={g.title} className="p-6 md:p-8">
                  <h3 className="font-mono text-2xl font-bold text-text">{g.title}</h3>
                  <p className="mt-1.5 text-muted">{g.note}</p>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {g.items.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 md:py-32">
          <div className="wrap">
            <SectionTitle
              index="02"
              title="Projects"
              lead="What I have built outside of work, including one project that is still in development."
            />
            <div className={`grid gap-5 ${projects.length % 3 === 0 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
              {projects.map((p, i) => (
                <Card key={p.title} className="group flex flex-col overflow-hidden">
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-t-2xl border-b border-line bg-gradient-to-br from-glow/25 via-card to-mark/25">
                    {p.status && (
                      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-line bg-bg/80 px-3 py-1.5 font-mono text-xs text-text backdrop-blur">
                        <span className="h-1.5 w-1.5 rounded-full bg-jade" />
                        {p.status}
                      </span>
                    )}
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={`Screenshot of ${p.title}`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    ) : (
                      <span className="font-mono text-7xl font-bold text-accent/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>
                  {p.placeholder ? (
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-mono text-sm text-accent">Coming soon</p>
                      <h3 className="mt-2 font-mono text-xl font-bold text-text">{p.title}</h3>
                      <div aria-hidden className="mt-5 space-y-2.5">
                        <div className="skeleton h-3 w-full" />
                        <div className="skeleton h-3 w-4/5" />
                      </div>
                      <div aria-hidden className="mt-6 flex gap-2">
                        <div className="skeleton h-7 w-20" />
                        <div className="skeleton h-7 w-16" />
                        <div className="skeleton h-7 w-24" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-mono text-sm text-accent">
                        {p.kind}
                        {p.period && <span className="text-muted"> · {p.period}</span>}
                      </p>
                      <h3 className="mt-2 font-mono text-xl font-bold text-text">{p.title}</h3>
                      <p className="mt-3 text-muted">{p.summary}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <li key={s} className="chip">
                            {s}
                          </li>
                        ))}
                      </ul>
                      {p.links && p.links.length > 0 && (
                        <div className="mt-auto flex flex-wrap gap-3 pt-6">
                          {p.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-ghost text-sm"
                            >
                              <GitHubMark /> {l.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 md:py-32">
          <div className="wrap">
            <SectionTitle
              index="03"
              title="Experience"
              lead="Where I have worked and studied so far."
            />
            <ol className="relative space-y-6 border-l border-line pl-6 md:pl-10">
              {timeline.map((t) => (
                <li key={t.title} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[calc(1.5rem+5px)] top-8 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgb(250_250_250/0.18)] md:-left-[calc(2.5rem+5px)]"
                  />
                  <Card className="p-6 md:p-8">
                    <p className="font-mono text-sm text-accent">{t.period}</p>
                    <h3 className="mt-2 font-mono text-2xl font-bold text-text">{t.title}</h3>
                    <p className="mt-1 text-lg text-muted">{t.place}</p>
                    {t.points.length > 0 && (
                      <ul className="mt-5 space-y-2.5 text-muted">
                        {t.points.map((pt) => (
                          <li key={pt} className="flex gap-3">
                            <span aria-hidden className="mt-0.5 font-mono text-mark">
                              +
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {t.stack.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2.5">
                        {t.stack.map((s) => (
                          <li key={s} className="chip">
                            {s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 md:py-32">
          <div className="wrap">
            <SectionTitle
              index="04"
              title="Contact"
              lead="Hiring for a backend role, or need a developer for a freelance project? Send me an email."
            />
            <div className="grid gap-5 md:grid-cols-2">
              <Card className="p-6 md:p-8">
                <p className="flex items-center gap-2.5 font-mono text-sm text-accent">
                  <Icon name="mail" /> Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="link-draw mt-4 inline-block break-all font-mono text-[0.95rem] font-bold text-text sm:text-xl md:text-2xl"
                >
                  {contact.email}
                </a>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={`mailto:${contact.email}`} className="btn btn-primary">
                    Write an email
                  </a>
                  <CopyButton value={contact.email} label="email address" />
                </div>
              </Card>
              <Card className="p-6 md:p-8">
                <p className="flex items-center gap-2.5 font-mono text-sm text-accent">
                  <GitHubMark /> GitHub
                </p>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-draw mt-4 inline-block break-all font-mono text-[0.95rem] font-bold text-text sm:text-xl md:text-2xl"
                >
                  {contact.github.replace("https://", "")}
                </a>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href={contact.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    View my code <Icon name="arrow" />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line">
        <div className="wrap flex flex-col gap-2 py-8 font-mono text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <a href="#top" className="link-draw flex min-h-11 items-center self-start text-accent sm:self-auto">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
