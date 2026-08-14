# Egabo Aaron — Software Engineer Portfolio

<p align="center">
  <img src="assets/portfolio-banner.png" alt="Egabo Aaron portfolio preview" width="100%" />
</p>

<p align="center">
  <a href="mailto:aaronegabo@gmail.com"><img src="https://img.shields.io/badge/-aaronegabo@gmail.com-c0392b?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://github.com/EGABO-TECH"><img src="https://img.shields.io/badge/-GitHub--EGABO--TECH-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://www.linkedin.com/in/egaboaaron"><img src="https://img.shields.io/badge/-LinkedIn--egaboaaron-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://x.com/WanEgabo"><img src="https://img.shields.io/badge/-X--@WanEgabo-1DA1F2?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a>
</p>

---

## 🚀 Overview

This repository houses the source code for my professional portfolio website. It is designed to be a high-performance, cinematic, and editorial statement of craftsmanship. The portfolio showcases my engineering focus: building **reliable, offline-resilient, and community-focused systems** for emerging markets in compliance with the **Sustainable Development Goals (SDGs)** and **EdTech** sectors.

Instead of a generic template, this application is a custom-built, modern frontend showcase integrating interactive physics animations, real-time external data fetching, and an optimized cinematic experience.

---

## ✨ Key Features & Interactive Architecture

### 1. Cinematic Hero & Physics Canvas
- **Dynamic Greeting**: A time-synchronized cinematic letter-reveal overlay that ties into the background video progression.
- **Interactive Fluid Physics**: Overlay canvas running a high-fidelity WebGL fluid simulation (`webgl-fluid`) responding dynamically to user mouse moves and hover gestures, maintaining smooth rendering frames.

### 2. High-Performance Static Scroll
- **Zero-Lag Navigation**: Scroll-reveal transitions are statically pre-rendered to prevent layouts from flickering or delaying as elements enter the viewport.
- **Stagger-Free Loading**: Grid elements and project rows are fully visible and readable instantly as the user scrolls, improving SEO accessibility and visual page performance.

### 3. Flagship Projects Showcase
Structured profiles of full-stack builds with distinct technical architectures:
- **ESMS**: A multi-tenant university management system with Uganda Shilling financial workflows and local APIs.
- **MedSwift**: Offline-first pharmaceutical auditing Progressive Web App (PWA) with a multi-tier AI fallback pipeline.
- **Accommodate-Me**: Secure housing portal connecting university students with verified landlords.

### 4. Technical Arsenal
- A custom, responsive icon grid representing my full toolbelt across programming languages, backend frameworks, database engines, deployment environments, and AI tooling.

### 5. Social & Content Integration
- **Live YouTube Feed**: Dynamically requests the latest shadow-analysis and dark psychology breakdown videos from the **YinAndYangShadow** channel via client-side XML-to-JSON parsing.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Core Architecture** | React 19 (TypeScript), Vite |
| **Styling & Layout** | Tailwind CSS v4, Custom Liquid Glassmorphism CSS layers |
| **Graphics & Interaction** | Three.js, React Three Fiber, `webgl-fluid` |
| **Motion Orchestration** | Framer Motion (Optimized for instant scroll-views) |
| **Icons & Media** | Lucide React, Google Fonts |

---

## 📁 Repository Structure

```text
Portfolio/
├── assets/                     # Root preview banner and imagery assets
├── public/                     # Public files, maps, and metadata
├── src/
│   ├── assets/                 # Component-specific asset resources and PDF resumes
│   ├── components/
│   │   ├── FluidBackground.tsx # WebGL Fluid canvas simulation hook
│   │   ├── HeroSection.tsx     # Cinematic video header and navbar layout
│   │   ├── SkillsGrid.tsx      # Statically aligned tech stack card grid
│   │   └── SocialFeeds.tsx     # Dynamics Youtube channel RSS feed connector
│   ├── lib/
│   │   └── motionVariants.ts   # Core animation and transition definitions (Zero-lag scroll overrides)
│   ├── utils/
│   │   └── fluid.js            # Custom fluid physics engine core
│   ├── App.tsx                 # Main layout coordinator and flagship showcase section
│   ├── index.css               # Base CSS stylesheet & Tailwind theme definitions
│   └── main.tsx                # Application bootstrap and root rendering
├── package.json                # Project dependencies and workspace scripts
└── tsconfig.json               # TypeScript compiler configuration mapping
```

---

## 💻 Local Development Setup

### Prerequisites
Make sure you have the following tools installed locally:
- [Node.js](https://nodejs.org/) (Version 18 or above recommended)
- [npm](https://www.npmjs.com/) (or another preferred package manager like `yarn` or `pnpm`)

### 1. Clone the Repository
```bash
git clone https://github.com/EGABO-TECH/Portfolio-Rework.git
cd Portfolio-Rework
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
Spins up a local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the site.

### 4. Build and Preview Production Release
To compile the code and build optimized static assets:
```bash
npm run build
```
To run a local server previewing the compiled production bundle:
```bash
npm run preview
```

### 5. Linting and Static Checks
Runs TypeScript checks and static linting to ensure code standards and type safety:
```bash
npm run lint
```

---

## 🎨 Design System & Custom Layer Styling

The website styling utilizes custom theme tokens extending Tailwind v4:
- **Typography**: Editorial headlines are styled using `Instrument Serif` (serif), while body text utilizes `Barlow` (sans-serif) for high legibility.
- **Liquid Glass**: CSS layers (`.liquid-glass`, `.liquid-glass-strong`) incorporate saturation filters, high-blur backdrops, and subtle inner borders to achieve a frosted-glass, premium visual aesthetic.
- **Performance Adjustments**: Animation configurations are centralized inside `src/lib/motionVariants.ts` to allow easy switches between animated entrance modes and instant layout modes.

---

## 🤝 Contact & Collaboration

If you would like to discuss software engineering projects, system architecture, remote contracts, or SDG-compliant product designs, get in touch:

- ✉️ **Email**: [aaronegabo@gmail.com](mailto:aaronegabo@gmail.com)
- 🖥️ **GitHub**: [EGABO-TECH](https://github.com/EGABO-TECH)
- 💼 **LinkedIn**: [egaboaaron](https://www.linkedin.com/in/egaboaaron)
- 🐦 **X (Twitter)**: [@WanEgabo](https://x.com/WanEgabo)

---

© 2026 Egabo Aaron. All rights reserved. Built with precision and care.
