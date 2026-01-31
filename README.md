
# <p align="center">🩺 AI Medical SaaS : MediCall</p>

<p align="center">
  <a href="https://medi-call.vercel.app/">
    <img src="https://img.shields.io/badge/LIVE_DEMO-Visit_MediCall-6C47FF?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
</p>


<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Clerk-Authentication-blue?style=for-the-badge&logo=clerk" />
  <img src="https://img.shields.io/badge/Gemini_AI-Powered-orange?style=for-the-badge&logo=google-gemini" />
  <img src="https://img.shields.io/badge/Tailwind-Styling-38B2AC?style=for-the-badge&logo=tailwind-css" />
</p>

<p align="center">
  <strong>Instant Specialist Consultations & Intelligent Reporting:</strong> A premium, high-end medical diagnostic platform leveraging Generative AI to provide specialized health consultations and automated clinical reports at your fingertips.
</p>

---

## ✨ 🌟 Key Features

* **📑 AI Medical Report Generation** MediCall doesn't just talk; it documents. After every session, the AI engine synthesizes the entire conversation into a structured medical report. It automatically outlines your symptoms, highlights potential concerns, and suggests actionable next steps—all stored securely in your dashboard.

* **👨‍⚕️ AI Specialist Agents** A curated list of specialized AI doctors (Cardiology, Pediatrics, General Medicine, etc.) built with advanced prompt engineering for high-accuracy diagnostics.

* **💬 Instant Consultations** Real-time, interactive chat interface with specialized AI agents for symptom analysis and preliminary medical advice.

* **📜 Consultation History** A sleek, organized dashboard to review past medical sessions. Includes a custom **HistoryTable** with deep-link report viewing and data persistence.

* **🔐 Secure Authentication** Enterprise-grade security integrated with **Clerk**, featuring protected routes and seamless user onboarding.

* **💎 Premium Access Logic** Smart subscription-based access where high-tier specialists are locked behind a sleek "Premium" badge for monetized scaling.

---

## 🚀 The Reporting Engine

MediCall uses a secondary AI processing layer to transform raw chat data into professional summaries:
1. **Extraction:** Identifies key symptoms and patient history from the chat.
2. **Analysis:** Correlates data with specialist-specific medical knowledge.
3. **Generation:** Produces a clean, readable report that can be reviewed anytime via the **View Report** dialog in your history.

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15+ (App Router & Turbopack) |
| **Auth** | Clerk (JWT Session Management) |
| **AI Engine** | vapi AI with Open AI and openrouter ai |
| **Database** | Neon PostgreSQL (Serverless) |
| **ORM** | Drizzle ORM |
| **Styling** | Tailwind CSS & Shadcn UI |
| **Animations** | Motion (Framer Motion) |

---

## ⚙️ Installation & Setup

1. **Clone & Enter**
```bash
   git clone [https://github.com/vkakda/ai-medical-saas.git](https://github.com/vkakda/ai-medical-saas.git)
   cd ai-medical-saas

```

2. **Install Dependencies**
```bash
npm install

```


3. **Configure Environment** Create a `.env.local` file and inject your credentials:
```env

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgresql_url
OPENROUTER_API_KEY=your_key
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_key

```


4. **Launch**
```bash
npm run dev

```



---

## 🔒 Security & Middleware

The platform implements a robust **Server-Side Security** layer using Next.js Middleware.

> [!IMPORTANT]
> All routes under `/dashboard` and `/medical-agent` are strictly protected. The middleware intercepts unauthenticated requests and gracefully redirects them to the Clerk Sign-In flow before any data is leaked.

---

## 📱 Responsive Architecture

The UI adheres to a strict **Mobile-First** design philosophy:

* **Desktop Experience:** High-density data tables with hover-active states and a mathematically centered SaaS navigation bar.
* **Mobile Experience:** Adaptive card-based layouts for history tracking and a vertically-optimized header for effortless thumb navigation.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
