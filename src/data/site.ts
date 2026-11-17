// All page content lives here. Edit this file to update the site;
// the components only read from it.

// The site can be served from a sub-path (GitHub Pages serves it under /<repo name>).
// Files in /public are not prefixed automatically, so wrap their paths in asset().
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${basePath}${path}`;

export const profile = {
  name: "Hoàng Thiện Quân",
  role: "Backend Developer",
  status: "Open to work",
  intro:
    "Software Engineering graduate from FPT University, focused on backend development with C# and ASP.NET Core. I build RESTful APIs, work with SQL Server and PostgreSQL, and containerize applications with Docker.",
  cv: asset("/HoangThienQuan_CV.pdf"),
  // Put a photo in /public and set its path here, e.g. asset("/portrait.png").
  // While this is null the hero shows the initials placeholder.
  portrait: null as string | null,
  initials: "HTQ",
  // Set to true to show the portrait circle in the hero again.
  showPortrait: false,
  facts: [
    { value: "C# · ASP.NET Core", label: "Core stack" },
    { value: "SQL Server · PostgreSQL", label: "Databases" },
    { value: "IELTS 7.0", label: "English" },
    { value: "2026", label: "FPT University graduate" },
  ],
};

export const contact = {
  email: "hoangthienquan5000@gmail.com",
  github: "https://github.com/QuanHT2412",
};

export const skillGroups = [
  {
    title: "Backend",
    note: "Where I spend most of my time",
    items: [
      "C#",
      "ASP.NET Core",
      "Entity Framework Core",
      "RESTful APIs",
      "JWT Authentication",
      "ASP.NET Core Identity",
      "Java",
      "Spring Boot",
    ],
  },
  {
    title: "Databases",
    note: "Schema design and query tuning",
    items: ["SQL Server", "PostgreSQL", "SQL"],
  },
  {
    title: "Frontend",
    note: "Enough to ship the whole feature",
    items: ["React", "Next.js", "JavaScript", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Ant Design"],
  },
  {
    title: "Tooling and testing",
    note: "Shipping, running and checking the code",
    items: ["Docker", "Git", "GitHub", "xUnit", "Moq", "Swagger", "Cloudinary"],
  },
];

export type Project = {
  title: string;
  kind: string;
  period: string;
  summary: string;
  stack: string[];
  /** Short badge over the card picture, e.g. "In development" */
  status?: string;
  /** Screenshot in /public, e.g. asset("/projects/kinema.jpg") (16:10 works best). Without it the card shows its number. */
  image?: string;
  /** Repo or demo links shown as buttons on the card, e.g. { label: "Source", href: "https://github.com/..." } */
  links?: { label: string; href: string }[];
  /** true = slot not filled in yet; the card renders as a "coming soon" tile */
  placeholder?: boolean;
};

// To add a project, append an entry here (add `links` for repos or a live demo).
// An entry with `placeholder: true` renders as a "Coming soon" tile.
export const projects: Project[] = [
  {
    title: "Cinema Management",
    kind: "Personal project",
    period: "2026",
    summary:
      "A full stack cinema management and online ticket booking platform with customer, employee, manager and admin roles. Customers pick seats, pay through VNPay and get a QR code ticket by email; a reward points module is included.",
    stack: ["ASP.NET Core", "Entity Framework Core", "SQL Server", "JWT", "React", "Redux Toolkit", "VNPay"],
    image: asset("/projects/kinema.jpg"),
    links: [{ label: "Source repo", href: "https://github.com/QuanHT2412/Kinema" }],
  },
  {
    title: "Warehouse Management",
    kind: "Graduation project",
    period: "09/2025 – 01/2026",
    summary:
      "Backend services for a livestock feed warehouse management system: product, contract and stock input APIs, Excel import and JWT authorization. I dockerized the application, set up cloud hosting, and took part in unit and system testing.",
    stack: ["ASP.NET Core", "Entity Framework Core", "SQL Server", "JWT", "Docker", "xUnit", "Next.js", "Cloudinary"],
    image: asset("/projects/warehouse.jpg"),
    links: [
      { label: "Server repo", href: "https://github.com/trungpqhe173313/SEP490" },
      { label: "Client repo", href: "https://github.com/trungpqhe173313/SEP490_Client" },
    ],
  },
  {
    title: "DocQA",
    kind: "Personal project",
    period: "11/2026 – present",
    status: "In development",
    summary:
      "A question-answering API over uploaded documents, using retrieval-augmented generation. The solution structure, Docker Compose stack, database setup and CI pipeline are in place; document ingestion and answering come next.",
    stack: ["ASP.NET Core", "PostgreSQL", "pgvector", "Redis", "Docker", "GitHub Actions"],
    // The repo is still private. Once it is public, uncomment:
    // links: [{ label: "Source repo", href: "https://github.com/QuanHT2412/BackEndProjectWithAI" }],
  },
];

export const timeline = [
  {
    period: "08/2024 – 12/2024",
    title: "Backend Intern",
    place: "FPT Software",
    points: [
      "Built the backend of an e-commerce system with Spring Boot and React.",
      "Designed RESTful APIs and tuned queries on SQL Server and PostgreSQL.",
      "Added JWT authentication and role-based authorization.",
    ],
    stack: ["Spring Boot", "React", "SQL Server", "PostgreSQL", "JWT"],
  },
  {
    period: "09/2025 – 01/2026",
    title: "Backend Developer, Graduation Project",
    place: "NutriBarn warehouse management system · FPT University",
    points: [
      "Built REST APIs in ASP.NET Core for products, categories, supplier contracts and stock input, on a layered API, service and repository codebase.",
      "Added bulk stock input by importing Excel files.",
      "Secured the controllers with JWT authorization and dockerized the API for deployment.",
      "Wrote controller unit tests with xUnit and Moq.",
    ],
    stack: ["ASP.NET Core", "Entity Framework Core", "SQL Server", "JWT", "Docker", "xUnit", "Moq"],
  },
  {
    period: "10/2022 – 04/2026",
    title: "Bachelor of Software Engineering",
    place: "FPT University",
    points: [],
    stack: [],
  },
];

export const nav = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
