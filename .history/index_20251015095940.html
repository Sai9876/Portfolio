import React, { useEffect, useState } from "react";

// Modern single-file React component (TailwindCSS required in project)
// Save as: Portfolio.jsx
// Usage: import Portfolio from './Portfolio'; then <Portfolio /> in your app.

export default function Portfolio() {
  const phrases = [
    "I build APIs with Django & Flask",
    "I create responsive React frontends",
    "I optimize SQL & design clean systems",
  ];

  // Typing effect state
  const [display, setDisplay] = useState("");
  const [pi, setPi] = useState(0); // phrase index
  const [ci, setCi] = useState(0); // char index
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const speed = deleting ? 40 : 80; // faster when deleting
    const timeout = setTimeout(() => {
      const current = phrases[pi];
      if (!deleting) {
        // type
        setDisplay(current.slice(0, ci + 1));
        setCi(ci + 1);
        if (ci + 1 === current.length) {
          // pause then delete
          setTimeout(() => setDeleting(true), 900);
        }
      } else {
        // delete
        setDisplay(current.slice(0, ci - 1));
        setCi(ci - 1);
        if (ci - 1 === 0) {
          setDeleting(false);
          setPi((pi + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [ci, deleting, pi]);

  // small social list (replace links)
  const socials = [
    { name: "Github", href: "https://github.com/youruser" },
    { name: "LinkedIn", href: "https://linkedin.com/in/youruser" },
    { name: "Email", href: "mailto:sai@example.com" },
  ];

  // sample projects (replace with real data)
  const projects = [
    {
      title: "Bus Ticketing App",
      desc: "Tkinter desktop app — QR, voice input, PDF save, MySQL storage.",
      tech: "Python • Tkinter",
      link: "#",
    },
    {
      title: "Admin Dashboard",
      desc: "Django + React dashboard with auth & analytics charts.",
      tech: "Django • React",
      link: "#",
    },
    {
      title: "Portfolio Website",
      desc: "This site — modern responsive, deploy-ready.",
      tech: "React • Tailwind",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#071127] text-slate-100 antialiased">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between sticky top-0 backdrop-blur bg-black/20 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-400 to-pink-400 flex items-center justify-center text-black font-bold">S</div>
          <div className="font-semibold">Sai <span className="text-violet-400">.</span></div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm opacity-90">
          <a href="#about" className="hover:text-violet-300">About</a>
          <a href="#projects" className="hover:text-violet-300">Projects</a>
          <a href="#contact" className="hover:text-violet-300">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a download href="/resume.pdf" className="hidden md:inline-block px-3 py-1 border border-violet-500 rounded text-sm">Resume</a>
          <button className="md:hidden p-2 rounded bg-white/5">Menu</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-violet-300 font-medium">Hello, I'm Sai — Fullstack Developer</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              I build <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-pink-300">fast</span>,
              scalable apps
            </h1>

            <p className="mt-4 text-slate-300 max-w-xl">
              <span className="inline-block mr-2">{display}</span>
              <span className="inline-block w-1 h-6 align-middle bg-slate-200/80 animate-pulse ml-2" />
            </p>

            <div className="mt-6 flex gap-3">
              <a href="#projects" className="px-4 py-2 rounded bg-violet-500 hover:bg-violet-600">See Projects</a>
              <a href="#contact" className="px-4 py-2 rounded border border-slate-700">Contact</a>
            </div>

            <div className="mt-6 flex gap-3 text-sm text-slate-400">
              {socials.map((s) => (
                <a key={s.name} href={s.href} className="underline" target="_blank" rel="noopener noreferrer">{s.name}</a>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative flex items-center justify-center">
            {/* animated blob */}
            <div className="absolute -inset-8 blur-2xl opacity-40" style={{ filter: 'blur(40px)' }}>
              <div className="w-full h-full bg-gradient-to-tr from-[#7c3aed] to-[#f472b6] opacity-70 rounded-3xl transform rotate-6 animate-blob" />
            </div>

            <div className="relative w-full max-w-sm p-6 rounded-2xl glass border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center text-black text-2xl">👨‍💻</div>
                <div>
                  <div className="font-semibold">Sai</div>
                  <div className="text-sm text-slate-300">Python • Django • Flask • React</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
                <div className="p-3 rounded bg-white/5">Open to work</div>
                <div className="p-3 rounded bg-white/5">Interview Ready</div>
              </div>

              <div className="mt-4 flex gap-2">
                <a className="text-xs py-2 px-3 rounded bg-slate-800/60" href="#projects">View Projects</a>
                <a className="text-xs py-2 px-3 rounded border border-slate-700" href="/resume.pdf" download>Download CV</a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-16 grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold">About me</h2>
            <p className="mt-3 text-slate-300">I'm a backend-first Python developer who loves building clean APIs and responsive frontends. I focus on performance, testing and readable code.</p>

            <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-slate-300">
              <li>✅ Django REST Framework</li>
              <li>✅ Flask microservices</li>
              <li>✅ React (hooks, SPA)</li>
              <li>✅ MySQL & ORM</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg glass border border-white/5">
            <h3 className="font-semibold">Quick stats</h3>
            <div className="mt-3 text-sm text-slate-300 space-y-2">
              <div>💼 Experience: 2+ years</div>
              <div>⚙️ Tools: Git, Docker, Postman</div>
              <div>⭐ Strengths: APIs, debugging</div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-14">
          <h2 className="text-2xl font-bold">Selected Projects</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article key={p.title} className="p-4 rounded-xl glass border border-white/5 hover:scale-105 transform transition">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-slate-300 mt-2">{p.desc}</p>
                <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
                  <span>{p.tech}</span>
                  <a href={p.link} className="underline">Demo</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-14 max-w-2xl">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p className="text-slate-300 mt-2">Email / GitHub / LinkedIn — replace below links.</p>

          <div className="mt-4 bg-white/5 p-4 rounded-lg border border-white/5">
            <div className="flex flex-col sm:flex-row gap-3">
              <input placeholder="Your name" className="p-3 rounded bg-slate-800 border border-slate-700 flex-1" />
              <input placeholder="Email" className="p-3 rounded bg-slate-800 border border-slate-700 w-64" />
            </div>
            <textarea placeholder="Message" className="mt-3 p-3 rounded bg-slate-800 border border-slate-700 w-full" rows={4} />
            <div className="mt-3 flex items-center gap-3">
              <button className="px-4 py-2 rounded bg-violet-500">Send</button>
              <div className="text-sm text-slate-400">Or reach me at <a href="mailto:sai@example.com" className="underline">sai@example.com</a></div>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-slate-500 text-sm">© {new Date().getFullYear()} Sai — Built with ❤</footer>
      </main>

      <style>{`
        .glass{ background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)); backdrop-filter: blur(6px); }
        @keyframes blob { 0% { transform: translateY(0px) scale(1) rotate(0deg);} 33% { transform: translateY(-10px) scale(1.05) rotate(5deg);} 66% { transform: translateY(8px) scale(0.98) rotate(-4deg);} 100% { transform: translateY(0px) scale(1) rotate(0deg);} }
        .animate-blob{ animation: blob 6s infinite; }
      `}</style>
    </div>
  );
}
