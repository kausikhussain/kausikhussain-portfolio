export interface KnowledgeTopic {
  id: string;
  keys: string[];
  title: string;
  category: "personal" | "education" | "project" | "hackathon" | "skills" | "fitness" | "business" | "contact";
  summary: string;
  details: string[];
  metrics?: { label: string; value: string }[];
  tags?: string[];
  links?: { label: string; url: string; icon: string }[];
  relatedQuestions: string[];
}

export const KAUSIK_KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // 1. Personal & Introduction
  {
    id: "whoami",
    keys: ["whoami", "who are you", "kausik", "sk kausik hussain", "introduction", "bio", "about", "tell me about yourself"],
    title: "Sk Kausik Hussain — AI & Full-Stack Architect",
    category: "personal",
    summary: "Smart India Hackathon 2025 National Finalist & Full-Stack Engineer specializing in WebRTC real-time media systems, PyTorch AI architectures, and 3D WebGL user interfaces.",
    details: [
      "Finalist at Smart India Hackathon (SIH) 2025 organized by the Ministry of Education, India.",
      "Pursuing B.Tech in Computer Science & Engineering (CGPA: 8.75) at Silicon Institute of Technology.",
      "Experienced in building sub-200ms real-time collaborative applications using Socket.IO and WebRTC.",
      "Passionate about combining artificial intelligence, high-performance backend systems, and luxury motion design."
    ],
    metrics: [
      { label: "CGPA", value: "8.75 / 10.0" },
      { label: "SIH Honor", value: "National Finalist" },
      { label: "Public Repos", value: "12+ GitHub" }
    ],
    tags: ["AI Engineer", "Full-Stack", "WebRTC", "Three.js", "SIH '25 Finalist"],
    links: [
      { label: "GitHub Profile", url: "https://github.com/kausikhussain", icon: "github" },
      { label: "LinkedIn Profile", url: "https://linkedin.com/in/kausikhussain", icon: "linkedin" }
    ],
    relatedQuestions: [
      "Tell me about SIH 2025",
      "Show college details",
      "View top projects",
      "What is your tech stack?"
    ]
  },

  // 2. Education — College
  {
    id: "college",
    keys: ["college", "university", "silicon", "silicon institute", "btech", "b.tech", "cgpa", "degree", "education"],
    title: "B.Tech Computer Science & Engineering — Silicon Institute of Technology",
    category: "education",
    summary: "Currently pursuing B.Tech CSE (2022–2026) with an outstanding CGPA of 8.75/10.0.",
    details: [
      "Institution: Silicon Institute of Technology, Bhubaneswar, Odisha, India.",
      "Department: Computer Science & Engineering (CSE).",
      "Academic Record: 8.75 CGPA maintained across 6 consecutive semesters.",
      "Core Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Machine Learning, Web Technologies."
    ],
    metrics: [
      { label: "Degree", value: "B.Tech CSE" },
      { label: "CGPA", value: "8.75 / 10.0" },
      { label: "Period", value: "2022 – 2026" }
    ],
    tags: ["Computer Science", "B.Tech", "8.75 CGPA", "Algorithms"],
    relatedQuestions: [
      "Show 12th details",
      "Show 10th details",
      "Tell me about SIH 2025",
      "What projects did you build?"
    ]
  },

  // 3. Education — 12th & 10th
  {
    id: "schooling",
    keys: ["12th", "10th", "school", "schooling", "higher secondary", "matriculation", "board", "marks"],
    title: "Academic Schooling Background (10th & 12th)",
    category: "education",
    summary: "Strong mathematical and scientific foundation with high distinction in Higher Secondary and High School Board Examinations.",
    details: [
      "Higher Secondary (12th Grade): Passed with 88.4% distinction in Physics, Chemistry, and Mathematics (PCM).",
      "High School (10th Grade): Passed with 91.2% distinction in High School Board Examination.",
      "Extracurriculars: Active leadership in science exhibitions, coding clubs, and sports tournaments."
    ],
    metrics: [
      { label: "12th Marks", value: "88.4% PCM" },
      { label: "10th Marks", value: "91.2% Distinction" }
    ],
    tags: ["High Distinction", "PCM", "Mathematics", "Science"],
    relatedQuestions: [
      "Show college CGPA",
      "Tell me about SIH 2025",
      "What are your top skills?"
    ]
  },

  // 4. Hackathons — SIH 2025
  {
    id: "sih",
    keys: ["sih", "sih 2025", "smart india hackathon", "sih finalist", "national finalist", "hackathon"],
    title: "Smart India Hackathon (SIH) 2025 National Finalist",
    category: "hackathon",
    summary: "Selected as National Finalist in Smart India Hackathon 2025 organized by the Ministry of Education, Government of India.",
    details: [
      "Project: JanSehat — Offline-First Telemedicine & AI Diagnostic Platform.",
      "Problem Addressed: Lack of healthcare access in remote rural areas with poor 2G/3G connectivity.",
      "Technical Achievement: Built WebRTC dynamic bitrate resolution scaling and local IndexedDB offline storage synchronization.",
      "Impact: Selected among thousands of engineering teams nationwide after multi-stage evaluations."
    ],
    metrics: [
      { label: "Honor", value: "National Finalist" },
      { label: "Event", value: "SIH 2025" },
      { label: "Ministry", value: "Govt of India" }
    ],
    tags: ["SIH 2025", "Telemedicine", "WebRTC", "Offline AI"],
    links: [
      { label: "JanSehat Live Demo", url: "https://jansehat-telemedicine.vercel.app", icon: "demo" },
      { label: "GitHub Repo", url: "https://github.com/kausikhussain/jansehat", icon: "github" }
    ],
    relatedQuestions: [
      "Tell me about JanSehat",
      "IIT Bhubaneswar Hackathon",
      "Show all projects"
    ]
  },

  // 5. Hackathons — IIT Bhubaneswar
  {
    id: "iit",
    keys: ["iit", "iit bhubaneswar", "iit hackathon", "edunexus", "edunexus iit"],
    title: "IIT Bhubaneswar Hackathon 2025 — EduNexus Platform",
    category: "hackathon",
    summary: "Architected EduNexus for the prestigious IIT Bhubaneswar Hackathon 2025.",
    details: [
      "Project Name: EduNexus — Multi-Tenant Educational Collaboration Engine.",
      "Features: Real-time collaborative whiteboard, automated AI quiz generation, and peer-to-peer WebRTC video rooms.",
      "Tech Stack: Next.js 14, Socket.IO, Redis, Canvas API, WebRTC."
    ],
    metrics: [
      { label: "Venue", value: "IIT Bhubaneswar" },
      { label: "Project", value: "EduNexus" }
    ],
    tags: ["IIT Bhubaneswar", "EduNexus", "Real-Time Sync", "Canvas API"],
    relatedQuestions: [
      "Tell me about SIH 2025",
      "Tell me about TripSync",
      "Show all projects"
    ]
  },

  // 6. Project — JanSehat
  {
    id: "jansehat",
    keys: ["jansehat", "janseht", "janshet", "telemedicine", "medical ai", "healthcare"],
    title: "JanSehat — Offline-First AI Telemedicine Platform",
    category: "project",
    summary: "SIH 2025 National Finalist Telemedicine platform designed for low-bandwidth rural healthcare consultation.",
    details: [
      "Dynamic WebRTC resolution throttling based on packet loss on 2G/3G networks.",
      "Real-time AI symptom extraction and automated multi-lingual prescription generation.",
      "IndexedDB offline patient record caching with automatic background WebSocket reconciliation."
    ],
    metrics: [
      { label: "Stage", value: "SIH '25 Finalist" },
      { label: "Network", value: "2G/3G Optimized" }
    ],
    tags: ["WebRTC", "PyTorch AI", "IndexedDB", "Node.js"],
    links: [
      { label: "Live Product Demo", url: "https://jansehat-telemedicine.vercel.app", icon: "demo" },
      { label: "GitHub Code", url: "https://github.com/kausikhussain/jansehat", icon: "github" }
    ],
    relatedQuestions: [
      "Tell me about TripSync",
      "Tell me about Victus",
      "What is your AI stack?"
    ]
  },

  // 7. Project — TripSync
  {
    id: "tripsync",
    keys: ["tripsync", "trip sync", "travel app", "socket.io", "realtime", "sync engine"],
    title: "TripSync — Sub-200ms Collaborative Itinerary Mesh",
    category: "project",
    summary: "Multi-user collaborative travel planner with sub-200ms WebSocket state synchronization.",
    details: [
      "Room-isolated Socket.IO WebSocket rooms managing concurrent state mutation.",
      "Optimistic UI rendering in under 10ms with automatic conflict resolution.",
      "Built with Node.js, Express, Socket.IO, Redis, and React."
    ],
    metrics: [
      { label: "Latency", value: "< 200ms" },
      { label: "Local Render", value: "< 10ms" }
    ],
    tags: ["Socket.IO", "Redis", "Node.js", "React"],
    links: [
      { label: "Live Demo", url: "https://tripsync-travel.vercel.app", icon: "demo" },
      { label: "GitHub Repo", url: "https://github.com/kausikhussain/tripsync", icon: "github" }
    ],
    relatedQuestions: [
      "Tell me about JanSehat",
      "Tell me about Victus",
      "Show backend skills"
    ]
  },

  // 8. Project — Victus
  {
    id: "victus",
    keys: ["victus", "victu", "fitness app", "workout analytics", "nutrition"],
    title: "Victus — Full-Stack Workout & Nutrition Analytics Engine",
    category: "project",
    summary: "Health analytics system calculating daily caloric burn, macro distribution, and workout volume.",
    details: [
      "Chart.js visualization engine rendering 30-day strength and volume progression.",
      "MongoDB indexed query optimization for high-throughput daily log aggregation.",
      "Built with React, Node.js, Express, MongoDB, and Chart.js."
    ],
    metrics: [
      { label: "Visuals", value: "Chart.js 30-Day" },
      { label: "DB", value: "MongoDB Indexed" }
    ],
    tags: ["Chart.js", "MongoDB", "Express", "React"],
    relatedQuestions: [
      "Tell me about fitness",
      "Show all projects",
      "Tell me about JanSehat"
    ]
  },

  // 9. Project — Uber Clone
  {
    id: "uber",
    keys: ["uber", "uber clone", "ride sharing", "cab booking", "maps"],
    title: "Uber Clone — Real-Time Ride Booking & Dispatch System",
    category: "project",
    summary: "Full-stack ride sharing platform with real-time driver tracking and dynamic route computation.",
    details: [
      "Leaflet & Google Maps API integration for live driver vehicle tracking.",
      "Socket.IO location broadcasting with automatic ETA recalculation.",
      "Built with React, Node.js, Express, MongoDB, Socket.IO."
    ],
    metrics: [
      { label: "Feature", value: "Live Tracking" },
      { label: "Maps", value: "Leaflet API" }
    ],
    tags: ["Leaflet Maps", "Socket.IO", "Node.js", "React"],
    relatedQuestions: [
      "Show all projects",
      "Tell me about TripSync",
      "Show frontend skills"
    ]
  },

  // 10. Skills — AI & ML
  {
    id: "ai_skills",
    keys: ["ai", "machine learning", "ml", "pytorch", "python", "nlp", "computer vision"],
    title: "Artificial Intelligence & Machine Learning Expertise",
    category: "skills",
    summary: "Experience building PyTorch deep learning models, NLP sentiment extraction, and medical AI pipelines.",
    details: [
      "Frameworks & Tools: PyTorch, Python, NumPy, Pandas, Scikit-Learn, OpenCV.",
      "Domain Focus: Multi-lingual AI speech transcription, symptom classification, offline model quantization.",
      "Applied Projects: JanSehat SIH '25 AI diagnostic engine."
    ],
    metrics: [
      { label: "Primary ML", value: "PyTorch" },
      { label: "Language", value: "Python 3.11" }
    ],
    tags: ["PyTorch", "Python", "NLP", "Scikit-Learn"],
    relatedQuestions: [
      "Show frontend skills",
      "Show backend skills",
      "Tell me about JanSehat"
    ]
  },

  // 11. Skills — Frontend
  {
    id: "frontend_skills",
    keys: ["frontend", "react", "nextjs", "next.js", "three.js", "threejs", "tailwind", "framer motion", "ui"],
    title: "Frontend Architecture & 3D Web Engineering",
    category: "skills",
    summary: "Crafting luxury, high-performance web applications using React, Next.js 16, Three.js, and Framer Motion.",
    details: [
      "Technologies: React 19, Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Three.js / React Three Fiber, Framer Motion.",
      "Specialties: 60 FPS WebGL shader scenes, glassmorphism UI tokens, layoutId animation physics, Web Audio API sound engines."
    ],
    metrics: [
      { label: "Framework", value: "Next.js 16" },
      { label: "Graphics", value: "Three.js / WebGL" }
    ],
    tags: ["React", "Next.js 16", "Three.js", "Tailwind v4", "Framer Motion"],
    relatedQuestions: [
      "Show backend skills",
      "Show AI skills",
      "View top projects"
    ]
  },

  // 12. Skills — Backend
  {
    id: "backend_skills",
    keys: ["backend", "node", "nodejs", "express", "socket.io", "webrtc", "redis", "mongodb", "database"],
    title: "Backend Engineering & Real-Time Microservices",
    category: "skills",
    summary: "Architecting scalable Node.js microservices, WebSocket room meshes, and database query optimization.",
    details: [
      "Core Technologies: Node.js, Express, Socket.IO, WebRTC, Redis, MongoDB, PostgreSQL, REST APIs.",
      "Architecture Focus: Sub-200ms state reconciliation, optimistic UI synchronization, secure JWT auth, IndexedDB caching."
    ],
    metrics: [
      { label: "Runtime", value: "Node.js" },
      { label: "Sockets", value: "Socket.IO / WebRTC" }
    ],
    tags: ["Node.js", "Socket.IO", "WebRTC", "MongoDB", "Redis"],
    relatedQuestions: [
      "Show frontend skills",
      "Tell me about TripSync",
      "Tell me about JanSehat"
    ]
  },

  // 13. Fitness Journey
  {
    id: "fitness",
    keys: ["fitness", "gym", "workout", "health", "lifestyle", "routine"],
    title: "Fitness & Strength Discipline",
    category: "fitness",
    summary: "Passionate about strength training, progressive overload, and physical discipline alongside software engineering.",
    details: [
      "Philosophy: The same discipline required to hit gym targets fuels continuous software craftsmanship.",
      "Routine: 5-day strength split focusing on progressive overload and macro tracking.",
      "Inspiration for Victus: Built the Victus Workout Analytics app to track personal strength logs and caloric macros."
    ],
    metrics: [
      { label: "Split", value: "5-Day Strength" },
      { label: "Built App", value: "Victus Engine" }
    ],
    tags: ["Strength Training", "Discipline", "Victus App"],
    relatedQuestions: [
      "Tell me about Victus",
      "Show personal bio",
      "What are your career goals?"
    ]
  },

  // 14. Family Business Contribution
  {
    id: "family_business",
    keys: ["family business", "business", "cement", "father", "store", "contribution"],
    title: "Family Cement & Construction Business Contribution",
    category: "business",
    summary: "Active contributor to managing and modernizing my father's cement and building material enterprise.",
    details: [
      "Involvement: Digitized inventory logging, client invoice management, and regional vendor logistics.",
      "Impact: Applied software engineering and database automation to streamline real-world business operations."
    ],
    metrics: [
      { label: "Domain", value: "Construction Supplies" },
      { label: "Contribution", value: "Inventory Automation" }
    ],
    tags: ["Family Enterprise", "Operations", "Inventory Automation"],
    relatedQuestions: [
      "Show personal bio",
      "Show college CGPA",
      "What are your career goals?"
    ]
  },

  // 15. Contact & Socials
  {
    id: "contact",
    keys: ["contact", "email", "github", "linkedin", "hire", "resume", "social"],
    title: "Direct Contact & Professional Networks",
    category: "contact",
    summary: "Open to high-impact AI Engineering, Full-Stack Architecture, and Frontend roles worldwide.",
    details: [
      "Email: kausikhussain.work@gmail.com",
      "GitHub: https://github.com/kausikhussain",
      "LinkedIn: Sk Kausik Hussain",
      "Location: Bhubaneswar, Odisha, India (Open to Remote & On-site relocation)"
    ],
    metrics: [
      { label: "Status", value: "Open for Roles" },
      { label: "Location", value: "Bhubaneswar, IN" }
    ],
    tags: ["Email", "GitHub", "LinkedIn", "Resume"],
    links: [
      { label: "GitHub Profile", url: "https://github.com/kausikhussain", icon: "github" },
      { label: "LinkedIn Profile", url: "https://linkedin.com/in/kausikhussain", icon: "linkedin" }
    ],
    relatedQuestions: [
      "Download Resume PDF",
      "Show all projects",
      "Tell me about SIH 2025"
    ]
  }
];
