import { useState } from "react";

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const FULL_DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const schedule = {
  0: [ // Lundi
    { heure: "08:00", fin: "09:00", matiere: "Mathématiques", salle: "B12", enseignant: "M. Alaoui", color: "#2563EB" },
    { heure: "09:00", fin: "10:00", matiere: "Histoire-Géo", salle: "A04", enseignant: "Mme. Benali", color: "#8b5cf6" },
    { heure: "10:30", fin: "11:30", matiere: "Physique", salle: "Labo 2", enseignant: "M. Khattabi", color: "#f59e0b" },
    { heure: "14:00", fin: "15:00", matiere: "Sport", salle: "Gymnase", enseignant: "M. Fassi", color: "#10b981" },
    { heure: "15:00", fin: "16:00", matiere: "Anglais", salle: "C08", enseignant: "Mme. Saidi", color: "#ef4444" },
  ],
  1: [
    { heure: "08:00", fin: "09:00", matiere: "Français", salle: "A02", enseignant: "M. Tazi", color: "#ec4899" },
    { heure: "09:00", fin: "11:00", matiere: "SVT", salle: "Labo 1", enseignant: "Mme. Chraibi", color: "#10b981" },
    { heure: "13:00", fin: "14:00", matiere: "Mathématiques", salle: "B12", enseignant: "M. Alaoui", color: "#2563EB" },
    { heure: "15:00", fin: "16:00", matiere: "Philosophie", salle: "D03", enseignant: "M. Berrada", color: "#64748b" },
  ],
  2: [
    { heure: "08:00", fin: "10:00", matiere: "Physique", salle: "Labo 2", enseignant: "M. Khattabi", color: "#f59e0b" },
    { heure: "10:30", fin: "11:30", matiere: "Anglais", salle: "C08", enseignant: "Mme. Saidi", color: "#ef4444" },
    { heure: "14:00", fin: "15:00", matiere: "Mathématiques", salle: "B12", enseignant: "M. Alaoui", color: "#2563EB" },
  ],
  3: [
    { heure: "08:00", fin: "09:00", matiere: "Histoire-Géo", salle: "A04", enseignant: "Mme. Benali", color: "#8b5cf6" },
    { heure: "09:00", fin: "11:00", matiere: "SVT", salle: "Labo 1", enseignant: "Mme. Chraibi", color: "#10b981" },
    { heure: "11:00", fin: "12:00", matiere: "Français", salle: "A02", enseignant: "M. Tazi", color: "#ec4899" },
    { heure: "14:00", fin: "16:00", matiere: "Mathématiques", salle: "B12", enseignant: "M. Alaoui", color: "#2563EB" },
  ],
  4: [
    { heure: "08:00", fin: "09:00", matiere: "Anglais", salle: "C08", enseignant: "Mme. Saidi", color: "#ef4444" },
    { heure: "09:00", fin: "10:00", matiere: "Philosophie", salle: "D03", enseignant: "M. Berrada", color: "#64748b" },
    { heure: "10:30", fin: "12:30", matiere: "Physique", salle: "Labo 2", enseignant: "M. Khattabi", color: "#f59e0b" },
  ],
  5: [
    { heure: "08:00", fin: "10:00", matiere: "Mathématiques", salle: "B12", enseignant: "M. Alaoui", color: "#2563EB" },
    { heure: "10:00", fin: "11:00", matiere: "Français", salle: "A02", enseignant: "M. Tazi", color: "#ec4899" },
  ],
};

const today = new Date().getDay(); // 0 = Sunday
const todayIdx = today === 0 ? 5 : today - 1; // map to Mon-Sat (0-5)

export default function StudentEmploiDuTemps() {
  const [activeDay, setActiveDay] = useState(Math.min(todayIdx, 5));
  const dayCours = schedule[activeDay] || [];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>🗓️ Emploi du Temps</h1>
        <p style={styles.pageSub}>2BAC-SM-A • Semestre 2</p>
      </div>

      {/* Day selector */}
      <div style={styles.dayRow}>
        {DAYS.map((d, i) => {
          const isToday = i === Math.min(todayIdx, 5);
          const isActive = i === activeDay;
          return (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              style={{
                ...styles.dayBtn,
                ...(isActive ? styles.dayBtnActive : {}),
                ...(isToday && !isActive ? styles.dayBtnToday : {}),
              }}
            >
              <span style={styles.dayName}>{d}</span>
              {isToday && <div style={{ ...styles.todayDot, background: isActive ? "white" : "#2563EB" }} />}
            </button>
          );
        })}
      </div>

      {/* Day label */}
      <div style={styles.dayLabel}>
        <span style={styles.dayFull}>{FULL_DAYS[activeDay]}</span>
        <span style={styles.coursCount}>{dayCours.length} cours</span>
      </div>

      {/* Timeline */}
      <div style={styles.timeline}>
        {dayCours.length === 0 ? (
          <div style={styles.empty}>🎉 Pas de cours ce jour!</div>
        ) : (
          dayCours.map((c, i) => (
            <div key={i} style={styles.courseRow}>
              <div style={styles.timeCol}>
                <span style={styles.timeStart}>{c.heure}</span>
                <div style={styles.timeLine} />
                <span style={styles.timeEnd}>{c.fin}</span>
              </div>
              <div style={{ ...styles.courseCard, borderLeft: `4px solid ${c.color}` }}>
                <div style={{ ...styles.courseColorBar, background: c.color + "18" }}>
                  <p style={{ ...styles.courseName, color: c.color }}>{c.matiere}</p>
                  <div style={styles.courseDetails}>
                    <span style={styles.courseChip}>🏫 {c.salle}</span>
                    <span style={styles.courseChip}>👤 {c.enseignant}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
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
  dayRow: {
    display: "flex",
    gap: 6,
    background: "white",
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  dayBtn: {
    flex: 1,
    padding: "10px 4px",
    border: "none",
    borderRadius: 10,
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  dayBtnActive: {
    background: "#2563EB",
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
  },
  dayBtnToday: {
    background: "#eff6ff",
  },
  dayName: {
    fontSize: 12,
    fontWeight: 700,
    color: "inherit",
  },
  todayDot: {
    width: 6, height: 6,
    borderRadius: "50%",
  },
  dayLabel: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dayFull: { fontSize: 18, fontWeight: 800, color: "#0f172a" },
  coursCount: {
    background: "#eff6ff",
    color: "#2563EB",
    fontSize: 12,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 20,
  },
  timeline: { display: "flex", flexDirection: "column", gap: 12 },
  empty: {
    textAlign: "center",
    padding: 40,
    fontSize: 16,
    color: "#64748b",
    background: "white",
    borderRadius: 16,
    fontWeight: 600,
  },
  courseRow: { display: "flex", gap: 12, alignItems: "stretch" },
  timeCol: {
    width: 52,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    paddingTop: 4,
    flexShrink: 0,
  },
  timeStart: { fontSize: 12, fontWeight: 700, color: "#475569" },
  timeLine: {
    flex: 1,
    width: 2,
    background: "#e2e8f0",
    borderRadius: 2,
    minHeight: 12,
  },
  timeEnd: { fontSize: 11, color: "#94a3b8" },
  courseCard: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  courseColorBar: {
    padding: "14px 16px",
  },
  courseName: { fontSize: 15, fontWeight: 800 },
  courseDetails: { display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" },
  courseChip: {
    fontSize: 11,
    color: "#475569",
    background: "rgba(255,255,255,0.7)",
    padding: "3px 8px",
    borderRadius: 6,
    fontWeight: 500,
  },
};