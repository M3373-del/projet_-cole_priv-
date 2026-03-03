import { useState } from "react";
import LoginPage from "./Loginpage ";
import StudentDashboard from "./students/Studentdashboard";
import StudentNotes from "./students/Studentnotes ";
import StudentAbsences from "./students/Studentabsences";
import StudentEmploiDuTemps from "./students/Studentemploidutemps";
import { StudentTransport, StudentPaiements, StudentNotifications, StudentProfile } from "./students/Studentpages";

const NAV_ITEMS = [
  { id: "dashboard", label: "Accueil", icon: HomeIcon },
  { id: "notes", label: "Notes", icon: NotesIcon },
  { id: "absences", label: "Absences", icon: AbsencesIcon },
  { id: "emploi", label: "Emploi", icon: CalendarIcon },
  { id: "more", label: "Plus", icon: MoreIcon },
];

const MORE_ITEMS = [
  { id: "transport", label: "Transport", emoji: "🚌" },
  { id: "paiements", label: "Paiements", emoji: "💳" },
  { id: "notifications", label: "Notifications", emoji: "🔔" },
  { id: "profile", label: "Profil", emoji: "👤" },
];

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showMore, setShowMore] = useState(false);

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  const handleNav = (id) => {
    if (id === "more") {
      setShowMore(!showMore);
    } else {
      setCurrentPage(id);
      setShowMore(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <StudentDashboard />;
      case "notes": return <StudentNotes />;
      case "absences": return <StudentAbsences />;
      case "emploi": return <StudentEmploiDuTemps />;
      case "transport": return <StudentTransport />;
      case "paiements": return <StudentPaiements />;
      case "notifications": return <StudentNotifications />;
      case "profile": return <StudentProfile />;
      default: return <StudentDashboard />;
    }
  };

  const activeNavId = MORE_ITEMS.some((m) => m.id === currentPage)
    ? "more"
    : NAV_ITEMS.find((n) => n.id === currentPage)?.id || "dashboard";

  return (
    <div style={appStyles.root}>
      {/* Page content */}
      <div style={appStyles.content}>
        {renderPage()}
      </div>

      {/* More drawer */}
      {showMore && (
        <div style={appStyles.drawer}>
          <div style={appStyles.drawerHandle} />
          <p style={appStyles.drawerTitle}>Plus d'options</p>
          <div style={appStyles.drawerGrid}>
            {MORE_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setShowMore(false); }}
                style={{
                  ...appStyles.drawerItem,
                  background: currentPage === item.id ? "#eff6ff" : "white",
                  border: currentPage === item.id ? "2px solid #2563EB" : "1.5px solid #e2e8f0",
                }}
              >
                <span style={appStyles.drawerEmoji}>{item.emoji}</span>
                <span style={appStyles.drawerLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom overlay when drawer open */}
      {showMore && <div style={appStyles.overlay} onClick={() => setShowMore(false)} />}

      {/* Bottom Navigation */}
      <nav style={appStyles.nav}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNavId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={appStyles.navBtn}
            >
              <div style={{
                ...appStyles.navIconWrap,
                background: isActive ? "#2563EB" : "transparent",
              }}>
                <Icon color={isActive ? "white" : "#94a3b8"} />
              </div>
              <span style={{
                ...appStyles.navLabel,
                color: isActive ? "#2563EB" : "#94a3b8",
                fontWeight: isActive ? 700 : 500,
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f0f4f8; }
      `}</style>
    </div>
  );
}

// ========= SVG Icons =========
function HomeIcon({ color = "#94a3b8" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
function NotesIcon({ color = "#94a3b8" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke={color} strokeWidth="2"/>
      <path d="M8 8h8M8 12h8M8 16h5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function AbsencesIcon({ color = "#94a3b8" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 15l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CalendarIcon({ color = "#94a3b8" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="15" r="1.5" fill={color}/>
      <circle cx="12" cy="15" r="1.5" fill={color}/>
      <circle cx="16" cy="15" r="1.5" fill={color}/>
    </svg>
  );
}
function MoreIcon({ color = "#94a3b8" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="2" fill={color}/>
      <circle cx="12" cy="12" r="2" fill={color}/>
      <circle cx="19" cy="12" r="2" fill={color}/>
    </svg>
  );
}

const appStyles = {
  root: {
    position: "relative",
    maxWidth: 480,
    margin: "0 auto",
    background: "#f0f4f8",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
  },
  content: {
    paddingBottom: 90,
  },
  nav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 480,
    background: "white",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0 16px",
    borderTop: "1px solid #f1f5f9",
    boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
    zIndex: 100,
  },
  navBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    flex: 1,
    fontFamily: "inherit",
  },
  navIconWrap: {
    width: 40, height: 40,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.2s",
  },
  navLabel: { fontSize: 11, transition: "color 0.2s" },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.3)",
    zIndex: 150,
  },
  drawer: {
    position: "fixed",
    bottom: 74,
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 32px)",
    maxWidth: 448,
    background: "white",
    borderRadius: "20px 20px 0 0",
    padding: "12px 16px 20px",
    zIndex: 200,
    boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
    animation: "slideUp 0.25s ease",
  },
  drawerHandle: {
    width: 40, height: 4,
    background: "#e2e8f0",
    borderRadius: 2,
    margin: "0 auto 16px",
  },
  drawerTitle: { fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 12 },
  drawerGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  drawerItem: {
    padding: "16px",
    borderRadius: 14,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    fontFamily: "inherit",
    transition: "all 0.2s",
  },
  drawerEmoji: { fontSize: 28 },
  drawerLabel: { fontSize: 13, fontWeight: 700, color: "#0f172a" },
};