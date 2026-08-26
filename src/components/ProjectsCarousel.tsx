import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ProjectsCarousel.css";

export type Project = {
  title: string;
  description?: string;
  tags?: string[];
  href?: string;
  action?: string;
  placeholder?: boolean;
};

type Props = { heading: string; seeAll: string; previous: string; next: string; reserved: string; projects: Project[] };

const Tag = ({ children }: { children: ReactNode }) => <span className="project-tag">{children}</span>;

export default function ProjectsCarousel({ heading, seeAll, previous, next, reserved, projects }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const maxIndex = projects.length - visibleCount;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => {
      const count = query.matches ? 3 : 1;
      setVisibleCount(count);
      setIndex((current) => Math.min(current, projects.length - count));
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [projects.length]);

  const goTo = (nextIndex: number) => {
    const next = Math.max(0, Math.min(nextIndex, maxIndex));
    const viewport = viewportRef.current;
    const card = viewport?.querySelectorAll<HTMLElement>("[data-project-card]")[next];
    if (viewport && card) viewport.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setIndex(next);
  };

  const onScroll = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-project-card]"));
    let closest = 0;
    let distance = Number.POSITIVE_INFINITY;
    cards.forEach((card, cardIndex) => {
      const nextDistance = Math.abs(card.offsetLeft - viewport.scrollLeft);
      if (nextDistance < distance) {
        closest = cardIndex;
        distance = nextDistance;
      }
    });
    setIndex(Math.min(closest, maxIndex));
  };

  return (
    <section id="projects" className="projects-section mx-auto max-w-6xl px-6 py-16">
      <div className="projects-heading">
        <div>
          <h2>{heading}</h2>
          <span>{Math.floor(index / visibleCount) + 1} / {Math.ceil(projects.length / visibleCount)}</span>
        </div>
        <div className="projects-heading-actions">
          <a className="projects-all-link" href="https://github.com/adrianbacceli?tab=repositories" target="_blank" rel="noreferrer">{seeAll}</a>
          <div className="carousel-controls">
            <button type="button" onClick={() => goTo(index - visibleCount)} disabled={index === 0} aria-label={previous}><ChevronLeft /></button>
            <button type="button" onClick={() => goTo(index + visibleCount)} disabled={index >= maxIndex} aria-label={next}><ChevronRight /></button>
          </div>
        </div>
      </div>

      <div ref={viewportRef} className="projects-viewport" onScroll={onScroll}>
        <div className="projects-track">
          {projects.map((project, projectIndex) => (
            <article data-project-card className={`project-card ${project.placeholder ? "project-placeholder" : ""}`} key={`${project.title}-${projectIndex}`}>
              {project.placeholder ? (
                <div className="placeholder-content"><span>{String(projectIndex + 1).padStart(2, "0")}</span><h3>{project.title}</h3><p>{reserved}</p></div>
              ) : (
                <>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                  <a className="project-action" href={project.href} target="_blank" rel="noreferrer">{project.action}</a>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
