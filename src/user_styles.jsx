

const base = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flexstart",
    transition: "all 0.3s ease",
    left: "10%"
  },
};

// Größe & Layout
const displayStyles = {
  s: {
    name: { fontSize: "12px" },
    img: { width: "30px", height: "30px", borderRadius: "50%" },
    status: { fontSize: "10px" },
  },
  m: {
    name: { fontSize: "16px" },
    img: { width: "50px", height: "50px", borderRadius: "50%" },
    status: { fontSize: "14px" },
  },
  l: {
    name: { fontSize: "22px" },
    img: { width: "80px", height: "80px", borderRadius: "10px" },
    status: { fontSize: "16px" },
  },
};

// Farbthemen
const themeStyles = {
  light: {
    name: { color: "#222" },
    status: { color: "#555" },
    img: { border: "2px solid #ddd" },
  },
  dark: {
    name: { color: "#fafafa" },
    status: { color: "#ccc" },
    img: { border: "2px solid #444" },
  },
};


export function getUserStyles(display = "m", theme = "light") {
  const size = displayStyles[display] || displayStyles.m;
  const colors = themeStyles[theme] || themeStyles.light;

  return {
    container: base.container,
    name: { ...size.name, ...colors.name },
    img: { ...size.img, ...colors.img },
    status: { ...size.status, ...colors.status },
  };
}
