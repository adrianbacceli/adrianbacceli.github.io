export const locales = ['en', 'es', 'it'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  it: 'Italiano',
};

type Metric = { value: number; prefix?: string; suffix?: string; label: string; detail: string };
type Project = { title: string; description?: string; tags?: string[]; href?: string; action?: string; placeholder?: boolean };
type SkillGroup = { name: string; items: [string, string][] };

export type SiteContent = {
  meta: { title: string; description: string; ogLocale: string };
  nav: { home: string; about: string; projects: string; blog: string; knowledge: string; credentials: string; menu: string; openMenu: string; closeMenu: string; closeBackdrop: string; toggleTheme: string; selectLanguage: string };
  hero: { role: string; tagline: string; impact: string; portfolio: string };
  about: { heading: string; intro: string; currentRole: string; roleDetail: string; location: string; skills: string; credentials: string; skillGroups: SkillGroup[] };
  impact: { eyebrow: string; heading: string; instruction: string; close: string; programExecution: string; metrics: Metric[] };
  projects: { heading: string; seeAll: string; previous: string; next: string; reserved: string; items: Project[] };
  contact: { heading: string; body: string; email: string; call: string; locationLabel: string; location: string; scopeLabel: string; scope: string; focusLabel: string; focus: string };
  footer: { rights: string; top: string; about: string; projects: string; blog: string; knowledge: string; contact: string };
  social: { email: string; phone: string; github: string; linkedin: string; twitter: string };
};

const sharedProjects = {
  links: {
    knowledge: 'https://github.com/adrianbacceli/Knowledge_Management',
    automation: 'https://github.com/adrianbacceli',
    research: 'https://kb.adrianbacceli.com',
  },
};

export const content: Record<Locale, SiteContent> = {
  en: {
    meta: {
      title: 'Adrián Alberto Bacceli | Cybersecurity Engineering & AppSec SME',
      description: 'Cybersecurity engineering and AppSec specialist focused on enterprise vulnerability management, DAST, automation, and measurable risk reduction.',
      ogLocale: 'en_US',
    },
    nav: { home: 'Home', about: 'About', projects: 'Projects', blog: 'Blog', knowledge: 'Knowledge Base', credentials: 'Credentials', menu: 'Menu', openMenu: 'Open menu', closeMenu: 'Close menu', closeBackdrop: 'Close menu backdrop', toggleTheme: 'Toggle color theme', selectLanguage: 'Select language' },
    hero: { role: 'Cybersecurity Engineering / AppSec SME', tagline: 'Engineering risk visibility at enterprise scale.', impact: 'Explore my impact', portfolio: 'Portfolio' },
    about: {
      heading: 'About',
      intro: 'Vulnerability management and cybersecurity engineering professional with 8+ years across telecommunications, enterprise infrastructure, data protection, and global application security. I combine hands-on security engineering with risk-based process design, automation, vendor management, reporting, and technical leadership.',
      currentRole: 'Current Role — Advisor, Cybersecurity Engineering & Operations @ Dell Technologies',
      roleDetail: 'I serve as a global Web Application Scanning / DAST Program SME across the Americas, EMEA, APJ, and LATAM. My work connects application teams, infrastructure, Product AppSec, audit, remediation teams, and security leadership—standardizing coverage, improving risk decisions, and building API-driven automation that closes gaps between enterprise requirements and security platforms.',
      location: 'Panama City, Panama — operating globally.', skills: 'Skills', credentials: 'See All Credentials',
      skillGroups: [
        { name: 'Vulnerability Management & AppSec', items: [['DAST & Vulnerability Management', 'Lead'], ['Authenticated Scanning & Risk Prioritization', 'Design'], ['Secure SDLC & CI/CD Security Gates', 'Integrate']] },
        { name: 'Engineering & Automation', items: [['Python & API Automation', 'Build'], ['Security Data, KPIs & Reporting', 'Measure'], ['Web, Databases & Playwright', 'Develop']] },
        { name: 'Architecture, Operations & Leadership', items: [['Enterprise Infrastructure & Platforms', 'Operate'], ['Global Program & Technical Leadership', 'Lead'], ['Incident Response & Security Testing', 'Investigate']] },
      ],
    },
    impact: {
      eyebrow: 'Selected evidence', heading: 'Numbers behind the work.', instruction: 'Click or tap a metric to see details.', close: 'Close metric details', programExecution: 'Program execution',
      metrics: [
        { value: 72, prefix: '+', suffix: 'K', label: 'Scans every year', detail: 'More than 6,000 monthly DAST executions support enterprise coverage at scale.' },
        { value: 400, suffix: '+', label: 'Applications supported', detail: 'A global application portfolio spanning the Americas, EMEA, APJ, and LATAM.' },
        { value: 3000, suffix: '+', label: 'Configured scan jobs', detail: 'Configured jobs support varied targets, authentication patterns, and testing requirements.' },
        { value: 8, suffix: '+', label: 'Years of experience', detail: 'Experience spans telecommunications, infrastructure, data protection, and application security.' },
        { value: 4, suffix: '+', label: 'Years of leadership', detail: 'Technical, operational, and quality leadership spans increasingly complex programs.' },
        { value: 40, suffix: '+', label: 'Professionals led', detail: 'Direct quality and performance leadership supports regional technical teams.' },
        { value: 1400, suffix: '+', label: 'Enterprise incidents handled', detail: 'Enterprise incidents are handled across global regions and prioritized by severity and business impact.' },
      ],
    },
    projects: {
      heading: 'Selected Work & Focus', seeAll: 'See All Projects', previous: 'Previous projects', next: 'Next projects', reserved: 'Reserved for future work.',
      items: [
        { title: 'Knowledge Management', description: 'A growing collection of cybersecurity notes, experiments, resources, and practical guides designed to turn ongoing research into reusable knowledge.', tags: ['Knowledge', 'Security', 'Quartz', 'Obsidian'], href: sharedProjects.links.knowledge, action: 'Visit' },
        { title: 'Security Operations Automation', description: 'Scanner-agnostic middleware and API-driven tooling that centralize vulnerability data, automate compliance checks, and close gaps between enterprise needs and vendor platforms.', tags: ['Python', 'FastAPI', 'REST APIs', 'DAST'], href: sharedProjects.links.automation, action: 'Explore' },
        { title: 'AppSec, AI & Secure SDLC Research', description: 'Research into AI-driven changes to application security, agentic and MCP-compatible integrations, and natural-language access to operational vulnerability intelligence.', tags: ['AppSec', 'Agentic AI', 'MCP', 'Secure SDLC'], href: sharedProjects.links.research, action: 'Read Notes' },
        { title: 'Coming soon', placeholder: true }, { title: 'Coming soon', placeholder: true }, { title: 'Coming soon', placeholder: true },
      ],
    },
    contact: { heading: 'Let’s make security measurable.', body: 'Connect to discuss vulnerability management, AppSec programs, DAST engineering, or security automation.', email: 'Email me', call: 'Call', locationLabel: 'Location', location: 'Panama City', scopeLabel: 'Scope', scope: 'Global', focusLabel: 'Focus', focus: 'Cybersecurity • AppSec • Automation' },
    footer: { rights: 'All rights reserved.', top: 'Top', about: 'About', projects: 'Projects', blog: 'Blog', knowledge: 'KB', contact: 'Contact' },
    social: { email: 'Email', phone: 'Phone', github: 'GitHub', linkedin: 'LinkedIn', twitter: 'X / Twitter' },
  },
  es: {
    meta: {
      title: 'Adrián Alberto Bacceli | Ingeniería de Ciberseguridad y AppSec',
      description: 'Especialista en ingeniería de ciberseguridad y AppSec enfocado en gestión empresarial de vulnerabilidades, DAST, automatización y reducción medible del riesgo.',
      ogLocale: 'es_PA',
    },
    nav: { home: 'Inicio', about: 'Perfil', projects: 'Proyectos', blog: 'Blog', knowledge: 'Base de conocimiento', credentials: 'Credenciales', menu: 'Menú', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú', closeBackdrop: 'Cerrar fondo del menú', toggleTheme: 'Cambiar tema de color', selectLanguage: 'Seleccionar idioma' },
    hero: { role: 'Ingeniería de Ciberseguridad / SME de AppSec', tagline: 'Ingeniería de visibilidad del riesgo a escala empresarial.', impact: 'Explorar mi impacto', portfolio: 'Portafolio' },
    about: {
      heading: 'Perfil',
      intro: 'Profesional de gestión de vulnerabilidades e ingeniería de ciberseguridad con más de 8 años de experiencia en telecomunicaciones, infraestructura empresarial, protección de datos y seguridad global de aplicaciones. Combino ingeniería práctica de seguridad con diseño de procesos basado en riesgo, automatización, gestión de proveedores, reportes y liderazgo técnico.',
      currentRole: 'Rol actual — Advisor, Cybersecurity Engineering & Operations @ Dell Technologies',
      roleDetail: 'Me desempeño como SME global del programa de escaneo de aplicaciones web / DAST en las Américas, EMEA, APJ y LATAM. Mi trabajo conecta equipos de aplicaciones, infraestructura, Product AppSec, auditoría, remediación y liderazgo de seguridad para estandarizar la cobertura, mejorar las decisiones de riesgo y crear automatización mediante APIs que cierre las brechas entre los requisitos empresariales y las plataformas de seguridad.',
      location: 'Ciudad de Panamá, Panamá — alcance global.', skills: 'Competencias', credentials: 'Ver todas las credenciales',
      skillGroups: [
        { name: 'Gestión de Vulnerabilidades y AppSec', items: [['DAST y Gestión de Vulnerabilidades', 'Liderar'], ['Escaneo Autenticado y Priorización del Riesgo', 'Diseñar'], ['SDLC Seguro y Controles de Seguridad en CI/CD', 'Integrar']] },
        { name: 'Ingeniería y Automatización', items: [['Automatización con Python y APIs', 'Construir'], ['Datos de Seguridad, KPIs y Reportes', 'Medir'], ['Web, Bases de Datos y Playwright', 'Desarrollar']] },
        { name: 'Arquitectura, Operaciones y Liderazgo', items: [['Infraestructura y Plataformas Empresariales', 'Operar'], ['Programa Global y Liderazgo Técnico', 'Liderar'], ['Respuesta a Incidentes y Pruebas de Seguridad', 'Investigar']] },
      ],
    },
    impact: {
      eyebrow: 'Evidencia seleccionada', heading: 'Números que respaldan el trabajo.', instruction: 'Haz clic o toca una métrica para ver los detalles.', close: 'Cerrar detalles de la métrica', programExecution: 'Ejecución del programa',
      metrics: [
        { value: 72, prefix: '+', suffix: 'K', label: 'Escaneos al año', detail: 'Más de 6,000 ejecuciones DAST mensuales respaldan la cobertura empresarial a escala.' },
        { value: 400, suffix: '+', label: 'Aplicaciones respaldadas', detail: 'Un portafolio global de aplicaciones que abarca las Américas, EMEA, APJ y LATAM.' },
        { value: 3000, suffix: '+', label: 'Trabajos de escaneo configurados', detail: 'Las configuraciones cubren distintos objetivos, patrones de autenticación y requisitos de prueba.' },
        { value: 8, suffix: '+', label: 'Años de experiencia', detail: 'Experiencia en telecomunicaciones, infraestructura, protección de datos y seguridad de aplicaciones.' },
        { value: 4, suffix: '+', label: 'Años de liderazgo', detail: 'Liderazgo técnico, operativo y de calidad en programas de complejidad creciente.' },
        { value: 40, suffix: '+', label: 'Profesionales liderados', detail: 'Liderazgo directo de calidad y desempeño para equipos técnicos regionales.' },
        { value: 1400, suffix: '+', label: 'Incidentes empresariales atendidos', detail: 'Los incidentes empresariales se atienden en regiones globales y se priorizan según su gravedad e impacto en el negocio.' },
      ],
    },
    projects: {
      heading: 'Trabajo y Áreas de Enfoque', seeAll: 'Ver todos los proyectos', previous: 'Proyectos anteriores', next: 'Proyectos siguientes', reserved: 'Reservado para trabajo futuro.',
      items: [
        { title: 'Gestión del Conocimiento', description: 'Una colección creciente de notas, experimentos, recursos y guías prácticas de ciberseguridad que convierte la investigación continua en conocimiento reutilizable.', tags: ['Conocimiento', 'Seguridad', 'Quartz', 'Obsidian'], href: sharedProjects.links.knowledge, action: 'Visitar' },
        { title: 'Automatización de Operaciones de Seguridad', description: 'Middleware independiente del escáner y herramientas mediante APIs que centralizan datos de vulnerabilidades, automatizan controles de cumplimiento y cierran brechas entre las necesidades empresariales y las plataformas de proveedores.', tags: ['Python', 'FastAPI', 'REST APIs', 'DAST'], href: sharedProjects.links.automation, action: 'Explorar' },
        { title: 'Investigación en AppSec, IA y SDLC Seguro', description: 'Investigación sobre cambios impulsados por IA en la seguridad de aplicaciones, integraciones agénticas compatibles con MCP y acceso en lenguaje natural a inteligencia operativa de vulnerabilidades.', tags: ['AppSec', 'IA Agéntica', 'MCP', 'SDLC Seguro'], href: sharedProjects.links.research, action: 'Leer notas' },
        { title: 'Próximamente', placeholder: true }, { title: 'Próximamente', placeholder: true }, { title: 'Próximamente', placeholder: true },
      ],
    },
    contact: { heading: 'Hagamos que la seguridad sea medible.', body: 'Conversemos sobre gestión de vulnerabilidades, programas AppSec, ingeniería DAST o automatización de seguridad.', email: 'Escríbeme', call: 'Llamar', locationLabel: 'Ubicación', location: 'Ciudad de Panamá', scopeLabel: 'Alcance', scope: 'Global', focusLabel: 'Enfoque', focus: 'Ciberseguridad • AppSec • Automatización' },
    footer: { rights: 'Todos los derechos reservados.', top: 'Inicio', about: 'Perfil', projects: 'Proyectos', blog: 'Blog', knowledge: 'BC', contact: 'Contacto' },
    social: { email: 'Correo', phone: 'Teléfono', github: 'GitHub', linkedin: 'LinkedIn', twitter: 'X / Twitter' },
  },
  it: {
    meta: {
      title: 'Adrián Alberto Bacceli | Cybersecurity Engineering e AppSec',
      description: 'Specialista in cybersecurity engineering e AppSec focalizzato sulla gestione aziendale delle vulnerabilità, DAST, automazione e riduzione misurabile del rischio.',
      ogLocale: 'it_IT',
    },
    nav: { home: 'Home', about: 'Profilo', projects: 'Progetti', blog: 'Blog', knowledge: 'Base di conoscenza', credentials: 'Credenziali', menu: 'Menu', openMenu: 'Apri menu', closeMenu: 'Chiudi menu', closeBackdrop: 'Chiudi sfondo del menu', toggleTheme: 'Cambia tema colore', selectLanguage: 'Seleziona lingua' },
    hero: { role: 'Cybersecurity Engineering / SME AppSec', tagline: 'Ingegneria della visibilità del rischio su scala aziendale.', impact: 'Esplora il mio impatto', portfolio: 'Portfolio' },
    about: {
      heading: 'Profilo',
      intro: 'Professionista della gestione delle vulnerabilità e della cybersecurity engineering con oltre 8 anni di esperienza nelle telecomunicazioni, nell’infrastruttura aziendale, nella protezione dei dati e nella sicurezza globale delle applicazioni. Unisco competenze pratiche di security engineering a progettazione dei processi basata sul rischio, automazione, gestione dei fornitori, reporting e leadership tecnica.',
      currentRole: 'Ruolo attuale — Advisor, Cybersecurity Engineering & Operations @ Dell Technologies',
      roleDetail: 'Sono SME globale del programma Web Application Scanning / DAST per Americhe, EMEA, APJ e LATAM. Il mio lavoro collega team applicativi, infrastruttura, Product AppSec, audit, remediation e leadership della sicurezza per standardizzare la copertura, migliorare le decisioni sul rischio e creare automazioni basate su API che colmano le lacune tra requisiti aziendali e piattaforme di sicurezza.',
      location: 'Panama City, Panama — operatività globale.', skills: 'Competenze', credentials: 'Vedi tutte le credenziali',
      skillGroups: [
        { name: 'Vulnerability Management e AppSec', items: [['DAST e Vulnerability Management', 'Guidare'], ['Scansione Autenticata e Prioritizzazione del Rischio', 'Progettare'], ['Secure SDLC e Controlli di Sicurezza CI/CD', 'Integrare']] },
        { name: 'Ingegneria e Automazione', items: [['Automazione Python e API', 'Costruire'], ['Dati di Sicurezza, KPI e Reporting', 'Misurare'], ['Web, Database e Playwright', 'Sviluppare']] },
        { name: 'Architettura, Operazioni e Leadership', items: [['Infrastrutture e Piattaforme Aziendali', 'Operare'], ['Programma Globale e Leadership Tecnica', 'Guidare'], ['Incident Response e Security Testing', 'Indagare']] },
      ],
    },
    impact: {
      eyebrow: 'Evidenze selezionate', heading: 'I numeri dietro al lavoro.', instruction: 'Clicca o tocca una metrica per vedere i dettagli.', close: 'Chiudi i dettagli della metrica', programExecution: 'Esecuzione del programma',
      metrics: [
        { value: 72, prefix: '+', suffix: 'K', label: 'Scansioni ogni anno', detail: 'Oltre 6.000 esecuzioni DAST mensili supportano una copertura aziendale su larga scala.' },
        { value: 400, suffix: '+', label: 'Applicazioni supportate', detail: 'Un portfolio applicativo globale che copre Americhe, EMEA, APJ e LATAM.' },
        { value: 3000, suffix: '+', label: 'Scansioni configurate', detail: 'Le configurazioni supportano obiettivi, schemi di autenticazione e requisiti di test differenti.' },
        { value: 8, suffix: '+', label: 'Anni di esperienza', detail: 'Esperienza in telecomunicazioni, infrastrutture, protezione dei dati e sicurezza applicativa.' },
        { value: 4, suffix: '+', label: 'Anni di leadership', detail: 'Leadership tecnica, operativa e di qualità in programmi di complessità crescente.' },
        { value: 40, suffix: '+', label: 'Professionisti guidati', detail: 'Leadership diretta su qualità e prestazioni per team tecnici regionali.' },
        { value: 1400, suffix: '+', label: 'Incidenti aziendali gestiti', detail: 'Gli incidenti aziendali vengono gestiti nelle regioni globali e classificati per gravità e impatto sul business.' },
      ],
    },
    projects: {
      heading: 'Lavori e Aree di Interesse', seeAll: 'Vedi tutti i progetti', previous: 'Progetti precedenti', next: 'Progetti successivi', reserved: 'Riservato a lavori futuri.',
      items: [
        { title: 'Gestione della Conoscenza', description: 'Una raccolta in crescita di note, esperimenti, risorse e guide pratiche sulla cybersecurity, pensata per trasformare la ricerca continua in conoscenza riutilizzabile.', tags: ['Conoscenza', 'Sicurezza', 'Quartz', 'Obsidian'], href: sharedProjects.links.knowledge, action: 'Visita' },
        { title: 'Automazione delle Operazioni di Sicurezza', description: 'Middleware indipendente dallo scanner e strumenti basati su API che centralizzano i dati sulle vulnerabilità, automatizzano i controlli di conformità e colmano le lacune tra esigenze aziendali e piattaforme dei fornitori.', tags: ['Python', 'FastAPI', 'REST APIs', 'DAST'], href: sharedProjects.links.automation, action: 'Esplora' },
        { title: 'Ricerca su AppSec, IA e Secure SDLC', description: 'Ricerca sui cambiamenti introdotti dall’IA nella sicurezza applicativa, sulle integrazioni agentiche compatibili con MCP e sull’accesso in linguaggio naturale ai dati operativi sulle vulnerabilità.', tags: ['AppSec', 'IA Agentica', 'MCP', 'Secure SDLC'], href: sharedProjects.links.research, action: 'Leggi le note' },
        { title: 'Prossimamente', placeholder: true }, { title: 'Prossimamente', placeholder: true }, { title: 'Prossimamente', placeholder: true },
      ],
    },
    contact: { heading: 'Rendiamo la sicurezza misurabile.', body: 'Contattami per parlare di vulnerability management, programmi AppSec, ingegneria DAST o automazione della sicurezza.', email: 'Scrivimi', call: 'Chiama', locationLabel: 'Sede', location: 'Panama City', scopeLabel: 'Ambito', scope: 'Globale', focusLabel: 'Focus', focus: 'Cybersecurity • AppSec • Automazione' },
    footer: { rights: 'Tutti i diritti riservati.', top: 'Inizio', about: 'Profilo', projects: 'Progetti', blog: 'Blog', knowledge: 'BC', contact: 'Contatti' },
    social: { email: 'Email', phone: 'Telefono', github: 'GitHub', linkedin: 'LinkedIn', twitter: 'X / Twitter' },
  },
};

export function localePath(locale: Locale) {
  return locale === 'en' ? '/' : `/${locale}/`;
}
