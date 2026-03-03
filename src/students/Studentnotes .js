import { useState } from "react";

const matieres = [
  { nom: "Mathématiques", coef: 4, notes: [{ valeur: 17, date: "28 Fév", type: "Devoir" }, { valeur: 15, date: "10 Fév", type: "Contrôle" }] },
  { nom: "Physique-Chimie", coef: 3, notes: [{ valeur: 14, date: "26 Fév", type: "Devoir" }, { valeur: 12, date: "12 Fév", type: "Contrôle" }] },
  { nom: "Français", coef: 2, notes: [{ valeur: 13, date: "24 Fév", type: "Rédaction" }, { valeur: 14, date: "08 Fév", type: "Contrôle" }] },
  { nom: "Anglais", coef: 2, notes: [{ valeur: 16, date: "22 Fév", type: "Oral" }, { valeur: 15, date: "06 Fév", type: "Devoir" }] },
  { nom: "Histoire-Géo", coef: 2, notes: [{ valeur: 11, date: "20 Fév", type: "Devoir" }, { valeur: 13, date: "04 Fév", type: "Contrôle" }] },
  { nom: "SVT", coef: 2, notes: [{ valeur: 15, date: "18 Fév", type: "TP" }, { valeur: 14, date: "02 Fév", type: "Devoir" }] },
];

function moyenne(notes, coef) {
  const sum = notes.reduce((a, n) => a + n.valeur, 0);
  return (sum / notes.length).toFixed(1);
}

function moyenneGenerale() {
  let total = 0, totalCoef = 0;
  matieres.forEach((m) => {
    const moy = parseFloat(moyenne(m.notes, m.coef));
    total += moy * m.coef;
    totalCoef += m.coef;
  });
  return (total / totalCoef).toFixed(2);
}

function getNoteColor(n) {
  if (n >= 16) return { bg: "#ecfdf5", color: "#10b981" };
  if (n >= 12) return { bg: "#eff6ff", color: "#2563EB" };
  return { bg: "#fef2f2", color: "#ef4444" };
}

export default function StudentNotes() {
  const [expanded, setExpanded] = useState(null);
  const moyGen = moyenneGenerale();

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>📝 Mes Notes</h1>
        <p style={styles.pageSub}>2ème Baccalauréat SM-A • S2</p>
      </div>

      {/* Moyenne générale card */}
      <div style={styles.moyCard}>
        <div style={styles.moyLeft}>
          <p style={styles.moyLabel}>Moyenne Générale</p>
          <p style={styles.moyValue}>{moyGen}<span style={styles.moyMax}>/20</span></p>
          <div style={styles.moyBar}>
            <div style={{ ...styles.moyFill, width: `${(parseFloat(moyGen) / 20) * 100}%` }} />
          </div>
        </div>
        <div style={styles.moyRight}>
          <div style={styles.moyRank}>🏅</div>
          <p style={styles.moyRankText}>Rang: 4/32</p>
        </div>
      </div>

      {/* Matières list */}
      <div style={styles.list}>
        {matieres.map((m, i) => {
          const moy = parseFloat(moyenne(m.notes));
          const c = getNoteColor(moy);
          const open = expanded === i;
          return (
            <div key={i} style={styles.matCard}>
              <div
                style={styles.matHeader}
                onClick={() => setExpanded(open ? null : i)}
              >
                <div style={styles.matLeft}>
                  <div style={{ ...styles.matDot, background: c.color }} />
                  <div>
                    <p style={styles.matName}>{m.nom}</p>
                    <p style={styles.matCoef}>Coef {m.coef} • {m.notes.length} évaluation(s)</p>
                  </div>
                </div>
                <div style={styles.matRight}>
                  <div style={{ ...styles.moyBadge, background: c.bg, color: c.color }}>
                    {moy}/20
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: 18, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
                </div>
              </div>

              {open && (
                <div style={styles.noteDetails}>
                  {m.notes.map((n, j) => {
                    const nc = getNoteColor(n.valeur);
                    return (
                      <div key={j} style={styles.noteItem}>
                        <div>
                          <p style={styles.noteType}>{n.type}</p>
                          <p style={styles.noteDate}>{n.date}</p>
                        </div>
                        <div style={{ ...styles.noteBadge, background: nc.bg, color: nc.color }}>
                          {n.valeur}/20
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#f0f4f8",
    minHeight: "100vh",
    padding: "24px 16px 40px",
    maxWidth: 480,
    margin: "0 auto",
  },
  header: { marginBottom: 20 },
  pageTitle: { fontSize: 24, fontWeight: 800, color: "#0f172a" },
  pageSub: { fontSize: 13, color: "#64748b", marginTop: 4 },
  moyCard: {
    background: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)",
    borderRadius: 20,
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
  },
  moyLeft: { flex: 1 },
  moyLabel: { fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 },
  moyValue: { fontSize: 40, fontWeight: 900, color: "white", lineHeight: 1.1, marginTop: 4 },
  moyMax: { fontSize: 18, color: "rgba(255,255,255,0.6)", fontWeight: 600 },
  moyBar: {
    height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 4,
    marginTop: 12, width: "80%", overflow: "hidden",
  },
  moyFill: {
    height: "100%",
    background: "rgba(255,255,255,0.85)",
    borderRadius: 4,
    transition: "width 1s ease",
  },
  moyRight: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
  moyRank: { fontSize: 36 },
  moyRankText: { fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 600 },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  matCard: {
    background: "white",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  matHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    cursor: "pointer",
  },
  matLeft: { display: "flex", alignItems: "center", gap: 12 },
  matDot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  matName: { fontSize: 15, fontWeight: 700, color: "#0f172a" },
  matCoef: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  matRight: { display: "flex", alignItems: "center", gap: 10 },
  moyBadge: {
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 800,
  },
  noteDetails: {
    borderTop: "1px solid #f1f5f9",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    background: "#f8fafc",
  },
  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    background: "white",
    borderRadius: 10,
  },
  noteType: { fontSize: 14, fontWeight: 600, color: "#1e293b" },
  noteDate: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  noteBadge: {
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 800,
  },
};