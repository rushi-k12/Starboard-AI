# 🏠 Industrial Property Comparables – Starboard AI Challenge

This is a full-stack application built for the **Starboard AI Take-Home Challenge**. It demonstrates comparable analysis for industrial properties using Cook County data.

---

## 💡 Objective

To fetch and display **comparable industrial property records** based on user queries. Our primary goal was to simulate an agent-based system capable of providing real estate investors with intelligent property comparables.

---

## ⚙️ Tech Stack

- **Next.js (App Router)**
- **React 19 (Client Components)**
- **Tailwind CSS**
- **Node.js + API Routes**
- **CSV File as Mock API Source**
- **Deployment:** [Vercel](https://starboard-ai-three.vercel.app/)

---

## 🧠 Architecture Overview

1. **User Input:** User enters a location, zip code, or keyword (e.g., `Cicero`, `warehouse`).
2. **Backend Logic:** Filters data using fuzzy match and weights fields like `zip`, `building area`, and `zoning`.
3. **Comparable Generation:** Generates a confidence score based on similarity in key fields.
4. **Results Display:** Lists top comparables in descending order of match score.

---

## 🔍 API Integration Attempts

We explored integrating **real-time APIs** across county sources and commercial platforms, including:

- Cook County Open Data: [`datacatalog.cookcountyil.gov`](https://datacatalog.cookcountyil.gov)
- Realtor.com and Zillow (via headless scraping)
- ATTOM Data API
- LoopNet (headless scraping via Puppeteer and Playwright)

### 🧱 Challenges We Faced

| Issue | Description |
|------|-------------|
| ❌ **Strict Rate Limits** | Most APIs limited throughput or required whitelisting. |
| ❌ **Authentication Hurdles** | Many APIs required application approval for keys. |
| ❌ **Schema Inconsistencies** | Field names varied (`sqft`, `area`, `bldg_area`), requiring mapping logic. |
| ❌ **Blocked Bots** | Realtor, LoopNet blocked Puppeteer/Playwright scraping despite stealth efforts. |
| ❌ **Data Gaps** | Zoning codes and industrial classifications were often missing or unreliable. |

💡 **Solution**: We pivoted to using a **cleaned CSV dataset** scraped from Cook County and simulated the agent logic over this structured offline data.

---

## 🗃️ Data Source

- File: `clean_industrial_properties.csv`
- County: **Cook County, IL**
- Size: ~400 records
- Columns: `address`, `zip`, `building_area`, `zoning_code`, `property_class`, etc.
- Preprocessed and cleaned using Python to ensure consistent types and remove invalid entries.

---

## 📸 Demo Video

🎥 **[Click to Watch the Loom Demo](https://www.loom.com/share/c2e8e644a7064700a018a56d0adc5799?sid=b57bb6ff-d2bc-4f79-9192-57b137e34b66)**

🔗 **[Live Deployment](https://starboard-ai-three.vercel.app/)** on Vercel

---

## 🚀 Running Locally

```bash
git clone https://github.com/rushi-k12/Starboard-AI.git
cd Starboard-AI
npm install
npm run dev
