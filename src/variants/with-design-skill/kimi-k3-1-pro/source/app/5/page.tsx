import Link from "next/link";
import { ArrowRight, ArrowUpRight, LocusMark, PlusIcon, SparkIcon } from "../components/Icons";
import "@/generated/scoped-variant-css/with-design-skill/kimi-k3-1-pro/source/app/5/five.css";

export default function DesignFive() {
  return (
    <main className="garden-page" id="top">
      <header className="garden-nav">
        <Link href="./5" className="garden-brand"><LocusMark /> locus<span>your brain, but roomier</span></Link>
        <nav aria-label="Main navigation"><a href="#play">Play around</a><a href="#how">How it grows</a><a href="#start">Get Locus <ArrowUpRight /></a></nav>
      </header>

      <section className="garden-hero">
        <div className="garden-title"><div className="garden-sticker"><SparkIcon /> A second brain with room to roam</div><h1>Your next idea<br />is already<br />in there.</h1><p>Locus gathers all your little thoughts, weird connections, and “wait—what if?” moments. Then helps them grow into something.</p><a href="#start">Let your mind wander <ArrowRight /></a></div>
        <div className="garden-canvas" aria-label="A playful canvas of connected ideas">
          <svg viewBox="0 0 600 590" fill="none" aria-hidden="true"><path d="M125 125C240 180 170 290 294 301M480 110C340 120 430 260 294 301M95 420C160 340 200 400 294 301M486 420C410 380 410 280 294 301M294 301C280 390 290 440 305 510" /></svg>
          <div className="garden-node garden-node-a"><span>today’s tiny thought</span><p>What if cities<br />had quiet rooms?</p><i>↗</i></div>
          <div className="garden-node garden-node-b"><span>saved from a book</span><p>“The soul becomes<br />dyed with the color<br />of its thoughts.”</p><small>Marcus Aurelius</small></div>
          <div className="garden-node garden-node-c"><span>voice note · 0:38</span><div className="garden-audio">{Array.from({ length: 19 }, (_, i) => <i key={i} />)}</div><p>Ideas from the bus</p></div>
          <div className="garden-node garden-node-d"><span>things to explore</span><p>windows<br />public naps<br />soft architecture</p></div>
          <div className="garden-center"><LocusMark /><span>make<br />a connection</span><PlusIcon /></div>
          <div className="garden-flower">✳</div>
          <div className="garden-squiggle">〰</div>
        </div>
      </section>

      <div className="garden-marquee"><span>A HOME FOR HALF-THOUGHTS</span><i>✿</i><span>SHOWER IDEAS WELCOME</span><i>✿</i><span>NO FOLDERS REQUIRED</span><i>✿</i></div>

      <section className="garden-play" id="play">
        <div className="garden-section-heading"><span>Messy is a feature.</span><h2>Start with a scrap.<br />End up somewhere new.</h2></div>
        <div className="garden-steps" id="how">
          <article className="garden-step-one"><div className="garden-step-visual"><span>random thought</span><p>What if the app<br />felt more like a<br />walk in the park?</p><small>just now</small></div><h3>Toss it in.</h3><p>Text it. Say it. Clip it. No need to pick the perfect folder before the idea disappears.</p></article>
          <article className="garden-step-two"><div className="garden-step-visual"><span>LOOK, A PATTERN</span><div><i>walking</i><b>+</b><i>thinking</i><b>+</b><i>cities</i></div><svg viewBox="0 0 200 45"><path d="M8 34c40-50 72 25 112-13 32-30 50 2 71-9" /></svg></div><h3>Watch it tangle.</h3><p>Locus connects related notes and shows you the themes your mind keeps returning to.</p></article>
          <article className="garden-step-three"><div className="garden-step-visual"><SparkIcon /><p>Remember that thought<br />about quiet cities?</p><span>3 notes might help →</span></div><h3>Find it when it clicks.</h3><p>The right note pops back up when you’re writing, planning, or simply wondering.</p></article>
        </div>
      </section>

      <section className="garden-prompt"><span>A little nudge from Locus</span><h2>What’s something you<br />used to wonder about?</h2><div><p>Write whatever comes up. It doesn’t have to go anywhere.</p><a href="#start">Answer in your Locus <ArrowUpRight /></a></div><div className="garden-prompt-orbit">?</div></section>

      <section className="garden-manifesto"><p>Your brain isn’t a spreadsheet.</p><h2>So why should your<br />notes behave like one?</h2><div><span>Keep it weird.</span><span>Keep it connected.</span><span>Keep it yours.</span></div></section>

      <section className="garden-final" id="start"><div className="garden-final-shape"><LocusMark /></div><span>Room for every version of your mind.</span><h2>Come think<br />in here.</h2><a href="mailto:hello@locus.so?subject=Let%20me%20into%20Locus">Plant your first thought <ArrowRight /></a><p>Free to start. Fun to keep.</p></section>
      <footer className="garden-footer"><Link href="./5"><LocusMark /> locus</Link><span>your brain, but roomier</span><div><a href="#top">One more look ↑</a><a href="mailto:hello@locus.so">Say hello</a></div></footer>
    </main>
  );
}
