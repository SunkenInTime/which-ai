"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

type ModalName = "signup" | "demo" | null;
type ModalContext = { openModal: (modal: Exclude<ModalName, null>) => void };
const ModalContext = createContext<ModalContext>({ openModal: () => {} });

export function ActionButton({ children, className = "", action = "signup", ariaLabel }: { children: React.ReactNode; className?: string; action?: Exclude<ModalName, null>; ariaLabel?: string }) {
  const { openModal } = useContext(ModalContext);
  return <button type="button" className={className} onClick={() => openModal(action)} aria-label={ariaLabel}>{children}</button>;
}

function Modal({ open, onClose, children, label }: { open: boolean; onClose: () => void; children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className="soma-modal" aria-label={label} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button>
        {children}
      </div>
    </dialog>
  );
}

function SignupForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="modal-success" role="status">
      <span className="modal-success-icon"><Icon name="check" size={28} /></span>
      <p className="modal-eyebrow">YOU’RE ON THE LIST</p>
      <h2>A clearer mind is on its way.</h2>
      <p>Thanks for joining. We’ll send your private invite and a little guide to building a better second brain.</p>
    </div>
  );
  return (
    <>
      <span className="modal-mark"><Icon name="brain" size={28} /></span>
      <p className="modal-eyebrow">YOUR MIND, REMEMBERED</p>
      <h2>Start thinking with Soma.</h2>
      <p>Join thousands of curious minds. Free for 14 days, no credit card required.</p>
      <form className="signup-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <label htmlFor="signup-email">Work or personal email</label>
        <input id="signup-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required autoFocus />
        <button type="submit">Create my second brain <Icon name="arrow-right" size={18} /></button>
      </form>
      <small>By continuing, you agree to our Terms and Privacy Policy.</small>
    </>
  );
}

function DemoContent({ onStart }: { onStart: () => void }) {
  return (
    <>
      <p className="modal-eyebrow">SOMA IN 30 SECONDS</p>
      <h2>Capture less. Connect more.</h2>
      <div className="demo-note">
        <div className="demo-note-top"><span>Ideas / The future of learning</span><span className="demo-live"><i /> Live</span></div>
        <p>Knowledge compounds when ideas can find each other.</p>
        <div className="demo-connections"><span>↳ Deep work</span><span>↳ Learning systems</span><span>↳ Creative habits</span></div>
      </div>
      <ol className="demo-steps"><li><b>Capture</b> a thought before it disappears.</li><li><b>Connect</b> it to what you already know.</li><li><b>Rediscover</b> it right when you need it.</li></ol>
      <button type="button" className="demo-start" onClick={onStart}>Try Soma for free <Icon name="arrow-right" size={18} /></button>
    </>
  );
}

export function LandingProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalName>(null);
  const close = () => setModal(null);
  return (
    <ModalContext.Provider value={{ openModal: setModal }}>
      {children}
      <Modal open={modal === "signup"} onClose={close} label="Start using Soma"><SignupForm /></Modal>
      <Modal open={modal === "demo"} onClose={close} label="How Soma works"><DemoContent onStart={() => setModal("signup")} /></Modal>
    </ModalContext.Provider>
  );
}

export function Footer({ className = "" }: { className?: string }) {
  return <footer className={`soma-footer ${className}`}><span>© 2026 Soma Labs</span><nav aria-label="Footer"><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="mailto:hello@soma.so">Contact</a></nav><span>Made for minds everywhere.</span></footer>;
}
