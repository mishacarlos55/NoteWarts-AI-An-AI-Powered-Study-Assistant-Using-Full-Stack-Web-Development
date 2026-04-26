export const houseThemes = {
  gryffindor: {
    name: "Gryffindor",
    crest: "🦁",
    bg: "from-red-900 via-red-700 to-yellow-600",
    text: "text-red-900",
    accent: "bg-red-700",
    accentText: "text-white",
    border: "border-red-800/40",
    card: "bg-red-50/80"
  },

  slytherin: {
    name: "Slytherin",
    crest: "🐍",
    bg: "from-green-900 via-green-700 to-emerald-500",
    text: "text-green-900",
    accent: "bg-green-700",
    accentText: "text-white",
    border: "border-green-800/40",
    card: "bg-green-50/80"
  },

  ravenclaw: {
    name: "Ravenclaw",
    crest: "🦅",
    bg: "from-blue-900 via-blue-700 to-indigo-500",
    text: "text-blue-900",
    accent: "bg-blue-700",
    accentText: "text-white",
    border: "border-blue-800/40",
    card: "bg-blue-50/80"
  },

  hufflepuff: {
    name: "Hufflepuff",
    crest: "🦡",
    bg: "from-yellow-700 via-yellow-500 to-amber-400",
    text: "text-yellow-900",
    accent: "bg-yellow-600",
    accentText: "text-black",
    border: "border-yellow-800/40",
    card: "bg-yellow-50/80"
  }
};

export const getSavedHouse = () =>
  localStorage.getItem("hogwarts-house") || "gryffindor";

export const saveHouse = (house) =>
  localStorage.setItem("hogwarts-house", house);