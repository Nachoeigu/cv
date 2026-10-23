import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
  ResponsiveContainer, Tooltip, Treemap, XAxis, YAxis } from "recharts";
import { Award, Briefcase, ChevronRight, Download, ExternalLink, FolderGit2, GraduationCap, Github, Linkedin, Mail,
  Radar as RadarIcon, TrendingUp, User, Wrench, X, type LucideIcon } from "lucide-react";
import { content, type Lang } from "./data";
import { buildPrintDoc } from "./printDoc";

type Key = "exp" | "proj" | "edu" | "cert";
const groupColors = ["#f7c948", "#eba33c", "#fbeabb", "#c9ccd6"];
const tip = { background: "#17181b", border: "1px solid #3a3b44", borderRadius: 8, fontSize: 12, color: "#ececec" };

function Panel({ title, icon: Icon, action, className = "", children }:
  { title: string; icon: LucideIcon; action?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <section className={`panel ${className}`}>
      <header><h2><Icon size={16} aria-hidden />{title}</h2>{action}</header>
      <div className="body">{children}</div>
    </section>
  );
}

// Greedy wrap that never ellipsizes: it breaks on spaces and keeps short connectors
// ("&", "/", "+") glued to the previous word, so no line starts with a dangling symbol.
function wrap(name: string, max: number) {
  const words = name.replace(/\//g, "/ ").split(/\s+/);
  const lines: string[] = []; let cur = "";
  for (const w of words) {
    const glue = /^[/&+]$/.test(w);
    const t = cur ? (cur.endsWith("/") ? cur + w : cur + " " + w) : w;
    if (t.length > max && cur && !glue) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

function Cell(p: any) {
  const { x, y, width, height, name, depth, root, groups, onPick, active } = p;
  if (depth < 2) return null;
  const gi = groups.indexOf(root.name);
  const dim = active && active !== root.name;
  const label = String(name);
  const pad = width > 70 ? 18 : 8;
  const avail = width - pad;
  const maxLines = height >= 66 ? 3 : height >= 38 ? 2 : 1;
  // Fit by shrinking the type instead of cutting the word: 0.67em ≈ Montserrat 700 advance.
  // If even the smallest size overflows, fall back to the first word; if that fails too, no label.
  let fs = 12.5, lines: string[] = [];
  const fit = (text: string) => {
    let size = 12.5, ls: string[] = [];
    while (size >= 6.25) {
      ls = wrap(text, Math.max(3, Math.floor(avail / (size * 0.67))));
      if (Math.max(...ls.map((l) => l.length)) * size * 0.67 <= avail) return { size, ls, ok: true };
      size -= 0.25;
    }
    return { size: 12.5, ls, ok: false };
  };
  if (width >= 44 && height >= 26) {
    const full = fit(label);
    // The full label may fit the width yet need more lines than the cell is tall — then try the first word.
    const short = full.ok && full.ls.length <= maxLines ? null : fit(label.split(" ")[0]);
    const pick = full.ok && full.ls.length <= maxLines ? full : short?.ok && short.ls.length <= maxLines ? short : null;
    if (pick) { fs = pick.size; lines = pick.ls; }
  }
  // Tall, narrow cell and no horizontal fit? Rotate the label instead of leaving it blank.
  let vertical = false;
  if (!lines.length && width >= 20 && height >= 46 && height > width) {
    const size = Math.min(11.5, (height - pad) / (label.length * 0.67));
    if (size >= 7) { fs = size; lines = [label]; vertical = true; }
  }
  const cx = x + width / 2, cy = y + height / 2;
  const lh = fs * 1.25;
  const y0 = y + (height - lines.length * lh) / 2 + fs * 0.92;
  return (
    <g className="cell" onClick={() => onPick(root.name)} opacity={dim ? 0.28 : 1}>
      <rect x={x + 1} y={y + 1} width={Math.max(0, width - 2)} height={Math.max(0, height - 2)} rx={8} fill={groupColors[gi % 4]}><title>{label}</title></rect>
      {vertical
        ? <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" transform={`rotate(-90 ${cx} ${cy})`}
            fill="#17181b" fontSize={fs} fontWeight={700} fontFamily="Montserrat, sans-serif">{label.replace("/ ", "/")}</text>
        : lines.map((l: string, i: number) => (
          <text key={i} x={x + pad / 2} y={y0 + i * lh} fill="#17181b" fontSize={fs} fontWeight={700} fontFamily="Montserrat, sans-serif">{l.replace("/ ", "/")}</text>))}
    </g>
  );
}

// Radar labels wrap onto two lines instead of being clipped on narrow screens.
function AngleTick({ x, y, payload, textAnchor }: any) {
  const value = String(payload.value);
  const lines = wrap(value, Math.ceil(value.length / 2) + 2).slice(0, 2);
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="#d8d8dd" fontSize={11} fontFamily="Montserrat, sans-serif">
      {lines.map((l, i) => <tspan key={i} x={x} dy={i === 0 ? (lines.length > 1 ? -5 : 0) : 12}>{l}</tspan>)}
    </text>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof localStorage === "undefined" ? null : localStorage.getItem("cv-lang");
    return saved === "es" || saved === "en" ? saved : "en";
  });
  const [modal, setModal] = useState<Key | null>(null);
  const [group, setGroup] = useState<string | null>(null);
  const [photoOk, setPhotoOk] = useState(true);
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const toggleJob = (c: string) => setExpanded((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  const c = content[lang];
  const t = c.ui;
  const { profile, jobs, projects, education, certs, toolGroups, treemap, focus, radar } = c;
  const groupNames = treemap.map((g) => g.name);
  const feat = <T extends { featured?: boolean }>(a: T[]) => a.filter((x) => x.featured);
  const more = (all: unknown[], shown: unknown[]) => all.length - shown.length;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
    try { localStorage.setItem("cv-lang", lang); } catch { /* private mode */ }
  }, [lang, t.title]);

  useEffect(() => {
    if (!modal) { setExpanded([]); return; }
    const h = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [modal]);

  const tabs: { key: Key; label: string; icon: LucideIcon; count: number }[] = [
    { key: "exp", label: t.tabExp, icon: Briefcase, count: jobs.length },
    { key: "proj", label: t.tabProj, icon: FolderGit2, count: projects.length },
    { key: "edu", label: t.tabEdu, icon: GraduationCap, count: education.length },
    { key: "cert", label: t.tabCert, icon: Award, count: certs.length },
  ];
  const seeAll = (k: Key, n: number) => <button className="more" onClick={() => setModal(k)}>{n > 0 ? t.more(n) : t.viewAll}<ChevronRight size={14} /></button>;
  const activeItems = toolGroups.find((g) => g.title === group)?.items;

  // Builds a paginated A4 document with the full content (everything the modals hide on screen),
  // laid out with the same visual language as the site.
  const downloadPdf = async () => {
    if (busy) return;
    setBusy(true);
    const host = document.createElement("div");
    host.className = "pdf-doc";
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      host.innerHTML = `<div class="pdf-measure">${buildPrintDoc(c)}</div>`;
      document.body.appendChild(host);
      await document.fonts.ready;
      await Promise.all(Array.from(host.querySelectorAll("img"), (img) => img.decode().catch(() => {})));

      const PAGE_W = 794, PAGE_H = 1123, GAP = 10;
      const usable = PAGE_H - 42 - 26 - 4; // top padding + footer + slack
      const sheets: HTMLElement[] = [];
      const newSheet = () => {
        const s = document.createElement("div");
        s.className = "pdf-sheet";
        s.innerHTML = `<div class="pdf-body"></div><div class="pdf-foot"><span>${profile.name} · ${profile.role}</span><span></span></div>`;
        host.appendChild(s);
        sheets.push(s);
        return s;
      };
      let sheet = newSheet();
      let body = sheet.querySelector(".pdf-body") as HTMLElement;
      // Blocks are appended where they will live, then measured: no drift between measuring and rendering.
      const blocks = Array.from(host.querySelectorAll<HTMLElement>(".p-block"));
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        // A section title travels with the block that follows it, so it never hangs alone at the bottom.
        const pair = block.classList.contains("pdf-sec") && blocks[i + 1] ? [block, blocks[i + 1]] : [block];
        pair.forEach((b) => body.appendChild(b));
        const usable = body.clientHeight;
        if (body.scrollHeight > usable && body.children.length > pair.length) {
          sheet = newSheet();
          body = sheet.querySelector(".pdf-body") as HTMLElement;
          pair.forEach((b) => body.appendChild(b));
        }
        if (pair.length === 2) i++;
      }
      sheets.forEach((s, i) => { s.querySelectorAll(".pdf-foot span")[1].textContent = `${i + 1} / ${sheets.length}`; });

      const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true });
      const images: string[] = [];
      for (let i = 0; i < sheets.length; i++) {
        const canvas = await html2canvas(sheets[i], {
          scale: 2, backgroundColor: "#131417", logging: false, useCORS: true,
          width: PAGE_W, height: PAGE_H, windowWidth: PAGE_W, windowHeight: PAGE_H,
        });
        const img = canvas.toDataURL("image/jpeg", 0.95);
        images.push(img);
        if (i > 0) pdf.addPage();
        pdf.addImage(img, "JPEG", 0, 0, 595.28, 841.89);
      }
      if (import.meta.env.DEV) (window as any).__cvPdf = images;
      pdf.save(`Ignacio-Eiguren-CV-${lang.toUpperCase()}.pdf`);
    } finally {
      host.remove();
      setBusy(false);
    }
  };

  return (
    <main className="page">
      <header className="top">
        <div>
          <h1>{profile.name}</h1>
          <p className="sub"><span className="dot" />{profile.available}</p>
        </div>
        <div className="tools">
          <button className="pdf" onClick={downloadPdf} disabled={busy} aria-label={t.ariaDownload} title={t.ariaDownload}>
            <Download size={16} aria-hidden /><span>{busy ? t.pdfBusy : t.pdf}</span>
          </button>
          <div className="lang" role="group" aria-label={t.ariaLang}>
            {(["en", "es"] as Lang[]).map((l) => (
              <button key={l} className={lang === l ? "on" : ""} onClick={() => setLang(l)} aria-pressed={lang === l}>{l.toUpperCase()}</button>))}
          </div>
          <nav aria-label={t.ariaSocial}>
            <a href={profile.links.email} aria-label="Email"><Mail size={19} /></a>
            <a href={profile.links.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={19} /></a>
            <a href={profile.links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={19} /></a>
          </nav>
        </div>
      </header>

      <div className="bento">
        <Panel title={t.panelProfile} icon={User} className="c5">
          <div className="profile">
            <div className="photo">
              {photoOk ? <img src={profile.photo} alt={profile.name} onError={() => setPhotoOk(false)} /> : <span>IE</span>}
              <strong>{profile.role}</strong>
            </div>
            <div className="facts">
              <dl>
                <div><dt>{t.factInterest}</dt><dd>{profile.interest}</dd></div>
                <div><dt>{t.factPreference}</dt><dd>{profile.preference}</dd></div>
                <div><dt>{t.factExperience}</dt><dd>{profile.experience}</dd></div>
                <div><dt>{t.factLanguages}</dt><dd>{profile.languages}</dd></div>
              </dl>
            </div>
            <p className="tagline">{profile.tagline}</p>
          </div>
        </Panel>

        <Panel title={t.panelTools} icon={Wrench} className="c7">
          <div className="tm">
            <ResponsiveContainer width="100%" height="100%" minHeight={230}>
              <Treemap data={treemap} dataKey="size" isAnimationActive={false}
                content={<Cell groups={groupNames} onPick={(g: string) => setGroup(group === g ? null : g)} active={group} />} />
            </ResponsiveContainer>
          </div>
          <LayoutGroup>
            <div className="groups">
              {toolGroups.map((g, i) => (
                <button key={g.title} className={group === g.title ? "on" : ""} onClick={() => setGroup(group === g.title ? null : g.title)} aria-pressed={group === g.title}>
                  <i style={{ background: groupColors[i % 4] }} />{g.title}
                </button>))}
            </div>
            <AnimatePresence initial={false}>
              {activeItems && (
                <motion.p key={group} className="chips" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  {activeItems.map((i) => <span key={i}>{i}</span>)}
                </motion.p>)}
            </AnimatePresence>
          </LayoutGroup>
        </Panel>

        <Panel title={t.panelRadar} icon={RadarIcon} className="c5">
          <div className="chart" role="img" aria-label={t.ariaRadar}>
            <ResponsiveContainer width="100%" height="100%" minHeight={270}>
              <RadarChart data={radar} outerRadius="70%" margin={{ top: 10, right: 50, bottom: 10, left: 50 }}>
                <PolarGrid stroke="#3a3b44" />
                <PolarAngleAxis dataKey="area" tick={<AngleTick />} />
                <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
                <Tooltip contentStyle={tip} />
                <Radar dataKey="value" name={t.chartDepth} stroke="#f7c948" strokeWidth={2} fill="#f7c948" fillOpacity={0.28} dot={{ r: 3, fill: "#f7c948", strokeWidth: 0 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title={t.panelExp} icon={Briefcase} className="c7" action={seeAll("exp", jobs.length - 4)}>
          <ul className="rows">
            {jobs.slice(0, 4).map((j) => (
              <li key={j.company}><button onClick={() => setModal("exp")}>
                <b>{j.company}</b><span title={j.summary}>{j.summary}</span><ChevronRight size={16} /></button></li>))}
          </ul>
        </Panel>

        <Panel title={t.panelEvolution} icon={TrendingUp} className="c5">
          <div className="chart" role="img" aria-label={t.ariaEvolution}>
            <ResponsiveContainer width="100%" height="100%" minHeight={230}>
              <AreaChart data={focus} margin={{ top: 12, right: 18, left: -14, bottom: 0 }}>
                <defs>
                  <linearGradient id="gAi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7c948" stopOpacity={0.95} /><stop offset="1" stopColor="#f7c948" stopOpacity={0.55} /></linearGradient>
                </defs>
                <CartesianGrid stroke="#2e2f36" vertical={false} />
                <XAxis dataKey="year" stroke="#8d8e98" fontSize={11} tickLine={false} />
                <YAxis stroke="#8d8e98" fontSize={11} unit="%" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tip} />
                <Area type="monotone" dataKey="bi" name={t.legendData} stackId="1" stroke="#7c7d88" fill="#4a4b55" />
                <Area type="monotone" dataKey="ml" name={t.legendMl} stackId="1" stroke="#eba33c" fill="#eba33c" fillOpacity={0.55} />
                <Area type="monotone" dataKey="ai" name={t.legendAi} stackId="1" stroke="#f7c948" fill="url(#gAi)" />
              </AreaChart>
            </ResponsiveContainer>
            <ul className="legend"><li><i style={{ background: "#4a4b55" }} />{t.legendData}</li><li><i style={{ background: "#eba33c" }} />{t.legendMl}</li><li><i style={{ background: "#f7c948" }} />{t.legendAi}</li></ul>
          </div>
        </Panel>

        <Panel title={t.panelProjects} icon={FolderGit2} className="c7" action={seeAll("proj", more(projects, feat(projects).slice(0, 4)))}>
          <ul className="rows">
            {feat(projects).slice(0, 4).map((p) => (
              <li key={p.title}><button onClick={() => setModal("proj")}>
                <b>{p.title}</b><span>{p.tags.join(" · ")}</span><ChevronRight size={16} /></button></li>))}
          </ul>
        </Panel>

        <Panel title={t.panelEdu} icon={GraduationCap} className="c6" action={seeAll("edu", more(education, feat(education)))}>
          <ul className="rows two-line">{feat(education).map((e) => (<li key={e.title}><div><b>{e.title}</b><span>{e.org}</span></div></li>))}</ul>
        </Panel>
        <Panel title={t.panelCerts} icon={Award} className="c6" action={seeAll("cert", more(certs, feat(certs)))}>
          <ul className="rows two-line">{feat(certs).map((x) => (<li key={x.title}><div><b>{x.title}</b><span>{x.org}</span></div></li>))}</ul>
        </Panel>
      </div>

      <footer>{t.footer}</footer>

      <AnimatePresence>
        {modal && (
          <motion.div className="backdrop" onClick={() => setModal(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal" role="dialog" aria-modal="true" aria-label={t.ariaDialog} onClick={(e) => e.stopPropagation()}
              initial={{ y: 24, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 16, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}>
              <header>
                <nav className="tabs" role="tablist" aria-label={t.ariaSections}>
                  {tabs.map((x) => (
                    <button key={x.key} role="tab" aria-selected={modal === x.key} className={modal === x.key ? "on" : ""} onClick={() => setModal(x.key)}>
                      <x.icon size={15} aria-hidden />{x.label}<small>{x.count}</small>
                      {modal === x.key && <motion.i layoutId="tab" className="ink" />}
                    </button>))}
                </nav>
                <button className="close" onClick={() => setModal(null)} aria-label={t.ariaClose} autoFocus><X size={18} /></button>
              </header>
              <div className="modal-body" key={modal}>
                {modal === "exp" && (
                  <ol className="timeline">
                    {jobs.map((j) => {
                      const limit = j.featured ? 3 : 2;
                      const isOpen = expanded.includes(j.company);
                      const shown = isOpen ? j.bullets : j.bullets.slice(0, limit);
                      const rest = j.bullets.length - limit;
                      return (
                        <li key={j.company} className={j.featured ? "now" : ""}>
                          <div className="t-head"><h3>{j.company}</h3><span className="pill">{j.period}</span></div>
                          <p className="role">{j.role}</p><p className="muted">{j.summary}</p>
                          <ul>{shown.map((b) => <li key={b}>{b}</li>)}</ul>
                          {rest > 0 && (
                            <button className="more-lite" onClick={() => toggleJob(j.company)} aria-expanded={isOpen}>
                              {isOpen ? t.showLess : t.more(rest)}
                            </button>)}
                          <p className="chips tech">{j.tech.map((x) => <span key={x}>{x}</span>)}</p>
                        </li>);
                    })}
                  </ol>)}
                {modal === "proj" && (
                  <div className="cards">
                    {projects.map((p) => (
                      <article key={p.title} className={`card ${p.featured ? "hl" : ""}`}>
                        <h3>{p.title}{p.link && <a href={p.link} target="_blank" rel="noreferrer" aria-label={t.ariaRepo}><ExternalLink size={15} /></a>}</h3>
                        <p>{p.text}</p>
                        <p className="chips">{p.tags.map((x) => <span key={x}>{x}</span>)}</p>
                      </article>))}
                  </div>)}
                {modal === "edu" && <div className="cards">{education.map((e) => (
                  <article key={e.title} className="card"><h3>{e.title}</h3><p className="muted">{e.org}{e.note ? ` · ${e.note}` : ""}</p></article>))}</div>}
                {modal === "cert" && <div className="cards">{certs.map((x) => (
                  <article key={x.title} className="card"><h3>{x.title}</h3>{x.org && <p className="muted">{x.org}</p>}</article>))}</div>}
              </div>
            </motion.div>
          </motion.div>)}
      </AnimatePresence>
    </main>
  );
}
