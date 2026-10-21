// Edit this file only: the whole site is rendered from it. Replace every [X] with real numbers.
// Every string exists in English and Spanish; App.tsx picks one with the language switch.
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

// Share of my work by area, per year (%): tells the story BI → ML → GenAI agents (language-neutral).
const focus = [
  { year: "2018", bi: 100, ml: 0, ai: 0 }, { year: "2020", bi: 95, ml: 5, ai: 0 }, { year: "2021", bi: 80, ml: 20, ai: 0 },
  { year: "2022", bi: 65, ml: 35, ai: 0 }, { year: "2023", bi: 55, ml: 35, ai: 10 }, { year: "2024", bi: 35, ml: 25, ai: 40 },
  { year: "2025", bi: 10, ml: 10, ai: 80 }, { year: "2026", bi: 5, ml: 5, ai: 90 },
];

const en: Site = {
  profile: {
    name: "Ignacio Eiguren",
    role: "AI Engineer",
    tagline: "I build autonomous agents that take real work off a company's plate — in production, not in demos. Seven years in data taught me to trust the numbers: I optimize the cost–latency–accuracy trade-off to ship low-cost, high-precision systems that scale without losing quality.",
    interest: "AI agents, LLM apps & automation",
    preference: "Remote (WFA)",
    experience: "7 years of experience",
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
    more: (n) => `+${n} more`,
  },
  toolGroups: [
    { title: "LLMs & Agents", weight: 3, items: ["Claude API & Claude Code", "OpenAI", "LangChain", "LangGraph", "LiteLLM", "OpenRouter", "MCP"] },
    { title: "Retrieval & Memory", weight: 2, items: ["Embeddings", "Vector DBs", "RAG (agentic / adaptive)"] },
    { title: "Reliability & Safety", weight: 2, items: ["Guardrails", "Evals & test automation", "Anonymization", "Token & latency optimization", "Tracing"] },
    { title: "Engineering & Data", weight: 3, items: ["Python", "FastAPI", "Docker", "Git", "Serverless", "SQL", "dbt", "Airflow", "Tableau", "Power BI"] },
  ],
  jobs: [
    { company: "Aureum", role: "AI Engineer", period: "Aug 2024 – Present", featured: true,
      summary: "Complete.dev: platform to build and deploy custom agentic systems for business clients.",
      tech: ["Python", "AWS", "LLMs", "Multi-agent", "Sandboxing"],
      bullets: [
        "Co-built a chat platform where users talk to autonomous multimodal agents with access to databases, external services, web search, Git and APIs — and deploy ready-to-consume apps from the conversation.",
        "Designed a sandboxed architecture: every environment runs in an isolated VM, limiting the blast radius of prompt injection.",
        "Shipped multi-agent systems that mix deterministic code with generative AI to automate end-to-end workflows for clients.",
        "Built caching layers and model routing so large, expensive AI workloads are never reprocessed: lower cost, lower latency, same accuracy.",
        "Built the SBC Analyzer (Classifier + QA + Reflection agents) and an error-reporting agent that anonymizes files with an LLM hosted in the client's AWS.",
        "Integrated multiple providers via LiteLLM and OpenRouter for model-agnostic deployments, with evals, tracing and debugging tooling for non-deterministic systems.",
      ] },
    { company: "Hotelbeds", role: "Software Developer · Data Engineer", period: "Jan 2023 – Oct 2024",
      summary: "World's leading bedbank, distributing travel products to a global network.",
      tech: ["SQL", "Python", "dbt", "Airflow", "Tableau", "Jinja"],
      bullets: [
        "Built a recommendation system for clients, based 100% on our own data.",
        "Owned the back-end of the data pipeline: ingestion, transformation and serving infrastructure.",
        "Developed data models in dbt and orchestrated them with Airflow.",
      ] },
    { company: "Rappi", role: "Software Developer · Data Analyst", period: "Sep 2021 – Jan 2023",
      summary: "Tech unicorn delivery app: 10M+ monthly active users, 250 cities.",
      tech: ["Python", "SQL", "Snowflake", "Power BI", "Docker", "Airflow"],
      bullets: [
        "Delivered end-to-end data solutions: from data generation to the final visualization product.",
        "Built data models for specific business problems across brands on the platform.",
        "Mixed Data Scientist, Data Engineer and Data Analyst work, with validation automations and infrastructure.",
      ] },
    { company: "Think Thanks", role: "Data Analyst", period: "Oct 2020 – Sep 2021",
      summary: "Digital transformation agency with clients across the Americas and Spain.",
      tech: ["Python", "R", "Google Analytics", "Tag Manager", "Data Studio", "Hotjar"],
      bullets: [
        "Extracted, prepared, transformed and cleaned data for client projects.",
        "Presented findings as interactive, user-friendly dashboards for non-technical stakeholders.",
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
  projects: [
    { title: "SBC Analyzer: Multi-Agent Insurance QA", featured: true, tags: ["Multi-agent", "Classifier", "Reflection"],
      text: "The client uploads an insurance plan PDF and a wizard with nested, conditional questions. A Classifier, a QA Agent and a Reflection agent split the problem, answer every question and follow each conditional path. Result: [X% accuracy on N plans]." },
    { title: "Error Reporting Agent with Anonymization", featured: true, tags: ["Anonymization", "Batching", "AWS"],
      text: "Structures system errors that arrive in any format. A powerful LLM hosted in the client's AWS anonymizes the file in batches and writes a mapping JSON; reporting agents then work on anonymized data only." },
    { title: "End-to-End AI Newsletter", featured: true, tags: ["Multi-agent", "SEO", "Social media"],
      text: "A discovery agent searches LLM-provider sites and filters relevant news from hype and fake, checking previous runs. Content, SEO and social-media agents then write and publish what is worth sharing." },
    { title: "Agent-to-App Platform (Complete.dev)", featured: true, tags: ["Sandboxing", "Agents", "Serverless"],
      text: "Chat agents with tools, databases and APIs that build and deploy apps inside isolated VMs." },
    { title: "Salesforce Ticket Classification & Routing", featured: true, tags: ["Python", "LLM", "Automation"],
      text: "Classifies support emails and triggers the right action. [X%] of cases handled without humans." },
    { title: "Dental Care AI Agent", featured: true, tags: ["LangGraph", "Tools"], link: "https://github.com/your-user/dental-agent",
      text: "Schedules, cancels and reschedules appointments, checks availability and answers clinic questions." },
    { title: "Home Security Agent", featured: true, tags: ["Vision", "LangChain"], link: "https://github.com/your-user/security-agent",
      text: "Analyzes camera feeds, detects intrusions and triggers alerts automatically." },
    { title: "Caching Layer for Expensive AI Pipelines", tags: ["Caching", "Cost"], text: "Avoids reprocessing large workloads that burn LLM budget. [X%] cost reduction." },
    { title: "Legacy Refactor & Test Modernization", tags: ["Claude Code", "Testing"], text: "Refactored old code and rewrote outdated automated tests to match the evolved app, using Claude Code." },
    { title: "Tourism Email Entity Extraction", tags: ["Structured output", "LLM"], text: "Turns unstructured emails into hotel, room and availability records in a queryable database." },
    { title: "LinkedIn Networking & HR Bot", tags: ["Automation"], text: "Networking and job-application automation." },
    { title: "+ 15 earlier ML & data projects", tags: ["scikit-learn", "TensorFlow", "Airflow"], text: "Recommenders, churn and price prediction, CNNs, dashboards and scrapers." },
  ],
  education: [
    { title: "Master's in Digital Business Analytics & Big Data", org: "IEBS", note: "Grade 9.5", featured: true },
    { title: "Deep Learning Professional Program", org: "DeepLearning.AI", featured: true },
    { title: "Machine Learning Specialization", org: "Stanford University", featured: true },
    { title: "Data Analytics Specialization", org: "Google", featured: true },
    { title: "Bachelor's in Communication Science", org: "UADE", note: "Grade 9" },
  ],
  certs: [
    { title: "AI Agents in LangGraph", org: "DeepLearning.AI & LangChain", featured: true },
    { title: "RAG from Scratch", org: "freeCodeCamp", featured: true },
    { title: "Chatbot Development with LangChain", org: "Platzi", featured: true },
    { title: "dbt Foundations", org: "dbt Labs", featured: true },
    { title: "Generative AI Introduction (Embeddings & Vector DBs)", org: "Codebasics" },
    { title: "ETL and Data Pipelines with Shell, Airflow and Kafka", org: "IBM" },
    { title: "Docker for Data Scientists", org: "LinkedIn Learning" },
    { title: "Neural Networks with TensorFlow", org: "Platzi" },
    { title: "Data Analysis with Python", org: "University of Pennsylvania" },
    { title: "+ 20 more (SQL, Python, R, Kafka, Git, Excel...)", org: "" },
  ],
  // Size = relative weight of each tool in the treemap (how much you use / master it)
  treemap: [
    { name: "LLMs & Agents", children: [
      { name: "Claude Code", size: 10 }, { name: "LangGraph / LangChain", size: 8 }, { name: "OpenAI", size: 5 },
      { name: "LiteLLM / OpenRouter", size: 5 }, { name: "MCP", size: 4 } ] },
    { name: "Retrieval & Memory", children: [ { name: "RAG & Vector DBs", size: 8 }, { name: "Embeddings", size: 7 } ] },
    { name: "Reliability & Safety", children: [
      { name: "Guardrails", size: 5 }, { name: "Evals & tests", size: 5 }, { name: "Anonymizer", size: 5 }, { name: "Caching", size: 4 } ] },
    { name: "Engineering & Data", children: [
      { name: "Python", size: 10 }, { name: "SQL", size: 7 }, { name: "Docker / FastAPI", size: 5 },
      { name: "dbt / Airflow", size: 5 }, { name: "Tableau / BI", size: 4 }, { name: "Git", size: 3 } ] },
  ],
  focus,
  // Expertise map (0–10). Self-assessed depth by area: edit to match your real level.
  radar: [
    { area: "Agent architectures", value: 9.5 },
    { area: "Prompt & context eng.", value: 9.5 },
    { area: "Safety & evals", value: 8 },
    { area: "RAG & embeddings", value: 8 },
    { area: "Backend & serverless", value: 8.5 },
    { area: "Data eng. & BI", value: 8 },
    { area: "ML / Deep Learning", value: 7 },
  ],
};

const es: Site = {
  profile: {
    name: "Ignacio Eiguren",
    role: "AI Engineer",
    tagline: "Construyo agentes autónomos que le sacan trabajo real de encima a una empresa — en producción, no en una demo. Siete años en datos me enseñaron a mirar los números: optimizo el trade-off costo–latencia–precisión para entregar sistemas de bajo costo y alta precisión que escalan sin perder calidad.",
    interest: "Agentes de IA, apps con LLM y automatización",
    preference: "Remoto (WFA)",
    experience: "7 años de experiencia",
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
    more: (n) => `+${n} más`,
  },
  toolGroups: [
    { title: "LLMs y agentes", weight: 3, items: ["Claude API y Claude Code", "OpenAI", "LangChain", "LangGraph", "LiteLLM", "OpenRouter", "MCP"] },
    { title: "Retrieval y memoria", weight: 2, items: ["Embeddings", "Bases vectoriales", "RAG (agéntico / adaptativo)"] },
    { title: "Confiabilidad y seguridad", weight: 2, items: ["Guardrails", "Evals y automatización de tests", "Anonimización", "Optimización de tokens y latencia", "Tracing"] },
    { title: "Ingeniería y datos", weight: 3, items: ["Python", "FastAPI", "Docker", "Git", "Serverless", "SQL", "dbt", "Airflow", "Tableau", "Power BI"] },
  ],
  jobs: [
    { company: "Aureum", role: "AI Engineer", period: "ago. 2024 – actualidad", featured: true,
      summary: "Complete.dev: plataforma para construir y desplegar sistemas agénticos a medida para clientes.",
      tech: ["Python", "AWS", "LLMs", "Multiagente", "Sandboxing"],
      bullets: [
        "Co-construí una plataforma de chat donde el usuario conversa con agentes autónomos multimodales con acceso a bases de datos, servicios externos, búsqueda web, Git y APIs — y despliega apps listas para consumir desde la conversación.",
        "Diseñé una arquitectura sandbox: cada entorno corre en una VM aislada, lo que limita el alcance de un prompt injection.",
        "Puse en producción sistemas multiagente que combinan código determinístico con IA generativa para automatizar flujos completos de clientes.",
        "Construí capas de caché y ruteo de modelos para no reprocesar cargas de IA caras: menos costo, menos latencia, la misma precisión.",
        "Construí el SBC Analyzer (agentes Classifier + QA + Reflection) y un agente de reporte de errores que anonimiza archivos con un LLM hosteado en la AWS del cliente.",
        "Integré varios proveedores vía LiteLLM y OpenRouter para despliegues agnósticos de modelo, con evals, tracing y tooling de debugging para sistemas no determinísticos.",
      ] },
    { company: "Hotelbeds", role: "Software Developer · Data Engineer", period: "ene. 2023 – oct. 2024",
      summary: "La mayor bedbank del mundo, distribuyendo productos de viaje a una red global.",
      tech: ["SQL", "Python", "dbt", "Airflow", "Tableau", "Jinja"],
      bullets: [
        "Construí un sistema de recomendación para clientes, basado 100% en nuestros propios datos.",
        "Estuve a cargo del back-end del pipeline de datos: ingesta, transformación e infraestructura de serving.",
        "Desarrollé modelos de datos en dbt y los orquesté con Airflow.",
      ] },
    { company: "Rappi", role: "Software Developer · Data Analyst", period: "sep. 2021 – ene. 2023",
      summary: "Unicornio de delivery: más de 10M de usuarios activos por mes, 250 ciudades.",
      tech: ["Python", "SQL", "Snowflake", "Power BI", "Docker", "Airflow"],
      bullets: [
        "Entregué soluciones de datos de punta a punta: desde la generación del dato hasta el producto final de visualización.",
        "Construí modelos de datos para problemas de negocio concretos de las marcas de la plataforma.",
        "Rol mixto entre Data Scientist, Data Engineer y Data Analyst, con automatizaciones de validación e infraestructura.",
      ] },
    { company: "Think Thanks", role: "Data Analyst", period: "oct. 2020 – sep. 2021",
      summary: "Agencia de transformación digital con clientes en América y España.",
      tech: ["Python", "R", "Google Analytics", "Tag Manager", "Data Studio", "Hotjar"],
      bullets: [
        "Extraje, preparé, transformé y limpié datos para proyectos de clientes.",
        "Presenté los hallazgos como dashboards interactivos y amigables para perfiles no técnicos.",
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
  projects: [
    { title: "SBC Analyzer: QA de seguros multiagente", featured: true, tags: ["Multiagente", "Classifier", "Reflection"],
      text: "El cliente sube el PDF de un plan de seguro y un wizard de preguntas anidadas y condicionales. Un agente Classifier, uno de QA y uno de Reflection se reparten el problema, responden cada pregunta y siguen cada camino condicional. Resultado: [X% de precisión sobre N planes]." },
    { title: "Agente de reporte de errores con anonimización", featured: true, tags: ["Anonimización", "Batching", "AWS"],
      text: "Estructura errores de sistema que llegan en cualquier formato. Un LLM potente hosteado en la AWS del cliente anonimiza el archivo por lotes y escribe un JSON de mapeo; los agentes de reporte trabajan sólo sobre datos anonimizados." },
    { title: "Newsletter de IA de punta a punta", featured: true, tags: ["Multiagente", "SEO", "Redes sociales"],
      text: "Un agente de descubrimiento busca en sitios de proveedores de LLM y separa las noticias relevantes del hype y de lo falso, comparando con corridas anteriores. Después, agentes de contenido, SEO y redes escriben y publican lo que vale la pena compartir." },
    { title: "Plataforma agente-a-app (Complete.dev)", featured: true, tags: ["Sandboxing", "Agentes", "Serverless"],
      text: "Agentes de chat con herramientas, bases de datos y APIs que construyen y despliegan apps dentro de VMs aisladas." },
    { title: "Clasificación y ruteo de tickets de Salesforce", featured: true, tags: ["Python", "LLM", "Automatización"],
      text: "Clasifica mails de soporte y dispara la acción correcta. [X%] de los casos resueltos sin humanos." },
    { title: "Agente de IA para clínica dental", featured: true, tags: ["LangGraph", "Herramientas"], link: "https://github.com/your-user/dental-agent",
      text: "Agenda, cancela y reprograma turnos, consulta disponibilidad y responde preguntas de la clínica." },
    { title: "Agente de seguridad para el hogar", featured: true, tags: ["Visión", "LangChain"], link: "https://github.com/your-user/security-agent",
      text: "Analiza cámaras, detecta intrusiones y dispara alertas automáticamente." },
    { title: "Capa de caché para pipelines de IA caros", tags: ["Caché", "Costo"], text: "Evita reprocesar cargas grandes que queman presupuesto de LLM. [X%] menos de costo." },
    { title: "Refactor de legacy y modernización de tests", tags: ["Claude Code", "Testing"], text: "Refactoricé código viejo y reescribí tests automatizados desactualizados para que coincidan con la app actual, usando Claude Code." },
    { title: "Extracción de entidades de mails de turismo", tags: ["Salida estructurada", "LLM"], text: "Convierte mails sin estructura en registros de hotel, habitación y disponibilidad dentro de una base consultable." },
    { title: "Bot de networking y RRHH en LinkedIn", tags: ["Automatización"], text: "Automatización de networking y postulaciones." },
    { title: "+ 15 proyectos previos de ML y datos", tags: ["scikit-learn", "TensorFlow", "Airflow"], text: "Recomendadores, predicción de churn y de precios, CNNs, dashboards y scrapers." },
  ],
  education: [
    { title: "Master's in Digital Business Analytics & Big Data", org: "IEBS", note: "Nota 9.5", featured: true },
    { title: "Deep Learning Professional Program", org: "DeepLearning.AI", featured: true },
    { title: "Machine Learning Specialization", org: "Stanford University", featured: true },
    { title: "Data Analytics Specialization", org: "Google", featured: true },
    { title: "Licenciatura en Ciencias de la Comunicación", org: "UADE", note: "Nota 9" },
  ],
  certs: [
    { title: "AI Agents in LangGraph", org: "DeepLearning.AI & LangChain", featured: true },
    { title: "RAG from Scratch", org: "freeCodeCamp", featured: true },
    { title: "Chatbot Development with LangChain", org: "Platzi", featured: true },
    { title: "dbt Foundations", org: "dbt Labs", featured: true },
    { title: "Generative AI Introduction (Embeddings & Vector DBs)", org: "Codebasics" },
    { title: "ETL and Data Pipelines with Shell, Airflow and Kafka", org: "IBM" },
    { title: "Docker for Data Scientists", org: "LinkedIn Learning" },
    { title: "Neural Networks with TensorFlow", org: "Platzi" },
    { title: "Data Analysis with Python", org: "University of Pennsylvania" },
    { title: "+ 20 más (SQL, Python, R, Kafka, Git, Excel...)", org: "" },
  ],
  treemap: [
    { name: "LLMs y agentes", children: [
      { name: "Claude Code", size: 10 }, { name: "LangGraph / LangChain", size: 8 }, { name: "OpenAI", size: 5 },
      { name: "LiteLLM / OpenRouter", size: 5 }, { name: "MCP", size: 4 } ] },
    { name: "Retrieval y memoria", children: [ { name: "RAG y bases vectoriales", size: 8 }, { name: "Embeddings", size: 7 } ] },
    { name: "Confiabilidad y seguridad", children: [
      { name: "Guardrails", size: 5 }, { name: "Evals y tests", size: 5 }, { name: "Anonimizador", size: 5 }, { name: "Caché", size: 4 } ] },
    { name: "Ingeniería y datos", children: [
      { name: "Python", size: 10 }, { name: "SQL", size: 7 }, { name: "Docker / FastAPI", size: 5 },
      { name: "dbt / Airflow", size: 5 }, { name: "Tableau / BI", size: 4 }, { name: "Git", size: 3 } ] },
  ],
  focus,
  radar: [
    { area: "Arquitecturas de agentes", value: 9.5 },
    { area: "Prompt y contexto", value: 9.5 },
    { area: "Seguridad y evals", value: 8 },
    { area: "RAG y embeddings", value: 8 },
    { area: "Backend y serverless", value: 8.5 },
    { area: "Datos y BI", value: 8 },
    { area: "ML / Deep Learning", value: 7 },
  ],
};

export const content: Record<Lang, Site> = { en, es };
