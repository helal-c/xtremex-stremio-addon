export const manifest = {
  id: "com.xtremex.stremio",
  version: "0.1.0",
  name: "XtremeX",
  description: "Bangla movies, series and anime catalog starter addon.",
  resources: ["catalog", "meta", "stream"],
  types: ["movie", "series"],
  catalogs: [
    {
      type: "movie",
      id: "xtremex-bangla-movies",
      name: "XtremeX • Bangla Movies",
      extra: [{ name: "search", isRequired: false }]
    },
    {
      type: "series",
      id: "xtremex-bangla-series",
      name: "XtremeX • Bangla Series",
      extra: [{ name: "search", isRequired: false }]
    },
    {
      type: "series",
      id: "xtremex-anime",
      name: "XtremeX • Anime",
      extra: [{ name: "search", isRequired: false }]
    }
  ],
  behaviorHints: {
    configurable: false
  }
};
