import { set } from 'date-fns';
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
    projectImages: [],
    projectImagesLinks: [],
    repos: [],
    languages: [],        // ausgewählte Sprachen (von GitHub)
    frameworks: [],       // manuell ausgewählte Frameworks
    githubLanguages: {},  // Rohdaten von GitHub
    langRatings: {},      // automatisch von Bytes abgeleitet
    frameRatings: {},     // manuell
    showCard1: true,
    showCard2: true,
    showCard3: true,
    showRepos: true,
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


  function handleImageUpload(field, fileslist) {
    const files = Array.from(fileslist);
    const urls = files.map(file => URL.createObjectURL(file)) 

    setFormData (prev => ({
      ...prev,
      [field]: [
        ...(prev[field] || []),
        ...files.map(file => ({
          id: Date.now() + Math.random(),
          url: URL.createObjectURL(file),
          link: "", 
        }))
      ]
    }));
  }

function handleImageHref(field, value, i) {
  setFormData(prev => {
    const arr = [...prev[field]]; // Array kopieren
    arr[i] = {...arr[i], link: value};              // nur das i-te Element ändern
    return {
      ...prev,
      [field]: arr
    };
  });
}

  // ****


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
  if (!username) return;

  setFormData(prev => ({ ...prev, gitHubUsername: username }));

  try {
    // 1️⃣ Repositories abrufen
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!repoRes.ok) throw new Error("Fehler beim Laden der Repos");

    const repos = await repoRes.json();

    // 2️⃣ Datenstrukturen vorbereiten
    const totals = {};
    const repoList = []; // hier sammeln wir die Repos

    // 3️⃣ Durch alle Repos iterieren
    for (const repo of repos) {
      // Grunddaten merken
      repoList.push({
        name: repo.name,
        description: repo.description || "Keine Beschreibung",
        url: repo.html_url,
      });

      // Sprachen für dieses Repo abrufen
      const langRes = await fetch(repo.languages_url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const langs = await langRes.json();

      // Bytes addieren
      for (const [lang, bytes] of Object.entries(langs)) {
        totals[lang] = (totals[lang] || 0) + bytes;
      }
    }

    // 4️⃣ Sprachen sortieren
    const sortedLanguages = Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang);

    // 5️⃣ Ratings berechnen
    const maxBytes = Math.max(...Object.values(totals), 1);
    const langRatings = {};
    for (const [lang, bytes] of Object.entries(totals)) {
      langRatings[lang] = Math.max(1, Math.round((bytes / maxBytes) * 5));
    }

    // 6️⃣ Alles im Context speichern
    setFormData(prev => ({
      ...prev,
      githubLanguages: totals,
      gitHubUsernameValid: true,
      languages: sortedLanguages,
      langRatings,
      repos: repoList, // ✨ neue Daten hier
    }));

  } catch (err) {
    console.error("Fehler beim Abrufen der GitHub-Daten:", err);
    setFormData(prev => ({...prev, gitHubUsernameValid: false,}))
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
        handleImageUpload,
        handleImageHref,
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
