// Edit this file only: the whole site is rendered from it.
// Every string exists in English and Spanish; App.tsx picks one with the language switch.
// Metrics: keep them defensible in an interview. "Over 90%" beats a made-up 94.3%.
export type Lang = "en" | "es";

export type Job = { company: string; role: string; period: string; summary: string; bullets: string[]; tech: string[]; featured?: boolean };
export type Project = { title: string; text: string; tags: string[]; link?: string; featured?: boolean };
export type Edu = { title: string; org: string; note?: string; featured?: boolean };

export type Site = {
  profile: {
    name: string; role: string; tagline: string; interest: string; preference: string;
    experience: string; languages: string; available: string; photo: string;
    links: { email: string; github: string; linkedin: string };
  };
  ui: {
    title: string; panelProfile: string; panelTools: string; panelRadar: string; panelExp: string;
    panelEvolution: string; panelProjects: string; panelEdu: string; panelCerts: string;
    factInterest: string; factPreference: string; factExperience: string; factLanguages: string;
    tabExp: string; tabProj: string; tabEdu: string; tabCert: string;
    viewAll: string; showLess: string; footer: string; legendData: string; legendMl: string; legendAi: string;
    chartDepth: string; ariaRadar: string; ariaEvolution: string; ariaSocial: string; ariaDialog: string;
    ariaSections: string; ariaClose: string; ariaRepo: string; ariaLang: string;
    pdf: string; pdfBusy: string; ariaDownload: string;
    more: (n: number) => string;
  };
  toolGroups: { title: string; weight: number; items: string[] }[];
  jobs: Job[];
  projects: Project[];
  education: Edu[];
  certs: Edu[];
  treemap: { name: string; children: { name: string; size: number }[] }[];
  focus: { year: string; bi: number; ml: number; ai: number }[];
  radar: { area: string; value: number }[];
};

// Share of my work by area, per year (%). Consistent with the role dates:
// data/BI until Hotelbeds (Oct 2024), GenAI agents from Aureum (Aug 2024) onwards.
const focus = [
  { year: "2018", bi: 100, ml: 0, ai: 0 }, { year: "2020", bi: 95, ml: 5, ai: 0 }, { year: "2021", bi: 85, ml: 15, ai: 0 },
  { year: "2022", bi: 70, ml: 30, ai: 0 }, { year: "2023", bi: 60, ml: 35, ai: 5 }, { year: "2024", bi: 40, ml: 35, ai: 25 },
  { year: "2025", bi: 10, ml: 10, ai: 80 }, { year: "2026", bi: 5, ml: 5, ai: 90 },
];

const en: Site = {
  profile: {
    name: "Ignacio Eiguren",
    role: "AI Engineer",
    tagline: "AI Engineer building production agents that automate end-to-end business workflows. Seven years in data engineering and BI taught me to treat cost, latency and accuracy as first-class constraints.",
    interest: "AI agents, LLM apps & automation",
    preference: "Remote (LATAM / US / EU time zones)",
    experience: "7+ years of experience",
    languages: "Spanish, English",
    available: "Open to remote roles",
    photo: "photo.png", // /public/photo.png
    links: { email: "mailto:ignacio.eiguren@gmail.com", github: "https://github.com/Nachoeigu", linkedin: "https://www.linkedin.com/in/ignacio-eiguren/" },
  },
  ui: {
    title: "Discover Nacho · AI Engineer",
    panelProfile: "Profile", panelTools: "Tools & technologies", panelRadar: "Expertise map", panelExp: "Work experience",
    panelEvolution: "How my work evolved", panelProjects: "Real-world projects", panelEdu: "Education", panelCerts: "Certifications",
    factInterest: "Interested in", factPreference: "Work preference", factExperience: "Experience", factLanguages: "Languages",
    tabExp: "Experience", tabProj: "Projects", tabEdu: "Education", tabCert: "Certifications",
    viewAll: "View all", showLess: "Show less", footer: "Last updated October 2026",
    legendData: "Data & BI", legendMl: "ML / DL", legendAi: "GenAI & Agents",
    chartDepth: "Depth (0-10)",
    ariaRadar: "Radar chart of depth by area, scale 0 to 10",
    ariaEvolution: "Share of work by area per year: BI shrinking, GenAI agents growing",
    ariaSocial: "Social links", ariaDialog: "CV details", ariaSections: "Sections", ariaClose: "Close", ariaRepo: "Repository",
    ariaLang: "Change language",
    pdf: "Download PDF", pdfBusy: "Generating…", ariaDownload: "Download this CV as PDF",
    more: (n) => `+${n} more`,
  },
  toolGroups: [
    { title: "LLMs & Agents", weight: 3, items: ["Claude API & Claude Code", "OpenAI", "LangChain", "LangGraph", "LiteLLM", "OpenRouter", "MCP"] },
    { title: "Retrieval & Memory", weight: 2, items: ["Embeddings", "Vector DBs", "RAG (agentic / adaptive)"] },
    { title: "Reliability & Safety", weight: 2, items: ["Guardrails", "Evals & test automation", "Anonymization", "Token & latency optimization", "Tracing"] },
    { title: "Engineering & Data", weight: 3, items: ["Python", "FastAPI", "Docker", "AWS", "Serverless", "SQL", "dbt", "Airflow", "Tableau", "Power BI"] },
  ],
  jobs: [
    { company: "Aureum", role: "AI Engineer", period: "Aug 2024 – Present", featured: true,
      summary: "Complete.dev: platform to build and deploy custom agentic systems for business clients.",
      tech: ["Python", "AWS", "LLMs", "Multi-agent", "Sandboxing"],
      bullets: [
        "Co-built Complete.dev, a platform where autonomous multimodal agents with access to databases, APIs, Git and web search build and deploy apps straight from a chat.",
        "Designed the sandboxed architecture (one isolated VM per environment) to contain prompt-injection risk.",
        "Cut cost and latency on heavy LLM workloads with caching and model routing: over 90% less spend on repeated work.",
        "Shipped multi-agent systems that combine deterministic code and LLMs for client workflows, with evals and tracing for non-deterministic behavior.",
      ] },
    { company: "Hotelbeds", role: "Software Developer · Data Engineer", period: "Jan 2023 – Oct 2024",
      summary: "World's leading bedbank, distributing travel products to a global network.",
      tech: ["SQL", "Python", "dbt", "Airflow", "Tableau", "Jinja"],
      bullets: [
        "Built a client-facing recommendation system on top of our proprietary travel data.",
        "Owned the back-end of the data pipeline: ingestion, transformation and serving.",
        "Developed data models in dbt and orchestrated them with Airflow.",
      ] },
    { company: "Rappi", role: "Software Developer · Data Analyst", period: "Sep 2021 – Jan 2023",
      summary: "Tech unicorn delivery app: 10M+ monthly active users, 250 cities.",
      tech: ["Python", "SQL", "Snowflake", "Power BI", "Docker", "Airflow"],
      bullets: [
        "Delivered end-to-end data solutions for brands on the platform, from data generation to the final dashboard.",
        "Built data models for concrete business problems across the brands on the platform.",
        "Automated data validation and maintained the infrastructure behind those models.",
      ] },
    { company: "Think Thanks", role: "Data Analyst", period: "Oct 2020 – Sep 2021",
      summary: "Digital transformation agency with clients across the Americas and Spain.",
      tech: ["Python", "R", "Google Analytics", "Tag Manager", "Data Studio", "Hotjar"],
      bullets: [
        "Extracted, prepared, transformed and cleaned data for client projects.",
        "Presented findings as interactive dashboards for non-technical stakeholders.",
      ] },
    { company: "Argentina Network", role: "Data Analyst", period: "Jan 2020 – Oct 2020",
      summary: "Social media marketing agency.",
      tech: ["R", "Google Trends", "Data Studio", "Socialbakers"],
      bullets: [
        "Analyzed social media data and surfaced trends on specific topics.",
        "Built recurring reports that fed the agency's content strategy.",
      ] },
    { company: "Clarín", role: "Social Media Data Analyst (Trainee)", period: "Oct 2018 – Mar 2019",
      summary: "Newsroom analytics: audience behavior and social trends.",
      tech: ["Google Analytics", "Excel", "Data Studio"],
      bullets: [
        "Analyzed audience data and social trends to guide content decisions.",
        "Worked on digital properties reaching 10M+ followers (Diario Olé).",
      ] },
  ],
  // Featured order matters: the panel shows the first four.
  projects: [
    { title: "Agent-to-App Platform (Complete.dev)", featured: true, tags: ["Client work", "Sandboxing", "Agents"],
      text: "Chat agents with tools, databases and APIs that build and deploy apps inside isolated VMs." },
    { title: "SBC Analyzer: Multi-Agent Insurance QA", featured: true, tags: ["Client work", "Multi-agent", "Reflection"],
      text: "The client uploads an insurance plan PDF and a wizard with nested, conditional questions. A Classifier, a QA agent and a Reflection agent split the problem, answer every question and follow each conditional path. Result: over 90% accuracy on the plans tested." },
    { title: "Error Reporting Agent with Anonymization", featured: true, tags: ["Client work", "Anonymization", "AWS"],
      text: "Structures system errors that arrive in any format. An LLM hosted in the client's AWS anonymizes the file in batches and writes a mapping JSON, so reporting agents only ever see anonymized data." },
    { title: "Salesforce Ticket Classification & Routing", featured: true, tags: ["Client work", "Python", "Automation"],
      text: "Classifies support emails and triggers the right action. Over 90% of tickets routed without human intervention." },
    { title: "Dental Care AI Agent", featured: true, tags: ["Personal", "LangGraph", "Tools"],
      text: "Schedules, cancels and reschedules appointments, checks availability and answers clinic questions, with tool-level guardrails around what the agent is allowed to change." },
    { title: "Home Security Agent", tags: ["Personal", "Vision", "LangChain"],
      text: "Analyzes camera feeds, detects intrusions and triggers alerts automatically." },
    { title: "Caching Layer for Expensive AI Pipelines", tags: ["Client work", "Caching", "Cost"],
      text: "Avoids reprocessing large workloads that burn LLM budget. Over 90% lower cost on repeated work." },
    { title: "Legacy Refactor & Test Modernization", tags: ["Client work", "Claude Code", "Testing"],
      text: "Refactored old code and rewrote outdated automated tests to match the evolved app, using Claude Code." },
    { title: "Tourism Email Entity Extraction", tags: ["Client work", "Structured output", "LLM"],
      text: "Turns unstructured emails into hotel, room and availability records in a queryable database." },
    { title: "+ 15 earlier ML & data projects", tags: ["scikit-learn", "TensorFlow", "Airflow"],
      text: "Recommenders, churn and price prediction, CNNs, dashboards and scrapers." },
  ],
  education: [
    { title: "Master's in Digital Business Analytics & Big Data", org: "IEBS", note: "Grade 9.5/10", featured: true },
    { title: "Deep Learning Professional Program", org: "DeepLearning.AI", featured: true },
    { title: "Machine Learning Specialization", org: "Stanford University", featured: true },
    { title: "Data Analytics Specialization", org: "Google", featured: true },
    { title: "Bachelor's in Communication Science", org: "UADE", note: "Grade 9/10" },
  ],
  certs: [
    { title: "AI Agents in LangGraph", org: "DeepLearning.AI & LangChain", featured: true },
    { title: "RAG from Scratch", org: "freeCodeCamp", featured: true },
    { title: "dbt Foundations", org: "dbt Labs", featured: true },
    { title: "Docker for Data Scientists", org: "LinkedIn Learning", featured: true },
    { title: "Chatbot Development with LangChain", org: "Platzi" },
    { title: "Generative AI Introduction (Embeddings & Vector DBs)", org: "Codebasics" },
    { title: "ETL and Data Pipelines with Shell, Airflow and Kafka", org: "IBM" },
    { title: "Neural Networks with TensorFlow", org: "Platzi" },
    { title: "Data Analysis with Python", org: "University of Pennsylvania" },
    { title: "+ 15 more (SQL, Python, R, Kafka, Git, Excel...)", org: "" },
  ],
  // Size = relative weight of each tool in the treemap (how much you use / master it)
  treemap: [
    { name: "LLMs & Agents", children: [
      { name: "LangGraph / LangChain", size: 9 }, { name: "Claude Code", size: 5 }, { name: "OpenAI", size: 5 },
      { name: "LiteLLM / OpenRouter", size: 4 }, { name: "MCP", size: 4 } ] },
    { name: "Retrieval & Memory", children: [ { name: "RAG & Vector DBs", size: 8 }, { name: "Embeddings", size: 6 } ] },
    { name: "Reliability & Safety", children: [
      { name: "Evals & tests", size: 7 }, { name: "Guardrails", size: 5 }, { name: "Anonymizer", size: 4 }, { name: "Caching", size: 4 } ] },
    { name: "Engineering & Data", children: [
      { name: "Python", size: 10 }, { name: "SQL", size: 7 }, { name: "Docker / FastAPI", size: 6 }, { name: "AWS", size: 6 },
      { name: "dbt / Airflow", size: 5 }, { name: "Tableau / BI", size: 3 }, { name: "Git", size: 3 } ] },
  ],
  focus,
  // Expertise map (0-10). Self-assessed: deliberately not all 9s.
  radar: [
    { area: "Agent architectures", value: 8.5 },
    { area: "Prompt & context eng.", value: 8.5 },
    { area: "Backend & serverless", value: 8 },
    { area: "Safety & evals", value: 7.5 },
    { area: "RAG & embeddings", value: 7.5 },
    { area: "Data eng. & BI", value: 7.5 },
    { area: "ML / Deep Learning", value: 6.5 },
  ],
};

const es: Site = {
  profile: {
    name: "Ignacio Eiguren",
    role: "AI Engineer",
    tagline: "AI Engineer: construyo agentes en producción que automatizan flujos de negocio completos. Siete años en datos me enseñaron a tratar costo, latencia y precisión como restricciones de diseño.",
    interest: "Agentes de IA, apps con LLM y automatización",
    preference: "Remoto (husos LATAM / US / EU)",
    experience: "7+ años de experiencia",
    languages: "Español, Inglés",
    available: "Abierto a roles remotos",
    photo: "photo.png",
    links: { email: "mailto:ignacio.eiguren@gmail.com", github: "https://github.com/Nachoeigu", linkedin: "https://www.linkedin.com/in/ignacio-eiguren/" },
  },
  ui: {
    title: "Discover Nacho · AI Engineer",
    panelProfile: "Perfil", panelTools: "Herramientas y tecnologías", panelRadar: "Mapa de expertise", panelExp: "Experiencia laboral",
    panelEvolution: "Cómo evolucionó mi trabajo", panelProjects: "Proyectos reales", panelEdu: "Educación", panelCerts: "Certificaciones",
    factInterest: "Me interesa", factPreference: "Modalidad", factExperience: "Experiencia", factLanguages: "Idiomas",
    tabExp: "Experiencia", tabProj: "Proyectos", tabEdu: "Educación", tabCert: "Certificaciones",
    viewAll: "Ver todo", showLess: "Ver menos", footer: "Última actualización: octubre 2026",
    legendData: "Datos & BI", legendMl: "ML / DL", legendAi: "GenAI y agentes",
    chartDepth: "Profundidad (0-10)",
    ariaRadar: "Gráfico de radar con la profundidad por área, escala 0 a 10",
    ariaEvolution: "Porcentaje de mi trabajo por área y por año: BI bajando, agentes de IA creciendo",
    ariaSocial: "Redes y contacto", ariaDialog: "Detalle del CV", ariaSections: "Secciones", ariaClose: "Cerrar", ariaRepo: "Repositorio",
    ariaLang: "Cambiar idioma",
    pdf: "Descargar PDF", pdfBusy: "Generando…", ariaDownload: "Descargar este CV en PDF",
    more: (n) => `+${n} más`,
  },
  toolGroups: [
    { title: "LLMs y agentes", weight: 3, items: ["Claude API y Claude Code", "OpenAI", "LangChain", "LangGraph", "LiteLLM", "OpenRouter", "MCP"] },
    { title: "Retrieval y memoria", weight: 2, items: ["Embeddings", "Bases vectoriales", "RAG (agéntico / adaptativo)"] },
    { title: "Confiabilidad y seguridad", weight: 2, items: ["Guardrails", "Evals y automatización de tests", "Anonimización", "Optimización de tokens y latencia", "Tracing"] },
    { title: "Ingeniería y datos", weight: 3, items: ["Python", "FastAPI", "Docker", "AWS", "Serverless", "SQL", "dbt", "Airflow", "Tableau", "Power BI"] },
  ],
  jobs: [
    { company: "Aureum", role: "AI Engineer", period: "ago. 2024 – actualidad", featured: true,
      summary: "Complete.dev: plataforma para construir y desplegar sistemas agénticos a medida para clientes.",
      tech: ["Python", "AWS", "LLMs", "Multiagente", "Sandboxing"],
      bullets: [
        "Co-construí Complete.dev, una plataforma donde agentes multimodales autónomos con acceso a bases de datos, APIs, Git y búsqueda web construyen y despliegan apps directamente desde el chat.",
        "Diseñé la arquitectura sandbox (una VM aislada por entorno) para acotar el riesgo de prompt injection.",
        "Bajé costo y latencia en cargas pesadas de LLM con caché y ruteo de modelos: más de 90% menos gasto en trabajo repetido.",
        "Puse en producción sistemas multiagente que combinan código determinístico y LLMs para flujos de clientes, con evals y tracing para comportamiento no determinístico.",
      ] },
    { company: "Hotelbeds", role: "Software Developer · Data Engineer", period: "ene. 2023 – oct. 2024",
      summary: "La mayor bedbank del mundo, distribuyendo productos de viaje a una red global.",
      tech: ["SQL", "Python", "dbt", "Airflow", "Tableau", "Jinja"],
      bullets: [
        "Construí un sistema de recomendación para clientes sobre nuestros propios datos de viaje.",
        "Estuve a cargo del back-end del pipeline de datos: ingesta, transformación y serving.",
        "Desarrollé modelos de datos en dbt y los orquesté con Airflow.",
      ] },
    { company: "Rappi", role: "Software Developer · Data Analyst", period: "sep. 2021 – ene. 2023",
      summary: "Unicornio de delivery: más de 10M de usuarios activos por mes, 250 ciudades.",
      tech: ["Python", "SQL", "Snowflake", "Power BI", "Docker", "Airflow"],
      bullets: [
        "Entregué soluciones de datos de punta a punta para las marcas de la plataforma, desde la generación del dato hasta el dashboard final.",
        "Construí modelos de datos para problemas de negocio concretos de esas marcas.",
        "Automaticé validaciones de datos y mantuve la infraestructura detrás de esos modelos.",
      ] },
    { company: "Think Thanks", role: "Data Analyst", period: "oct. 2020 – sep. 2021",
      summary: "Agencia de transformación digital con clientes en América y España.",
      tech: ["Python", "R", "Google Analytics", "Tag Manager", "Data Studio", "Hotjar"],
      bullets: [
        "Extraje, preparé, transformé y limpié datos para proyectos de clientes.",
        "Presenté los hallazgos como dashboards interactivos para perfiles no técnicos.",
      ] },
    { company: "Argentina Network", role: "Data Analyst", period: "ene. 2020 – oct. 2020",
      summary: "Agencia de marketing en redes sociales.",
      tech: ["R", "Google Trends", "Data Studio", "Socialbakers"],
      bullets: [
        "Analicé datos de redes sociales y detecté tendencias sobre temas específicos.",
        "Armé reportes recurrentes que alimentaban la estrategia de contenido de la agencia.",
      ] },
    { company: "Clarín", role: "Social Media Data Analyst (Trainee)", period: "oct. 2018 – mar. 2019",
      summary: "Analítica de audiencias: comportamiento y tendencias sociales.",
      tech: ["Google Analytics", "Excel", "Data Studio"],
      bullets: [
        "Analicé datos de audiencia y tendencias sociales para guiar decisiones de contenido.",
        "Trabajé en medios digitales con más de 10M de seguidores (Diario Olé).",
      ] },
  ],
  // El orden importa: el panel muestra los cuatro primeros.
  projects: [
    { title: "Plataforma agente-a-app (Complete.dev)", featured: true, tags: ["Trabajo de cliente", "Sandboxing", "Agentes"],
      text: "Agentes de chat con herramientas, bases de datos y APIs que construyen y despliegan apps dentro de VMs aisladas." },
    { title: "SBC Analyzer: QA de seguros multiagente", featured: true, tags: ["Trabajo de cliente", "Multiagente", "Reflection"],
      text: "El cliente sube el PDF de un plan de seguro y un wizard de preguntas anidadas y condicionales. Un agente Classifier, uno de QA y uno de Reflection se reparten el problema, responden cada pregunta y siguen cada camino condicional. Resultado: más de 90% de precisión sobre los planes probados." },
    { title: "Agente de reporte de errores con anonimización", featured: true, tags: ["Trabajo de cliente", "Anonimización", "AWS"],
      text: "Estructura errores de sistema que llegan en cualquier formato. Un LLM hosteado en la AWS del cliente anonimiza el archivo por lotes y escribe un JSON de mapeo, así los agentes de reporte sólo ven datos anonimizados." },
    { title: "Clasificación y ruteo de tickets de Salesforce", featured: true, tags: ["Trabajo de cliente", "Python", "Automatización"],
      text: "Clasifica mails de soporte y dispara la acción correcta. Más del 90% de los tickets ruteados sin intervención humana." },
    { title: "Agente de IA para clínica dental", featured: true, tags: ["Personal", "LangGraph", "Herramientas"],
      text: "Agenda, cancela y reprograma turnos, consulta disponibilidad y responde preguntas de la clínica, con guardrails a nivel de herramienta sobre lo que el agente puede cambiar." },
    { title: "Agente de seguridad para el hogar", tags: ["Personal", "Visión", "LangChain"],
      text: "Analiza cámaras, detecta intrusiones y dispara alertas automáticamente." },
    { title: "Capa de caché para pipelines de IA caros", tags: ["Trabajo de cliente", "Caché", "Costo"],
      text: "Evita reprocesar cargas grandes que queman presupuesto de LLM. Más de 90% menos de costo en trabajo repetido." },
    { title: "Refactor de legacy y modernización de tests", tags: ["Trabajo de cliente", "Claude Code", "Testing"],
      text: "Refactoricé código viejo y reescribí tests automatizados desactualizados para que coincidan con la app actual, usando Claude Code." },
    { title: "Extracción de entidades de mails de turismo", tags: ["Trabajo de cliente", "Salida estructurada", "LLM"],
      text: "Convierte mails sin estructura en registros de hotel, habitación y disponibilidad dentro de una base consultable." },
    { title: "+ 15 proyectos previos de ML y datos", tags: ["scikit-learn", "TensorFlow", "Airflow"],
      text: "Recomendadores, predicción de churn y de precios, CNNs, dashboards y scrapers." },
  ],
  education: [
    { title: "Máster en Digital Business Analytics & Big Data", org: "IEBS", note: "Nota 9.5/10", featured: true },
    { title: "Deep Learning Professional Program", org: "DeepLearning.AI", featured: true },
    { title: "Machine Learning Specialization", org: "Stanford University", featured: true },
    { title: "Data Analytics Specialization", org: "Google", featured: true },
    { title: "Licenciatura en Ciencias de la Comunicación", org: "UADE", note: "Nota 9/10" },
  ],
  certs: [
    { title: "AI Agents in LangGraph", org: "DeepLearning.AI & LangChain", featured: true },
    { title: "RAG from Scratch", org: "freeCodeCamp", featured: true },
    { title: "dbt Foundations", org: "dbt Labs", featured: true },
    { title: "Docker for Data Scientists", org: "LinkedIn Learning", featured: true },
    { title: "Chatbot Development with LangChain", org: "Platzi" },
    { title: "Generative AI Introduction (Embeddings & Vector DBs)", org: "Codebasics" },
    { title: "ETL and Data Pipelines with Shell, Airflow and Kafka", org: "IBM" },
    { title: "Neural Networks with TensorFlow", org: "Platzi" },
    { title: "Data Analysis with Python", org: "University of Pennsylvania" },
    { title: "+ 15 más (SQL, Python, R, Kafka, Git, Excel...)", org: "" },
  ],
  treemap: [
    { name: "LLMs y agentes", children: [
      { name: "LangGraph / LangChain", size: 9 }, { name: "Claude Code", size: 5 }, { name: "OpenAI", size: 5 },
      { name: "LiteLLM / OpenRouter", size: 4 }, { name: "MCP", size: 4 } ] },
    { name: "Retrieval y memoria", children: [ { name: "RAG y bases vectoriales", size: 8 }, { name: "Embeddings", size: 6 } ] },
    { name: "Confiabilidad y seguridad", children: [
      { name: "Evals y tests", size: 7 }, { name: "Guardrails", size: 5 }, { name: "Anonimizador", size: 4 }, { name: "Caché", size: 4 } ] },
    { name: "Ingeniería y datos", children: [
      { name: "Python", size: 10 }, { name: "SQL", size: 7 }, { name: "Docker / FastAPI", size: 6 }, { name: "AWS", size: 6 },
      { name: "dbt / Airflow", size: 5 }, { name: "Tableau / BI", size: 3 }, { name: "Git", size: 3 } ] },
  ],
  focus,
  radar: [
    { area: "Arquitecturas de agentes", value: 8.5 },
    { area: "Prompt y contexto", value: 8.5 },
    { area: "Backend y serverless", value: 8 },
    { area: "Seguridad y evals", value: 7.5 },
    { area: "RAG y embeddings", value: 7.5 },
    { area: "Datos y BI", value: 7.5 },
    { area: "ML / Deep Learning", value: 6.5 },
  ],
};

export const content: Record<Lang, Site> = { en, es };
