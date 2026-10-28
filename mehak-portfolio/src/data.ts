// All biographical facts and reported outcomes originate in the supplied résumé.
// Add verified public URLs here when available; absent links are deliberately omitted.
export const profile = {
  name: "Mehak Khandelwal",
  email: "mehak.28105@gmail.com",
  identity: "Software engineering · Applied AI · FinTech",
  intro:
    "I’m Mehak, a Computer Science and Financial Technology student at MIT Manipal. My work connects AI-powered engineering workflows, full-stack applications and financial tools, with experience at Microsoft and Avira Digital.",
  education: {
    degree: "B.Tech, Computer Science & Financial Technology",
    school: "Manipal Institute of Technology, Manipal",
    dates: "2023–2027",
    grade: "8.80 / 10",
  },
  socialLinks: [] as { label: string; url: string }[],
};
export const work = [
  {
    id: "microsoft",
    number: "01",
    title: "Context into configuration.",
    short: "AI-assisted engineering",
    category: "Microsoft · Internship work",
    subtitle: "A grounded authoring workflow",
    label: "Applied AI / Backend",
    technologies: [".NET", "Azure OpenAI", "Azure AI Search", "RAG"],
    metric: "4–5 days → a few hours",
    metricLabel: "New-engineer ramp-up and execution time",
    summary:
      "A documentation-grounded AI workflow that helps engineers move from requirements to validated configuration.",
    problem:
      "A complex engineering configuration workflow required new engineers to navigate multiple knowledge sources before authoring and validating their work.",
    contribution:
      "Built an AI-powered automation solution and a RAG pipeline using Azure OpenAI and Azure AI Search. Integrated requirement gathering, context retrieval, generation and validation into an end-to-end .NET backend.",
    outcome:
      "Reduced new-engineer ramp-up and execution time from 4–5 days to a few hours while preserving existing engineering review processes.",
    visual: "flow",
    kind: "Internship work study",
    note: "Conceptual workflow illustration. No employer interface or private implementation is reproduced.",
  },
  {
    id: "finbuddy",
    number: "02",
    title: "A clearer view of money.",
    short: "FinBuddy",
    category: "Personal project",
    subtitle: "AI-powered expense tracker & financial advisor",
    label: "Full stack / Financial technology",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Firebase",
      "OpenAI API",
      "Chart.js",
      "Tailwind CSS",
    ],
    metric: "35%",
    metricLabel: "Reported improvement in decision-making speed",
    summary:
      "A full-stack personal finance app combining interactive dashboards with AI-generated financial tips.",
    problem:
      "Expense information becomes more useful when it can be explored visually and paired with clear financial guidance.",
    contribution:
      "Authored FinBuddy using React, Node.js and Express, with Firebase for data storage, Chart.js for dashboards and the OpenAI API for generated financial tips.",
    outcome:
      "The résumé reports a 35% improvement in decision-making speed and a 20% reduction in expenses. These are project-reported outcomes, not independently audited results.",
    visual: "finance",
    kind: "Personal project",
    note: "Conceptual dashboard illustration with sample values, not a screenshot or live financial advice.",
  },
  {
    id: "avira",
    number: "03",
    title: "Less admin. More clarity.",
    short: "HR management portal",
    category: "Avira Digital · Internship work",
    subtitle: "Real-time tools for everyday operations",
    label: "Full stack / Product systems",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Firebase",
      "Redux",
      "Context API",
    ],
    metric: "1,000+",
    metricLabel: "Employees supported by the HR portal",
    summary:
      "A real-time HR portal with secure CRUD operations, attendance tracking and Firebase data storage.",
    problem:
      "Manual HR operations created repetitive administrative work across a large employee base.",
    contribution:
      "Developed a real-time HR Management Portal and worked across frontend components, backend routes and RESTful APIs. Refactored legacy code, resolved bugs and improved application performance.",
    outcome:
      "The HR portal reduced manual HR workload by 60%. Across the internship’s web applications, load times improved by 25% and 15+ frontend and backend bugs were resolved.",
    visual: "portal",
    kind: "Internship work study",
    note: "Conceptual system diagram based on résumé functionality, not an employer product screenshot.",
  },
];
export const experience = [
  {
    company: "Microsoft",
    role: "SWE Summer Intern",
    date: "May–July 2026",
    location: "Bangalore",
    intro: "AI-powered engineering configuration, grounded in context.",
    details: [
      "Built a RAG pipeline that consolidated technical documentation and engineering knowledge into a context-aware authoring workflow.",
      "Engineered four backend stages in .NET: requirement gathering, context retrieval, AI-powered generation and validation.",
      "Preserved engineering review processes while reducing new-engineer ramp-up and execution time.",
    ],
    stack: ".NET / Azure OpenAI / Azure AI Search / RAG",
  },
  {
    company: "Avira Digital",
    role: "FullStack Developer Intern",
    date: "May–June 2025",
    location: "Hyderabad",
    intro: "Full-stack applications and real-time HR operations.",
    details: [
      "Built and optimized React, Node.js and Express applications with RESTful API integrations.",
      "Developed an HR portal for 1,000+ employees with secure CRUD operations, attendance tracking and Firebase storage.",
      "Refactored 20+ React components and backend routes; worked with Redux, Context API, Material-UI and Ant Design, maintaining WCAG 2.1 AA compliance across 10+ platforms.",
    ],
    stack: "React / Node.js / Express / Firebase / Redux",
  },
];
export const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C", "C++"],
  },
  {
    category: "Full stack",
    items: [
      "React.js",
      "Redux",
      "Context API",
      "Node.js",
      "Express",
      ".NET",
      "Firebase",
      "RESTful APIs",
    ],
  },
  {
    category: "AI & cloud",
    items: [
      "Azure",
      "Azure OpenAI",
      "Azure AI Search",
      "RAG",
      "OpenAI API",
      "AI/ML exposure",
    ],
  },
  {
    category: "Interface & tools",
    items: [
      "Tailwind CSS",
      "Material-UI",
      "Ant Design",
      "Chart.js",
      "Git",
      "GitHub",
      "Figma",
      "Postman",
      "Netlify",
      "Vercel",
    ],
  },
  {
    category: "Foundations",
    items: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "System Design Basics",
      "200+ LeetCode problems",
    ],
  },
  {
    category: "Exploring",
    items: [
      "React Native",
      "Django",
      "TensorFlow",
      "AWS Cloud Practitioner (learning)",
    ],
  },
];
export const leadership = [
  {
    name: "YaanBarpe",
    role: "Co-founder · Head of Design & Marketing",
    date: "March 2025",
    description:
      "Co-founded a government-registered travel-tech startup promoting culture. Led brand assets and marketing, designed travel-discovery UI/UX prototypes, and contributed to the product roadmap.",
    stat: "35%",
    outcome: "Increase in brand engagement",
  },
  {
    name: "E-Cell, MIT",
    role: "Head of Marketing",
    date: "August 2025–September 2026",
    description:
      "Led Instagram operations and visual storytelling, converted partnerships with 50+ local startups, and organized the Manipal Entrepreneurship Summit 2025.",
    stat: "40%",
    outcome: "Increase in student participation",
  },
];
