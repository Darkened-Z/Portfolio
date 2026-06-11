"use client";

import { useEffect, useMemo, useState } from "react";
import DemoShell from "@/components/DemoShell";

type Product = { id: string; name: string; price: number; emoji: string; cat: string };
type CartLine = { product: Product; qty: number };
type Sale = { id: string; time: string; items: number; total: number; lines: { name: string; qty: number; price: number }[] };

const PRODUCTS: Product[] = [
  { id: "p1", name: "Chicken Burger", price: 450, emoji: "🍔", cat: "Food" },
  { id: "p2", name: "Beef Burger", price: 550, emoji: "🍔", cat: "Food" },
  { id: "p3", name: "Zinger", price: 500, emoji: "🍗", cat: "Food" },
  { id: "p4", name: "Fries", price: 200, emoji: "🍟", cat: "Food" },
  { id: "p5", name: "Loaded Fries", price: 350, emoji: "🍟", cat: "Food" },
  { id: "p6", name: "Club Sandwich", price: 400, emoji: "🥪", cat: "Food" },
  { id: "p7", name: "Pizza Slice", price: 300, emoji: "🍕", cat: "Food" },
  { id: "p8", name: "Soft Drink", price: 100, emoji: "🥤", cat: "Drinks" },
  { id: "p9", name: "Mineral Water", price: 60, emoji: "💧", cat: "Drinks" },
  { id: "p10", name: "Fresh Juice", price: 250, emoji: "🧃", cat: "Drinks" },
  { id: "p11", name: "Coffee", price: 280, emoji: "☕", cat: "Drinks" },
  { id: "p12", name: "Ice Cream", price: 180, emoji: "🍨", cat: "Dessert" },
];

const CATS = ["All", "Food", "Drinks", "Dessert"];

function rupees(n: number) {
  return "Rs " + n.toLocaleString("en-PK");
}

export default function POSDemo() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cat, setCat] = useState("All");
  const [sales, setSales] = useState<Sale[]>([]);
  const [receipt, setReceipt] = useState<Sale | null>(null);
  const [tab, setTab] = useState<"register" | "sales">("register");

  useEffect(() => {
    try {
      const s = localStorage.getItem("devora_pos_sales");
      if (s) setSales(JSON.parse(s));
    } catch {}
  }, []);

  const persist = (next: Sale[]) => {
    setSales(next);
    try {
      localStorage.setItem("devora_pos_sales", JSON.stringify(next));
    } catch {}
  };

  const add = (p: Product) =>
    setCart((c) => {
      const i = c.findIndex((l) => l.product.id === p.id);
      if (i === -1) return [...c, { product: p, qty: 1 }];
      const copy = [...c];
      copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
      return copy;
    });

  const dec = (id: string) =>
    setCart((c) =>
      c
        .map((l) => (l.product.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0)
    );

  const total = useMemo(
    () => cart.reduce((s, l) => s + l.product.price * l.qty, 0),
    [cart]
  );
  const itemCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);

  const checkout = () => {
    if (!cart.length) return;
    const sale: Sale = {
      id: "S" + String(sales.length + 1).padStart(4, "0"),
      time: new Date().toLocaleString(),
      items: itemCount,
      total,
      lines: cart.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
    };
    persist([sale, ...sales]);
    setReceipt(sale);
    setCart([]);
  };

  const todayTotal = sales.reduce((s, x) => s + x.total, 0);
  const visible = PRODUCTS.filter((p) => cat === "All" || p.cat === cat);

  return (
    <DemoShell title="Point of Sale" tagline="Tap products → checkout → receipt. Sales are logged.">
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTab("register")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "register" ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
        >
          🧾 Register
        </button>
        <button
          onClick={() => setTab("sales")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "sales" ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
        >
          📊 Sales log ({sales.length})
        </button>
      </div>

      {tab === "register" ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-4 flex-wrap">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${cat === c ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {visible.map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p)}
                  className="rounded-xl border border-slate-800 bg-slate-900 hover:border-indigo-500/60 hover:bg-slate-800 active:scale-95 transition-all p-4 text-left"
                >
                  <div className="text-2xl mb-2">{p.emoji}</div>
                  <div className="font-medium text-sm">{p.name}</div>
                  <div className="text-indigo-400 text-sm font-semibold mt-1">{rupees(p.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 h-fit sticky top-20">
            <h3 className="font-semibold mb-4 flex items-center justify-between">
              Current order
              <span className="text-xs text-slate-400 font-normal">{itemCount} items</span>
            </h3>
            {cart.length === 0 ? (
              <p className="text-sm text-slate-500 py-8 text-center">Tap products to add them</p>
            ) : (
              <div className="space-y-3 mb-4">
                {cart.map((l) => (
                  <div key={l.product.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">
                        {l.product.emoji} {l.product.name}
                      </div>
                      <div className="text-xs text-slate-400">{rupees(l.product.price)} each</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => dec(l.product.id)} className="w-7 h-7 rounded-md bg-slate-800 hover:bg-slate-700 text-sm">−</button>
                      <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                      <button onClick={() => add(l.product)} className="w-7 h-7 rounded-md bg-slate-800 hover:bg-slate-700 text-sm">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-slate-800 pt-4 flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">Total</span>
              <span className="text-xl font-bold">{rupees(total)}</span>
            </div>
            <button
              onClick={checkout}
              disabled={!cart.length}
              className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        /* Sales log */
        <div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="text-xs text-slate-400 mb-1">Total sales</div>
              <div className="text-2xl font-bold">{sales.length}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="text-xs text-slate-400 mb-1">Revenue</div>
              <div className="text-2xl font-bold text-emerald-400">{rupees(todayTotal)}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="text-xs text-slate-400 mb-1">Avg. order</div>
              <div className="text-2xl font-bold">{rupees(sales.length ? Math.round(todayTotal / sales.length) : 0)}</div>
            </div>
          </div>
          {sales.length === 0 ? (
            <p className="text-slate-500 text-center py-12">No sales yet — make one on the Register tab.</p>
          ) : (
            <div className="rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-slate-400 text-xs">
                  <tr>
                    <th className="text-left px-4 py-3">Receipt</th>
                    <th className="text-left px-4 py-3">Time</th>
                    <th className="text-right px-4 py-3">Items</th>
                    <th className="text-right px-4 py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((s) => (
                    <tr key={s.id} className="border-t border-slate-800 hover:bg-slate-900/50 cursor-pointer" onClick={() => setReceipt(s)}>
                      <td className="px-4 py-3 font-mono text-indigo-400">{s.id}</td>
                      <td className="px-4 py-3 text-slate-400">{s.time}</td>
                      <td className="px-4 py-3 text-right">{s.items}</td>
                      <td className="px-4 py-3 text-right font-semibold">{rupees(s.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Receipt modal */}
      {receipt && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setReceipt(null)}>
          <div className="bg-white text-slate-900 rounded-xl w-full max-w-xs p-6 font-mono text-sm" onClick={(e) => e.stopPropagation()}>
            <div className="text-center border-b border-dashed border-slate-300 pb-3 mb-3">
              <div className="font-bold text-lg">DEVORA CAFE</div>
              <div className="text-xs text-slate-500">Receipt {receipt.id}</div>
              <div className="text-xs text-slate-500">{receipt.time}</div>
            </div>
            {receipt.lines.map((l, i) => (
              <div key={i} className="flex justify-between mb-1">
                <span>{l.qty}× {l.name}</span>
                <span>{rupees(l.qty * l.price)}</span>
              </div>
            ))}
            <div className="border-t border-dashed border-slate-300 mt-3 pt-3 flex justify-between font-bold">
              <span>TOTAL</span>
              <span>{rupees(receipt.total)}</span>
            </div>
            <div className="text-center text-xs text-slate-400 mt-4">Thank you! 🙏</div>
            <button onClick={() => setReceipt(null)} className="w-full mt-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-sans hover:bg-slate-700">
              Close
            </button>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
