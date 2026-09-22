import { QuickCapture } from "./quick-capture";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Margin, back to top">margin<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#method">The method</a>
        <a href="#capture">Capture</a>
      </nav>
      <a className="header-cta" href="#capture">Try capture <span aria-hidden="true">↗</span></a>
    </header>
  );
}

export function CaptureSection({ title, body }: { title: string; body: string }) {
  return (
    <section id="capture" className="capture-section">
      <div className="capture-intro">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <QuickCapture />
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span className="wordmark">margin<span>.</span></span>
      <span>Space for the thoughts that stay.</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
