// ===================== STUDENT TRANSPORT =====================
import { useState } from "react";

export function StudentTransport() {
  const transport = {
    bus: "Bus N°7 - Route Casablanca Centre",
    chauffeur: { nom: "Hammou", prenom: "Rachid", tel: "0661-234-567", permis: "B,D" },
    itineraire: { depart: "Hay Hassani - Place Bir Anzarane", arrive: "École Ibn Sina" },
    horaire_aller: "07:15",
    horaire_retour: "17:30",
    arrets: [
      { heure: "07:15", lieu: "Hay Hassani - Place Bir Anzarane" },
      { heure: "07:25", lieu: "Bd Zerktouni - McDonalds" },
      { heure: "07:35", lieu: "Maarif - Carrefour Marché" },
      { heure: "07:45", lieu: "École Ibn Sina ✓", fin: true },
    ],
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>🚌 Transport Scolaire</h1>
        <p style={styles.pageSub}>Année scolaire 2025-2026</p>
      </div>

      {/* Bus card */}
      <div style={styles.busCard}>
        <div style={styles.busIcon}>🚌</div>
        <div>
          <p style={styles.busName}>{transport.bus}</p>
          <div style={styles.busHoraires}>
            <span style={styles.horaire}>🌅 Aller: {transport.horaire_aller}</span>
            <span style={styles.horaire}>🌙 Retour: {transport.horaire_retour}</span>
          </div>
        </div>
      </div>

      {/* Chauffeur */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>👤 Chauffeur</h2>
        <div style={styles.chauffeurCard}>
          <div style={styles.chauffeurAvatar}>
            {transport.chauffeur.prenom[0]}{transport.chauffeur.nom[0]}
          </div>
          <div style={styles.chauffeurInfo}>
            <p style={styles.chauffeurName}>{transport.chauffeur.prenom} {transport.chauffeur.nom}</p>
            <p style={styles.chauffeurDetail}>📋 Permis: {transport.chauffeur.permis}</p>
          </div>
          <a href={`tel:${transport.chauffeur.tel}`} style={styles.callBtn}>
            📞
          </a>
        </div>
      </div>

      {/* Itinéraire */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🗺️ Itinéraire</h2>
        <div style={styles.route}>
          {transport.arrets.map((a, i) => (
            <div key={i} style={styles.arretRow}>
              <div style={styles.arretLeft}>
                <div style={{ ...styles.arretDot, background: a.fin ? "#10b981" : "#2563EB" }} />
                {i < transport.arrets.length - 1 && <div style={styles.arretLine} />}
              </div>
              <div style={styles.arretInfo}>
                <p style={{ ...styles.arretLieu, color: a.fin ? "#10b981" : "#0f172a" }}>{a.lieu}</p>
                <p style={styles.arretHeure}>{a.heure}</p>
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

// ===================== STUDENT PAIEMENTS =====================
export function StudentPaiements() {
  const paiements = [
    { id: "F-2026-001", mois: "Janvier 2026", montant: 800, statut: "payé", date: "05 Jan 2026", ref: "PAY-001" },
    { id: "F-2026-002", mois: "Février 2026", montant: 800, statut: "payé", date: "03 Fév 2026", ref: "PAY-002" },
    { id: "F-2026-003", mois: "Mars 2026", montant: 800, statut: "en attente", date: null, ref: null },
    { id: "F-2026-004", mois: "Transport Jan-Mar", montant: 350, statut: "payé", date: "10 Jan 2026", ref: "PAY-003" },
    { id: "F-2026-005", mois: "Assurance scolaire", montant: 120, statut: "payé", date: "15 Sep 2025", ref: "PAY-004" },
  ];

  const totalPayé = paiements.filter(p => p.statut === "payé").reduce((s, p) => s + p.montant, 0);
  const totalPending = paiements.filter(p => p.statut === "en attente").reduce((s, p) => s + p.montant, 0);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>💳 Paiements & Factures</h1>
        <p style={styles.pageSub}>Historique de paiements</p>
      </div>

      {/* Summary */}
      <div style={styles.payGrid}>
        <div style={{ ...styles.payCard, background: "linear-gradient(135deg, #2563EB, #1d4ed8)" }}>
          <p style={styles.payCardLabel}>Total payé</p>
          <p style={styles.payCardValue}>{totalPayé} DH</p>
        </div>
        <div style={{ ...styles.payCard, background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
          <p style={styles.payCardLabel}>En attente</p>
          <p style={styles.payCardValue}>{totalPending} DH</p>
        </div>
      </div>

      {/* List */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📄 Toutes les factures</h2>
        <div style={styles.factures}>
          {paiements.map((p, i) => (
            <div key={i} style={styles.factureRow}>
              <div style={styles.factureLeft}>
                <div style={{
                  ...styles.factureIcon,
                  background: p.statut === "payé" ? "#ecfdf5" : "#fffbeb",
                  color: p.statut === "payé" ? "#10b981" : "#f59e0b",
                }}>
                  {p.statut === "payé" ? "✓" : "⏳"}
                </div>
                <div>
                  <p style={styles.factureMois}>{p.mois}</p>
                  <p style={styles.factureId}>{p.id} {p.ref && `• Réf: ${p.ref}`}</p>
                  {p.date && <p style={styles.factureDate}>Payé le {p.date}</p>}
                </div>
              </div>
              <div style={styles.factureRight}>
                <p style={styles.factureMontant}>{p.montant} DH</p>
                {p.statut === "en attente" && (
                  <button style={styles.payBtn}>Payer</button>
                )}
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

// ===================== STUDENT NOTIFICATIONS =====================
export function StudentNotifications() {
  const [notifs, setNotifs] = useState([
    { id: 1, type: "absence", message: "Absence enregistrée en Physique le 25 Fév", date: "25 Fév", lu: false },
    { id: 2, type: "note", message: "Nouvelle note en Mathématiques: 17/20", date: "28 Fév", lu: false },
    { id: 3, type: "paiement", message: "Facture Mars 2026 disponible (800 DH)", date: "01 Mar", lu: false },
    { id: 4, type: "transport", message: "Changement d'itinéraire demain matin", date: "02 Mar", lu: true },
    { id: 5, type: "note", message: "Résultats du contrôle de Français publiés", date: "24 Fév", lu: true },
    { id: 6, type: "absence", message: "Absence justifiée approuvée pour le 20 Fév", date: "22 Fév", lu: true },
  ]);

  const icons = { absence: "📅", note: "📝", paiement: "💳", transport: "🚌" };
  const colors = { absence: "#ef4444", note: "#2563EB", paiement: "#f59e0b", transport: "#10b981" };
  const bgs = { absence: "#fef2f2", note: "#eff6ff", paiement: "#fffbeb", transport: "#ecfdf5" };

  const unread = notifs.filter(n => !n.lu).length;

  const markAll = () => setNotifs(notifs.map(n => ({ ...n, lu: true })));
  const markOne = (id) => setNotifs(notifs.map(n => n.id === id ? { ...n, lu: true } : n));

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>🔔 Notifications</h1>
          <p style={styles.pageSub}>{unread > 0 ? `${unread} non lues` : "Tout est à jour"}</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} style={styles.markAllBtn}>Tout lire</button>
        )}
      </div>

      <div style={styles.notifList}>
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() => markOne(n.id)}
            style={{
              ...styles.notifCard,
              opacity: n.lu ? 0.6 : 1,
              background: n.lu ? "#f8fafc" : "white",
            }}
          >
            <div style={{ ...styles.notifIconWrap, background: bgs[n.type] }}>
              <span style={styles.notifIcon}>{icons[n.type]}</span>
            </div>
            <div style={styles.notifContent}>
              <p style={styles.notifMsg}>{n.message}</p>
              <p style={styles.notifDate}>{n.date}</p>
            </div>
            {!n.lu && <div style={{ ...styles.unreadDot, background: colors[n.type] }} />}
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}

// ===================== STUDENT PROFILE =====================
export function StudentProfile() {
  const student = {
    nom: "El Fassi", prenom: "Yassine",
    dateNaissance: "15 Avril 2008",
    adresse: "Hay Mohammadi, Casablanca",
    classe: "2BAC-SM-A",
    id: "STU-2024-0042",
    statut: "Actif",
    parent: { nom: "El Fassi", prenom: "Mohammed", tel: "0661-123-456", email: "m.elfassi@gmail.com" },
  };

  return (
    <div style={styles.page}>
      {/* Profile hero */}
      <div style={styles.profileHero}>
        <div style={styles.profileAvatar}>
          {student.prenom[0]}{student.nom[0]}
        </div>
        <h1 style={styles.profileName}>{student.prenom} {student.nom}</h1>
        <p style={styles.profileClass}>{student.classe}</p>
        <div style={styles.profileBadge}>✅ {student.statut}</div>
      </div>

      {/* Info section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📋 Informations personnelles</h2>
        <div style={styles.infoList}>
          {[
            ["🪪 ID Scolaire", student.id],
            ["🎂 Date de naissance", student.dateNaissance],
            ["📍 Adresse", student.adresse],
            ["🏫 Classe", student.classe],
          ].map(([label, val], i) => (
            <div key={i} style={styles.infoRow}>
              <p style={styles.infoLabel}>{label}</p>
              <p style={styles.infoVal}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Parent info */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>👨‍👦 Parent / Tuteur</h2>
        <div style={styles.parentCard}>
          <div style={styles.parentAvatar}>
            {student.parent.prenom[0]}{student.parent.nom[0]}
          </div>
          <div style={styles.parentInfo}>
            <p style={styles.parentName}>{student.parent.prenom} {student.parent.nom}</p>
            <p style={styles.parentDetail}>{student.parent.email}</p>
            <p style={styles.parentDetail}>{student.parent.tel}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.actionBtn}>✏️ Modifier le profil</button>
        <button style={{ ...styles.actionBtn, background: "#fef2f2", color: "#ef4444", border: "1.5px solid #fecaca" }}>
          🚪 Déconnexion
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}

// ===================== SHARED STYLES =====================
const styles = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#f0f4f8",
    minHeight: "100vh",
    padding: "24px 16px 40px",
    maxWidth: 480,
    margin: "0 auto",
  },
  header: { marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  pageTitle: { fontSize: 24, fontWeight: 800, color: "#0f172a" },
  pageSub: { fontSize: 13, color: "#64748b", marginTop: 4 },
  section: {
    background: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 16 },

  // Transport
  busCard: {
    background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
    borderRadius: 20,
    padding: 20,
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
    boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
  },
  busIcon: { fontSize: 36 },
  busName: { color: "white", fontSize: 16, fontWeight: 800 },
  busHoraires: { display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" },
  horaire: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 500 },
  chauffeurCard: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "14px",
    background: "#f8fafc",
    borderRadius: 14,
  },
  chauffeurAvatar: {
    width: 44, height: 44, borderRadius: 12,
    background: "#2563EB",
    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 14, flexShrink: 0,
  },
  chauffeurInfo: { flex: 1 },
  chauffeurName: { fontSize: 15, fontWeight: 700, color: "#0f172a" },
  chauffeurDetail: { fontSize: 12, color: "#64748b", marginTop: 2 },
  callBtn: {
    fontSize: 22, background: "#ecfdf5", width: 40, height: 40,
    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
    textDecoration: "none",
  },
  route: { display: "flex", flexDirection: "column" },
  arretRow: { display: "flex", gap: 12 },
  arretLeft: { display: "flex", flexDirection: "column", alignItems: "center", width: 16 },
  arretDot: { width: 14, height: 14, borderRadius: "50%", flexShrink: 0, marginTop: 4 },
  arretLine: { width: 2, flex: 1, background: "#e2e8f0", minHeight: 24 },
  arretInfo: { paddingBottom: 16 },
  arretLieu: { fontSize: 14, fontWeight: 600 },
  arretHeure: { fontSize: 12, color: "#94a3b8", marginTop: 2 },

  // Paiements
  payGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 },
  payCard: { borderRadius: 18, padding: "18px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
  payCardLabel: { color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 600 },
  payCardValue: { color: "white", fontSize: 24, fontWeight: 900, marginTop: 6 },
  factures: { display: "flex", flexDirection: "column", gap: 10 },
  factureRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px", background: "#f8fafc", borderRadius: 12,
  },
  factureLeft: { display: "flex", alignItems: "center", gap: 12 },
  factureIcon: {
    width: 36, height: 36, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, fontWeight: 800, flexShrink: 0,
  },
  factureMois: { fontSize: 14, fontWeight: 700, color: "#0f172a" },
  factureId: { fontSize: 11, color: "#94a3b8", marginTop: 2 },
  factureDate: { fontSize: 11, color: "#10b981", marginTop: 2 },
  factureRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 },
  factureMontant: { fontSize: 15, fontWeight: 800, color: "#0f172a" },
  payBtn: {
    background: "#2563EB", color: "white",
    border: "none", borderRadius: 8, padding: "6px 12px",
    fontSize: 12, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit",
  },

  // Notifications
  markAllBtn: {
    background: "#eff6ff", color: "#2563EB",
    border: "none", borderRadius: 10, padding: "8px 14px",
    fontSize: 12, fontWeight: 700, cursor: "pointer",
    fontFamily: "inherit",
  },
  notifList: { display: "flex", flexDirection: "column", gap: 8 },
  notifCard: {
    borderRadius: 16, padding: "14px",
    display: "flex", alignItems: "flex-start", gap: 12,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "opacity 0.2s",
  },
  notifIconWrap: {
    width: 42, height: 42, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  notifIcon: { fontSize: 20 },
  notifContent: { flex: 1 },
  notifMsg: { fontSize: 14, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 },
  notifDate: { fontSize: 12, color: "#94a3b8", marginTop: 4 },
  unreadDot: {
    width: 8, height: 8, borderRadius: "50%",
    flexShrink: 0, marginTop: 6,
  },

  // Profile
  profileHero: {
    background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
    borderRadius: 20,
    padding: "28px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    boxShadow: "0 8px 24px rgba(37,99,235,0.3)",
  },
  profileAvatar: {
    width: 72, height: 72, borderRadius: 20,
    background: "rgba(255,255,255,0.2)",
    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 26, fontWeight: 900,
    marginBottom: 12,
    border: "2px solid rgba(255,255,255,0.4)",
  },
  profileName: { fontSize: 22, fontWeight: 900, color: "white" },
  profileClass: { fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4 },
  profileBadge: {
    background: "rgba(255,255,255,0.15)",
    color: "white", fontSize: 12, fontWeight: 600,
    padding: "6px 16px", borderRadius: 20,
    marginTop: 10,
  },
  infoList: { display: "flex", flexDirection: "column", gap: 0 },
  infoRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  infoLabel: { fontSize: 13, color: "#64748b", fontWeight: 500 },
  infoVal: { fontSize: 14, fontWeight: 700, color: "#0f172a", textAlign: "right", maxWidth: "55%" },
  parentCard: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "14px", background: "#f8fafc", borderRadius: 14,
  },
  parentAvatar: {
    width: 44, height: 44, borderRadius: 12,
    background: "#8b5cf6", color: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 14, flexShrink: 0,
  },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 15, fontWeight: 700, color: "#0f172a" },
  parentDetail: { fontSize: 12, color: "#64748b", marginTop: 2 },
  actions: { display: "flex", flexDirection: "column", gap: 10 },
  actionBtn: {
    width: "100%", padding: "14px",
    background: "#eff6ff", color: "#2563EB",
    border: "1.5px solid #bfdbfe",
    borderRadius: 14, fontSize: 15, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
    textAlign: "left",
  },
};