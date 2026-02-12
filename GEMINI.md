Project Specification: Micromouse Croatia 2026 Website

1. Project Overview

Create a modern, responsive Single Page Application (SPA) for the "Micromouse Croatia 2026" robotics competition. The website serves as a landing page to provide information, display the timeline, showcase sponsors, and allow team registration.

Language: Croatian (hr)
Visual Style: "Dark Mode" with neon accents (Peach, Pink, Purple gradients), tech-inspired fonts, and smooth reveal animations.

2. Technical Stack

Framework: React (Vite recommended)

Styling: Tailwind CSS

Icons: Lucide React or Heroicons (or inline SVGs as specified below)

Animation: CSS Transitions/Keyframes or Framer Motion (for reveal-on-scroll effects)

Containerization: Docker & Docker Compose (Nginx for serving the static build)

3. Design System

Color Palette

Background: Dark Grey (#0f0e13)

Card Background: Darker Grey (#1a1921)

Primary Gradient:

Peach/Orange: #FF9F76

Pink: #FF5E78

Purple: #A64AF5

Text: White/Light Gray (#e5e7eb)

Typography

Headings: 'Orbitron' (Google Fonts) - Tech/Sci-fi feel

Body: 'Inter' (Google Fonts) - Clean and readable

4. Architecture & Data Management

Requirement: The content for the Timeline and Sponsors must be separated from the view logic to allow easy updates.

Create a file src/data/config.js (or .ts) containing:

timelineData: Array of objects { title, description, date, iconType }

sponsorsData: Array of objects { name, tier, logoUrl (optional), placeholderText }

competitionStats: Array of objects { value, label, color }

5. Component Breakdown

A. Global Elements

Smooth Scroll: Enable smooth scrolling for anchor links.

Scroll Reveal: Elements should fade in and slide up as the user scrolls down.

Background: Static background with subtle "glow orbs" (blurred circles) in brand colors (Purple top-left, Orange bottom-right).

B. Navigation (Navbar.jsx)

Type: Sticky, backdrop-blur (bg-dark-bg/80).

Logo: "MICROMOUSE" (Text) + SVG Icon (Maze/Mouse abstract).

Links: O Natjecanju (#about), Raspored (#timeline), Što je Micromouse? (#what-is), Sponzori (#sponsors).

CTA: "Prijavi se" button (Gradient background).

C. Hero Section (Hero.jsx)

Content:

H1: "MicroMouse" (Large, Orbitron font, Gradient Text: Orange).

H2: "CROATIA 2026" (White with Purple accent on year).

Subtitle: "Najbrži miš u labirintu pobjeđuje."

Actions: Two buttons: "Prijavi Tim" (Outline with glow) and "Saznaj više" (Text link with arrow).

Visuals: A smooth gradient fade at the bottom blending into the next section.

D. About Section (About.jsx)

Grid: 2 Columns.

Left Col: Text description of the competition + 3 Stats Cards (16x16 Maze size, 3m/s+ Speed, 10min Time limit).

Right Col: Abstract decorative visual (CSS-based maze pattern or SVG) with a pulsing dot representing the mouse.

E. Timeline Section (Timeline.jsx)

Layout: Vertical line down the center.

Items: Alternating left/right alignment.

Data Source: Map through timelineData from config.

Styling: Each item has a date badge, title, and description.

F. Media Section (VideoSection.jsx)

Content: "Što je Micromouse?" title.

Embed: YouTube Video (Veritasium: https://www.youtube.com/watch?v=ZMQbHMgK2rw).

Styling: Custom video container with a glowing border effect.

G. Sponsors Section (Sponsors.jsx)

Layout: Responsive Grid (1 col mobile, 3 cols desktop).

Data Source: Map through sponsorsData from config.

Placeholder: If no logo is provided, show a glass-morphism card with "TBA" or the sponsor name in text.

H. Footer (Footer.jsx)

Content: Copyright © 2026, Social Links, Rules, Contact.

I. Registration Modal (RegisterModal.jsx)

Trigger: Clicking "Prijavi se" or "Prijavi Tim".

State: Hidden by default, appears with a backdrop blur.

Content: Simple form (Email input) to notify users when registrations open.

6. Dockerization Requirements

Provide the necessary files to run this in a containerized environment.

Dockerfile:

Stage 1 (Build): Node.js base image, install dependencies, run npm run build.

Stage 2 (Production): Nginx Alpine image, copy build artifacts to /usr/share/nginx/html.

docker-compose.yml:

Service named web.

Maps port 80 or 3000 to the container port.

Restarts always.

7. Implementation Steps

Initialize Vite React project with Tailwind.

Setup tailwind.config.js with the specific brand colors and fonts.

Create the src/data/config.js file.

Build components.

Assemble in App.jsx.

Create Docker config files.
