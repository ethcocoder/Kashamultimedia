// Broadcast Atelier direction: admin access uses the same paper, ink, and signal-red language while clearly separating operational entry from the public story.
import { FormEvent, useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, LockKeyhole, LogOut, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage("Enter both fields to continue.");
      return;
    }
    localStorage.setItem("kasha-admin-session", "preview-session");
    setLocation("/admin/dashboard");
  };

  return (
    <main className="admin-shell">
      <div className="admin-topbar">
        <a className="admin-back" href="/"><ArrowLeft size={15} /> Back to Kasha</a>
        <button className="header-tool" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
      <section className="admin-card" aria-labelledby="admin-heading">
        <div className="admin-card-mark"><LockKeyhole size={20} /></div>
        <p className="eyebrow">Kasha desk / private access</p>
        <h1 id="admin-heading">Sign in to<br /><em>the desk.</em></h1>
        <p className="admin-intro">Manage programmes, field notes, and the next signal from one quiet room.</p>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@kashamultimedia.et" autoComplete="email" /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete="current-password" /></label>
          {message && <p className="admin-error" role="alert">{message}</p>}
          <button className="button button-signal" type="submit">Enter the desk <ArrowUpRight size={16} /></button>
        </form>
        <p className="admin-note">Frontend access shell for this static build. Connect your production authentication provider before using it for protected content.</p>
      </section>
    </main>
  );
}

export function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!localStorage.getItem("kasha-admin-session")) setLocation("/admin");
  }, [setLocation]);

  const signOut = () => {
    localStorage.removeItem("kasha-admin-session");
    setLocation("/admin");
  };

  return (
    <main className="admin-shell">
      <div className="admin-topbar">
        <a className="admin-back" href="/"><ArrowLeft size={15} /> Public site</a>
        <div className="admin-actions"><button className="header-tool" type="button" onClick={toggleTheme} aria-label="Toggle theme">{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}</button><button className="admin-signout" type="button" onClick={signOut}><LogOut size={15} /> Sign out</button></div>
      </div>
      <section className="admin-dashboard" aria-labelledby="dashboard-heading">
        <p className="eyebrow">Kasha desk / overview</p>
        <h1 id="dashboard-heading">Good to see you<br /><em>behind the signal.</em></h1>
        <div className="admin-dashboard-grid"><article><span>01</span><h2>Programmes</h2><p>Shape the next voices, episodes, and weekly broadcast notes.</p><button type="button">Open manager <ArrowUpRight size={15} /></button></article><article><span>02</span><h2>Field notes</h2><p>Keep the cultural archive growing with new stories and observations.</p><button type="button">Open manager <ArrowUpRight size={15} /></button></article><article><span>03</span><h2>Events</h2><p>Prepare the public room for the next conversation or gathering.</p><button type="button">Open manager <ArrowUpRight size={15} /></button></article></div>
        <p className="admin-note">This dashboard is a frontend preview. Connect it to a secure backend before publishing operational data.</p>
      </section>
    </main>
  );
}
