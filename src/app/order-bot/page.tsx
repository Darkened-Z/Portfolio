"use client";

import { useEffect, useRef, useState } from "react";
import DemoShell from "@/components/DemoShell";

type Msg = { from: "bot" | "user"; text: string; time: string };
type MenuItem = { id: number; name: string; price: number };

const MENU: MenuItem[] = [
  { id: 1, name: "Chicken Burger", price: 450 },
  { id: 2, name: "Zinger Burger", price: 500 },
  { id: 3, name: "Fries", price: 200 },
  { id: 4, name: "Soft Drink", price: 100 },
  { id: 5, name: "Ice Cream", price: 180 },
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function menuText() {
  return (
    "Here's our menu 📋\n\n" +
    MENU.map((m) => `${m.id}. ${m.name} — Rs ${m.price}`).join("\n") +
    "\n\nReply with a number to add an item (e.g. \"1\"), or type *done* when finished."
  );
}

export default function OrderBot() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [stage, setStage] = useState<"start" | "ordering" | "name" | "done">("start");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    botSay("Salam! 👋 Welcome to Devora Cafe.\nI'm the order assistant — I take orders 24/7, even when the shop is busy.\n\nType *menu* to see what we have!");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  function botSay(text: string, delay = 700) {
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text, time: now() }]);
      setTyping(false);
    }, delay);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text, time: now() }]);
    setInput("");
    respond(text.toLowerCase());
  }

  function respond(text: string) {
    if (stage === "done") {
      botSay("Your order is already confirmed ✅ Type *restart* to place another one.");
      if (text === "restart") reset();
      return;
    }
    if (text.includes("menu")) {
      setStage("ordering");
      botSay(menuText());
      return;
    }
    if (stage === "ordering" || stage === "start") {
      const num = parseInt(text, 10);
      if (!isNaN(num)) {
        const item = MENU.find((m) => m.id === num);
        if (item) {
          const newCart = [...cart, item];
          setCart(newCart);
          const total = newCart.reduce((s, i) => s + i.price, 0);
          botSay(
            `Added *${item.name}* ✅\n\nYour order so far:\n` +
              newCart.map((i) => `• ${i.name} — Rs ${i.price}`).join("\n") +
              `\n\n*Total: Rs ${total}*\n\nAdd more (number) or type *done*.`
          );
          setStage("ordering");
          return;
        }
        botSay("Hmm, that number isn't on the menu. Type *menu* to see it again 🙂");
        return;
      }
      if (text === "done") {
        if (!cart.length) {
          botSay("Your cart is empty! Type *menu* to see our items first 🙂");
          return;
        }
        setStage("name");
        botSay("Great! What name should I put on the order?");
        return;
      }
      botSay('I can take your order right here 🙂\nType *menu* to see items, a number to add one, or *done* to finish.');
      return;
    }
    if (stage === "name") {
      const total = cart.reduce((s, i) => s + i.price, 0);
      const orderNo = "DV-" + String(Math.floor(1000 + (total % 9000)));
      setStage("done");
      botSay(
        `Perfect! 🎉 Order confirmed for *${text}*\n\n🧾 Order ${orderNo}\n` +
          cart.map((i) => `• ${i.name} — Rs ${i.price}`).join("\n") +
          `\n*Total: Rs ${total}*\n\n⏱️ Ready in ~20 minutes.\nWe'll message you when it's on the way!\n\n(Type *restart* to try another order)`
      );
      return;
    }
  }

  function reset() {
    setCart([]);
    setStage("start");
    setTimeout(() => botSay("Fresh start! 🌟 Type *menu* whenever you're ready."), 800);
  }

  return (
    <DemoShell title="Order Bot" tagline="An assistant that takes customer orders 24/7 — try ordering.">
      <div className="max-w-md mx-auto">
        {/* Phone frame */}
        <div className="rounded-3xl border border-slate-700 overflow-hidden bg-[#0b141a] shadow-2xl">
          {/* WA-style header */}
          <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-lg">🤖</div>
            <div>
              <div className="font-semibold text-sm">Devora Cafe</div>
              <div className="text-xs text-emerald-400">● online — replies instantly</div>
            </div>
          </div>

          {/* Chat area */}
          <div className="h-[420px] overflow-y-auto px-3 py-4 space-y-2" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.05), transparent 40%)" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${
                    m.from === "user"
                      ? "bg-[#005c4b] text-white rounded-br-sm"
                      : "bg-[#1f2c34] text-slate-100 rounded-bl-sm"
                  }`}
                >
                  {m.text.split("*").map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
                  )}
                  <div className="text-[10px] text-slate-400 text-right mt-1">{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#1f2c34] rounded-2xl rounded-bl-sm px-4 py-3 text-slate-400 text-sm">
                  <span className="animate-pulse">typing…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-[#1f2c34] px-3 py-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder='Try "menu" or "1"'
              className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-sm focus:outline-none placeholder:text-slate-500"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center font-bold"
            >
              ➤
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          This is the exact conversation flow the bot runs on WhatsApp —
          connected to a real business number, it takes orders while you sleep.
        </p>
      </div>
    </DemoShell>
  );
}
