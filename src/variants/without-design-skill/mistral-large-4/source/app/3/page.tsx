import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jotter — A Notebook That Feels Like Paper",
  description: "Warm, personal note-taking for lifelong thinkers.",
};

export default function VersionThree() {
  return (
    <div
      className="min-h-screen bg-[#F5EFE3] text-[#3B3226]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >

      <header className="mx-auto flex max-w-4xl items-center justify-between px-8 py-8">
        <span className="text-2xl italic tracking-tight">Jotter</span>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#feel" className="hover:underline">The feel</a>
          <a href="#habit" className="hover:underline">The habit</a>
          <a href="#start" className="hover:underline">Begin</a>
        </nav>
        <a
          href="#start"
          className="rounded-full border border-[#3B3226] px-5 py-2 text-sm italic transition-colors hover:bg-[#3B3226] hover:text-[#F5EFE3]"
        >
          Open a notebook
        </a>
      </header>

      <main className="mx-auto max-w-4xl px-8">
        <section className="py-20 text-center md:py-32">
          <p className="mb-6 text-sm uppercase tracking-[0.25em] text-[#8A7B5E]">
            Notes, the slow way
          </p>
          <h1 className="text-5xl leading-[1.1] tracking-tight md:text-6xl">
            A notebook that
            <br />
            <span className="italic text-[#8A7B5E]">feels like paper</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[#6B5D45]">
            Jotter is a quiet place for your thoughts — lined pages, ink-dark
            text, and nothing between you and the next sentence. Your second
            brain, bound in something beautiful.
          </p>
          <div className="mt-10">
            <a
              href="#start"
              className="inline-block rounded-full bg-[#3B3226] px-8 py-3 text-sm text-[#F5EFE3] shadow-md transition-colors hover:bg-[#57493A]"
            >
              Start your first page
            </a>
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-sm border border-[#D8CBB0] bg-[#FBF7EE] p-8 text-left shadow-lg">
            <div
              className="space-y-4 text-[#4A3F2E] leading-[2rem]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent, transparent 1.95rem, #E4D9C0 1.95rem, #E4D9C0 2rem)",
              }}
            >
              <p className="text-lg italic">October 6th —</p>
              <p className="text-lg">
                The garden is finally quiet after the rain. I keep thinking
                about what Maya said: “a note is a letter to your future
                self.”
              </p>
              <p className="text-lg">
                Tomorrow: call the printer. Finish the essay on memory.
                Water the fig tree.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[#D8CBB0] pt-4 text-xs uppercase tracking-widest text-[#8A7B5E]">
              <span>Page 42</span>
              <span>Linked: 3 journal entries</span>
            </div>
          </div>
        </section>

        <section id="feel" className="grid gap-10 border-t border-[#D8CBB0] py-20 md:grid-cols-2">
          <div>
            <h2 className="text-3xl italic">Designed to be read slowly</h2>
            <p className="mt-4 leading-relaxed text-[#6B5D45]">
              Warm paper tones, generous margins, and typography that respects
              the reader. Jotter doesn&apos;t shout. It waits, patient, like a good
              notebook always has.
            </p>
          </div>
          <div>
            <h2 className="text-3xl italic">Collections, not folders</h2>
            <p className="mt-4 leading-relaxed text-[#6B5D45]">
              Gather notes into leather-bound collections — a project, a
              semester, a novel. Each one opens like a book you actually want
              to finish.
            </p>
          </div>
        </section>

        <section id="habit" className="border-t border-[#D8CBB0] py-20 text-center">
          <h2 className="text-4xl italic">A ritual, not a chore</h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-[#6B5D45]">
            Morning pages, evening reviews, ideas captured on napkins and
            typed up over coffee. Jotter keeps the habit — you keep the
            thinking.
          </p>
          <a
            href="#start"
            className="mt-10 inline-block rounded-full border border-[#3B3226] px-8 py-3 text-sm italic transition-colors hover:bg-[#3B3226] hover:text-[#F5EFE3]"
          >
            Begin journaling
          </a>
        </section>
      </main>

      <footer className="border-t border-[#D8CBB0] py-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 text-sm text-[#8A7B5E]">
          <span className="text-lg italic text-[#3B3226]">Jotter</span>
          <span>© 2026 Jotter — Write it down, remember it always.</span>
        </div>
      </footer>
    </div>
  );
}
