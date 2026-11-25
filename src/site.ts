export const siteName = "GolfTally";
export const siteOrigin = "https://golftally.tvr.works";

export const sitePages = {
  home: {
    file: "index.html",
    path: "/",
    title: "GolfTally | Golf scorecard and GPS yardage for iPhone",
    description:
      "GolfTally is coming soon for iPhone and Apple Watch. Keep a golf scorecard, check GPS yardage, and mark shots on Apple Maps. No account or subscription.",
  },
  privacy: {
    file: "privacy.html",
    path: "/privacy",
    title: "GolfTally privacy",
    description:
      "How GolfTally handles rounds, location, iCloud sync and support emails, and how to delete a round.",
  },
  support: {
    file: "support.html",
    path: "/support",
    title: "Support | GolfTally",
    description:
      "GolfTally support information and common questions for the iPhone and Apple Watch golf app.",
  },
  notFound: {
    file: "404.html",
    path: null,
    title: "Page not found | GolfTally",
    description: "This GolfTally page could not be found.",
  },
};

export type Page = keyof typeof sitePages;
