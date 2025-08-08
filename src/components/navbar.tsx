// src/components/Navbar.tsx
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ExternalLink } from "lucide-react";
import { createPortal } from "react-dom";

type Props = {
  onToggleTheme: () => void;
  theme: "light" | "dark";
};

export default function Navbar({ onToggleTheme, theme }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [useSidebar, setUseSidebar] = useState(false);

  const shellRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Measure links width without causing a feedback loop (with hysteresis)
  useEffect(() => {
    const left = leftRef.current;
    const links = linksRef.current;
    if (!left || !links) return;

    let raf = 0;
    const BUFFER = 16; // px of slack to avoid rapid toggling
    const EARLY_SWITCH = 64;  // minimum desired gap to the right in px (tune 48–96)

    const update = () => {
      // Require an extra right-side gap so we flip before touching the controls
      const available = Math.max(0, left.clientWidth - EARLY_SWITCH);
      const needed = links.scrollWidth;

      setUseSidebar((prev) => {
        if (prev) {
          // We're in sidebar mode: only switch back if we clearly have space
          if (needed < available - BUFFER) return false;
          return true;
        } else {
          // We're in inline mode: only switch to sidebar if clearly overflowing
          if (needed > available + BUFFER) return true;
          return false;
        }
      });
    };
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    });

    ro.observe(left);
    ro.observe(links);
    // Initial measure
    update();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const lock = drawerOpen ? "hidden" : "";
    document.documentElement.style.overflow = lock;
    document.body.style.overflow = lock;
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // if the layout switches back to inline links, auto-close the drawer
  useEffect(() => {
    if (!useSidebar && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [useSidebar, drawerOpen]);

  useEffect(() => {
  if (!drawerOpen) return;
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawerOpen(false); };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [drawerOpen]);

  // helper to close drawer when clicking a link
  const navClick = () => setDrawerOpen(false);

  return (
    <header className="sticky top-0 z-[100] backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60">
      <div ref={shellRef} className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Left: links */}
        <div ref={leftRef} className="min-w-0 flex flex-1">
          <div
            ref={linksRef}
            className={`min-w-0 flex items-center gap-6 whitespace-nowrap text-sm font-medium ${
              useSidebar ? "absolute -left-[9999px] -top-[9999px] opacity-0 pointer-events-none" : ""
            }`}
            aria-hidden={useSidebar}
          >
            <a
              href="#"
              className="transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)]"
            >
              Home
            </a>
            <a
              href="#about"
              className="transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)]"
            >
              About
            </a>
            <a
              href="#projects"
              className="transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)]"
            >
              Projects
            </a>
            <a
              href="https://kb.adrianbacceli.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)]"
            >
              Knowledge Base <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a
              href="https://www.credly.com/users/adrian-bacceli/badges"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)]"
            >
              Credentials <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

          {/* Right controls */}
          <div
            className={`flex items-center gap-2 shrink-0 transition-opacity ${
              drawerOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-hidden={drawerOpen}
          >
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={onToggleTheme}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`${useSidebar ? "" : "hidden"} ${drawerOpen ? "hidden" : ""}`}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="side-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            {/* simple burger */}
            <span className="text-lg leading-none">☰</span>
          </Button>
        </div>
      </div>

 {/* Drawer + backdrop via portal */}
 {useSidebar && typeof window !== "undefined" &&
   createPortal(
     <div className={`fixed inset-0 z-[2000] ${drawerOpen ? "" : "pointer-events-none"}`}>
       {/* Backdrop */}
       <button
         className={`absolute inset-0 bg-black/40 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`}
         onClick={() => setDrawerOpen(false)}
         aria-label="Close menu backdrop"
       />
       {/* Panel */}
       <aside
         id="side-drawer"
         role="dialog"
         aria-modal="true"
         className={`absolute inset-y-0 left-0 w-80 max-w-[85vw] border-r bg-white dark:bg-neutral-950 shadow-2xl transition-transform
                     ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
       >
         <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 px-4 py-3 backdrop-blur dark:bg-neutral-950/90">
           <span className="font-semibold">Menu</span>
           <button onClick={() => setDrawerOpen(false)} aria-label="Close menu">✕</button>
         </div>
        <nav className="flex flex-col px-4 py-3 text-sm font-medium">
          <a
            className="py-3 transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded"
            href="#"
            onClick={navClick}
          >
            Home
          </a>
          <a
            className="py-3 transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded"
            href="#about"
            onClick={navClick}
          >
            About
          </a>
          <a
            className="py-3 transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded"
            href="#projects"
            onClick={navClick}
          >
            Projects
          </a>
          <a
            className="py-3 flex items-center gap-1 transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded"
            href="https://kb.adrianbacceli.com"
            target="_blank"
            rel="noreferrer"
            onClick={navClick}
          >
            Knowledge Base <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <a
            className="py-3 flex items-center gap-1 transition-all duration-300 hover:shadow-[0_4px_6px_-4px_rgba(0,0,0,.3)] dark:hover:shadow-[0_4px_6px_-4px_rgba(255,255,255,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 rounded"
            href="https://www.credly.com/users/adrian-bacceli/badges"
            target="_blank"
            rel="noreferrer"
            onClick={navClick}
          >
            Credentials <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
         </nav>
       </aside>
     </div>,
     document.body
   )
 }
    </header>
  );
}
