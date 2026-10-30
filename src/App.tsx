import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Percent, 
  CheckCircle2, 
  Calendar, 
  Smartphone, 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  Zap, 
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InvoicePreset {
  id: string;
  vendorName: string;
  category: string;
  invoiceNo: string;
  gstin: string;
  value: number;
  standardTerms: number;
  maxDiscount: number;
}

const PRESETS: InvoicePreset[] = [
  {
    id: 'inv-1',
    vendorName: 'Apex Precision Auto-Components Pvt Ltd',
    category: 'MSME Manufacturing',
    invoiceNo: 'APX-2026-881',
    gstin: '29AABCU9603R1ZM',
    value: 500000,
    standardTerms: 60,
    maxDiscount: 3.8
  },
  {
    id: 'inv-2',
    vendorName: 'Zenith Corrugated & Packaging Solutions',
    category: 'MSME Packaging',
    invoiceNo: 'ZPK-9041-02',
    gstin: '27AALCZ4891K1ZQ',
    value: 1250000,
    standardTerms: 90,
    maxDiscount: 4.5
  },
  {
    id: 'inv-3',
    vendorName: 'Kaveri Industrial Logistics & Freight',
    category: 'Transport & Fleet',
    invoiceNo: 'KV-FRT-4401',
    gstin: '33AABCK2910M1Z8',
    value: 320000,
    standardTerms: 45,
    maxDiscount: 3.2
  }
];

export default function App() {
  const [selectedInvoice, setSelectedInvoice] = useState<InvoicePreset>(PRESETS[0]);
  const [daysToPayment, setDaysToPayment] = useState<number>(5);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [disbursedStatus, setDisbursedStatus] = useState<boolean>(false);

  const invoiceValue = selectedInvoice.value;
  const standardTerms = selectedInvoice.standardTerms;
  const maxDiscount = selectedInvoice.maxDiscount;

  // Dynamic Discounting Calculation: Earlier payment = higher discount
  const discountRate = Number(((standardTerms - daysToPayment) / standardTerms * maxDiscount).toFixed(2));
  const discountAmount = Math.round((invoiceValue * discountRate) / 100);
  const tdsDeduction = Math.round(invoiceValue * 0.02); // 2% TDS under Sec 194C / 194Q
  const netSupplierDisbursement = invoiceValue - discountAmount - tdsDeduction;

  // Annualized return (APR) for the buyer: (Discount % / Days Saved) * 365
  const daysSaved = standardTerms - daysToPayment;
  const buyerApr = daysSaved > 0 ? ((discountRate / daysSaved) * 365).toFixed(1) : '0';

  const handleDisburse = () => {
    setDisbursedStatus(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      setActiveModal(false);
    }, 2200);
  };

  const handleReset = () => {
    setDaysToPayment(5);
    setDisbursedStatus(false);
    setActiveModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 tracking-tight">B2B Dynamic Discounting Console</span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  RazorpayX Treasury
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Turn AP liabilities into high-yield treasury returns while solving MSME vendor cash crunches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/abhayvinod-web"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">ANNUALIZED TREASURY APR</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">{buyerApr}%</div>
            <span className="text-[11px] text-slate-500">Outperforms standard liquid MFs (6.8%)</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">CASH DISCOUNT SAVED</span>
            <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono">₹{discountAmount.toLocaleString('en-IN')}</div>
            <span className="text-[11px] text-slate-500">Direct EBITDA bottomline gain</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">DAYS ACCELERATED</span>
            <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">{daysSaved} Days</div>
            <span className="text-[11px] text-slate-500">Working capital freed for vendor</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">DISBURSEMENT SPEED</span>
            <div className="text-xl sm:text-2xl font-bold text-teal-400 font-mono">&lt; 30 Secs</div>
            <span className="text-[11px] text-slate-500">Direct 1-tap WhatsApp RTGS</span>
          </div>
        </div>

        {/* Vendor Preset Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-2">Select Invoice:</span>
          {PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedInvoice(preset);
                setDaysToPayment(5);
                setDisbursedStatus(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                selectedInvoice.id === preset.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {preset.vendorName.split(' ')[0]} (₹{(preset.value / 100000).toFixed(1)}L)
            </button>
          ))}
        </div>

        {/* Interactive Prototype Component */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header Controls */}
          <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-100">Live Dynamic Discounting Simulator</span>
              <span className="text-slate-400 hidden sm:inline">— Slide payment maturity to optimize cash yield</span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Calculator</span>
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Invoice Header Details */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shadow-inner shrink-0">
                  🏭
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm text-white">{selectedInvoice.vendorName}</h3>
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">
                      {selectedInvoice.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Invoice #{selectedInvoice.invoiceNo} • GSTIN: {selectedInvoice.gstin} • Net-{selectedInvoice.standardTerms} Terms
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <div className="text-2xl font-mono font-bold text-white">
                  ₹{invoiceValue.toLocaleString('en-IN')}.00
                </div>
                <span className="text-xs text-slate-400">Scheduled Credit Period: {standardTerms} Days</span>
              </div>
            </div>

            {/* Slider Section */}
            <div className="bg-gradient-to-br from-emerald-950/20 via-slate-900 to-indigo-950/20 border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Early Settlement Timeline: Pay in {daysToPayment} Days
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Adjusting earlier accelerates vendor liquidity while unlocking higher annualized yield for the buyer.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg font-mono font-bold text-slate-200">
                    {daysSaved} Days Early
                  </span>
                  <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg font-mono font-bold">
                    {buyerApr}% Buyer APR
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min={2}
                  max={standardTerms}
                  step={1}
                  value={daysToPayment}
                  onChange={e => setDaysToPayment(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Day 2 (Max Rebate: {maxDiscount}%)</span>
                  <span>Day {Math.round(standardTerms / 2)} (Mid-cycle)</span>
                  <span>Day {standardTerms} (Maturity: 0% Rebate)</span>
                </div>
              </div>

              {/* Dynamic Math Output Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Early Rebate Rate</span>
                  <span className="text-xl font-mono font-bold text-indigo-400">{discountRate}%</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Pre-agreed MSME schedule</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Buyer Cash Saved</span>
                  <span className="text-xl font-mono font-bold text-emerald-400">₹{discountAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Direct EBITDA bottomline gain</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Statutory TDS (2%)</span>
                  <span className="text-xl font-mono font-bold text-slate-300">₹{tdsDeduction.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Form 26Q credit</span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Immediate Vendor Payout</span>
                  <span className="text-xl font-mono font-bold text-white">₹{netSupplierDisbursement.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Direct RTGS in {daysToPayment} days</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
                <span className="text-xs text-slate-300">
                  Win-Win: <strong>Supplier avoids 18–24% NBFC loan rates</strong> while <strong>Buyer captures {buyerApr}% risk-free APR</strong>.
                </span>

                <button
                  onClick={() => setActiveModal(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Smartphone className="w-4 h-4 text-white" />
                  <span>Send 1-Tap CFO WhatsApp Approval</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Modal Simulation */}
        {activeModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between border-b pb-3 border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                    WA
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">RazorpayX CFO Assistant</h5>
                    <span className="text-[10px] text-emerald-400">Verified WhatsApp Bot</span>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(false)} 
                  className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Chat Bubble */}
              <div className="bg-[#052E16] p-4 rounded-xl rounded-tl-none border border-emerald-600/30 text-xs text-slate-200 space-y-2.5">
                <p className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Early Payment Discount Opportunity
                </p>
                <p className="text-[11px] text-slate-300">
                  {selectedInvoice.vendorName} offered a <strong>{discountRate}% rebate</strong> for early payment in {daysToPayment} days on invoice #{selectedInvoice.invoiceNo}.
                </p>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-emerald-900/60 text-[11px] space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cash Saved:</span>
                    <strong className="text-emerald-400">₹{discountAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Net RTGS Payout:</span>
                    <strong className="text-white">₹{netSupplierDisbursement.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Buyer Annual Yield:</span>
                    <strong className="text-indigo-400">{buyerApr}% APR</strong>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">Tap below to authorize immediate RTGS transfer:</p>
              </div>

              {!disbursedStatus ? (
                <button
                  onClick={handleDisburse}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve &amp; Disburse via RTGS</span>
                </button>
              ) : (
                <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Transfer Successful (UTR: RTGS202610258819)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Technical Architecture Deep Dive */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">The Treasury Mechanics Behind Dynamic Discounting</h3>
              <p className="text-xs text-slate-400">Why enterprise buyers and MSME suppliers both win</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">01. Dynamic Sliding Curve</span>
              <h4 className="text-sm font-semibold text-white">Linear APR Maturity</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than static "2/10 Net 30" agreements, dynamic discounting calculates daily linear rebate curves based on enterprise cost of capital and supplier liquidity urgency.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">02. Statutory TDS Automation</span>
              <h4 className="text-sm font-semibold text-white">Section 194C / 194Q Compliance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically calculates and withholds Section 194C / 194Q TDS before RTGS disbursement, generating auto-reconciled Form 26Q tax ledgers for enterprise audits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">03. 1-Tap CFO Authorizations</span>
              <h4 className="text-sm font-semibold text-white">WhatsApp Business Webhooks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enterprise CFOs rarely log into ERP desks like SAP on weekends. WhatsApp interactive webhooks allow instant cryptographic approval with bank-grade 2FA tokens.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Built as an engineering prototype solving real-world fintech bottlenecks inspired by Razorpay's Fix-My-Itch initiative.</p>
      </footer>
    </div>
  );
}
