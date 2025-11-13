import { set } from 'date-fns';
import { createContext, useContext, useState } from 'react';

// Context erstellen
const FormContext = createContext();

export function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    firstName: 'Christian',
    lastName: 'Hampl',
    country: 'Germany',
    city: 'Leipzig',
    language: 'german, english',
    cv: '',
    email: 'chris.hampl35@googlemail.com',
    profileImg: {url:"/profileIMG.jpeg", file: null},
    instagram:'https://www.instagram.com/christian.hampl',
    linkedin:'https://www.linkedin.com',
    gitHubUrl: 'https://github.com/ChristianHampl',
    gitHubUsername: '',
    gitHubUsernameValid: false,
    projects: [
      {name: "Dashboard", link: "", desc:"Creating my Portfolio designt as a modern glowy looking Dashboard with a minimalistic Userface and dynamic Data to personalize as u want to. Connecting ur GitHub Profile to show most used languages and repos."}, 
      {name: "FirstSteps", link: "", desc:"Create a static minimalistic landing page for an upcoming app. Inspired by apple design guides and modern product page styles. Implementing a WordPress Blog to combine a static html site with a CMS Blog for dynamic content"},
      {name: "Silk Song Wiki", link: "", desc:"Portfolio about HK Silk Song with new techniques i`ve learned. #GameWiki - used DOM Manipulation to implement an Easter Egg by dragging particles into a hidden location"},
    ],
    projectImages: [],
    projectImagesLinks: [],
    screenshots0: [{id: 1, url: "https://placehold.co/300x200?text=Screenshot+1"}, {id: 2, url: "https://placehold.co/300x200?text=Screenshot+2" }, {id: 3, url: "https://placehold.co/300x200?text=Screenshot+3"}],
    screenshots1: [{id: 1, url: "https://placehold.co/300x200?text=Screenshot+1"}, {id: 2, url: "https://placehold.co/300x200?text=Screenshot+2" }, {id: 3, url: "https://placehold.co/300x200?text=Screenshot+3"}],
    screenshots2: [{id: 1, url: "https://placehold.co/300x200?text=Screenshot+1"}, {id: 2, url: "https://placehold.co/300x200?text=Screenshot+2" }, {id: 3, url: "https://placehold.co/300x200?text=Screenshot+3"}],
    screenshots3: [{id: 1, url: "https://placehold.co/300x200?text=Screenshot+1"}, {id: 2, url: "https://placehold.co/300x200?text=Screenshot+2" }, {id: 3, url: "https://placehold.co/300x200?text=Screenshot+3"}],
    screenshots4: [{id: 1, url: "https://placehold.co/300x200?text=Screenshot+1"}, {id: 2, url: "https://placehold.co/300x200?text=Screenshot+2" }, {id: 3, url: "https://placehold.co/300x200?text=Screenshot+3"}],
    screenshots5: [{id: 1, url: "https://placehold.co/300x200?text=Screenshot+1"}, {id: 2, url: "https://placehold.co/300x200?text=Screenshot+2" }, {id: 3, url: "https://placehold.co/300x200?text=Screenshot+3"}],
    repos: [],
    languages: [],        // ausgewählte Sprachen (von GitHub)
    frameworks: ["React", "Tailwind CSS"],       // manuell ausgewählte Frameworks
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

  function handleProjects(field) {
    setFormData (prev => ({
      ...prev,
      [field]: [
        ...(prev[field] || []),
          {
          id: Date.now() + Math.random(),
          name: "Project",
          link: "", 
          desc: "",
          }
      ]
    }));
  }


  function handleImageUpload(field, fileslist) {
    const files = Array.from(fileslist);
    const urls = files.map(file => URL.createObjectURL(file)) 

    if (field==="profileImg") {
      const file = files[0]; 
      setFormData(prev=> ({
        ...prev,
        [field]: {url:URL.createObjectURL(file), file: file}
      }))
      return;
    }

    if (field.startsWith("screenshots")) {

    const maxScreenshots = 3; 
    const existing = formData[field] || [];

    if (existing.length >= maxScreenshots) {
    alert("Maximal 3 Bilder erlaubt!");
    return;
  }

  const allowedFiles = files.slice(0, maxScreenshots - existing.length);

  const newEntries = allowedFiles.map(file => ({
    id: Date.now() + Math.random(),
    url: URL.createObjectURL(file),
  }));

  setFormData(prev => ({
    ...prev,
    [field]: [...existing, ...newEntries]
  }));

  console.log(newEntries)

  return
}

    setFormData (prev => ({
      ...prev,
      [field]: [
        ...(prev[field] || []),
        ...files.map(file => ({
          id: Date.now() + Math.random(),
          name: "",
          url: URL.createObjectURL(file),
          link: "", 
          desc: "",
        }))
      ]
    }));
   }

function handleImageData(field, value, description, name, i) {
  setFormData(prev => {
    const arr = [...prev[field]]; // Array kopieren
    arr[i] = {...arr[i], link: value, desc: description, name: name};          
    return {
      ...prev,
      [field]: arr
    };
  });
}

function resetProjectsAndScreenshots() {
  setFormData(prev => ({
    ...prev,
    projects: [],
    screenshots1: [],
    screenshots2: [],
    screenshots3: [],
    screenshots4: [],
    screenshots5: [],
  }));
}

function deleteScreenshot(field, i) {
  setFormData(prev => ({
    ...prev,
    [field]: prev[field].filter((_, index) => index !== i)
  }));
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
  async function handleFetchGitHubData(githubUrl) {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
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
     setFormData(prev => ({
    ...prev,
    gitHubUsernameValid: false,
    gitHubUsername: "",
    repos: [],
    languages: [],
    langRatings: {},
    githubLanguages: {},
  }));
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
        handleProjects,
        handleImageUpload,
        handleImageData,
        resetProjectsAndScreenshots,
        deleteScreenshot,
        handleFetchGitHubData, 
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
