"use client";

import { useEffect, useMemo, useState } from "react";
import DemoShell from "@/components/DemoShell";

type Entry = {
  id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  note: string;
  date: string; // YYYY-MM-DD
};

const EXPENSE_CATS = ["Rent", "Stock", "Salaries", "Utilities", "Marketing", "Other"];
const INCOME_CATS = ["Sales", "Services", "Other"];

const SEED: Entry[] = [
  { id: "e1", type: "income", amount: 85000, category: "Sales", note: "Week 1 shop sales", date: "2026-06-01" },
  { id: "e2", type: "expense", amount: 35000, category: "Rent", note: "Shop rent June", date: "2026-06-01" },
  { id: "e3", type: "expense", amount: 22000, category: "Stock", note: "Supplier restock", date: "2026-06-03" },
  { id: "e4", type: "income", amount: 92000, category: "Sales", note: "Week 2 shop sales", date: "2026-06-08" },
  { id: "e5", type: "expense", amount: 8000, category: "Utilities", note: "Electricity bill", date: "2026-06-09" },
  { id: "e6", type: "income", amount: 15000, category: "Services", note: "Repair service jobs", date: "2026-06-10" },
];

function rupees(n: number) {
  return "Rs " + n.toLocaleString("en-PK");
}

export default function MoneyTracker() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loaded, setLoaded] = useState(false);
  // form state
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATS[0]);
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("devora_money");
      setEntries(raw ? JSON.parse(raw) : SEED);
    } catch {
      setEntries(SEED);
    }
    setLoaded(true);
  }, []);

  const persist = (next: Entry[]) => {
    setEntries(next);
    try {
      localStorage.setItem("devora_money", JSON.stringify(next));
    } catch {}
  };

  const addEntry = () => {
    const amt = parseInt(amount, 10);
    if (!amt || amt <= 0) return;
    const e: Entry = {
      id: "e" + Date.now(),
      type,
      amount: amt,
      category,
      note: note || category,
      date: new Date().toISOString().slice(0, 10),
    };
    persist([e, ...entries]);
    setAmount("");
    setNote("");
  };

  const remove = (id: string) => persist(entries.filter((e) => e.id !== id));

  const { income, expense } = useMemo(() => {
    let inc = 0,
      exp = 0;
    for (const e of entries) {
      if (e.type === "income") inc += e.amount;
      else exp += e.amount;
    }
    return { income: inc, expense: exp };
  }, [entries]);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of entries) {
      if (e.type !== "expense") continue;
      map.set(e.category, (map.get(e.category) || 0) + e.amount);
    }
    const total = [...map.values()].reduce((a, b) => a + b, 0) || 1;
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => ({ cat, amt, pct: Math.round((amt / total) * 100) }));
  }, [entries]);

  const profit = income - expense;
  const cats = type === "expense" ? EXPENSE_CATS : INCOME_CATS;

  if (!loaded) return null;

  return (
    <DemoShell title="Money Tracker" tagline="Log income & expenses — see exactly where the cash goes.">
      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 mb-1">Income</div>
          <div className="text-2xl font-bold text-emerald-400">{rupees(income)}</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 mb-1">Expenses</div>
          <div className="text-2xl font-bold text-rose-400">{rupees(expense)}</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 mb-1">Profit</div>
          <div className={`text-2xl font-bold ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {rupees(profit)}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Add entry + breakdown */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold mb-4">Add entry</h3>
            <div className="flex gap-2 mb-3">
              {(["expense", "income"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setType(t);
                    setCategory((t === "expense" ? EXPENSE_CATS : INCOME_CATS)[0]);
                  }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize ${type === t ? (t === "expense" ? "bg-rose-500/80 text-white" : "bg-emerald-500/80 text-white") : "bg-slate-800 text-slate-300"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              placeholder="Amount (Rs)"
              inputMode="numeric"
              className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none"
            >
              {cats.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (optional)"
              className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={addEntry}
              disabled={!amount}
              className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 font-semibold text-sm"
            >
              Add
            </button>
          </div>

          {/* Expense breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold mb-4">Where the money goes</h3>
            {byCategory.length === 0 ? (
              <p className="text-sm text-slate-500">No expenses yet.</p>
            ) : (
              <div className="space-y-3">
                {byCategory.map(({ cat, amt, pct }) => (
                  <div key={cat}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{cat}</span>
                      <span className="text-slate-400">
                        {rupees(amt)} · {pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-sky-400"
                        style={{ width: pct + "%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Ledger */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-slate-400 text-xs">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Note</th>
                  <th className="text-left px-4 py-3">Category</th>
                  <th className="text-right px-4 py-3">Amount</th>
                  <th className="px-2 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-t border-slate-800 hover:bg-slate-900/50">
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{e.date}</td>
                    <td className="px-4 py-3">{e.note}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-300">
                        {e.category}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-semibold ${e.type === "income" ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {e.type === "income" ? "+" : "−"}
                      {rupees(e.amount)}
                    </td>
                    <td className="px-2 py-3 text-right">
                      <button
                        onClick={() => remove(e.id)}
                        className="text-slate-600 hover:text-rose-400 text-xs px-2"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Demo data pre-loaded — add your own entries; everything saves in your browser.
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
