import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useForm } from '../context/FormContext.jsx';

// Unser Haupt-Component
const GitHubLanguages = ({ username, token }) => {
  // useState erzeugt "State-Variablen" (also Daten, die sich ändern können)
  const [languages, setLanguages] = useState({}); // Hier speichern wir die Sprachdaten
  const [loading, setLoading] = useState(true);   // Zum Anzeigen des Ladezustands
  const [error, setError] = useState(null);       // Falls etwas schiefgeht

  // useEffect führt Code aus, wenn das Component geladen wird
  useEffect(() => {
    // Wir definieren eine asynchrone Funktion, weil wir mit "await" auf API-Daten warten
    const fetchLanguages = async () => {
      try {
        // 1️⃣ Zuerst holen wir alle Repositories des angegebenen GitHub-Nutzers
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {} // Wenn Token vorhanden, mitgeben
        });

        // Falls die Anfrage fehlschlägt, werfen wir einen Fehler
        if (!repoRes.ok) throw new Error("Fehler beim Laden der Repos");

        const repos = await repoRes.json(); // Wir wandeln die Antwort in JSON um

        const totals = {}; // Hier sammeln wir später alle Sprachen zusammen

        // 2️⃣ Jetzt gehen wir alle Repositories durch
        for (const repo of repos) {
          // Für jedes Repo rufen wir die Sprachen über die spezielle GitHub-URL ab
          const langRes = await fetch(repo.languages_url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          });

          // Wir wandeln wieder in JSON um
          const langs = await langRes.json();

          // 3️⃣ Jetzt addieren wir die Byte-Zahlen für jede Sprache
          for (const [lang, bytes] of Object.entries(langs)) {
            // Wenn die Sprache schon existiert, addieren wir dazu
            totals[lang] = (totals[lang] || 0) + bytes;
          }
        }

        // 4️⃣ Jetzt speichern wir alles im State (React merkt sich das)
        setLanguages(totals);
        setLoading(false); // Fertig mit Laden!
      } catch (err) {
        // Wenn ein Fehler passiert, speichern wir ihn im State
        setError(err.message);
        setLoading(false);
      }
    };

    // Wir rufen unsere Funktion auf
    fetchLanguages();
  }, [username, token]); // useEffect läuft erneut, wenn username oder token sich ändern

  // 🔁 Wenn noch geladen wird, zeigen wir einen Lade-Text
  if (loading) return <p>⏳ Lade Daten...</p>;

  // ❌ Falls ein Fehler aufgetreten ist
  if (error) return <p style={{ color: "red" }}>⚠️ Fehler: {error}</p>;

  // 🧮 Gesamtanzahl der Bytes aller Sprachen
  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);

  // 🔢 Wir berechnen den prozentualen Anteil jeder Sprache
  const data = Object.entries(languages).map(([lang, bytes]) => ({
    name: lang,                        // z. B. "JavaScript"
    value: ((bytes / totalBytes) * 100).toFixed(1) // Prozentwert
  }));

  // 🎨 Farben fürs Diagramm
  const COLORS = ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F", "#EDC948", "#B07AA1", "#FF9DA7"];

  // 📊 Das, was wir tatsächlich anzeigen:
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Sprachverteilung für {username}</h2>

      {/* Unser Kreisdiagramm */}
      <PieChart width={400} height={400}>
        {/* Das Pie-Element zeichnet den Kreis */}
        <Pie
          data={data}               // Unsere Sprachdaten
          dataKey="value"           // Welcher Wert im Objekt soll angezeigt werden
          nameKey="name"            // Der Name der Sprache
          cx="50%"                  // X-Position (Mitte)
          cy="50%"                  // Y-Position (Mitte)
          outerRadius={150}         // Radius des Kreises
          label                    // Zeigt Labels an (Sprache + Prozent)
        >
          {/* Jede Sprache bekommt eine Farbe */}
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Tooltip zeigt Werte, wenn man mit der Maus drüberfährt */}
        <Tooltip />
        {/* Legende zeigt eine Liste aller Sprachen */}
        <Legend />
      </PieChart>
    </div>
  );
};

export default GitHubLanguages;
