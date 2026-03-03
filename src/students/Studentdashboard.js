import { useState } from "react";

const stats = [
  { label: "Moyenne Générale", value: "15.4/20", icon: "📊", color: "#2563EB", bg: "#eff6ff" },
  { label: "Absences ce mois", value: "2 jours", icon: "📅", color: "#ef4444", bg: "#fef2f2" },
  { label: "Cours aujourd'hui", value: "5 cours", icon: "📚", color: "#10b981", bg: "#ecfdf5" },
  { label: "Paiements en attente", value: "1 500 DH", icon: "💳", color: "#f59e0b", bg: "#fffbeb" },
];

const recentNotes = [
  { matiere: "Mathématiques", note: 17, date: "28 Fév", coef: 4 },
  { matiere: "Physique", note: 14, date: "26 Fév", coef: 3 },
  { matiere: "Français", note: 13, date: "24 Fév", coef: 2 },
  { matiere: "Anglais", note: 16, date: "22 Fév", coef: 2 },
];

const todayCours = [
  { matiere: "Mathématiques", heure: "08:00 - 09:00", salle: "B12", enseignant: "M. Alaoui" },
  { matiere: "Histoire-Géo", heure: "09:00 - 10:00", salle: "A04", enseignant: "Mme. Benali" },
  { matiere: "Physique", heure: "10:30 - 11:30", salle: "Labo 2", enseignant: "M. Khattabi" },
  { matiere: "Sport", heure: "14:00 - 15:00", salle: "Gymnase", enseignant: "M. Fassi" },
  { matiere: "Anglais", heure: "15:00 - 16:00", salle: "C08", enseignant: "Mme. Saidi" },
];

export default function StudentDashboard({ student = { nom: "Yassine", prenom: "El Fassi", classe: "2BAC-SM-A", id: "STU-2024-0042" } }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <p style={styles.greeting}>{greeting}, {student.prenom} 👋</p>
          <p style={styles.subGreeting}>Classe: {student.classe} • ID: {student.id}</p>
        </div>
        <div style={styles.avatar}>
          {student.prenom[0]}{student.nom[0]}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} style={{ ...styles.statCard, background: s.bg, border: `1.5px solid ${s.color}20` }}>
            <span style={styles.statIcon}>{s.icon}</span>
            <p style={{ ...styles.statValue, color: s.color }}>{s.value}</p>
            <p style={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>📅 Cours d'aujourd'hui</h2>
          <span style={styles.badge}>{todayCours.length} cours</span>
        </div>
        <div style={styles.coursList}>
          {todayCours.map((c, i) => (
            <div key={i} style={styles.coursRow}>
              <div style={styles.coursTime}>
                <span style={styles.timeText}>{c.heure.split(" - ")[0]}</span>
                <span style={styles.timeEnd}>{c.heure.split(" - ")[1]}</span>
              </div>
              <div style={styles.coursBar} />
              <div style={styles.coursInfo}>
                <p style={styles.coursName}>{c.matiere}</p>
                <p style={styles.coursDetails}>{c.salle} • {c.enseignant}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Notes */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>📝 Dernières notes</h2>
          <a href="#" style={styles.seeAll}>Voir tout →</a>
        </div>
        <div style={styles.notesList}>
          {recentNotes.map((n, i) => (
            <div key={i} style={styles.noteRow}>
              <div style={styles.noteLeft}>
                <div style={styles.noteDot} />
                <div>
                  <p style={styles.noteMatiere}>{n.matiere}</p>
                  <p style={styles.noteDate}>{n.date} • Coef {n.coef}</p>
                </div>
              </div>
              <div style={{
                ...styles.noteBadge,
                background: n.note >= 16 ? "#ecfdf5" : n.note >= 12 ? "#eff6ff" : "#fef2f2",
                color: n.note >= 16 ? "#10b981" : n.note >= 12 ? "#2563EB" : "#ef4444",
              }}>
                {n.note}/20
              </div>
            </div>
          ))}
        </div>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    background: "white",
    borderRadius: 20,
    padding: "20px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
  },
  greeting: { fontSize: 20, fontWeight: 800, color: "#0f172a" },
  subGreeting: { fontSize: 12, color: "#64748b", marginTop: 4 },
  avatar: {
    width: 48, height: 48,
    borderRadius: 14,
    background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
    color: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 800,
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    borderRadius: 16,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  statIcon: { fontSize: 22 },
  statValue: { fontSize: 20, fontWeight: 800, marginTop: 6 },
  statLabel: { fontSize: 12, color: "#64748b", fontWeight: 500 },
  section: {
    background: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a" },
  badge: {
    background: "#eff6ff",
    color: "#2563EB",
    fontSize: 12,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 20,
  },
  seeAll: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: 600,
    textDecoration: "none",
  },
  coursList: { display: "flex", flexDirection: "column", gap: 12 },
  coursRow: { display: "flex", alignItems: "center", gap: 12 },
  coursTime: { width: 64, display: "flex", flexDirection: "column", alignItems: "flex-end" },
  timeText: { fontSize: 13, fontWeight: 700, color: "#0f172a" },
  timeEnd: { fontSize: 11, color: "#94a3b8" },
  coursBar: {
    width: 3, height: 44,
    borderRadius: 4,
    background: "linear-gradient(180deg, #2563EB, #1d4ed8)",
    flexShrink: 0,
  },
  coursInfo: {},
  coursName: { fontSize: 14, fontWeight: 700, color: "#0f172a" },
  coursDetails: { fontSize: 12, color: "#64748b", marginTop: 2 },
  notesList: { display: "flex", flexDirection: "column", gap: 10 },
  noteRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    background: "#f8fafc",
    borderRadius: 12,
  },
  noteLeft: { display: "flex", alignItems: "center", gap: 10 },
  noteDot: {
    width: 8, height: 8,
    borderRadius: "50%",
    background: "#2563EB",
    flexShrink: 0,
  },
  noteMatiere: { fontSize: 14, fontWeight: 600, color: "#0f172a" },
  noteDate: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
  noteBadge: {
    padding: "6px 12px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 800,
  },
};