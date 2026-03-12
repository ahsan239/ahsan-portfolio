# **📄 Product Requirements Document (PRD)**

# **🚀 Professional Software Developer Portfolio (Next.js + Firebase + App Hosting)**

---

## **1️⃣ Project Overview**

A high-performance, SEO-optimized, content-driven developer portfolio built using **Next.js (App Router)** and **Firebase Firestore**, deployed on **Firebase App Hosting**.

The platform allows dynamic project and experience management via a built-in **Editorial Studio CMS** (powered by Firebase) without redeployment, while maintaining top-tier performance and clean UI.

---

## **2️⃣ Core Objectives**

* Showcase technical projects professionally  
* Demonstrate modern full-stack architecture  
* Achieve Lighthouse score > 90  
* Enable easy content management via **Firebase Firestore**  
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

* **Firebase Firestore**: Real-time NoSQL database serving as the content engine and headless CMS.
* **Firebase Authentication**: Securing the Editorial Studio CMS.
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

# **Product Requirements Document (PRD)**

## **Project: Replace Existing Portfolio CMS with Sanity**

### **1\. Project Overview**

The portfolio website **Ahsan Portfolio Website** currently includes a built-in CMS interface used to:

* Add projects

* Edit projects

* Delete projects

* Display projects on the portfolio

However, the existing CMS has issues such as:

* Newly added projects showing **404 errors when opened**

* Difficult maintenance

* Limited scalability

* Tight coupling between CMS and frontend

To solve this, the current CMS will be **replaced with the headless CMS Sanity** while keeping the **existing portfolio frontend UI unchanged**.

---

# **2\. Objectives**

### **Primary Objectives**

1. Replace the existing project management CMS with **Sanity**

2. Allow project management via **Sanity Studio**

3. Ensure all projects render correctly without **404 errors**

4. Maintain the **current portfolio UI and project layout**

### **Secondary Objectives**

* Improve content flexibility

* Simplify project management

* Enable structured project data

---

# **3\. Current System**

### **Current Workflow**

Admin Panel → Add Project → Stored in CMS → Displayed in Portfolio

Issues:

1. Projects added via CMS appear in the list

2. Clicking the project sometimes leads to **404 page**

3. CMS backend is difficult to maintain

4. Project content structure is limited

---

# **4\. Proposed Solution**

Replace the current CMS with **Sanity** and use it as the **single source of truth for projects**.

### **New Architecture**

Sanity Studio (Project Management)  
       │  
       │ Sanity API  
       ▼  
Portfolio Frontend  
(Next.js / React)  
       │  
       ▼  
Dynamic Project Pages

The portfolio will fetch project data from **Sanity API** instead of the current CMS database.

---

# **5\. Scope**

## **In Scope**

* Remove current CMS integration

* Setup Sanity project

* Create project content schema

* Connect frontend to Sanity

* Migrate existing projects

* Ensure dynamic routing works

## **Out of Scope**

* Redesigning the portfolio UI

* Changing project page layout

* Adding new frontend features

---

# **6\. Functional Requirements**

## **6.1 Sanity CMS Setup**

Create a Sanity project with **Sanity Studio** for managing projects.

Admin must be able to:

* Add new projects

* Edit existing projects

* Delete projects

* Upload images

* Publish/unpublish projects

---

## **6.2 Project Data Model**

Sanity schema for projects should include:

| Field | Type | Description |
| ----- | ----- | ----- |
| title | string | Project name |
| slug | slug | URL identifier |
| shortDescription | text | Project summary |
| fullDescription | rich text | Detailed content |
| coverImage | image | Main project image |
| gallery | array | Project screenshots |
| technologies | array | Tech stack |
| githubLink | url | GitHub repository |
| liveLink | url | Live project URL |
| featured | boolean | Featured on homepage |
| createdAt | datetime | Creation date |

---

# **7\. Frontend Integration**

The portfolio frontend will fetch project data from Sanity.

### **Project List Page**

The **Projects section** will display projects fetched from Sanity.

Data fetched:

* title

* slug

* coverImage

* description

---

### **Project Detail Page**

Each project page will use dynamic routing.

Example URLs:

/projects/ai-chatbot  
/projects/ecommerce-dashboard  
/projects/portfolio-website

Data fetched based on **slug**.

---

# **8\. Data Migration**

Existing projects in the current CMS must be migrated.

Steps:

1. Export project data from current CMS

2. Convert data to Sanity schema format

3. Import data into Sanity

4. Validate project rendering

---

# **9\. Admin Workflow (New)**

New project creation flow:

Login to Sanity Studio  
      │  
Create New Project  
      │  
Add project details  
      │  
Publish  
      │  
Project appears automatically on portfolio

No redeployment required.

---

# **10\. Non-Functional Requirements**

### **Performance**

* Project pages must load within **1.5 seconds**

### **SEO**

Each project should support:

* Meta title

* Meta description

* OpenGraph image

### **Security**

* Sanity API keys must be stored in environment variables.

---

# **11\. Migration Plan**

### **Phase 1 — Analysis**

* Review current CMS structure

* Extract project fields

### **Phase 2 — Sanity Setup**

* Create Sanity project

* Build project schema

### **Phase 3 — Integration**

* Install Sanity client in frontend

* Replace CMS API with Sanity API

### **Phase 4 — Migration**

* Import existing projects

### **Phase 5 — Testing**

* Verify project list

* Verify project pages

* Ensure no 404 errors

### **Phase 6 — Deployment**

Deploy updated portfolio on \*\*Vercel.
