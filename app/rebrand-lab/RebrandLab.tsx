import Link from 'next/link';

import styles from './RebrandLab.module.css';

const shotRows = [
  {
    id: '01',
    time: '0:00-0:08',
    role: 'Establishing blast',
    frame: 'Wide factory floor, chocolate chip conveyors, amber furnace hits, blue status lights.',
    feeds: ['wide', 'macro', 'console'],
  },
  {
    id: '02',
    time: '0:08-0:16',
    role: 'Assembly escalation',
    frame: 'Robotic arms stamp cocoa-silicon chips with military precision.',
    feeds: ['wide', 'macro', 'oracle'],
  },
  {
    id: '03',
    time: '0:16-0:24',
    role: 'Brain Garden reveal',
    frame: 'Central orchestration core, vast factory intelligence, no face.',
    feeds: ['wide', 'console', 'oracle'],
  },
  {
    id: '04',
    time: '0:24-0:32',
    role: 'Dark chocolate forge',
    frame: 'Molten chocolate, graphite machinery, circuit molds, heavy brass impact.',
    feeds: ['wide', 'macro', 'console'],
  },
  {
    id: '05',
    time: '0:32-0:40',
    role: 'Software factory proof',
    frame: 'Build queues, test lights, code reflections, content pipelines.',
    feeds: ['wide', 'console', 'macro'],
  },
  {
    id: '06',
    time: '0:40-0:48',
    role: 'Bombastic climax',
    frame: 'Camera flies through a cathedral-scale machine hall at full throughput.',
    feeds: ['wide', 'oracle', 'macro'],
  },
  {
    id: '07',
    time: '0:48-0:52.846',
    role: 'Cliff ending',
    frame: 'Drop to darkness, title space, one final blue status light.',
    feeds: ['title-card', 'factory-drop', 'homepage-transition'],
  },
];

const proofCards = [
  {
    title: 'Writing',
    text: 'Current essays and field notes become the public proof layer.',
    href: '/blog',
  },
  {
    title: 'Systems',
    text: 'Agent orchestration, content pipelines, observability, and tooling.',
    href: '/code-examples',
  },
  {
    title: 'Archive',
    text: '2025 AI transformation work becomes dated context instead of the front door.',
    href: '/enterprise-ai-development-framework',
  },
];

const promptKernel = `A bombastic cinematic dark chocolate software factory synchronized to military orchestral battle music. Conveyor belts carry glossy chocolate computer chips through robotic inspection stations. Amber furnace light blasts on brass hits. Blue status lights pulse with the snare. Graphite steel machinery, molten cocoa, circuit molds, build queues, agent orchestration consoles, no humans, no readable text, no logos, serious premium industrial scale, camera movement driven by the music.`;

export function RebrandLab() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="rebrand-lab-title">
        <div className={styles.heroCopy}>
          <p className={styles.labLabel}>Approval lab</p>
          <h1 id="rebrand-lab-title">David Mieloch builds software factories.</h1>
          <p className={styles.thesis}>
            Brain Garden is the system. The Dark Chocolate Software Factory is the cinematic world.
            The homepage claim stays clear: AI Architect, human taste, machine throughput.
          </p>
          <div className={styles.heroActions}>
            <Link href="#trailer" className={styles.primaryAction}>
              Review trailer structure
            </Link>
            <Link href="#web" className={styles.secondaryAction}>
              Review web direction
            </Link>
          </div>
        </div>

        <div className={styles.trailerPanel} aria-label="Epic Battle trailer audio">
          <div className={styles.factoryFrame}>
            <div className={styles.factoryRail} />
            <div className={styles.factoryCore} />
            <div className={styles.factoryGlow} />
          </div>
          <div className={styles.trackRow}>
            <img
              src="/audio/music/epic-battle-game-opening-credits.jpg"
              alt="Epic Battle Game - Opening Credits artwork"
              className={styles.trackArt}
            />
            <div>
              <p className={styles.trackTitle}>Epic Battle Game - Opening Credits</p>
              <p className={styles.trackMeta}>52.846s trailer candidate</p>
            </div>
          </div>
          <audio className={styles.audio} controls src="/audio/music/epic-battle-game-opening-credits.mp3">
            <track kind="captions" />
          </audio>
        </div>
      </section>

      <section className={styles.statement} aria-label="Story conclusion">
        <div>
          <h2>The story</h2>
          <p>A human architect built a factory that keeps thinking after he leaves.</p>
        </div>
        <div>
          <h2>The conclusion</h2>
          <p>Human taste designs the machine. The machine turns intent into shipped systems. The factory runs in the dark.</p>
        </div>
      </section>

      <section id="trailer" className={styles.section} aria-labelledby="trailer-title">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>52-second homepage trailer</p>
          <h2 id="trailer-title">Cut between synchronized factory feeds.</h2>
          <p>
            LTX audio-to-video takes 2-20 second clips, so the production shape is seven synced
            segments. Each segment gets multiple visual feeds that can be edited together like a
            music video while staying locked to the original track.
          </p>
        </div>

        <div className={styles.shotGrid}>
          {shotRows.map((shot) => (
            <article className={styles.shotCard} key={shot.id}>
              <div className={styles.shotTopline}>
                <span>Clip {shot.id}</span>
                <time>{shot.time}</time>
              </div>
              <h3>{shot.role}</h3>
              <p>{shot.frame}</p>
              <div className={styles.feedList}>
                {shot.feeds.map((feed) => (
                  <span key={feed}>{feed}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.promptSection} aria-labelledby="prompt-title">
        <div>
          <p className={styles.sectionKicker}>Prompt kernel</p>
          <h2 id="prompt-title">One visual language across every shot.</h2>
          <p>
            The generated clips can vary camera, scale, and subject, but they should all feel like
            the same factory.
          </p>
        </div>
        <pre className={styles.promptBox}>{promptKernel}</pre>
      </section>

      <section id="web" className={styles.section} aria-labelledby="web-title">
        <div className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>Website direction</p>
          <h2 id="web-title">The trailer serves the homepage, not the other way around.</h2>
          <p>
            The web work needs to make the offer legible before the cinematic layer takes over.
            The first screen should tell visitors who David is and what he builds; the video makes
            that claim unforgettable.
          </p>
        </div>

        <div className={styles.brandGrid}>
          <div className={styles.brandBlock}>
            <span>Person</span>
            <strong>David Mieloch</strong>
            <p>AI Architect and operator of the public brand.</p>
          </div>
          <div className={styles.brandBlock}>
            <span>System</span>
            <strong>Brain Garden</strong>
            <p>The agentic infrastructure and governance layer.</p>
          </div>
          <div className={styles.brandBlock}>
            <span>World</span>
            <strong>Dark Chocolate Software Factory</strong>
            <p>The cinematic metaphor for machine throughput with human taste.</p>
          </div>
        </div>

        <div className={styles.proofGrid}>
          {proofCards.map((card) => (
            <Link href={card.href} className={styles.proofCard} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
