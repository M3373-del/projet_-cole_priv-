import { useState } from "react";

const absences = [
  { id: 1, date: "01 Mar 2026", matiere: "Mathématiques", heure: "08:00 - 09:00", motif: "Maladie", justifie: true },
  { id: 2, date: "25 Fév 2026", matiere: "Physique-Chimie", heure: "10:30 - 11:30", motif: "", justifie: false },
  { id: 3, date: "20 Fév 2026", matiere: "Histoire-Géo", heure: "09:00 - 10:00", motif: "Rendez-vous médical", justifie: true },
  { id: 4, date: "15 Fév 2026", matiere: "Anglais", heure: "15:00 - 16:00", motif: "", justifie: false },
  { id: 5, date: "10 Fév 2026", matiere: "SVT", heure: "11:30 - 12:30", motif: "Transport", justifie: true },
];

const totalHours = absences.length;
const justified = absences.filter((a) => a.justifie).length;
const notJustified = absences.filter((a) => !a.justifie).length;

export default function StudentAbsences() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? absences : absences.filter((a) => (filter === "justified" ? a.justifie : !a.justifie));

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>📅 Mes Absences</h1>
        <p style={styles.pageSub}>Année scolaire 2025-2026</p>
      </div>

      {/* Summary cards */}
      <div style={styles.summaryGrid}>
        <div style={{ ...styles.sumCard, background: "#fef2f2", border: "1.5px solid #fecaca" }}>
          <p style={{ ...styles.sumValue, color: "#ef4444" }}>{totalHours}h</p>
          <p style={styles.sumLabel}>Total absences</p>
        </div>
        <div style={{ ...styles.sumCard, background: "#ecfdf5", border: "1.5px solid #bbf7d0" }}>
          <p style={{ ...styles.sumValue, color: "#10b981" }}>{justified}</p>
          <p style={styles.sumLabel}>Justifiées</p>
        </div>
        <div style={{ ...styles.sumCard, background: "#fffbeb", border: "1.5px solid #fde68a" }}>
          <p style={{ ...styles.sumValue, color: "#f59e0b" }}>{notJustified}</p>
          <p style={styles.sumLabel}>Non justifiées</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={styles.tabs}>
        {[["all", "Toutes"], ["justified", "Justifiées"], ["not", "Non justifiées"]].map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            style={{ ...styles.tab, ...(filter === val ? styles.tabActive : {}) }}
          >
            {lbl}
          </button>
        ))}
      </div>

      {/* Absences list */}
      <div style={styles.list}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>✅ Aucune absence dans cette catégorie</div>
        ) : (
          filtered.map((a) => (
            <div key={a.id} style={styles.card}>
              <div style={styles.cardLeft}>
                <div style={{
                  ...styles.statusDot,
                  background: a.justifie ? "#10b981" : "#ef4444",
                }} />
                <div>
                  <p style={styles.matiere}>{a.matiere}</p>
                  <p style={styles.details}>{a.heure} • {a.date}</p>
                  {a.motif && <p style={styles.motif}>Motif: {a.motif}</p>}
                </div>
              </div>
              <div style={{
                ...styles.badge,
                background: a.justifie ? "#ecfdf5" : "#fef2f2",
                color: a.justifie ? "#10b981" : "#ef4444",
              }}>
                {a.justifie ? "✓ Justifiée" : "✗ Non just."}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info banner */}
      <div style={styles.infoBanner}>
        <span>ℹ️</span>
        <p style={styles.infoText}>
          Dépassement de <b>12 absences non justifiées</b> peut entraîner des mesures disciplinaires.
        </p>
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
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 10,
    marginBottom: 20,
  },
  sumCard: {
    borderRadius: 14,
    padding: "16px 10px",
    textAlign: "center",
  },
  sumValue: { fontSize: 26, fontWeight: 900 },
  sumLabel: { fontSize: 11, color: "#64748b", marginTop: 4, fontWeight: 500 },
  tabs: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
    background: "white",
    padding: 6,
    borderRadius: 14,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  tab: {
    flex: 1,
    padding: "8px 4px",
    border: "none",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 600,
    color: "#64748b",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  tabActive: {
    background: "#2563EB",
    color: "white",
    boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
  },
  list: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 },
  empty: {
    textAlign: "center",
    padding: 32,
    color: "#10b981",
    fontSize: 15,
    fontWeight: 600,
    background: "white",
    borderRadius: 16,
  },
  card: {
    background: "white",
    borderRadius: 16,
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  cardLeft: { display: "flex", alignItems: "flex-start", gap: 12 },
  statusDot: {
    width: 10, height: 10,
    borderRadius: "50%",
    marginTop: 5,
    flexShrink: 0,
  },
  matiere: { fontSize: 15, fontWeight: 700, color: "#0f172a" },
  details: { fontSize: 12, color: "#64748b", marginTop: 2 },
  motif: { fontSize: 12, color: "#94a3b8", marginTop: 2, fontStyle: "italic" },
  badge: {
    padding: "6px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  infoBanner: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 14,
    padding: "14px 16px",
    display: "flex",
    gap: 10,
    alignItems: "flex-start",
  },
  infoText: { fontSize: 13, color: "#1e40af", lineHeight: 1.5 },
};