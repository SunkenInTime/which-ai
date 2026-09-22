import { ArrowIcon, Brand } from "../components";

export default function Five() {
  return (
    <main id="top" className="v5 page-shell">
      <header className="site-header v5-header"><Brand /><nav aria-label="Page navigation"><a href="#cards">What&apos;s inside</a><a href="#v5-end">The idea</a></nav><a className="v5-header-link" href="#cards">See the notes <ArrowIcon diagonal /></a></header>
      <section className="v5-hero" aria-labelledby="v5-title"><div className="v5-copy"><p className="v5-kicker">Thoughts have a habit of showing up anywhere.</p><h1 id="v5-title">Catch them.<br />Keep them.<br /><span>Connect them.</span></h1><p className="v5-description">Commonplace is a welcoming home for the notes, ideas, and odd little observations that make up your mind.</p><a className="v5-primary" href="#cards">See what sticks <ArrowIcon /></a></div>
        <div className="v5-desk" id="cards" aria-label="A desk of connected idea cards"><span className="v5-desk-squiggle" aria-hidden="true">⌁</span><div className="v5-card v5-card-a"><small>Thought from a walk</small><strong>What if learning felt more like collecting clues?</strong><span>↘</span></div><div className="v5-card v5-card-b"><small>From a conversation</small><strong>“The best questions leave room.”</strong><span>✳</span></div><div className="v5-card v5-card-c"><small>Connected to 2 notes</small><strong>New workshop idea</strong><p>Start with curiosity. Build the rest together.</p><span>↖</span></div><div className="v5-sticker">put a pin<br />in that!</div><div className="v5-link-line" aria-hidden="true" /></div></section>
      <section className="v5-end" id="v5-end"><div className="v5-end-mark">✳</div><p>Your mind is full of good stuff.<br />Give it somewhere to go.</p><a href="#cards">Take another look <ArrowIcon /></a></section>
      
    </main>
  );
}
