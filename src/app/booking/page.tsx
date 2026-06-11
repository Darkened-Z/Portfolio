"use client";

import { useEffect, useMemo, useState } from "react";
import DemoShell from "@/components/DemoShell";

type Service = { id: string; name: string; mins: number; price: number; emoji: string };
type Booking = { id: string; service: string; date: string; slot: string; name: string };

const SERVICES: Service[] = [
  { id: "s1", name: "Haircut", mins: 30, price: 800, emoji: "💇" },
  { id: "s2", name: "Beard Trim", mins: 20, price: 400, emoji: "🪒" },
  { id: "s3", name: "Facial", mins: 45, price: 1500, emoji: "✨" },
  { id: "s4", name: "Full Grooming", mins: 90, price: 2500, emoji: "💆" },
];

const SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

// A few slots pre-booked so the "taken" state is visible in the demo
const PREBOOKED: Record<string, string[]> = {};

function nextDays(n: number): { iso: string; label: string }[] {
  const out = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    out.push({
      iso: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString("en", { weekday: "short", day: "numeric", month: "short" }),
    });
  }
  return out;
}

export default function BookingDemo() {
  const days = useMemo(() => nextDays(7), []);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState(days[0].iso);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("devora_bookings");
      if (raw) setBookings(JSON.parse(raw));
      else {
        // seed: make the demo's first day look busy
        const seed: Booking[] = [
          { id: "b1", service: "Haircut", date: days[0].iso, slot: "11:00", name: "Ahmed" },
          { id: "b2", service: "Facial", date: days[0].iso, slot: "15:00", name: "Bilal" },
          { id: "b3", service: "Full Grooming", date: days[1].iso, slot: "12:00", name: "Usman" },
        ];
        setBookings(seed);
        localStorage.setItem("devora_bookings", JSON.stringify(seed));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persist = (next: Booking[]) => {
    setBookings(next);
    try {
      localStorage.setItem("devora_bookings", JSON.stringify(next));
    } catch {}
  };

  const takenSlots = useMemo(
    () =>
      new Set(
        bookings.filter((b) => b.date === date).map((b) => b.slot)
          .concat(PREBOOKED[date] || [])
      ),
    [bookings, date]
  );

  const book = () => {
    if (!service || !slot || !name.trim()) return;
    if (takenSlots.has(slot)) return; // double-booking guard
    const b: Booking = {
      id: "b" + Date.now(),
      service: service.name,
      date,
      slot,
      name: name.trim(),
    };
    persist([...bookings, b]);
    setConfirmed(b);
    setSlot(null);
    setName("");
  };

  const todays = bookings
    .filter((b) => b.date === date)
    .sort((a, b) => a.slot.localeCompare(b.slot));

  return (
    <DemoShell title="Booking System" tagline="Pick a service, date and free slot — double-booking is impossible.">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking flow */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: service */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-slate-300">1 · Choose a service</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setService(s)}
                  className={`rounded-xl border p-4 text-left transition-all ${service?.id === s.id ? "border-sky-400 bg-sky-500/10" : "border-slate-800 bg-slate-900 hover:border-slate-600"}`}
                >
                  <div className="text-2xl mb-2">{s.emoji}</div>
                  <div className="font-medium text-sm">{s.name}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {s.mins} min · Rs {s.price}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: date */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-slate-300">2 · Pick a day</h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {days.map((d) => (
                <button
                  key={d.iso}
                  onClick={() => { setDate(d.iso); setSlot(null); }}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${date === d.iso ? "bg-sky-500 text-white font-medium" : "bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-600"}`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: slot */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-slate-300">3 · Pick a free time</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {SLOTS.map((s) => {
                const taken = takenSlots.has(s);
                return (
                  <button
                    key={s}
                    disabled={taken}
                    onClick={() => setSlot(s)}
                    className={`py-2 rounded-lg text-sm transition-all ${
                      taken
                        ? "bg-slate-900/50 text-slate-600 line-through cursor-not-allowed"
                        : slot === s
                          ? "bg-sky-500 text-white font-semibold"
                          : "bg-slate-900 border border-slate-800 hover:border-sky-500/50"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-2">Crossed-out slots are already booked — the system blocks them automatically.</p>
          </div>

          {/* Step 4: confirm */}
          <div>
            <h3 className="font-semibold mb-3 text-sm text-slate-300">4 · Your name</h3>
            <div className="flex gap-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={book}
                disabled={!service || !slot || !name.trim()}
                className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm"
              >
                Book it
              </button>
            </div>
          </div>
        </div>

        {/* Day schedule */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 h-fit">
          <h3 className="font-semibold mb-1">Owner&apos;s view</h3>
          <p className="text-xs text-slate-500 mb-4">
            Schedule for {days.find((d) => d.iso === date)?.label}
          </p>
          {todays.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">No bookings this day yet.</p>
          ) : (
            <div className="space-y-2">
              {todays.map((b) => (
                <div key={b.id} className="flex items-center gap-3 rounded-lg bg-slate-800/60 px-3 py-2.5">
                  <div className="text-sky-400 font-mono text-sm font-semibold">{b.slot}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{b.name}</div>
                    <div className="text-xs text-slate-400">{b.service}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmed && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setConfirmed(null)}>
          <div className="bg-slate-900 border border-sky-500/40 rounded-2xl w-full max-w-sm p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="text-4xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2">Booking confirmed!</h3>
            <p className="text-sm text-slate-300">
              {confirmed.name} — {confirmed.service}
              <br />
              {days.find((d) => d.iso === confirmed.date)?.label} at {confirmed.slot}
            </p>
            <p className="text-xs text-slate-500 mt-3">
              In production this sends a WhatsApp/SMS confirmation + reminder before the appointment.
            </p>
            <button onClick={() => setConfirmed(null)} className="mt-5 w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 font-semibold text-sm">
              Done
            </button>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
