import type { Site } from "./data";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const chips = (items: string[]) =>
  `<div class="pdf-chips">${items.map((i) => `<span>${esc(i)}</span>`).join("")}</div>`;

/** Section title block. Each is its own pagination block so a section can start on a new page. */
const section = (title: string) =>
  `<div class="p-block pdf-sec"><h2><i></i>${esc(title)}</h2></div>`;

/** Same title, but nested inside a block (not a pagination unit of its own). */
const sectionInner = (title: string) =>
  `<div class="pdf-sec"><h2><i></i>${esc(title)}</h2></div>`;

const cleanLink = (href: string) =>
  href.replace(/^mailto:/, "").replace(/^https:\/\/(www\.)?/, "");

/**
 * Builds the printable document as flat blocks. The caller measures each `.p-block`
 * and distributes them into A4 sheets, so nothing is ever cut mid-card.
 */
export function buildPrintDoc(c: Site): string {
  const t = c.ui;
  const p = c.profile;

  const header = `
    <div class="p-block pdf-header">
      <h1>${esc(p.name)}</h1>
      <p class="pdf-sub"><span class="pdf-dot"></span>${esc(p.role)} · ${esc(p.available)}</p>
      <p class="pdf-contact">${esc(cleanLink(p.links.email))} · ${esc(cleanLink(p.links.github))} · ${esc(cleanLink(p.links.linkedin))}</p>
    </div>`;

  const profile = `
    <div class="p-block pdf-profile">
      <div class="pdf-photo"><img src="${esc(p.photo)}" alt="" /></div>
      <div class="pdf-facts">
        <dl>
          <div><dt>${esc(t.factInterest)}</dt><dd>${esc(p.interest)}</dd></div>
          <div><dt>${esc(t.factPreference)}</dt><dd>${esc(p.preference)}</dd></div>
          <div><dt>${esc(t.factExperience)}</dt><dd>${esc(p.experience)}</dd></div>
          <div><dt>${esc(t.factLanguages)}</dt><dd>${esc(p.languages)}</dd></div>
        </dl>
        <p class="pdf-tagline">${esc(p.tagline)}</p>
      </div>
    </div>`;

  const tools = `
    ${section(t.panelTools)}
    <div class="p-block pdf-tools">
      ${c.toolGroups.map((g, i) => `
        <div class="pdf-tool">
          <b><i style="background:${["#f7c948", "#eba33c", "#fbeabb", "#c9ccd6"][i % 4]}"></i>${esc(g.title)}</b>
          ${chips(g.items)}
        </div>`).join("")}
    </div>`;

  const skills = `
    ${section(t.panelRadar)}
    <div class="p-block pdf-bars">
      ${c.radar.map((r) => `
        <div class="pdf-bar">
          <span>${esc(r.area)}</span>
          <i><b style="width:${r.value * 10}%"></b></i>
          <em>${r.value}</em>
        </div>`).join("")}
    </div>`;

  const experience = `
    ${section(t.panelExp)}
    ${c.jobs.map((j) => `
      <div class="p-block pdf-job${j.featured ? " now" : ""}">
        <div class="pdf-job-head">
          <b>${esc(j.company)}</b>
          <span class="pdf-pill">${esc(j.period)}</span>
        </div>
        <div class="pdf-role">${esc(j.role)}</div>
        <p class="pdf-sum">${esc(j.summary)}</p>
        <ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        ${chips(j.tech)}
      </div>`).join("")}`;

  const projects = `
    ${section(t.panelProjects)}
    ${c.projects.map((pr) => `
      <div class="p-block pdf-project">
        <div class="pdf-proj-head">
          <b>${esc(pr.title)}</b>
          ${chips(pr.tags)}
        </div>
        <p>${esc(pr.text)}</p>
      </div>`).join("")}`;

  // Education and certifications sit side by side: they are short lists and this keeps the last page balanced.
  const eduCerts = `
    <div class="p-block pdf-grid2">
      <div>
        ${sectionInner(t.panelEdu)}
        <div class="pdf-list">
          ${c.education.map((e) => `
            <div class="pdf-row">
              <b>${esc(e.title)}</b>
              <span>${esc(e.org)}${e.note ? ` · ${esc(e.note)}` : ""}</span>
            </div>`).join("")}
        </div>
      </div>
      <div>
        ${sectionInner(t.panelCerts)}
        <div class="pdf-list">
          ${c.certs.filter((x) => x.featured).map((x) => `
            <div class="pdf-row"><b>${esc(x.title)}</b><span>${esc(x.org)}</span></div>`).join("")}
        </div>
      </div>
    </div>`;

  return header + profile + tools + skills + experience + projects + eduCerts;
}
