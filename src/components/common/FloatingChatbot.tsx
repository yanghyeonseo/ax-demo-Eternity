import { useEffect, useRef, useState } from "react";
import { Bot, HelpCircle, Send, X, Sparkles } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const GREETING =
  "Hello, I can help you review Eternity's manufacturing defects, module-level quality issues, and batch traceability.";

const FIXED_RESPONSE = `Based on the current dummy data, the highest risk is in Housing Fit Check for Rugged Phone batch ET-RP-260507-A03.
The main issue is Housing Gap / Waterproof Seal Failure.
Please review the module quality timeline and compare the housing supplier lot with previous normal batches.`;

const SUGGESTED = [
  "Which process has the highest defect risk today?",
  "Which batch needs urgent review?",
  "Show me module-level quality issues.",
  "What is the main defect in Rugged Phone production?",
];

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function send(text: string) {
    const msg = text.trim();
    if (!msg) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: msg },
      { role: "bot", text: FIXED_RESPONSE },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 flex w-[380px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
          <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-navy-700 to-navy-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">AX Assistant</p>
                <p className="text-[11px] text-white/70 leading-tight">
                  Quality copilot · Mockup
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex max-h-[340px] flex-col gap-2 overflow-y-auto bg-slate-50/60 px-3 py-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-line rounded-xl px-3 py-2 text-sm leading-snug ${
                  m.role === "bot"
                    ? "self-start border border-slate-200 bg-white text-slate-700 shadow-sm"
                    : "self-end bg-navy-600 text-white"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 bg-white px-3 pt-2">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {SUGGESTED.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 hover:border-navy-300 hover:bg-navy-50 hover:text-navy-700"
                >
                  <Sparkles className="h-3 w-3 text-navy-500" />
                  {q}
                </button>
              ))}
            </div>
            <form
              className="flex items-center gap-2 pb-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-navy-400 focus:ring-2 focus:ring-navy-100"
              />
              <button
                type="submit"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-navy-600 text-white hover:bg-navy-700"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AX Assistant" : "Open AX Assistant"}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-navy-600 text-white shadow-lg shadow-navy-900/30 ring-4 ring-navy-100 transition hover:scale-105 hover:bg-navy-700"
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <HelpCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
