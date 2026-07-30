'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Receipt, Download, Printer, Plus, Trash2, CheckCircle2, 
  Sparkles, DollarSign, Calendar, FileCode, ShieldCheck, Mail, MapPin 
} from 'lucide-react';
import { Header } from '@components/shared/Header';
import { Footer } from '@components/shared/Footer';

export interface InvoiceItemRow {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoiceGeneratorPage() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [invoiceDate, setInvoiceDate] = useState('2026-07-25');
  const [dueDate, setDueDate] = useState('2026-08-08');

  // Client Details
  const [clientCompany, setClientCompany] = useState('Acme Technologies Inc.');
  const [clientEmail, setClientEmail] = useState('billing@acmetechnologies.com');
  const [clientAddress, setClientAddress] = useState('100 Innovation Way, San Francisco, CA');

  // Line Items
  const [items, setItems] = useState<InvoiceItemRow[]>([
    {
      id: 'item-1',
      description: 'Milestone 1: Playwright Stealth Web Scraping Microservice & FastAPI Async Backend',
      quantity: 1,
      rate: 2500,
    },
    {
      id: 'item-2',
      description: 'Milestone 2: Next.js 15 Client Portal & 100/100 Lighthouse Optimization',
      quantity: 1,
      rate: 2500,
    },
  ]);

  const [taxRate, setTaxRate] = useState<number>(0);
  const [paymentNotes, setPaymentNotes] = useState(
    'Payment due within 14 days of invoice date. Thank you for your business!'
  );

  const addItem = () => {
    const newItem: InvoiceItemRow = {
      id: `item-${Date.now()}`,
      description: 'Engineering Service / Milestone Deliverable',
      quantity: 1,
      rate: 1000,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItemRow, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const totalAmountDue = subtotal + taxAmount;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary selection:bg-accent-primary/20">
      <div className="no-print">
        <Header />
      </div>

      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 text-left">
        
        {/* Page Header */}
        <div className="no-print space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-primary flex items-center gap-1.5">
            <Receipt className="h-4 w-4" /> B2B Client Invoice Generator
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary">
            Reusable Client Invoice Template
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Create, edit, calculate sub-totals, and export professional PDF invoices for client milestones. Zero backend required.
          </p>
        </div>

        {/* Generator Form Controls vs Live PDF Invoice Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Form Controls (lg:col-span-5) */}
          <div className="no-print lg:col-span-5 space-y-6">
            
            {/* Invoice & Client Metadata */}
            <div className="p-6 premium-card space-y-4 border-accent-primary/30">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-primary font-bold block border-b border-border-subtle/40 pb-2">
                1. Invoice Metadata & Client Info
              </span>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="font-mono text-text-muted text-[10px] font-semibold">Invoice #</label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-text-muted text-[10px] font-semibold">Invoice Date</label>
                    <input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-text-muted text-[10px] font-semibold">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="font-mono text-text-muted text-[11px] font-semibold">Client Company Name</label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-text-muted text-[11px] font-semibold">Client Billing Email</label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-text-muted text-[11px] font-semibold">Client Billing Address</label>
                  <input
                    type="text"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-bg-inset border border-border-subtle text-xs text-text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Item Editor Controls */}
            <div className="p-6 premium-card space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle/40 pb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-accent-highlight font-bold">
                  2. Line Items & Deliverables
                </span>
                <button
                  onClick={addItem}
                  className="px-3 py-1 rounded-lg bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-mono font-semibold hover:bg-accent-primary/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={item.id} className="p-3 rounded-xl bg-bg-inset border border-border-subtle/50 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-accent-primary font-bold">Item #{idx + 1}</span>
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-bg-surface border border-border-subtle text-xs text-text-primary"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-text-muted">Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full px-2 py-1 rounded bg-bg-surface border border-border-subtle text-xs text-text-primary font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-text-muted">Rate ($USD)</label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 rounded bg-bg-surface border border-border-subtle text-xs text-text-primary font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border-subtle/30 flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">Tax Rate (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 rounded bg-bg-inset border border-border-subtle text-right text-xs font-mono text-text-primary"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Branded PDF Invoice Preview (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Export Bar */}
            <div className="no-print flex items-center justify-between bg-bg-inset p-4 rounded-2xl border border-border-subtle">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-primary" />
                <span className="font-mono text-xs text-text-primary font-bold">Printable PDF Invoice Preview</span>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-gradient text-text-primary text-xs font-semibold hover:shadow-glow transition-all btn-micro"
              >
                <Download className="h-4 w-4" />
                <span>Export PDF / Print</span>
              </button>
            </div>

            {/* Printable Document Box */}
            <div className="print-area p-8 sm:p-10 rounded-2xl border border-border-subtle bg-bg-surface/80 backdrop-blur-md shadow-2xl space-y-8 text-left border-t-4 border-t-accent-primary">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/50 pb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                    INVOICE
                  </h2>
                  <span className="font-mono text-xs text-accent-primary font-bold">{invoiceNumber}</span>
                </div>

                <div className="text-xs font-mono space-y-1 sm:text-right text-text-secondary">
                  <div><strong className="text-text-primary">Sahil Bhakre</strong></div>
                  <div>AI Engineer & Full-Stack Developer</div>
                  <div className="text-text-muted">India • sahilbhakre.dev</div>
                </div>
              </div>

              {/* Billed To & Dates Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono p-4 rounded-xl bg-bg-inset border border-border-subtle/50">
                <div className="space-y-1">
                  <span className="text-[10px] text-accent-primary uppercase font-bold block">Billed To</span>
                  <div className="font-bold text-text-primary">{clientCompany}</div>
                  <div className="text-text-muted text-[11px]">{clientEmail}</div>
                  <div className="text-text-muted text-[11px]">{clientAddress}</div>
                </div>

                <div className="space-y-1 text-right">
                  <span className="text-[10px] text-accent-primary uppercase font-bold block">Invoice Details</span>
                  <div>Date: <strong className="text-text-primary">{invoiceDate}</strong></div>
                  <div>Due: <strong className="text-text-primary">{dueDate}</strong></div>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-3">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle/50 text-text-muted uppercase text-[10px]">
                      <th className="pb-2">Description</th>
                      <th className="pb-2 text-center">Qty</th>
                      <th className="pb-2 text-right">Rate</th>
                      <th className="pb-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle/30">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 pr-2 font-semibold text-text-primary">{item.description}</td>
                        <td className="py-2.5 text-center text-text-secondary">{item.quantity}</td>
                        <td className="py-2.5 text-right text-text-secondary">${item.rate.toLocaleString()}</td>
                        <td className="py-2.5 text-right font-bold text-accent-primary">
                          ${(item.quantity * item.rate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subtotal & Total Block */}
              <div className="flex justify-end pt-4 border-t border-border-subtle/50">
                <div className="w-64 space-y-1.5 text-xs font-mono text-right">
                  <div className="flex items-center justify-between text-text-muted">
                    <span>Subtotal:</span>
                    <span>${subtotal.toLocaleString()} USD</span>
                  </div>
                  {taxRate > 0 && (
                    <div className="flex items-center justify-between text-text-muted">
                      <span>Tax ({taxRate}%):</span>
                      <span>${taxAmount.toLocaleString()} USD</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-border-subtle/50 text-sm font-bold text-accent-primary">
                    <span>Total Amount Due:</span>
                    <span>${totalAmountDue.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              {/* Payment Notes */}
              <div className="space-y-1 text-xs pt-4 border-t border-border-subtle/30">
                <span className="font-mono text-[10px] text-text-muted uppercase font-bold block">Payment Instructions & Notes</span>
                <p className="text-[11px] text-text-secondary font-mono p-3 rounded-xl bg-bg-inset border border-border-subtle/40">
                  {paymentNotes}
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
