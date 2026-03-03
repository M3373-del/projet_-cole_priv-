import { useState } from "react";

const ROLES = [
  {
    id: "parent",
    label: "Parent",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="10" r="4" fill="currentColor" />
        <circle cx="21" cy="10" r="4" fill="currentColor" />
        <path d="M2 26c0-5 4-9 9-9h10c5 0 9 4 9 9" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="16" cy="21" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "teacher",
    label: "Teacher",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none"/>
        <path d="M4 13h24" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="19" r="3" fill="currentColor" />
        <path d="M16 4v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "admin",
    label: "Admin",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L4 8v8c0 7 5.3 13.5 12 15 6.7-1.5 12-8 12-15V8L16 3z" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
        <circle cx="16" cy="14" r="3" fill="currentColor"/>
        <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("parent");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin({ identifier, role: selectedRole });
    }, 1200);
  };

  return (
    <div style={styles.container}>
      {/* Background blobs */}
      <div style={styles.blobTop} />
      <div style={styles.blobBottom} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <div style={styles.logoBox}>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path d="M19 4L3 13v4l16 9 16-9v-4L19 4z" fill="#2563EB" />
              <path d="M3 22l16 9 16-9" stroke="#2563EB" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to manage your school activities</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email / School ID */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email or School ID</label>
            <input
              type="text"
              placeholder="Enter your email or ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.input)}
            />
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, paddingRight: 48 }}
                onFocus={(e) => Object.assign(e.target.style, { ...styles.inputFocus, paddingRight: "48px" })}
                onBlur={(e) => Object.assign(e.target.style, { ...styles.input, paddingRight: "48px" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            <div style={styles.forgotWrap}>
              <a href="#" style={styles.forgot}>Forgot Password?</a>
            </div>
          </div>

          {/* Role Selector */}
          <div style={styles.roleSection}>
            <p style={styles.roleTitle}>I am a...</p>
            <div style={styles.roleRow}>
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  style={{
                    ...styles.roleBtn,
                    ...(selectedRole === role.id ? styles.roleBtnActive : {}),
                  }}
                >
                  <span style={{
                    color: selectedRole === role.id ? "#2563EB" : "#64748b",
                    transition: "color 0.2s",
                  }}>
                    {role.icon}
                  </span>
                  <span style={{
                    ...styles.roleLabel,
                    color: selectedRole === role.id ? "#2563EB" : "#475569",
                    fontWeight: selectedRole === role.id ? 700 : 500,
                  }}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            style={{ ...styles.signInBtn, ...(loading ? styles.signInBtnLoading : {}) }}
            disabled={loading}
          >
            {loading ? (
              <span style={styles.spinner} />
            ) : (
              <>
                Sign In
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Help */}
        <p style={styles.help}>
          Need help?{" "}
          <a href="#" style={styles.supportLink}>Contact Support</a>
        </p>

        <p style={styles.version}>EDUMANAGE V4.2.0</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        input::placeholder { color: #94a3b8; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f0f4f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "24px 16px",
  },
  blobTop: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 350,
    height: 350,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blobBottom: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    background: "white",
    borderRadius: 24,
    padding: "40px 32px 32px",
    width: "100%",
    maxWidth: 420,
    boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
    animation: "fadeUp 0.5s ease both",
    position: "relative",
    zIndex: 1,
  },
  logoWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    background: "#eff6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 16px rgba(37,99,235,0.15)",
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    color: "#0f172a",
    textAlign: "center",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 28,
  },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 14, fontWeight: 600, color: "#1e293b" },
  input: {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 12,
    fontSize: 15,
    color: "#0f172a",
    outline: "none",
    background: "#f8fafc",
    transition: "border 0.2s, box-shadow 0.2s",
    fontFamily: "inherit",
  },
  inputFocus: {
    border: "1.5px solid #2563EB",
    boxShadow: "0 0 0 3px rgba(37,99,235,0.12)",
    background: "white",
  },
  passwordWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
    alignItems: "center",
  },
  forgotWrap: { display: "flex", justifyContent: "flex-end", marginTop: 4 },
  forgot: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: 600,
    textDecoration: "none",
  },
  roleSection: { display: "flex", flexDirection: "column", gap: 12 },
  roleTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#1e293b",
    textAlign: "center",
  },
  roleRow: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },
  roleBtn: {
    flex: 1,
    padding: "14px 8px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 14,
    background: "#f8fafc",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  roleBtnActive: {
    border: "2px solid #2563EB",
    background: "#eff6ff",
    boxShadow: "0 2px 12px rgba(37,99,235,0.15)",
  },
  roleLabel: {
    fontSize: 13,
    transition: "all 0.2s",
  },
  signInBtn: {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)",
    color: "white",
    border: "none",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    letterSpacing: "0.2px",
    boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
    transition: "opacity 0.2s, transform 0.1s",
    marginTop: 4,
    fontFamily: "inherit",
  },
  signInBtnLoading: { opacity: 0.7, cursor: "not-allowed" },
  spinner: {
    width: 20,
    height: 20,
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },
  help: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
    marginTop: 24,
  },
  supportLink: {
    color: "#2563EB",
    fontWeight: 600,
    textDecoration: "underline",
  },
  version: {
    fontSize: 11,
    color: "#cbd5e1",
    textAlign: "center",
    marginTop: 16,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
};