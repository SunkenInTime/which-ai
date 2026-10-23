import Link from "next/link";
import { ArrowRight, ArrowUpRight, LocusMark, PlayIcon, SearchIcon, SparkIcon } from "../components/Icons";
import "@/generated/scoped-variant-css/with-design-skill/kimi-k3-1-pro/source/app/3/three.css";

export default function DesignThree() {
  return (
    <main className="stream-page" id="top">
      <header className="stream-nav">
        <Link href="./3" className="stream-brand"><LocusMark /> locus</Link>
        <nav aria-label="Main navigation"><a href="#remember">The memory layer</a><a href="#recall">Recall</a><a href="#privacy">Privacy</a></nav>
        <a href="#start" className="stream-login">Enter Locus <ArrowUpRight /></a>
      </header>

      <section className="stream-hero">
        <div className="stream-hero-title"><span>A second brain for everything</span><h1>Your mind<br />keeps everything.</h1></div>
        <div className="stream-hero-bottom"><p>Every note, quote, voice memo, and fleeting thought—woven into a memory you can actually use.</p><a href="#start">Remember with Locus <ArrowRight /></a></div>
        <div className="stream-reel" aria-label="A stream of captured memories">
          <article className="stream-memory stream-memory-photo"><div className="stream-sun" /><div className="stream-hills" /><span>Alentejo, 18:42</span><p>The light stayed longer<br />than we expected.</p></article>
          <article className="stream-memory stream-memory-quote"><span>Highlighted in<br />The Art of Stillness</span><blockquote>“The point of gathering stillness is not to enrich the sanctuary or mountaintop but to bring that calm into the motion.”</blockquote><small>Pico Iyer · page 64</small></article>
          <article className="stream-memory stream-memory-audio"><span>Voice note · 02:17</span><div className="stream-play"><PlayIcon /></div><div className="stream-wave">{Array.from({ length: 33 }, (_, i) => <i key={i} />)}</div><p>What if the project began<br />with a question, not a plan?</p></article>
          <article className="stream-memory stream-memory-note"><span>Tuesday, 01:13</span><h3>Things that make<br />time feel slower</h3><p>Cooking without a recipe.<br />A train window.<br />Learning someone’s hands.</p><div>#attention &nbsp; #living</div></article>
          <article className="stream-memory stream-memory-link"><span>Saved from the web</span><div className="stream-link-art">A</div><h3>The architecture<br />of daydreaming</h3><p>On buildings that leave room for the mind to wander.</p><small>are.na / editorial</small></article>
        </div>
        <div className="stream-scroll">Your stream keeps everything in motion <span>↓</span></div>
      </section>

      <section className="stream-remember" id="remember">
        <div className="stream-section-intro"><span>Memory, not storage</span><h2>Capture the moment.<br />Keep the feeling.</h2><p>A note is more than words on a page. Locus remembers where you were, what you were reading, and what else was on your mind.</p></div>
        <div className="stream-timeline">
          <div className="stream-time-rail"><span>Today</span><i /><span>Yesterday</span><i /><span>Last autumn</span></div>
          <div className="stream-timeline-content">
            <article><time>10:24</time><div><span>Journal</span><h3>Maybe attention is a form of generosity.</h3><p>Written during a slow morning at home.</p></div><div className="stream-context">Connected to <strong>On listening</strong></div></article>
            <article><time>16:08</time><div><span>Reading</span><h3>“We listen to the spaces between words.”</h3><p>The Listening Book · W. A. Mathieu</p></div><div className="stream-context">3 related passages</div></article>
            <article><time>22:51</time><div><span>Voice</span><h3>A thought on the walk home</h3><div className="stream-small-wave">{Array.from({ length: 21 }, (_, i) => <i key={i} />)}</div></div><div className="stream-context">00:48</div></article>
          </div>
        </div>
      </section>

      <section className="stream-recall" id="recall">
        <div className="stream-recall-copy"><span>When you need it</span><h2>Ask the version<br />of you who knew.</h2><p>Search by a phrase, a feeling, or a fuzzy memory. Locus understands the context and brings the whole moment back.</p><ul><li>Answers drawn only from your notes</li><li>Sources always one click away</li><li>Serendipitous memories, resurfaced daily</li></ul></div>
        <div className="stream-query">
          <div className="stream-query-bar"><SearchIcon /><span>What was I thinking about last autumn?</span></div>
          <div className="stream-thinking"><SparkIcon /> Looking through your memories</div>
          <p>Last autumn, you were thinking about <strong>making fewer, more meaningful things.</strong></p>
          <div className="stream-source-grid"><article><span>Journal · Oct 12</span><p>I want to leave more space around the work. Fewer projects, longer attention.</p></article><article><span>Saved essay · Nov 3</span><p>The case for a smaller, slower creative practice.</p></article><article><span>Voice note · Nov 18</span><p>“The work gets better when I stop trying to be everywhere.”</p></article></div>
        </div>
      </section>

      <section className="stream-privacy" id="privacy"><div><LocusMark /><span>A private place to think out loud.</span></div><p>Your memories belong to you. End-to-end encryption, local export, and no training on your personal notes. Always.</p><a href="#start">Our privacy promise <ArrowUpRight /></a></section>

      <section className="stream-final" id="start"><span>There’s more in your mind than you remember.</span><h2>Meet it again.</h2><a href="mailto:hello@locus.so?subject=Remember%20with%20Locus">Start your memory stream <ArrowRight /></a><p>Your first 1,000 memories are free.</p></section>
      <footer className="stream-footer"><Link href="./3"><LocusMark /> locus</Link><span>Keep everything. Find anything.</span><div><a href="#top">Back to now ↑</a><a href="mailto:hello@locus.so">Contact</a></div></footer>
    </main>
  );
}
