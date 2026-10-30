# 📈 B2B Dynamic Discounting & Treasury Console

> Transforming corporate Accounts Payable liabilities into high-yield, risk-free treasury returns while liberating Indian MSMEs from 90-day credit squeezes.

Inspired by RazorpayX and Razorpay's **Fix-My-Itch** problem statements.

---

## 🎯 The Real-World Problem
- In India, MSME suppliers are routinely subjected to **60 to 90-day payment credit cycles** by enterprise buyers.
- MSMEs end up borrowing from NBFCs or factoring houses at punishing **18% to 24% annual interest rates** just to meet payroll.
- Meanwhile, enterprise buyers hold billions in short-term mutual funds earning only **6.5% to 7.0% APR**.
- Traditional static credit terms (e.g., "2/10 Net 30") are inflexible and rarely adopted.

---

## 🚀 The Solution
This prototype demonstrates:
1. **Dynamic Sliding Rebate Curve:** Calculates real-time discounts based on exact payment day (e.g. paying on Day 5 yields a 3.5% discount; paying on Day 60 yields 0%).
2. **Annualized Yield (APR) Engine:** Shows corporate treasury officers the exact annualized return on their deployed cash float (often **20% to 35% APR**).
3. **Statutory TDS Deduction (Sec 194C / 194Q):** Automatically calculates tax withholding before triggering bank settlement.
4. **1-Tap CFO WhatsApp Webhook Approval:** Allows enterprise CFOs to authorize instant RTGS disbursements directly from WhatsApp without opening heavy ERP software.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Build Tool:** Vite 6
- **Celebration Effects:** Canvas Confetti

---

## 💻 Local Development
```bash
npm install
npm run dev
