# **📄 Product Requirements Document (PRD)**

# **🚀 Professional Software Developer Portfolio (Next.js + Firebase + App Hosting)**

---

## **1️⃣ Project Overview**

A high-performance, SEO-optimized, content-driven developer portfolio built using **Next.js (App Router)** and **Firebase Firestore**, deployed on **Firebase App Hosting**.

The platform allows dynamic project and experience management via a built-in Dashboard CMS without redeployment, while maintaining top-tier performance and clean UI.

---

## **2️⃣ Core Objectives**

* Showcase technical projects professionally  
* Demonstrate modern full-stack architecture  
* Achieve Lighthouse score > 90  
* Enable easy content management via Firebase  
* Ensure scalability and maintainability  
* Impress recruiters with production-level stack

---

# **3️⃣ Functional Requirements**

## **🔹 3.1 Dynamic Project Showcase**

* Fetch projects from **Firebase Firestore**  
* Display:  
  * Title  
  * Thumbnail  
  * Summary  
  * Tech Stack (tags)  
  * Demo link  
  * GitHub link  
* Each project has a **dynamic route**: `/projects/[slug]`
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
* Professional social links

---

## **🔹 3.6 SEO & Performance**

* Static Site Generation (SSG) / ISR  
* Metadata API in Next.js App Router  
* Dynamic OG tags per project  
* Structured data (JSON-LD)  
* Sitemap & robots.txt

---

# **4️⃣ Technical Stack**

## **🧠 Frontend**

* Next.js 15 (App Router)  
* React Server Components  
* TypeScript  
* Tailwind CSS  
* Lucide React

## **🗂 CMS / Database**

* **Firebase Firestore**: Real-time NoSQL database serving as the content engine.
* **Firebase Authentication**: Securing the Dashboard CMS.
* **Firebase App Hosting**: Next-generation hosting for server-rendered apps.

---

# **5️⃣ Data Structure**

## **📦 Project Entity**

* `title` – string  
* `slug` – slug  
* `imageUrl` – url  
* `summary` – text  
* `problem` – text  
* `solution` – text  
* `roiMetric` – string
* `businessImpact` – string
* `technologies` – array of strings  
* `projectLink` – url  
* `githubLink` – url  
* `architecture` - text
* `codeSnippet` - text
* `publishedAt` – datetime

---

## **💼 Experience Entity**

* `company`  
* `role`  
* `duration`  
* `points` (array of strings)  
* `order` (number for sorting)

---

# **8️⃣ Success Metrics**

| Metric | Target |
| ----- | ----- |
| Lighthouse | > 90 |
| Time to Interactive | < 2s |
| Mobile Performance | Optimized |
| New Project Upload | < 2 min |
| SEO Indexing | Proper metadata |
