export interface ProjectDetail {
  id: string;
  num: string;
  name: string;
  category: string;
  role: string;
  platform: string;
  builtFor: string;
  stack: string[];
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  images: { url: string; caption: string }[];
}

export const SITE_CONFIG = {
  name: "Patrick",
  title: "Founder & Systems Engineer",
  tagline: "Engineering high-consequence systems that hold up.",
  location: "Philippines (UTC+8)",
  email: "patrickkurtv@gmail.com",
  social: {
    github: "https://github.com/temqest",
    linkedin: "https://www.linkedin.com/in/patrick-villamer-15267b36a",
    facebook: "https://www.facebook.com/patrick.kurt.127",
  },
};
