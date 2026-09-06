<!-- =========================
  Portfolio • Gabriel Aguiar
========================= -->

<p align="center">
  <img src="./assets/readme/cover.png" alt="Gabriel Aguiar - Portfolio" />
</p>

<h1 align="center">Gabriel Aguiar</h1>

<p align="center">
  Developer focused on building modern, high-performance, and well-structured digital experiences.<br/>
  <sub>Mobile • Front-end • Software Engineering</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/GabrielAguiarDev/portfolio?style=for-the-badge" />
  <img src="https://img.shields.io/github/repo-size/GabrielAguiarDev/portfolio?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://www.gabrielaguiar.dev">🌐 Portfolio</a> •
  <a href="#about">About</a> •
  <a href="#stack">Stack</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#running-locally">Running locally</a>
</p>

---
<a id="about"></a>
## ✨ About

This repository contains the **source code of my personal portfolio**, where I showcase my projects, experience, and the way I approach software development.

The focus goes beyond visuals and includes:

- **Clean and scalable architecture**
- **Good coding practices**
- **Performance and user experience**
- **Long-term maintainability**

The portfolio works as a **technical business card**, showing not only _what_ I build, but _how_ I build it.

---

## 🎯 Project goals

- Centralize my projects and professional experience
- Demonstrate technical expertise in modern front-end development
- Serve as an evolving base for new experiments and ideas
- Make professional contact easier

---
<a id="stack"></a>
## 🧰 Stack

<p>
  <img src="https://skillicons.dev/icons?i=ts,react,vite,tailwind,html,css,git,github,vercel&perline=9" />
</p>

**Main technologies**

- **TypeScript**
- **React 18** (single-page app, `react-router-dom`)
- **Vite 5** — dev server and build
- **Tailwind CSS 3** + **shadcn/ui** (Radix primitives)
- **react-i18next** — PT/EN with browser language detection
- **GSAP + ScrollTrigger** and **Lenis** — scroll-linked motion, code-split and loaded after the LCP
- **Package manager:** npm
- **Deployment:** Vercel

> The stack was chosen with a strong focus on **developer experience**, **performance**, **SEO**, and **scalability**.

---

## 🧠 Technical highlights

- Well-defined component structure
- Responsive layout (mobile-first — mobile is the primary target, not a reduced version)
- Scroll-driven motion: word-by-word heading reveals, `IntersectionObserver` reveals,
  parallax and a self-drawing experience timeline
- Every timing, easing, delay and parallax amplitude lives in one file,
  [`src/animation/config.ts`](src/animation/config.ts), including master on/off switches
- `prefers-reduced-motion` is respected: the animation libraries are never even fetched,
  and content renders in its final state
- Animation is a progressive enhancement — if the motion chunk fails to load,
  the page stays fully readable and navigable
- Skill icons are self-hosted and lazily loaded rather than pulled from third-party CDNs
- Basic SEO best practices applied
- Clean, readable, and maintainable code

---

## 🚀 Live version

🔗 **Access the portfolio:**  
👉 https://www.gabrielaguiar.dev

---
<a id="screenshots"></a>
## 🖼️ Screenshots

<p align="center">
  <img src="./assets/readme/screen-about.png" alt="About section" width="90%" />
  <img src="./assets/readme/screen-experience.png" alt="Projects section" width="90%" />
  <img src="./assets/readme/screen-skills.png" alt="Projects section" width="90%" />
  <img src="./assets/readme/screen-projects.png" alt="Projects section" width="90%" />
</p>

---
<a id="running-locally"></a>
## ⚙️ Running locally

### Requirements

- Node.js `>= 18`
- npm (the repository ships a single `package-lock.json`; please don't add another lockfile)

### Clone the repository

```bash
git clone https://github.com/GabrielAguiarDev/portfolio.git
cd portfolio
```

### Install and run

```bash
npm install
npm run dev      # http://localhost:8080
```

### Other scripts

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
```
