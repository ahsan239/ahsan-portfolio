# **📄 Product Requirements Document (PRD)**

# **🚀 Professional Software Developer Portfolio (Next.js \+ Sanity \+ Vercel)**

---

## **1️⃣ Project Overview**

A high-performance, SEO-optimized, content-driven developer portfolio built using **Next.js (App Router)** and **Sanity.io**, deployed on **Vercel**.

The platform allows dynamic project and experience management via CMS without redeployment, while maintaining top-tier performance and clean UI.

---

## **2️⃣ Core Objectives**

* Showcase technical projects professionally  
* Demonstrate modern full-stack architecture  
* Achieve Lighthouse score \> 90  
* Enable easy content management  
* Ensure scalability and maintainability  
* Impress recruiters with production-level stack

---

# **3️⃣ Functional Requirements**

## **🔹 3.1 Dynamic Project Showcase**

* Fetch projects from Sanity CMS  
* Display:  
  * Title  
  * Thumbnail  
  * Summary  
  * Tech Stack (tags)  
  * Demo link  
  * GitHub link  
* Each project must have a **dynamic route**:

/projects/\[slug\]

* Individual SEO-optimized project pages

---

## **🔹 3.2 Experience Timeline**

* Chronological order  
* Company, role, duration  
* Bullet points  
* Clean vertical timeline UI

---

## **🔹 3.3 Hero Section**

* Strong intro headline  
* Short value statement  
* CTA buttons:  
  * View Projects  
  * Download CV  
  * Contact

---

## **🔹 3.4 Sticky Navbar**

* Smooth scroll navigation  
* Mobile hamburger menu  
* Links:  
  * Home  
  * Projects  
  * Experience  
  * Contact

---

## **🔹 3.5 Contact Section**

* Email CTA  
* LinkedIn  
* GitHub  
* Optional form (EmailJS or server action)

---

## **🔹 3.6 SEO & Performance**

* Static Site Generation (SSG)  
* Metadata API in Next.js App Router  
* Dynamic OG tags per project  
* Structured data (JSON-LD)  
* Sitemap & robots.txt

**Target:**

* Lighthouse \> 90  
* Core Web Vitals optimized

---

# **4️⃣ Technical Stack**

## **🧠 Frontend**

* Next.js 14/15 (App Router)  
* React Server Components  
* TypeScript  
* Tailwind CSS  
* Lucide React

## **🗂 CMS**

* Sanity.io  
* GROQ queries  
* Portable Text  
* Sanity Image URL Builder

## **🌍 Deployment**

Hosted on:

**Vercel**

Why:

* Native Next.js optimization  
* Zero-config deployment  
* Built-in ISR  
* Automatic SSL  
* Edge Functions support  
* Free tier suitable for portfolio

---

# **5️⃣ Sanity Schema Structure**

## **📦 Project Schema**

* `title` – string  
* `slug` – slug  
* `mainImage` – image  
* `summary` – text  
* `description` – portable text  
* `technologies` – array of strings  
* `projectLink` – url  
* `githubLink` – url  
* `publishedAt` – datetime

---

## **💼 Experience Schema**

* `company`  
* `role`  
* `duration`  
* `points` (array of strings)  
* `order` (number for sorting)

---

# **6️⃣ Folder Structure (Optimized for App Router)**

/app  
  /projects  
    /\[slug\]  
      page.tsx  
    page.tsx  
  /api  
  layout.tsx  
  page.tsx  
/components  
  Navbar.tsx  
  Hero.tsx  
  ProjectCard.tsx  
  ProjectGrid.tsx  
  Timeline.tsx  
/lib  
  sanity.ts  
  queries.ts  
  image.ts  
/sanity  
  schemaTypes  
/public  
/styles

---

# **7️⃣ Image Optimization Strategy**

* Use `next/image`  
* Use Sanity Image Builder  
* Convert images to WebP  
* Responsive image sizes  
* Lazy loading enabled

---

# **8️⃣ Success Metrics**

| Metric | Target |
| ----- | ----- |
| Lighthouse | \> 90 |
| Time to Interactive | \< 2s |
| Mobile Performance | Optimized |
| New Project Upload | \< 2 min |
| SEO Indexing | Proper metadata |