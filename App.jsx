import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#f5f5f7", surface: "#ffffff", surfaceAlt: "#f0f0f3",
  accent: "#c8a000", freebet: "#d93a56", freebetBg: "rgba(217,58,86,0.07)",
  freebetBorder: "rgba(217,58,86,0.2)", euro: "#16a34a",
  text: "#1a1a2e", textMuted: "#6b6b80", textDim: "#a0a0b0",
  border: "#e0e0e8", inputBg: "#f8f8fb", crypto: "#7c5cbf",
  cryptoBg: "rgba(124,92,191,0.06)",
  simple: "#0284c7", simpleBg: "rgba(2,132,199,0.07)",
};

// ========== PROPOSAL 1 — Segmented Control ==========
function P1({ mb }) {
  const [m, setM] = useState("euro");
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
    <div style={{ display: "flex", background: C.inputBg, borderRadius: 9, padding: 2.5, border: `1px solid ${C.border}`, flexShrink: 0 }}>
      <SBtn a={m === "euro"} c={C.accent} o={() => setM("euro")} s={mb}>€</SBtn>
      <SBtn a={m === "freebet"} c={C.freebet} o={() => setM("freebet")} s={mb}><FI s={mb ? 11 : 12} /><span style={{ marginLeft: 3 }}>Freebet</span></SBtn>
    </div><Inp mb={mb} /><Cote /></div></BetRow>;
}
function SBtn({ a, c, o, children, s }) {
  return <button onClick={o} style={{ padding: s ? "5px 10px" : "7px 14px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: s ? 11 : 12, fontWeight: 700, fontFamily: "var(--f)", background: a ? c : "transparent", color: a ? (c === C.accent ? C.bg : "#fff") : C.textMuted, transition: "all 0.2s", display: "flex", alignItems: "center", lineHeight: 1 }}>{children}</button>;
}

// ========== PROPOSAL 2 — Toggle Switch ==========
function P2({ mb }) {
  const [m, setM] = useState("euro"); const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none", flexShrink: 0 }} onClick={() => setM(e ? "freebet" : "euro")}>
      <span style={{ fontSize: 12, fontWeight: 700, color: e ? C.accent : C.textDim, fontFamily: "var(--f)" }}>€</span>
      <div style={{ width: 38, height: 22, borderRadius: 11, background: e ? `linear-gradient(135deg,#b8940a,${C.accent})` : `linear-gradient(135deg,#c0354d,${C.freebet})`, position: "relative", transition: "background 0.3s", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: e ? 2 : 18, transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }} />
      </div>
      <FI s={14} style={{ opacity: !e ? 1 : 0.3, transition: "opacity 0.2s" }} />
    </div><Inp mb={mb} /><Cote /></div></BetRow>;
}

// ========== PROPOSAL 3 — Checkbox ==========
function P3({ mb }) {
  const [on, setOn] = useState(false);
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Inp mb={mb} prefix={on ? null : "€"} fb={on} /><Cote /></div>
    <div onClick={() => setOn(!on)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none", padding: "6px 10px", borderRadius: 8, background: on ? C.freebetBg : "transparent", border: `1px solid ${on ? C.freebetBorder : C.border}`, transition: "all 0.2s" }}>
      <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${on ? C.freebet : C.textDim}`, display: "flex", alignItems: "center", justifyContent: "center", background: on ? C.freebet : "transparent", flexShrink: 0 }}>
        {on && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div><FI s={14} />
      <span style={{ fontSize: mb ? 11 : 12, fontWeight: 600, color: on ? C.freebet : C.textMuted, fontFamily: "var(--f)" }}>Utiliser un Freebet</span>
      {on && <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: C.freebet, fontFamily: "var(--f)" }}>5,00 € dispo</span>}
    </div></div></BetRow>;
}

// ========== PROPOSAL 4 — Bannière Tappable ==========
function P4({ mb }) {
  const [on, setOn] = useState(false);
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    {!on && <div onClick={() => setOn(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", borderRadius: 8, background: "linear-gradient(135deg, rgba(217,58,86,0.06), rgba(233,69,96,0.03))", border: `1px dashed ${C.freebetBorder}`, cursor: "pointer" }}>
      <FI s={16} /><span style={{ fontSize: mb ? 11 : 12, fontWeight: 600, color: C.freebet, fontFamily: "var(--f)" }}>1 Freebet disponible</span>
      <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: C.freebet, fontFamily: "var(--f)", background: "rgba(217,58,86,0.1)", padding: "3px 8px", borderRadius: 5 }}>5,00 €</span>
    </div>}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {on && <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 10px", borderRadius: 8, background: C.freebet, cursor: "pointer", flexShrink: 0 }} onClick={() => setOn(false)}>
        <FI s={12} color="#fff" /><span style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--f)" }}>5,00 €</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </div>}
      <Inp mb={mb} placeholder={on ? "Freebet appliqué" : "Mise"} disabled={on} prefix={on ? null : "€"} /><Cote />
    </div></div></BetRow>;
}

// ========== PROPOSAL 5 — Lien Inline ==========
function P5({ mb }) {
  const [m, setM] = useState("euro"); const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", flex: 1, background: C.inputBg, borderRadius: 10, border: `1px solid ${!e ? C.freebetBorder : C.border}`, padding: "0 12px 0 0", overflow: "hidden" }}>
        <div style={{ padding: mb ? "7px 10px" : "9px 12px", background: e ? "rgba(200,160,0,0.06)" : C.freebetBg, borderRight: `1px solid ${!e ? C.freebetBorder : C.border}`, display: "flex", alignItems: "center", flexShrink: 0 }}>
          {e ? <span style={{ fontSize: 14, fontWeight: 700, color: C.accent, fontFamily: "var(--f)" }}>€</span> : <FI s={14} />}
        </div>
        <input type="text" defaultValue="" placeholder="0,00" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600, fontFamily: "var(--f)", textAlign: "right", padding: "8px", minWidth: 40 }} />
      </div><Cote /></div>
    <button onClick={() => setM(e ? "freebet" : "euro")} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0", display: "flex", alignItems: "center", gap: 5, alignSelf: "flex-start" }}>
      {e ? <><FI s={12} /><span style={{ fontSize: 11, fontWeight: 600, color: C.freebet, fontFamily: "var(--f)", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "2px" }}>Utiliser un freebet à la place</span></> :
        <><span style={{ fontSize: 12, color: C.accent, fontWeight: 700 }}>€</span><span style={{ fontSize: 11, fontWeight: 600, color: C.accent, fontFamily: "var(--f)", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "2px" }}>Revenir à la mise en euros</span></>}
    </button></div></BetRow>;
}

// ========== PROPOSAL 6 — Tap-to-Flip ==========
function P6({ mb }) {
  const [m, setM] = useState("euro"); const [f, sF] = useState(false); const e = m === "euro";
  const go = () => { sF(true); setTimeout(() => { setM(e ? "freebet" : "euro"); setTimeout(() => sF(false), 200); }, 150); };
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", flex: 1, background: C.inputBg, borderRadius: 10, border: `1px solid ${e ? C.border : C.freebetBorder}`, overflow: "hidden" }}>
      <button onClick={go} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: mb ? 56 : 64, height: mb ? 38 : 42, background: e ? "rgba(200,160,0,0.06)" : "rgba(233,69,96,0.1)", border: "none", borderRight: `1px solid ${e ? C.border : C.freebetBorder}`, cursor: "pointer", flexShrink: 0 }}>
        <div style={{ transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)", transform: f ? "rotateY(90deg) scale(0.8)" : "rotateY(0) scale(1)" }}>
          {e ? <span style={{ fontSize: mb ? 16 : 18, fontWeight: 800, color: C.accent, fontFamily: "var(--f)" }}>€</span> : <FI s={mb ? 18 : 20} />}
        </div>
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ opacity: 0.4 }}><path d="M3 1L1 3L3 5" stroke={e ? C.accent : C.freebet} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 7L9 9L7 11" stroke={e ? C.accent : C.freebet} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><line x1="1" y1="3" x2="9" y2="3" stroke={e ? C.accent : C.freebet} strokeWidth="1.2" strokeLinecap="round" /><line x1="9" y1="9" x2="1" y2="9" stroke={e ? C.accent : C.freebet} strokeWidth="1.2" strokeLinecap="round" /></svg>
      </button>
      <input type="text" defaultValue="" placeholder="0,00" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600, fontFamily: "var(--f)", textAlign: "right", padding: "8px 12px", minWidth: 40 }} />
    </div><Cote /></div></BetRow>;
}

// ========== PROPOSAL 7 — Swipe-to-Switch ==========
function P7({ mb }) {
  const [m, setM] = useState("euro"); const e = m === "euro";
  const ref = useRef(null); const [d, sD] = useState(false); const [tx, sTx] = useState(0);
  const tw = mb ? 40 : 48; const trW = mb ? 100 : 120; const mx = trW - tw;
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
    <div ref={ref} style={{ width: trW, height: mb ? 36 : 40, borderRadius: 10, position: "relative", overflow: "hidden", background: C.inputBg, border: `1px solid ${e ? C.border : C.freebetBorder}`, flexShrink: 0, cursor: "grab", userSelect: "none" }}
      onPointerDown={(ev) => { sD(true); ev.target.setPointerCapture(ev.pointerId); }}
      onPointerMove={(ev) => { if (!d) return; const r = ref.current.getBoundingClientRect(); sTx(Math.max(0, Math.min(ev.clientX - r.left - tw / 2, mx))); }}
      onPointerUp={() => { sD(false); if (tx > mx * 0.5) setM(e ? "freebet" : "euro"); sTx(0); }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 10px", pointerEvents: "none" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: e ? C.accent : C.textDim, fontFamily: "var(--f)" }}>€</span><FI s={13} style={{ opacity: !e ? 1 : 0.35 }} />
      </div>
      <div style={{ position: "absolute", top: 3, left: 3, width: tw - 6, height: "calc(100% - 6px)", borderRadius: 7, background: e ? `linear-gradient(135deg,#b8940a,${C.accent})` : `linear-gradient(135deg,#c0354d,${C.freebet})`, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, transform: `translateX(${tx}px)`, transition: d ? "none" : "transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
        <span style={{ fontSize: mb ? 11 : 12, fontWeight: 800, color: "#fff", fontFamily: "var(--f)" }}>{e ? "€" : "F"}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ opacity: 0.6 }}><path d="M1 4H11M8 1L11 4L8 7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div><Inp mb={mb} /><Cote /></div></BetRow>;
}

// ========== PROPOSAL 8 — Payment Method ==========
function P8({ mb }) {
  const [m, setM] = useState("euro"); const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Inp mb={mb} prefix={e ? "€" : null} fb={!e} /><Cote /></div>
    <div onClick={() => setM(e ? "freebet" : "euro")} style={{ display: "flex", alignItems: "center", gap: 8, padding: mb ? "5px 10px" : "6px 12px", borderRadius: 8, background: e ? "rgba(0,0,0,0.02)" : C.freebetBg, border: `1px solid ${e ? C.border : C.freebetBorder}`, cursor: "pointer", userSelect: "none" }}>
      <div style={{ width: mb ? 20 : 24, height: mb ? 20 : 24, borderRadius: 6, background: e ? "rgba(200,160,0,0.08)" : "rgba(217,58,86,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {e ? <span style={{ fontSize: mb ? 11 : 13, fontWeight: 800, color: C.accent, fontFamily: "var(--f)" }}>€</span> : <FI s={mb ? 12 : 14} />}
      </div>
      <span style={{ fontSize: mb ? 11 : 12, fontWeight: 600, color: e ? C.textMuted : C.freebet, fontFamily: "var(--f)" }}>{e ? "Mise en euros" : "Freebet · 5,00 €"}</span>
      <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 600, color: C.textDim, fontFamily: "var(--f)" }}>Changer</span>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M1 1L5 5L1 9" stroke={C.textDim} strokeWidth="1.3" strokeLinecap="round" /></svg>
    </div></div></BetRow>;
}

// ========== PROPOSAL 9 — Double-Tap Morph ==========
function P9({ mb }) {
  const [m, setM] = useState("euro"); const [a, sA] = useState(false); const [h, sH] = useState(true); const e = m === "euro";
  const tc = useRef(0); const tt = useRef(null);
  const tap = () => { tc.current++; if (tc.current === 1) { tt.current = setTimeout(() => { tc.current = 0; }, 300); } else if (tc.current === 2) { clearTimeout(tt.current); tc.current = 0; sH(false); sA(true); setTimeout(() => { setM(e ? "freebet" : "euro"); setTimeout(() => sA(false), 250); }, 150); } };
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", flex: 1, background: C.inputBg, borderRadius: 10, border: `1px solid ${e ? C.border : C.freebetBorder}`, overflow: "hidden" }}>
        <div onClick={tap} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: mb ? 48 : 54, height: mb ? 38 : 42, background: e ? "rgba(200,160,0,0.05)" : "rgba(217,58,86,0.06)", borderRight: `1px solid ${e ? C.border : C.freebetBorder}`, cursor: "pointer", flexShrink: 0 }}>
          <div style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", transform: a ? "scale(1.4)" : "scale(1)" }}>
            {e ? <span style={{ fontSize: mb ? 17 : 20, fontWeight: 800, color: C.accent, fontFamily: "var(--f)" }}>€</span> : <FI s={mb ? 20 : 22} />}
          </div>
        </div>
        <input type="text" defaultValue="" placeholder="0,00" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600, fontFamily: "var(--f)", textAlign: "right", padding: "8px 12px", minWidth: 40 }} />
      </div><Cote /></div>
    {h && <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 4 }}><span style={{ fontSize: 10, color: C.textDim, fontFamily: "var(--f)", fontStyle: "italic" }}>Double-tap sur {e ? "€" : "F"} pour basculer</span></div>}
  </div></BetRow>;
}

// ========== PROPOSAL 10 — Stacked Swap ==========
function P10({ mb }) {
  const [m, setM] = useState("euro"); const [sp, sSp] = useState(false); const e = m === "euro";
  const swap = () => { sSp(true); setTimeout(() => { setM(e ? "freebet" : "euro"); setTimeout(() => sSp(false), 250); }, 150); };
  const top = e ? { l: "Euro", i: "€", c: C.accent, bg: "rgba(200,160,0,0.05)" } : { l: "Freebet", i: "F", c: C.freebet, bg: C.freebetBg };
  return <BetRow mb={mb}><div style={{ display: "flex", gap: 8, width: "100%" }}>
    <div style={{ flex: 1, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", background: C.inputBg, borderRadius: 10, border: `1px solid ${e ? C.border : C.freebetBorder}`, overflow: "hidden" }}>
        <div style={{ padding: mb ? "8px 10px" : "10px 12px", background: top.bg, borderRight: `1px solid ${e ? C.border : C.freebetBorder}`, display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          {e ? <span style={{ fontSize: mb ? 14 : 16, fontWeight: 800, color: C.accent, fontFamily: "var(--f)" }}>€</span> : <FI s={mb ? 16 : 18} />}
          <span style={{ fontSize: mb ? 10 : 11, fontWeight: 600, color: top.c, fontFamily: "var(--f)" }}>{top.l}</span>
        </div>
        <input type="text" defaultValue="" placeholder="0,00" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600, fontFamily: "var(--f)", textAlign: "right", padding: mb ? "8px 10px" : "10px 12px", minWidth: 40 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "-8px 0", position: "relative", zIndex: 2 }}>
        <button onClick={swap} style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${C.surfaceAlt},${C.surface})`, border: `2px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", transition: "transform 0.3s", transform: sp ? "rotate(180deg)" : "rotate(0)" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1V13M7 1L4 4M7 1L10 4" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 13L4 10M7 13L10 10" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button></div>
      <div style={{ display: "flex", alignItems: "center", background: "rgba(0,0,0,0.03)", borderRadius: 10, border: `1px solid ${C.border}`, padding: mb ? "6px 12px" : "8px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flex: 1 }}>
          {!e ? <span style={{ fontSize: 12, fontWeight: 700, color: C.textDim, fontFamily: "var(--f)" }}>€</span> : <FI s={14} style={{ opacity: 0.4 }} />}
          <span style={{ fontSize: 11, color: C.textDim, fontFamily: "var(--f)", fontWeight: 500 }}>{!e ? "Euro" : "Freebet"}</span>
        </div>
        <span style={{ fontSize: mb ? 11 : 12, color: C.textDim, fontFamily: "var(--f)", fontWeight: 600 }}>{e ? "5,00 € dispo" : "—"}</span>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "flex-start", paddingTop: mb ? 6 : 8 }}><Cote /></div>
  </div></BetRow>;
}

// ========== PROPOSAL 11 — Balance Tap ==========
function P11({ mb }) {
  const [m, setM] = useState("euro"); const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    <div style={{ display: "flex", gap: 6 }}>
      {[{ id: "euro", l: "Euro", sub: "Solde", c: C.accent, bg: "rgba(245,197,24," }, { id: "freebet", l: "Freebet", sub: "5,00 €", c: C.freebet, bg: "rgba(233,69,96," }].map(x => (
        <button key={x.id} onClick={() => setM(x.id)} style={{ flex: 1, display: "flex", alignItems: "center", gap: 6, padding: mb ? "6px 8px" : "8px 10px", borderRadius: 9, background: m === x.id ? x.bg + "0.08)" : "rgba(0,0,0,0.015)", border: `1.5px solid ${m === x.id ? x.c : "transparent"}`, cursor: "pointer", transition: "all 0.2s" }}>
          <div style={{ width: mb ? 22 : 26, height: mb ? 22 : 26, borderRadius: "50%", background: m === x.id ? x.bg + "0.15)" : "rgba(0,0,0,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {x.id === "euro" ? <span style={{ fontSize: mb ? 12 : 14, fontWeight: 800, color: m === x.id ? x.c : C.textDim, fontFamily: "var(--f)" }}>€</span> : <FI s={mb ? 13 : 15} style={{ opacity: m === x.id ? 1 : 0.4 }} />}
          </div>
          <div><div style={{ fontSize: mb ? 10 : 11, fontWeight: 700, color: m === x.id ? C.text : C.textDim, fontFamily: "var(--f)", lineHeight: 1 }}>{x.l}</div><div style={{ fontSize: 9, color: m === x.id ? (x.id === "freebet" ? x.c : C.textMuted) : C.textDim, fontFamily: "var(--f)", marginTop: 1, fontWeight: x.id === "freebet" && m === x.id ? 600 : 400 }}>{x.sub}</div></div>
        </button>))}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Inp mb={mb} prefix={e ? "€" : null} fb={!e} /><Cote /></div>
  </div></BetRow>;
}

// ========== PROPOSAL 12 — Token Pill ==========
function P12({ mb }) {
  const [m, setM] = useState("euro"); const [op, sO] = useState(false); const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", position: "relative" }}>
    <div style={{ flex: 1, display: "flex", alignItems: "center", background: C.inputBg, borderRadius: 10, border: `1px solid ${e ? C.border : C.freebetBorder}`, padding: mb ? "3px 4px 3px 10px" : "4px 4px 4px 12px", gap: 6 }}>
      <input type="text" defaultValue="" placeholder="0,00" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600, fontFamily: "var(--f)", minWidth: 40 }} />
      <button onClick={() => sO(!op)} style={{ display: "flex", alignItems: "center", gap: 5, padding: mb ? "5px 8px 5px 6px" : "6px 10px 6px 7px", borderRadius: 8, background: e ? "rgba(200,160,0,0.08)" : "rgba(217,58,86,0.08)", border: `1px solid ${e ? "rgba(200,160,0,0.15)" : C.freebetBorder}`, cursor: "pointer", flexShrink: 0 }}>
        {e ? <span style={{ fontSize: mb ? 12 : 13, fontWeight: 800, color: C.accent, fontFamily: "var(--f)" }}>€</span> : <FI s={mb ? 13 : 15} />}
        <span style={{ fontSize: mb ? 10 : 11, fontWeight: 700, color: e ? C.accent : C.freebet, fontFamily: "var(--f)" }}>{e ? "EUR" : "FREE"}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" style={{ transform: op ? "rotate(180deg)" : "", transition: "transform 0.2s" }}><path d="M1 1L4 4L7 1" stroke={e ? C.accent : C.freebet} strokeWidth="1.2" strokeLinecap="round" /></svg>
      </button>
    </div><Cote />
    {op && <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 56, background: C.surfaceAlt, borderRadius: 10, border: `1px solid ${C.border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 10, overflow: "hidden", minWidth: 150 }}>
      <MR a={e} icon={<span style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>€</span>} l="Euro" sub="Argent réel" o={() => { setM("euro"); sO(false); }} />
      <div style={{ height: 1, background: C.border }} />
      <MR a={!e} icon={<FI s={13} />} l="Freebet" sub="5,00 € dispo" o={() => { setM("freebet"); sO(false); }} />
    </div>}
  </div></BetRow>;
}

// ========== PROPOSAL 13 — Long Press ==========
function P13({ mb }) {
  const [m, setM] = useState("euro"); const [pp, sPp] = useState(false); const e = m === "euro";
  const t = useRef(null); const [pr, sPr] = useState(false);
  const sd = () => { sPr(true); t.current = setTimeout(() => { sPp(true); sPr(false); }, 500); };
  const eu = () => { clearTimeout(t.current); sPr(false); };
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", background: C.inputBg, borderRadius: 10, border: `1px solid ${e ? C.border : C.freebetBorder}`, overflow: "hidden" }}>
        <div onPointerDown={sd} onPointerUp={eu} onPointerLeave={eu} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: mb ? 50 : 58, height: mb ? 38 : 42, background: pr ? (e ? "rgba(200,160,0,0.12)" : "rgba(217,58,86,0.12)") : (e ? "rgba(200,160,0,0.05)" : "rgba(217,58,86,0.06)"), borderRight: `1px solid ${e ? C.border : C.freebetBorder}`, cursor: "pointer", flexShrink: 0, transition: "background 0.15s" }}>
          {e ? <span style={{ fontSize: mb ? 17 : 20, fontWeight: 800, color: C.accent, fontFamily: "var(--f)" }}>€</span> : <FI s={mb ? 20 : 22} />}
        </div>
        <input type="text" defaultValue="" placeholder="0,00" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600, fontFamily: "var(--f)", textAlign: "right", padding: "8px 12px", minWidth: 40 }} />
      </div><Cote />
      {pp && <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: C.surfaceAlt, borderRadius: 12, border: `1px solid ${C.border}`, boxShadow: "0 12px 32px rgba(0,0,0,0.08)", zIndex: 10, overflow: "hidden", minWidth: 180 }}>
        <div style={{ padding: "8px 12px 4px", fontSize: 9, fontWeight: 600, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "var(--f)" }}>Type de mise</div>
        <MR a={e} icon={<span style={{ fontSize: 13, fontWeight: 700, color: C.accent }}>€</span>} l="Euro" sub="Argent réel" o={() => { setM("euro"); sPp(false); }} />
        <div style={{ height: 1, background: C.border, margin: "0 12px" }} />
        <MR a={!e} icon={<FI s={13} />} l="Freebet" sub="5,00 € disponible" o={() => { setM("freebet"); sPp(false); }} />
        <div style={{ padding: "6px 12px 8px" }}><button onClick={() => sPp(false)} style={{ width: "100%", padding: "6px", borderRadius: 6, background: "rgba(0,0,0,0.03)", border: `1px solid ${C.border}`, color: C.textMuted, fontSize: 10, fontWeight: 600, fontFamily: "var(--f)", cursor: "pointer" }}>Annuler</button></div>
      </div>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 4 }}><span style={{ fontSize: 10, color: C.textDim, fontFamily: "var(--f)", fontStyle: "italic" }}>Maintenir {e ? "€" : "F"} enfoncé pour changer</span></div>
  </div></BetRow>;
}

// ========== PROPOSAL 14 — Quick Amounts + Freebet (NEW) ==========
function P14({ mb }) {
  const [m, setM] = useState("euro");
  const [val, setVal] = useState("");
  const e = m === "euro";
  const amounts = [5, 10, 20, 50];
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Inp mb={mb} prefix={e ? "€" : null} fb={!e} val={val} onChange={setVal} /><Cote />
    </div>
    {/* Quick amounts row with freebet as last option */}
    <div style={{ display: "flex", gap: 5 }}>
      {amounts.map(a => (
        <button key={a} onClick={() => { setM("euro"); setVal(String(a)); }} style={{
          flex: 1, padding: mb ? "5px 0" : "6px 0", borderRadius: 7,
          background: e && val === String(a) ? "rgba(200,160,0,0.08)" : "rgba(0,0,0,0.02)",
          border: `1px solid ${e && val === String(a) ? "rgba(200,160,0,0.2)" : C.border}`,
          color: e && val === String(a) ? C.accent : C.textMuted,
          fontSize: mb ? 11 : 12, fontWeight: 600, fontFamily: "var(--f)",
          cursor: "pointer", transition: "all 0.15s",
        }}>{a}€</button>
      ))}
      {/* Freebet quick button */}
      <button onClick={() => { setM("freebet"); setVal("5"); }} style={{
        flex: 1.2, padding: mb ? "5px 4px" : "6px 6px", borderRadius: 7,
        background: !e ? "rgba(217,58,86,0.08)" : "rgba(217,58,86,0.03)",
        border: `1px solid ${!e ? C.freebetBorder : "rgba(217,58,86,0.08)"}`,
        color: !e ? C.freebet : "rgba(233,69,96,0.6)",
        fontSize: mb ? 10 : 11, fontWeight: 700, fontFamily: "var(--f)",
        cursor: "pointer", transition: "all 0.15s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
      }}>
        <FI s={mb ? 10 : 11} style={{ opacity: !e ? 1 : 0.5 }} />
        <span>5€</span>
      </button>
    </div>
  </div></BetRow>;
}

// ========== PROPOSAL 15 — Smart Nudge (NEW) ==========
function P15({ mb }) {
  const [m, setM] = useState("euro");
  const [dismissed, setDismissed] = useState(false);
  const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
    {/* Nudge toast — auto-appears when freebet available */}
    {e && !dismissed && (
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "6px 8px 6px 10px", borderRadius: 9,
        background: "linear-gradient(135deg, rgba(233,69,96,0.06), rgba(245,197,24,0.03))",
        border: `1px solid rgba(217,58,86,0.1)`,
      }}>
        <FI s={14} />
        <span style={{ fontSize: mb ? 10 : 11, color: C.textMuted, fontFamily: "var(--f)", flex: 1 }}>
          Vous avez <strong style={{ color: C.freebet }}>5,00 €</strong> de freebet
        </span>
        <button onClick={() => setM("freebet")} style={{
          padding: "4px 10px", borderRadius: 6,
          background: C.freebet, border: "none",
          color: "#fff", fontSize: mb ? 10 : 11, fontWeight: 700,
          fontFamily: "var(--f)", cursor: "pointer",
        }}>Utiliser</button>
        <button onClick={() => setDismissed(true)} style={{
          background: "none", border: "none", cursor: "pointer", padding: "2px",
          display: "flex", alignItems: "center",
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2.5 2.5L7.5 7.5M7.5 2.5L2.5 7.5" stroke={C.textDim} strokeWidth="1.3" strokeLinecap="round" /></svg>
        </button>
      </div>
    )}
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Inp mb={mb} prefix={e ? "€" : null} fb={!e} /><Cote />
    </div>
    {!e && (
      <button onClick={() => { setM("euro"); setDismissed(false); }} style={{
        background: "none", border: "none", cursor: "pointer", padding: "2px 0",
        display: "flex", alignItems: "center", gap: 4, alignSelf: "flex-start",
      }}>
        <span style={{ fontSize: 11, color: C.accent, fontWeight: 700 }}>€</span>
        <span style={{ fontSize: 10, color: C.accent, fontFamily: "var(--f)", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "2px", fontWeight: 500 }}>Revenir aux euros</span>
      </button>
    )}
  </div></BetRow>;
}

// ========== PROPOSAL 16 — Prefix Tap (NEW) ==========
function P16({ mb }) {
  const [m, setM] = useState("euro");
  const [anim, setAnim] = useState(false);
  const e = m === "euro";
  const flip = () => {
    setAnim(true);
    setTimeout(() => { setM(e ? "freebet" : "euro"); setTimeout(() => setAnim(false), 200); }, 120);
  };
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
    <div style={{
      flex: 1, display: "flex", alignItems: "center",
      background: C.inputBg, borderRadius: 10,
      border: `1px solid ${e ? C.border : C.freebetBorder}`,
      padding: "0 12px", height: mb ? 38 : 42,
      gap: 8, transition: "border-color 0.2s",
    }}>
      {/* Tappable prefix — THE interaction */}
      <div onClick={flip} style={{
        cursor: "pointer", userSelect: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        width: mb ? 28 : 32, height: mb ? 28 : 32,
        borderRadius: 8,
        background: e ? "rgba(200,160,0,0.08)" : "rgba(217,58,86,0.08)",
        transition: "all 0.2s",
        flexShrink: 0,
      }}>
        <div style={{
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          transform: anim ? "scale(0) rotateZ(90deg)" : "scale(1) rotateZ(0)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {e ? (
            <span style={{ fontSize: mb ? 15 : 17, fontWeight: 800, color: C.accent, fontFamily: "var(--f)" }}>€</span>
          ) : (
            <FI s={mb ? 17 : 19} />
          )}
        </div>
      </div>
      <input type="text" defaultValue="" placeholder="0,00" style={{
        flex: 1, background: "transparent", border: "none", outline: "none",
        color: C.text, fontSize: mb ? 15 : 17, fontWeight: 600,
        fontFamily: "var(--f)", textAlign: "right", minWidth: 40,
      }} />
    </div>
    <Cote />
  </div></BetRow>;
}

// ========== PROPOSAL 17 — Contextual Bottom Pill (NEW) ==========
function P17({ mb }) {
  const [m, setM] = useState("euro");
  const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 0, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Inp mb={mb} prefix={e ? "€" : null} fb={!e} /><Cote />
    </div>
    {/* Bottom pill — always visible, compact, one tap */}
    <div style={{
      display: "flex", alignItems: "center",
      marginTop: 6, gap: 0,
      background: C.inputBg, borderRadius: 8,
      border: `1px solid ${C.border}`,
      overflow: "hidden",
    }}>
      <button onClick={() => setM("euro")} style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        padding: mb ? "5px 0" : "6px 0",
        background: e ? "rgba(200,160,0,0.06)" : "transparent",
        border: "none", cursor: "pointer",
        borderRight: `1px solid ${C.border}`,
        transition: "background 0.2s",
      }}>
        <span style={{ fontSize: mb ? 11 : 12, fontWeight: e ? 700 : 500, color: e ? C.accent : C.textDim, fontFamily: "var(--f)", transition: "all 0.2s" }}>€ Euro</span>
      </button>
      <button onClick={() => setM("freebet")} style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        padding: mb ? "5px 0" : "6px 0",
        background: !e ? C.freebetBg : "transparent",
        border: "none", cursor: "pointer",
        transition: "background 0.2s",
      }}>
        <FI s={mb ? 10 : 11} style={{ opacity: !e ? 1 : 0.35, transition: "opacity 0.2s" }} />
        <span style={{ fontSize: mb ? 11 : 12, fontWeight: !e ? 700 : 500, color: !e ? C.freebet : C.textDim, fontFamily: "var(--f)", transition: "all 0.2s" }}>Freebet</span>
        {!e && <span style={{ fontSize: 9, fontWeight: 600, color: C.freebet, fontFamily: "var(--f)", marginLeft: 2 }}>5€</span>}
      </button>
    </div>
  </div></BetRow>;
}


// ========== PROPOSAL 18 — Radio Simple (NEW) ==========
function P18({ mb }) {
  const [m, setM] = useState("euro"); const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Inp mb={mb} prefix={e ? "€" : null} fb={!e} /><Cote /></div>
    <div style={{ display: "flex", gap: 12, paddingLeft: 2 }}>
      {[{ id: "euro", l: "Euros", c: C.accent, icon: <span style={{ fontSize: 11, fontWeight: 800, color: e ? C.accent : C.textDim, fontFamily: "var(--f)" }}>€</span> },
        { id: "freebet", l: "Freebet · 5,00 €", c: C.freebet, icon: <FI s={12} style={{ opacity: m === "freebet" ? 1 : 0.4 }} /> }
      ].map(x => (
        <div key={x.id} onClick={() => setM(x.id)} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" }}>
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            border: `2px solid ${m === x.id ? x.c : C.textDim}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.2s",
          }}>
            {m === x.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: x.c, transition: "transform 0.2s" }} />}
          </div>
          {x.icon}
          <span style={{ fontSize: mb ? 11 : 12, fontWeight: m === x.id ? 600 : 400, color: m === x.id ? C.text : C.textDim, fontFamily: "var(--f)", transition: "color 0.2s" }}>{x.l}</span>
        </div>
      ))}
    </div>
  </div></BetRow>;
}

// ========== PROPOSAL 19 — One-Tap CTA (NEW) ==========
function P19({ mb }) {
  const [chosen, setChosen] = useState(null);
  const isF = chosen === "freebet";
  return <BetRow mb={mb}><div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
    {/* Input row — appears once a choice is made, or for custom amount */}
    {chosen && (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Inp mb={mb} prefix={!isF ? "€" : null} fb={isF} val={isF ? "5" : ""} /><Cote />
      </div>
    )}
    {!chosen && (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Inp mb={mb} prefix="€" /><Cote />
      </div>
    )}
    {/* Two CTA buttons — one tap = mode + amount */}
    <div style={{ display: "flex", gap: 6 }}>
      {[5, 10, 20].map(a => (
        <button key={a} onClick={() => setChosen("euro")} style={{
          flex: 1, padding: mb ? "7px 0" : "8px 0", borderRadius: 8,
          background: chosen === "euro" ? "rgba(200,160,0,0.08)" : "rgba(0,0,0,0.02)",
          border: `1px solid ${chosen === "euro" ? "rgba(245,197,24,0.25)" : C.border}`,
          color: C.textMuted, fontSize: mb ? 12 : 13, fontWeight: 700,
          fontFamily: "var(--f)", cursor: "pointer", transition: "all 0.15s",
        }}>{a}€</button>
      ))}
      <button onClick={() => setChosen("freebet")} style={{
        flex: 1.3, padding: mb ? "7px 4px" : "8px 6px", borderRadius: 8,
        background: isF ? "rgba(217,58,86,0.1)" : "rgba(217,58,86,0.03)",
        border: `1.5px solid ${isF ? C.freebet : "rgba(217,58,86,0.1)"}`,
        color: isF ? "#fff" : C.freebet,
        fontSize: mb ? 11 : 12, fontWeight: 700, fontFamily: "var(--f)",
        cursor: "pointer", transition: "all 0.2s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
      }}>
        <FI s={mb ? 11 : 12} color={isF ? "#fff" : C.freebet} />
        <span>Freebet</span>
      </button>
    </div>
  </div></BetRow>;
}

// ========== PROPOSAL 20 — Freebet Badge (NEW) ==========
function P20({ mb }) {
  const [m, setM] = useState("euro");
  const e = m === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
    <div style={{ flex: 1, position: "relative" }}>
      <Inp mb={mb} prefix={e ? "€" : null} fb={!e} />
      {/* Notification badge — tap to toggle */}
      <div
        onClick={() => setM(e ? "freebet" : "euro")}
        style={{
          position: "absolute", top: -6, right: -4,
          display: "flex", alignItems: "center", gap: 3,
          padding: e ? "3px 6px" : "3px 8px 3px 5px",
          borderRadius: 10,
          background: e
            ? `linear-gradient(135deg, #c0354d, ${C.freebet})`
            : `linear-gradient(135deg, #b8940a, ${C.accent})`,
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          transition: "all 0.2s",
          animation: e ? "pulse 2s infinite" : "none",
        }}
      >
        {e ? (
          <>
            <FI s={10} color="#fff" style={{ background: "rgba(255,255,255,0.25)" }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "var(--f)" }}>5€</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: 9, fontWeight: 700, color: C.bg, fontFamily: "var(--f)" }}>€</span>
          </>
        )}
      </div>
      <style>{`@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }`}</style>
    </div>
    <Cote />
  </div></BetRow>;
}

// ========== PROPOSAL 21 — Split Input (NEW) ==========
function P21({ mb }) {
  const [active, setActive] = useState("euro");
  const e = active === "euro";
  return <BetRow mb={mb}><div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
    {/* Euro input */}
    <div
      onClick={() => setActive("euro")}
      style={{
        flex: e ? 2 : 1,
        display: "flex", alignItems: "center",
        background: C.inputBg, borderRadius: 10,
        border: `1.5px solid ${e ? C.accent : "transparent"}`,
        padding: "0 10px", height: mb ? 36 : 40,
        gap: 5, cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 800, color: e ? C.accent : C.textDim, fontFamily: "var(--f)", flexShrink: 0, transition: "color 0.2s" }}>€</span>
      {e && <input type="text" defaultValue="" placeholder="0,00" autoFocus style={{
        flex: 1, background: "transparent", border: "none", outline: "none",
        color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600,
        fontFamily: "var(--f)", textAlign: "right", minWidth: 30,
      }} />}
      {!e && <span style={{ fontSize: 10, color: C.textDim, fontFamily: "var(--f)", whiteSpace: "nowrap" }}>Euro</span>}
    </div>
    {/* Freebet input */}
    <div
      onClick={() => setActive("freebet")}
      style={{
        flex: !e ? 2 : 1,
        display: "flex", alignItems: "center",
        background: C.inputBg, borderRadius: 10,
        border: `1.5px solid ${!e ? C.freebet : "transparent"}`,
        padding: "0 10px", height: mb ? 36 : 40,
        gap: 5, cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}
    >
      <FI s={13} style={{ opacity: !e ? 1 : 0.35, flexShrink: 0, transition: "opacity 0.2s" }} />
      {!e && <input type="text" defaultValue="" placeholder="5,00" autoFocus style={{
        flex: 1, background: "transparent", border: "none", outline: "none",
        color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600,
        fontFamily: "var(--f)", textAlign: "right", minWidth: 30,
      }} />}
      {e && <span style={{ fontSize: 10, color: C.textDim, fontFamily: "var(--f)", whiteSpace: "nowrap" }}>Free</span>}
    </div>
    <Cote />
  </div></BetRow>;
}

// ========== Shared ==========
function FI({ s = 14, color, style = {} }) {
  return <div style={{ width: s, height: s, borderRadius: "50%", background: color || C.freebet, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: s * 0.55, fontWeight: 800, color: "#fff", fontFamily: "var(--f)", lineHeight: 1, flexShrink: 0, ...style }}>F</div>;
}
function MultiboostBadge() {
  return <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 7, background: "linear-gradient(135deg, rgba(200,160,0,0.08), rgba(200,160,0,0.03))", border: "1px solid rgba(200,160,0,0.12)" }}>
    <span style={{ fontSize: 11 }}>⚡</span><span style={{ fontSize: 11, fontWeight: 700, color: C.accent, fontFamily: "var(--f)" }}>Multiboost ×1.2</span><span style={{ fontSize: 10, color: C.textMuted, fontFamily: "var(--f)" }}>— Cote boostée</span>
  </div>;
}
function BetRow({ mb, children }) { return <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{mb && <MultiboostBadge />}{children}</div>; }
function Inp({ mb, placeholder = "Mise", prefix, disabled, fb, val, onChange }) {
  return <div style={{ flex: 1, display: "flex", alignItems: "center", background: C.inputBg, borderRadius: 10, border: `1px solid ${fb ? C.freebetBorder : C.border}`, padding: "0 12px", height: mb ? 36 : 40, gap: 6, opacity: disabled ? 0.5 : 1 }}>
    {prefix && <span style={{ fontSize: 14, fontWeight: 700, color: C.textMuted, fontFamily: "var(--f)" }}>{prefix}</span>}
    {fb && <FI s={14} />}
    <input type="text" value={val !== undefined ? val : undefined} defaultValue={val === undefined ? "" : undefined} onChange={onChange ? e => onChange(e.target.value) : undefined} placeholder={placeholder} disabled={disabled} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.text, fontSize: mb ? 14 : 16, fontWeight: 600, fontFamily: "var(--f)", textAlign: "right", minWidth: 30 }} />
  </div>;
}
function Cote() { return <div style={{ background: C.accent, borderRadius: 8, padding: "8px 12px", fontWeight: 800, fontSize: 15, color: C.bg, fontFamily: "var(--f)", flexShrink: 0, letterSpacing: "-0.3px" }}>1,33</div>; }
function MR({ a, icon, l, sub, o }) {
  return <button onClick={o} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", width: "100%", background: a ? "rgba(0,0,0,0.03)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--f)" }}>
    <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(0,0,0,0.03)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
    <div><div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{l}</div><div style={{ fontSize: 9, color: C.textMuted, marginTop: 1 }}>{sub}</div></div>
    {a && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: "auto" }}><path d="M2 6L5 9L10 3" stroke={C.euro} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
  </button>;
}

// ========== MAIN ==========
export default function App() {
  const [mb, setMb] = useState(false);
  const proposals = [
    { id: 1, t: "Segmented Control", d: "Pill toggle avec les deux options visibles.", r: "Pattern iOS / Android natif", c: P1, tag: "base" },
    { id: 2, t: "Toggle Switch", d: "Switch compact € ↔ Freebet, changement de couleur.", r: "Pattern toggle natif", c: P2, tag: "base" },
    { id: 3, t: "Checkbox", d: "Checkbox opt-in sous l'input.", r: "Inspiré bet365 « Use Bet Credits »", c: P3, tag: "betting" },
    { id: 4, t: "Bannière Tappable", d: "Bannière contextuelle. Tap = appliquer.", r: "Inspiré DraftKings / FanDuel", c: P4, tag: "betting" },
    { id: 5, t: "Lien Inline", d: "Lien texte discret sous le champ.", r: "Inspiré Winamax", c: P5, tag: "betting" },
    { id: 6, t: "Tap-to-Flip", d: "Un tap sur € pour flipper. Zéro UI ajoutée.", r: "Inspiré Revolut / Wise", c: P6, tag: "fintech" },
    { id: 7, t: "Swipe-to-Switch", d: "Glissement du pouce. Anti-erreur.", r: "Inspiré Slide-to-Pay", c: P7, tag: "fintech" },
    { id: 8, t: "Payment Method", d: "Ligne sélecteur sous l'input. Discret.", r: "Inspiré Uber / Lyft", c: P8, tag: "fintech" },
    { id: 9, t: "Double-Tap Morph", d: "Double-tap sur l'icône. Anti-erreur.", r: "Inspiré Instagram", c: P9, tag: "ux" },
    { id: 10, t: "Stacked Swap", d: "Deux zones + bouton swap rotatif.", r: "Inspiré Uniswap / Jupiter", c: P10, tag: "crypto" },
    { id: 11, t: "Balance Tap", d: "Deux pills de solde. Tap = sélection.", r: "Inspiré Coinbase / Revolut", c: P11, tag: "crypto" },
    { id: 12, t: "Token Pill", d: "Pill compacte dans l'input. Tap = sélecteur.", r: "Inspiré Phantom / MetaMask", c: P12, tag: "crypto" },
    { id: 13, t: "Long Press Reveal", d: "Appui long pour révéler les options.", r: "Inspiré Binance Pro + iOS", c: P13, tag: "crypto" },
    { id: 14, t: "Quick Amounts", d: "Montants rapides en ligne. Le dernier bouton = freebet. Un tap = mise + mode en même temps.", r: "Inspiré FanDuel / bet365 quick stake — optimisé paris rapides", c: P14, tag: "simple" },
    { id: 15, t: "Smart Nudge", d: "Toast contextuel qui suggère le freebet dispo. Un CTA « Utiliser », une croix pour ignorer. Zéro friction.", r: "Inspiré notification in-app Revolut / Stripe checkout", c: P15, tag: "simple" },
    { id: 16, t: "Prefix Tap", d: "Le symbole € dans l'input EST le switch. Un tap dessus et il morphe en Freebet. Rien d'autre.", r: "Le plus minimaliste possible — 0 UI additionnelle", c: P16, tag: "simple" },
    { id: 17, t: "Bottom Tab", d: "Mini barre de sélection collée sous l'input. Les deux options toujours visibles, un tap pour switcher.", r: "Inspiré tab bar mobile + Betclic paris simples/combinés", c: P17, tag: "simple" },
    { id: 18, t: "Radio Simple", d: "Deux radio buttons classiques sous l'input. Le pattern de formulaire le plus universel. Zéro apprentissage.", r: "Pattern HTML natif — universellement compris tous profils utilisateurs", c: P18, tag: "simple" },
    { id: 19, t: "One-Tap CTA", d: "Montants rapides + bouton Freebet au même niveau. Un seul tap = choix du mode + montant pré-rempli.", r: "Inspiré QuickSlip / FanDuel quick bet — optimisé vitesse de pari", c: P19, tag: "simple" },
    { id: 20, t: "Freebet Badge", d: "Badge notification sur le coin de l'input. Pulse pour attirer l'œil. Un tap = activation. Disparaît une fois utilisé.", r: "Inspiré badge notification iOS/Android + Fanatics rewards nudge", c: P20, tag: "simple" },
    { id: 21, t: "Split Input", d: "Deux champs côte à côte : € et Freebet. Tap sur celui qu'on veut = il s'agrandit et reçoit le focus. Pas de switch, juste un choix visuel.", r: "Inspiré dual-currency Wise + split payment Klarna", c: P21, tag: "simple" },
  ];
  const tagColors = {
    base: { color: C.euro, bg: "rgba(74,222,128,0.1)", label: "Base" },
    betting: { color: C.text, bg: "rgba(0,0,0,0.04)", label: "Betting" },
    fintech: { color: C.accent, bg: "rgba(200,160,0,0.08)", label: "Fintech" },
    crypto: { color: C.crypto, bg: C.cryptoBg, label: "Crypto" },
    ux: { color: "#f472b6", bg: "rgba(244,114,182,0.1)", label: "UX" },
    simple: { color: C.simple, bg: C.simpleBg, label: "Simplicité" },
  };

  return (
    <div style={{ "--f": "'DM Sans', sans-serif", minHeight: "100vh", background: C.bg, padding: "28px 16px 40px", fontFamily: "var(--f)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 520, margin: "0 auto 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <div style={{ padding: "3px 8px", borderRadius: 5, background: "rgba(200,160,0,0.08)", fontSize: 10, fontWeight: 700, color: C.accent, letterSpacing: "0.5px" }}>DISCOVERY</div>
          <span style={{ fontSize: 10, color: C.textDim }}>•</span><span style={{ fontSize: 10, color: C.textMuted }}>Betslip UX — v7</span>
          <span style={{ fontSize: 10, color: C.textDim }}>•</span><span style={{ fontSize: 10, color: C.textMuted }}>21 propositions</span>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: C.text, margin: "8px 0 4px", letterSpacing: "-0.5px" }}>Switch Euro / Freebet</h1>
        <p style={{ fontSize: 12, color: C.textMuted, margin: "0 0 4px", lineHeight: 1.5 }}>Exploration cross-industry · Cliquez pour interagir · Activez Multiboost</p>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", margin: "10px 0 14px" }}>
          {Object.entries(tagColors).map(([k, v]) => <span key={k} style={{ fontSize: 9, fontWeight: 600, color: v.color, background: v.bg, padding: "2px 7px", borderRadius: 4 }}>{v.label}</span>)}
        </div>
        <div onClick={() => setMb(!mb)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 9, background: mb ? "rgba(200,160,0,0.06)" : "rgba(0,0,0,0.02)", border: `1px solid ${mb ? "rgba(200,160,0,0.15)" : C.border}`, cursor: "pointer", userSelect: "none" }}>
          <div style={{ width: 34, height: 18, borderRadius: 9, background: mb ? C.accent : C.border, position: "relative" }}><div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: mb ? 18 : 2, transition: "left 0.2s" }} /></div>
          <span style={{ fontSize: 12, fontWeight: 600, color: mb ? C.accent : C.textMuted }}>⚡ Multiboost actif</span>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14 }}>
        {proposals.map(p => {
          const Comp = p.c; const tc = tagColors[p.tag];
          return <div key={p.id} style={{ background: C.surface, borderRadius: 14, border: `1px solid ${p.tag === "simple" ? "rgba(56,189,248,0.15)" : C.border}`, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: C.accent, background: "rgba(200,160,0,0.08)", padding: "2px 6px", borderRadius: 4 }}>{String(p.id).padStart(2, "0")}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{p.t}</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: tc.color, background: tc.bg, padding: "2px 6px", borderRadius: 4 }}>{tc.label}</span>
              </div>
              <p style={{ fontSize: 11, color: C.textMuted, margin: 0, lineHeight: 1.4 }}>{p.d}</p>
            </div>
            <div style={{ padding: "6px 16px", background: "rgba(0,0,0,0.01)", borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 10, color: C.textDim, fontStyle: "italic" }}>📎 {p.r}</span>
            </div>
            <div style={{ padding: "16px", background: "rgba(0,0,0,0.03)" }}><Comp mb={mb} /></div>
          </div>;
        })}
      </div>

      {/* Matrix */}
      <div style={{ maxWidth: 520, margin: "24px auto 0", background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}><span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Matrice de comparaison</span></div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "var(--f)" }}>
            <thead><tr>
              {["", "Clarté", "1 tap", "Compact", "Anti-err", "Speed"].map((h, i) => (
                <th key={i} style={{ padding: "10px 6px", textAlign: i === 0 ? "left" : "center", color: C.textMuted, fontWeight: 600, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: `1px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                ["01 Segmented",   "●●●","●●", "●●", "●●●","●●",  "base"],
                ["02 Toggle",      "●●", "●●●","●●●","●●", "●●●", "base"],
                ["03 Checkbox",    "●●●","●●", "●●", "●●●","●●",  "betting"],
                ["04 Bannière",    "●●●","●●●","●",  "●●●","●●",  "betting"],
                ["05 Lien",        "●●", "●●", "●●●","●●", "●●",  "betting"],
                ["06 Tap-to-Flip", "●●", "●●●","●●●","●●", "●●●", "fintech"],
                ["07 Swipe",       "●●", "●●●","●●", "●●●","●●",  "fintech"],
                ["08 Pay Method",  "●●●","●●●","●●", "●●●","●●",  "fintech"],
                ["09 Double-Tap",  "●●", "●●", "●●●","●●●","●●",  "ux"],
                ["10 Stacked",     "●●●","●●●","●",  "●●●","●●",  "crypto"],
                ["11 Balance Tap", "●●●","●●●","●●", "●●●","●●",  "crypto"],
                ["12 Token Pill",  "●●", "●●", "●●●","●●", "●●",  "crypto"],
                ["13 Long Press",  "●●", "●",  "●●●","●●●","●",   "crypto"],
                ["14 Quick Amt",   "●●●","●●●","●●", "●●", "●●●", "simple"],
                ["15 Nudge",       "●●●","●●●","●●", "●●●","●●●", "simple"],
                ["16 Prefix Tap",  "●●", "●●●","●●●","●●", "●●●", "simple"],
                ["17 Bottom Tab",  "●●●","●●●","●●", "●●●","●●●", "simple"],
                ["18 Radio",       "●●●","●●", "●●", "●●●","●●",  "simple"],
                ["19 One-Tap",     "●●●","●●●","●●", "●●", "●●●", "simple"],
                ["20 Badge",       "●●", "●●●","●●●","●●", "●●●", "simple"],
                ["21 Split Input", "●●●","●●", "●●", "●●●","●●",  "simple"],
              ].map((r, i) => {
                const isSm = r[6] === "simple";
                return <tr key={i} style={{ background: isSm ? "rgba(56,189,248,0.02)" : "transparent" }}>
                  {r.slice(0, 6).map((cell, j) => (
                    <td key={j} style={{ padding: "7px 6px", textAlign: j === 0 ? "left" : "center", color: j === 0 ? C.text : C.accent, fontWeight: j === 0 ? 600 : 400, borderBottom: i < 20 ? `1px solid ${C.border}` : "none", fontSize: j === 0 ? 9 : 10, whiteSpace: "nowrap" }}>{cell}</td>
                  ))}
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reco */}
      <div style={{ maxWidth: 520, margin: "16px auto 0", padding: "16px", background: "linear-gradient(135deg, rgba(56,189,248,0.06), rgba(245,197,24,0.03))", borderRadius: 12, border: "1px solid rgba(56,189,248,0.12)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.simple, marginBottom: 6 }}>💡 Focus Simplicité — Paris Sportifs</div>
        <p style={{ fontSize: 12, color: C.textMuted, margin: 0, lineHeight: 1.7 }}>
          <strong style={{ color: C.text }}>Radio Simple (18)</strong> — Le pattern de formulaire le plus universel au monde. Tout le monde sait utiliser des radio buttons. Zéro apprentissage, zéro ambiguïté. Idéal si la cible inclut des utilisateurs non-technophiles.{" "}
          <strong style={{ color: C.text }}>One-Tap CTA (19)</strong> — Élimine la notion de « switch de mode ». Le freebet est un bouton de montant parmi d'autres. Un tap = mode + montant en une action. Le pattern le plus rapide pour le pari express.{" "}
          <strong style={{ color: C.text }}>Freebet Badge (20)</strong> — Le badge pulse pour attirer l'œil (comme une notif). Un tap = activation. Très compact, ne prend aucun espace dans le layout normal. Le freebet se manifeste sans encombrer.{" "}
          <strong style={{ color: C.text }}>Split Input (21)</strong> — Deux champs côte à côte. Pas de switch : l'utilisateur tape directement dans le champ qu'il veut. Le champ actif s'agrandit, l'autre se réduit. Pattern très visuel et intuitif inspiré de Wise.{" "}
          <br /><br /><strong style={{ color: C.accent }}>Top 3 pour le betslip Betclic</strong> → <strong style={{ color: C.text }}>One-Tap CTA (19)</strong> si une barre de montants rapides existe déjà. <strong style={{ color: C.text }}>Bottom Tab (17)</strong> pour la clarté maximale. <strong style={{ color: C.text }}>Smart Nudge (15)</strong> si on veut pousser le freebet sans complexifier l'interface de base.
        </p>
      </div>
    </div>
  );
}
