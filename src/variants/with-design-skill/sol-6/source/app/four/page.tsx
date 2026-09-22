import { ArrowIcon, Brand } from "../components";
import { SearchDemo } from "./search-demo";

export default function Four() {
  return (
    <main id="top" className="v4 page-shell">
      <header className="site-header v4-header"><Brand /><nav aria-label="Page navigation"><a href="#search-demo">Try search</a><a href="#v4-reassurance">How it feels</a></nav><a className="v4-header-link" href="#search-demo">Explore Commonplace <ArrowIcon diagonal /></a></header>
      <section className="v4-hero" aria-labelledby="v4-title"><div className="v4-copy"><div className="v4-prompt">That thing you wrote down three months ago?</div><h1 id="v4-title">It&apos;s right here.</h1><p>Thoughts shouldn&apos;t disappear into a pile of documents. In Commonplace, what you know stays close—ready when you need it.</p><a className="v4-primary" href="#search-demo">Try the sample search <ArrowIcon /></a><div className="v4-cue"><span>⌕</span> Search by what you remember, not where you saved it.</div></div><SearchDemo /></section>
      <section id="v4-reassurance" className="v4-reassurance"><span className="v4-burst" aria-hidden="true">✳</span><h2>More “I remember that.”<br />Less “Where did I put it?”</h2><p>Keep notes in your own words. We&apos;ll help you find your way back.</p></section>
      
    </main>
  );
}
