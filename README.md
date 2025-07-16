# 🏠 Industrial Property Comparables – Starboard AI Challenge

This is a full-stack application built for the Starboard AI Take-Home Challenge.

---

## 💡 Objective

To fetch and display **comparable industrial property records** based on user queries. Our goal was to use public property APIs to provide similar listings in Cook County.

---

## ⚙️ Tech Stack

- **Next.js (App Router)**
- **Tailwind CSS**
- **React (Client Components)**
- **Node.js + API routes**
- **CSV file (Cook County data) for backend**
- Deployment: GitHub Pages / Vercel (optional)

---

## 🧠 Architecture

1. User enters a keyword (e.g., `Cicero`, `warehouse`, etc.)
2. Backend filters Cook County property data from CSV
3. Results displayed with confidence score

---

## 🗃️ Data Source

Used: `clean_industrial_properties.csv` (Cook County scraped dataset)  
> We initially attempted real-time scraping (LoopNet, Realtor) and public APIs but were blocked or received no response.

---

## 📸 Demo Video

Check out the [📹 Loom Walkthrough](#) *(link here)*

---

## 🚀 Running Locally

```bash
git clone https://github.com/rushi-k12/Starboard-AI.git
cd Starboard-AI
npm install
npm run dev
