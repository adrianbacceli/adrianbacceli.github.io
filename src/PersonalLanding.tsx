import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Github, Mail, Twitter, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import profilePic from "./assets/profile.jpg";
import Stat from "./components/Stat";
import Navbar from "@/components/navbar";


const socials = [
  { label: "Email", icon: Mail, href: "mailto:contactme@adrianbacceli.com" },
  { label: "GitHub", icon: Github, href: "https://github.com/adrianbacceli" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/adri%C3%A1n-bacceli/" },
  { label: "Twitter", icon: Twitter, href: "https://x.com/adrianbacceli" },
];

const skills = [
  {
    category: "Infrastructure & Platforms",
    items: [
      { label: "Infrastructure (Server/Network/Storage)", value: 85 },
      { label: "Operating Systems (Windows/Linux/VMware)", value: 95 },
      { label: "Cloud and DevSecOps (K8s/Docker/Jenkins)", value: 70 },
    ]
  },
  {
    category: "Programming & Scripting",
    items: [
      { label: "Programming (Bash/Python/PowerShell)", value: 80 },
      { label: "Web Development (HTML/CSS/JavaScript)", value: 60 }
    ]
  },
  {
    category: "Security Expertise",
    items: [
      { label: "Blue Team", value: 85 },
      { label: "Red Team", value: 70 },
      { label: "Governance, Risk, and Compliance", value: 80 },
    ]
  }
];


function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored as "light" | "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle } as const;
}

const SkillBar: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums opacity-70">{value}%</span>
      </div>

      <div
        className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-neutral-900 dark:bg-white"
        />
      </div>
    </div>
  );
};

export default function PersonalLanding() {
    const { theme, toggle } = useTheme();
    const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Navigation */}      
      <Navbar onToggleTheme={toggle} theme={theme} />

      
      

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-6 py-16 text-center">
        {/* Profile image */}
        <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-neutral-200 dark:border-neutral-800">
          <img src={profilePic} alt="Adrián Bacceli" className="h-full w-full object-cover" />
        </div>

        {/* Intro */}
        <h1 className="mt-2 text-4xl font-bold md:text-6xl">Adrián Bacceli</h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
          Cybersecurity and IT Infrastructure Engineering Consultant
        </p>
        <p className="mt-2 text-neutral-500">
          Protecting what drives your business forward.
        </p>

        {/* Buttons + socials */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={() => setShowPopup(true)}>Get in Touch</Button>

          <Button variant="outline" asChild>
            <a href="#projects">Portfolio</a>
          </Button>

          {/* ← this whole block is now ONE item in the row */}
          <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg p-2 opacity-80 ring-1 ring-transparent transition hover:opacity-100 hover:ring-neutral-400 dark:hover:ring-neutral-600"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Inline Results Row */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          <div className="rounded-lg border border-neutral-200 bg-white/50 p-4 text-center shadow-sm
                          transition duration-300 hover:shadow-md hover:border-neutral-300
                          dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700">
            <Stat value={20} label="Credentials" suffix="+" />
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Verified certifications and achievements.
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white/50 p-4 text-center shadow-sm
                          transition duration-300 hover:shadow-md hover:border-neutral-300
                          dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700">
            <Stat value={1400} label="Customers" suffix="+" />
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Businesses and clients served worldwide.
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white/50 p-4 text-center shadow-sm
                          transition duration-300 hover:shadow-md hover:border-neutral-300
                          dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700">
            <Stat value={99.89} label="Satisfaction" suffix="%" />
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Consistently exceeding expectations.
            </p>
          </div>
        </div>
      </section>


    {/* About */}
      <section id="about" className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 px-6">
          {/* Left: About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">About</h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-justify leading-relaxed">
              IT and cybersecurity professional with over 7 years of experience in data protection, network analysis,
              and cybersecurity strategy. Hold a Cybersecurity Engineering degree and multiple certifications, with
              deep expertise in Linux and cloud technologies. Hands-on experience spans penetration testing, vulnerability
              scanning, and the secure administration of enterprise systems and infrastructure. Proficient in both defensive
              and offensive security, consistently working to protect and enhance cybersecurity measures.
            </p>

            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
              Current Role — Vulnerability Analyst @ Dell Technologies
            </p>

            <p className="text-neutral-600 dark:text-neutral-300 text-justify leading-relaxed">
              Support enterprise vulnerability management and application security initiatives across global infrastructure.
              Contribute to tool modernization efforts and operational excellence through structured scanning processes,
              service delivery, and cross-functional collaboration. Building <span className="font-medium">CyberStart</span>,
              a lean CLI for security project bootstrapping.
            </p>
            <p className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
              <MapPin className="h-4 w-4" /> Panama City, Panama — available for remote work.
            </p>
          </div>

          {/* Right: Skills */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-3xl">Skills</h2>
            {/* Inherit the same text tone & rhythm as About */}
            <div className="space-y-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {skills.map((group) => (
                <section key={group.category} className="space-y-3">
                  <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-200">
                    {group.category}
                  </h3>
                  <div className="space-y-4">
                    {group.items.map((s) => (
                      <SkillBar key={s.label} label={s.label} value={s.value} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

    {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Selected Project</h2>
          <a href="https://github.com/adrianbacceli?tab=repositories" className="text-sm opacity-80 hover:opacity-100">See All Projects →</a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="h-full border-neutral-200 transition hover:shadow-md dark:border-neutral-800">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">Knowledge Management</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 text-justify">This space is dedicated to 
                sharing insights, tools, and learnings in cybersecurity and technology. It serves as a knowledge center — 
                a growing collection of notes, resources, experiments, and guides designed to inform, 
                challenge, and connect.</p>
              <div className="mt-4 mb-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">Knowledge</span>
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">Security</span>
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">Quartz</span>
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">Obsidian</span>
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">TypeScript</span>
              </div>
              <Button variant="ghost" asChild><a href="https://github.com/adrianbacceli/Knowledge_Management" target="_blank">Visit</a></Button>
            </CardContent>
          </Card>

          <Card className="h-full border-neutral-200 transition hover:shadow-md dark:border-neutral-800">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">Coming Soon</h3>
              {/* Commented out for now, can be used later
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Clean, minimal, focused on value delivered.</p>
              <div className="mt-4 mb-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">Cloud</span>
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">IaC</span>
              </div>
              <Button variant="ghost" asChild><a href="#">Visit</a></Button>
              */}
            </CardContent>
          </Card>

          <Card className="h-full border-neutral-200 transition hover:shadow-md dark:border-neutral-800">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold">Coming Soon</h3>
              {/* Commented out for now, can be used later
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Clean, minimal, focused on value delivered.</p>
              <div className="mt-4 mb-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">Cloud</span>
                <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs dark:border-neutral-800">IaC</span>
              </div>
              <Button variant="ghost" asChild><a href="#">Visit</a></Button>
              */}
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 pt-8 md:pb-28">
        <div className="rounded-3xl border border-neutral-200 p-8 dark:border-neutral-800">
          <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <h3 className="text-xl font-semibold md:text-2xl">Let’s build something simple — and secure.</h3>
              <p className="mt-2 max-w-prose text-neutral-600 dark:text-neutral-300">
                Quickest way to reach me is email. Send a short brief and I’ll reply within 24 hours.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href="mailto:contactme@adrianbacceli.com"><Mail className="mr-2 h-4 w-4" /> Email me</a>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-900">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center justify-between"><span className="opacity-70">Response time</span><span>~24h</span></li>
                <li className="flex items-center justify-between"><span className="opacity-70">Mode</span><span>Remote-first</span></li>
                <li className="flex items-center justify-between"><span className="opacity-70">Focus</span><span>AppSec • Tooling</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 pb-10 pt-6 text-sm text-neutral-500 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Adrian Bacceli. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <a href="#" className="opacity-80 hover:opacity-100">Top</a>
            <span>·</span>
            <a href="#about" className="opacity-80 hover:opacity-100">About</a>
            <span>·</span>
            <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
            <span>·</span>
            <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
          </div>
        </div>
      </footer>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* overlay (click to close) */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPopup(false)}
          />

          {/* dialog */}
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="mb-4 text-lg">
              Connect and let’s explore how we can work together.
            </p>

            <div className="mt-2 flex justify-center gap-3">
              <Button asChild>
                <a
                  href="https://www.linkedin.com/in/adri%C3%A1n-bacceli/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Go to LinkedIn
                </a>
              </Button>

              <Button variant="outline" onClick={() => setShowPopup(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
