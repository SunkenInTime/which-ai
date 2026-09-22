import { ArrowIcon, Brand } from "../components";

export default function Two() {
  return (
    <main id="top" className="v2 page-shell">
      <header className="site-header v2-header"><Brand light /><nav aria-label="Page navigation"><a href="#network">Explore the map</a><a href="#story">Why it works</a></nav><a className="v2-header-action" href="#network">Start exploring <ArrowIcon diagonal /></a></header>
      <section className="v2-hero" aria-labelledby="v2-title">
        <div className="v2-orbit v2-orbit-a" aria-hidden="true" /><div className="v2-orbit v2-orbit-b" aria-hidden="true" />
        <div className="v2-hero-copy"><p className="v2-intro">A better place for the things in your head.</p><h1 id="v2-title">One thought leads<br />to another.</h1><p className="v2-subcopy">Commonplace makes the connections between your notes visible. Follow a curiosity. Find the idea you forgot you had.</p><a className="v2-primary" href="#network">Follow a thought <ArrowIcon /></a></div>
        <div id="network" className="v2-network" aria-label="A map showing a central note connected to related notes">
          <svg className="v2-lines" viewBox="0 0 980 500" preserveAspectRatio="none" aria-hidden="true"><path d="M490 250 C350 208 291 172 145 148 M490 250 C571 170 643 120 791 114 M490 250 C630 267 697 292 840 349 M490 250 C395 340 319 370 164 383 M490 250 C493 145 479 107 498 32" /><circle cx="490" cy="250" r="137" /><circle cx="490" cy="250" r="222" /></svg>
          <div className="v2-node v2-node-main"><span className="v2-node-glyph">✺</span><small>Current thought</small><strong>Making room for wonder</strong><span className="v2-node-detail">Written today</span></div>
          <div className="v2-node v2-node-a"><span>✦</span><strong>Morning walks</strong><small>Personal note</small></div>
          <div className="v2-node v2-node-b"><span>◕</span><strong>Creative rituals</strong><small>Collection</small></div>
          <div className="v2-node v2-node-c"><span>◎</span><strong>The book I underlined</strong><small>Reading note</small></div>
          <div className="v2-node v2-node-d"><span>✳</span><strong>An idea for Sunday</strong><small>Quick thought</small></div>
          <span className="v2-floating-star star-a" aria-hidden="true">✦</span><span className="v2-floating-star star-b" aria-hidden="true">✧</span>
        </div>
      </section>
      <section id="story" className="v2-story"><p>Good ideas rarely arrive alone.</p><h2>They grow from what you noticed last week, what you read last year, and what someone said yesterday.</h2><a href="#network">See what connects <ArrowIcon /></a></section>
      
    </main>
  );
}
