"use client";

import { useEffect, useMemo, useState } from "react";
import DemoShell from "@/components/DemoShell";

type Item = { id: string; name: string; stock: number; reorderAt: number; price: number; sold: number };
type Staff = { id: string; name: string; role: string; status: "in" | "out" };

const SEED_ITEMS: Item[] = [
  { id: "i1", name: "Milk 1L", stock: 48, reorderAt: 20, price: 320, sold: 112 },
  { id: "i2", name: "Bread", stock: 12, reorderAt: 15, price: 180, sold: 96 },
  { id: "i3", name: "Eggs (dozen)", stock: 30, reorderAt: 10, price: 350, sold: 75 },
  { id: "i4", name: "Cooking Oil 1L", stock: 6, reorderAt: 8, price: 580, sold: 43 },
  { id: "i5", name: "Rice 5kg", stock: 25, reorderAt: 10, price: 1450, sold: 31 },
  { id: "i6", name: "Sugar 1kg", stock: 40, reorderAt: 15, price: 190, sold: 88 },
  { id: "i7", name: "Tea Pack", stock: 9, reorderAt: 12, price: 600, sold: 67 },
];

const SEED_STAFF: Staff[] = [
  { id: "st1", name: "Ali Raza", role: "Cashier", status: "in" },
  { id: "st2", name: "Hamza", role: "Floor", status: "in" },
  { id: "st3", name: "Saad", role: "Delivery", status: "out" },
];

function rupees(n: number) {
  return "Rs " + n.toLocaleString("en-PK");
}

export default function ERPDemo() {
  const [items, setItems] = useState<Item[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("devora_erp");
      if (raw) {
        const data = JSON.parse(raw);
        setItems(data.items);
        setStaff(data.staff);
      } else {
        setItems(SEED_ITEMS);
        setStaff(SEED_STAFF);
      }
    } catch {
      setItems(SEED_ITEMS);
      setStaff(SEED_STAFF);
    }
    setLoaded(true);
  }, []);

  const persist = (nextItems: Item[], nextStaff: Staff[]) => {
    setItems(nextItems);
    setStaff(nextStaff);
    try {
      localStorage.setItem("devora_erp", JSON.stringify({ items: nextItems, staff: nextStaff }));
    } catch {}
  };

  const sell = (id: string) => {
    const next = items.map((i) =>
      i.id === id && i.stock > 0 ? { ...i, stock: i.stock - 1, sold: i.sold + 1 } : i
    );
    persist(next, staff);
  };

  const restock = (id: string) => {
    const next = items.map((i) => (i.id === id ? { ...i, stock: i.stock + 24 } : i));
    persist(next, staff);
  };

  const toggleStaff = (id: string) => {
    const next = staff.map((s) =>
      s.id === id ? { ...s, status: s.status === "in" ? "out" as const : "in" as const } : s
    );
    persist(items, next);
  };

  const lowStock = useMemo(() => items.filter((i) => i.stock <= i.reorderAt), [items]);
  const stockValue = useMemo(() => items.reduce((s, i) => s + i.stock * i.price, 0), [items]);
  const revenue = useMemo(() => items.reduce((s, i) => s + i.sold * i.price, 0), [items]);
  const topSeller = useMemo(
    () => [...items].sort((a, b) => b.sold - a.sold)[0],
    [items]
  );

  if (!loaded) return null;

  return (
    <DemoShell title="Business Manager" tagline="Inventory, sales and staff — one dashboard, zero registers.">
      {/* Low stock alert banner */}
      {lowStock.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <div className="text-sm">
            <span className="font-semibold text-amber-300">
              {lowStock.length} item{lowStock.length > 1 ? "s" : ""} below reorder level:
            </span>{" "}
            <span className="text-amber-200/80">
              {lowStock.map((i) => i.name).join(", ")} — restock before you run out.
            </span>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 mb-1">Revenue (month)</div>
          <div className="text-xl font-bold text-emerald-400">{rupees(revenue)}</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 mb-1">Stock value</div>
          <div className="text-xl font-bold">{rupees(stockValue)}</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 mb-1">Low-stock items</div>
          <div className={`text-xl font-bold ${lowStock.length ? "text-amber-400" : "text-emerald-400"}`}>
            {lowStock.length}
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 mb-1">Top seller</div>
          <div className="text-xl font-bold truncate">{topSeller?.name ?? "—"}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inventory table */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold mb-3">Inventory</h3>
          <div className="rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-slate-400 text-xs">
                <tr>
                  <th className="text-left px-4 py-3">Item</th>
                  <th className="text-right px-4 py-3">Price</th>
                  <th className="text-right px-4 py-3">Sold</th>
                  <th className="text-right px-4 py-3">In stock</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => {
                  const low = i.stock <= i.reorderAt;
                  return (
                    <tr key={i.id} className="border-t border-slate-800 hover:bg-slate-900/50">
                      <td className="px-4 py-3 font-medium">
                        {i.name}
                        {low && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
                            low
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-400">{rupees(i.price)}</td>
                      <td className="px-4 py-3 text-right">{i.sold}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${low ? "text-amber-400" : ""}`}>
                        {i.stock}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => sell(i.id)}
                          disabled={i.stock === 0}
                          className="text-xs px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-40 mr-2"
                        >
                          Sell 1
                        </button>
                        <button
                          onClick={() => restock(i.id)}
                          className="text-xs px-2.5 py-1.5 rounded-md bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30"
                        >
                          +24
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Click “Sell 1” a few times on a low item — watch the alert banner update in real time.
          </p>
        </div>

        {/* Staff */}
        <div>
          <h3 className="font-semibold mb-3">Staff today</h3>
          <div className="space-y-2">
            {staff.map((s) => (
              <div key={s.id} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.role}</div>
                </div>
                <button
                  onClick={() => toggleStaff(s.id)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                    s.status === "in"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {s.status === "in" ? "● Checked in" : "○ Out"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h4 className="text-sm font-semibold mb-2">Why this matters</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Most small businesses track this in notebooks or memory. One dashboard
              means no stockouts, no guessing, and the owner sees everything from a phone.
            </p>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
