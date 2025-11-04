import { createContext, useContext, useState } from 'react';

// Context erstellen
const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: 'Christian',
    lastName: '',
    email: '',
    gitHubUrl: 'https://github.com/',        // GitHub URL vom User
    gitHubUsername: '',   // automatisch extrahiert
    gitHubUsernameValid: false,
    languages: [],        // ausgewählte Sprachen (von GitHub)
    frameworks: [],       // manuell ausgewählte Frameworks
    githubLanguages: {},  // Rohdaten von GitHub
    langRatings: {},      // automatisch von Bytes abgeleitet
    frameRatings: {},     // manuell
    showCard1: true,
    showCard2: true,
    showCard3: true,
    notes: '',
  });

  // --- bestehende Update-Funktionen ---
  function updateField(name, value) {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function updateArrayField(field, value, checked) {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? prev[field] : [];
      return {
        ...prev,
        [field]: checked
          ? [...currentArray, value]
          : currentArray.filter(item => item !== value),
      };
    });
  }

  function updateToggle(field) {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  }

  function updateRatings(field, array, i, value) {
    const name = formData[array][i];
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [name]: Number(value) },
    }));
  }

  function handleTextInput(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  // --- Hilfsfunktion: GitHub Username extrahieren ---
  function extractUsernameFromUrl(url) {
    try {
      const match = url.match(/github\.com\/([a-zA-Z0-9_-]+)/i);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }

  // --- GitHub Daten abrufen & automatisch in formData speichern ---
  async function handleFetchGitHubData(githubUrl, token) {
     console.log("handleFetchGitHubData aufgerufen mit:", githubUrl);
    const username = extractUsernameFromUrl(githubUrl);
    if (!username) return; // ungültige URL -> nichts tun

    setFormData(prev => ({ ...prev, gitHubUsername: username }));

    try {
      // 1️⃣ Alle Repos des Users abrufen
      const repoRes = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!repoRes.ok) throw new Error("Fehler beim Laden der Repos");
       
      setFormData(prev=> ({...prev, gitHubUsernameValid: true}))
      
      const repos = await repoRes.json();

      

      const totals = {};

      // 2️⃣ Jedes Repo einzeln prüfen
      for (const repo of repos) {
        const langRes = await fetch(repo.languages_url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const langs = await langRes.json();

        for (const [lang, bytes] of Object.entries(langs)) {
          totals[lang] = (totals[lang] || 0) + bytes;
        }
      }

      // 3️⃣ Sprachen nach Bytes sortieren
      const sortedLanguages = Object.entries(totals)
        .sort((a, b) => b[1] - a[1])
        .map(([lang]) => lang);

      // 4️⃣ Ratings automatisch berechnen (1–5 Skala)
      const maxBytes = Math.max(...Object.values(totals), 1); // prevent division by zero
      const langRatings = {};
      for (const [lang, bytes] of Object.entries(totals)) {
        langRatings[lang] = Math.max(1, Math.round((bytes / maxBytes) * 5));
      }

      // 5️⃣ formData updaten
      setFormData(prev => ({
        ...prev,
        githubLanguages: totals,
        languages: sortedLanguages,
        langRatings,
      }));

    } catch (err) {
      setFormData(prev=> ({...prev, gitHubUsernameValid: false}));
      console.error("Fehler beim Abrufen der GitHub-Daten:", err);
    }
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        updateField,
        updateArrayField,
        updateToggle,
        updateRatings,
        handleTextInput,
        handleFetchGitHubData, // neu
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

// Hook für einfachen Zugriff
export function useForm() {
  return useContext(FormContext);
}
