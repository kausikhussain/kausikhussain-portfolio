export interface Project {
  id: string;
  title: string;
  category: string;
  desc: string;
  metric: string;
  period: string;
  featured: boolean;
  hero: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  tags: string[];
  github: string;
  demo: string | null;
  casestudy: {
    problem: string;
    approach: string;
    challenges: string[];
    outcome: string;
    lessons: string;
  };
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: { name: string; level: number; highlight?: boolean; tags: string[] }[];
}

export interface ToolkitGroup {
  id: string;
  title: string;
  iconSymbol: string;
  items: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  bullets: string[];
  tags: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  readTime: string;
  summary: string;
  tags: string[];
  status: "coming_soon" | "published";
}

export interface AIResearchTopic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  codeSnippet?: string;
  metrics: { label: string; value: string }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Sk Kausik Hussain",
    shortName: "Kausik",
    role: "AI & Full-Stack Engineer | SIH 2025 Finalist",
    headlines: [
      "Building Intelligent Digital Experiences.",
      "AI × Design × Engineering.",
      "Creating the Next Generation of Web Experiences.",
      "Architecting Interactive 3D & Real-Time Systems."
    ],
    tagline: "B.Tech Computer Science Student @ Silicon Institute of Technology | Smart India Hackathon 2025 Finalist",
    location: "Odisha, India",
    availability: "Open for High-Impact AI, Full-Stack & Frontend Engineering Roles",
    bio: [
      "I am an AI & Machine Learning enthusiast, Full-Stack Architect, and 3D Frontend Engineer passionate about building fluid, intelligent, and real-time digital platforms.",
      "As a Smart India Hackathon (SIH) 2025 Finalist, I built JanSehat—an AI-powered telemedicine platform designed for low-bandwidth healthcare delivery. My engineering spans real-time WebRTC/Socket.IO architectures, Next.js/TypeScript applications, and AI symptom diagnostic models.",
      "I operate on the philosophy of solving real-world challenges through clean architecture, high FPS performance, intuitive motion design, and a modern aesthetic inspired by Apple, Vercel, and Linear."
    ],
    resumeUrl: "/assets/Kausik-Resume.pdf",
    contact: {
      email: "kausik1027@gmail.com",
      github: "https://github.com/kausikhussain",
      linkedin: "https://linkedin.com/in/skkausik",
      location: "Odisha, India"
    }
  },

  stats: [
    { num: "SIH '25", label: "Hackathon Finalist" },
    { num: "8.75", label: "B.Tech CGPA" },
    { num: "8+", label: "Real Products Built" },
    { num: "sub-200ms", label: "Real-Time Sync Speed" }
  ],

  currentlyExploring: [
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "LLMs",
    "RAG",
    "AI Agents",
    "Next.js 14",
    "Three.js",
    "GSAP",
    "Framer Motion",
    "Spring Boot",
    "Cloud Computing",
    "Docker",
    "Kubernetes"
  ],

  currentlyBuilding: {
    title: "JanSehat — AI-Powered Telemedicine Platform",
    status: "in-progress",
    statusLabel: "SIH '25 FINALIST",
    desc: "A multilingual telemedicine PWA built for low-bandwidth (2G/3G) consultation with an integrated AI symptom checker, medical summarization, and WebRTC video fallback.",
    tags: ["Next.js", "AI / ML", "WebRTC", "Socket.IO", "Node.js", "Tailwind CSS"],
    sinceMonth: "SIH 2025 Project"
  },

  toolkitGroups: [
    {
      id: "programming",
      title: "PROGRAMMING",
      iconSymbol: "{ }",
      items: ["Java", "Python", "C", "C++", "JavaScript", "TypeScript"]
    },
    {
      id: "frontend",
      title: "FRONTEND & 3D",
      iconSymbol: "⬡",
      items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Framer Motion", "Three.js", "HTML5", "CSS3"]
    },
    {
      id: "backend",
      title: "BACKEND & APIS",
      iconSymbol: "⚙",
      items: ["Node.js", "Express.js", "Spring Boot", "REST APIs", "JWT", "Socket.IO", "WebRTC"]
    },
    {
      id: "database",
      title: "DATABASES",
      iconSymbol: "◈",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis"]
    },
    {
      id: "aiml",
      title: "AI / ML & DATA",
      iconSymbol: "🧠",
      items: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "Pandas", "NumPy", "LangChain", "LLMs", "RAG"]
    },
    {
      id: "tools",
      title: "DEV TOOLS",
      iconSymbol: "☁",
      items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "VS Code", "Linux"]
    }
  ] as ToolkitGroup[],

  blogs: [
    {
      id: "3d-web-experiences",
      title: "Building Award-Winning 3D Web Experiences with Three.js & React Three Fiber",
      readTime: "8 min read",
      summary: "Exploring GLSL shaders, vertex displacement, GPU-accelerated particle physics, and frame rate optimization in modern Next.js 14 applications.",
      tags: ["Three.js", "WebGL", "Next.js"],
      status: "coming_soon"
    },
    {
      id: "jansehat-sih-2025",
      title: "Architecting JanSehat: Low-Bandwidth AI Telemedicine for SIH 2025",
      readTime: "10 min read",
      summary: "How we engineered an offline-first PWA with WebRTC media fallback, IndexedDB sync, and AI symptom extraction for 2G/3G rural healthcare.",
      tags: ["SIH 2025", "WebRTC", "AI Telemedicine"],
      status: "coming_soon"
    },
    {
      id: "sub-200ms-sync",
      title: "Sub-200ms Real-Time Synchronization with Socket.IO & Next.js",
      readTime: "6 min read",
      summary: "A deep dive into building collaborative multi-user applications like TripSync using Socket.IO room namespaces and optimistic React UI updates.",
      tags: ["Socket.IO", "Real-Time", "Node.js"],
      status: "coming_soon"
    }
  ] as BlogPost[],

  aiResearch: [
    {
      id: "jansehat-ai",
      title: "JanSehat AI Telemedicine Engine",
      subtitle: "Smart India Hackathon 2025 Finalist Innovation",
      description: "Architected a low-bandwidth AI symptom extraction engine coupled with WebRTC video fallback for rural patient consultations under 2G/3G network constraints.",
      tags: ["SIH 2025 Finalist", "AI Telemedicine", "WebRTC"],
      metrics: [
        { label: "SIH 2025", value: "Finalist" },
        { label: "Sync Speed", value: "<200ms" }
      ],
      codeSnippet: `const peer = new WebRTC.Peer({ initiator: isDoctor, trickle: false });
peer.on('signal', data => socket.emit('signal', { room, data }));`
    },
    {
      id: "tripsync-realtime",
      title: "TripSync Real-Time WebSocket Mesh",
      subtitle: "Multi-User Collaborative Synchronization",
      description: "Engineered sub-200ms event broadcasting across collaborative travel checklists using Socket.IO room namespaces and optimistic React state reconciliation.",
      tags: ["Socket.IO", "Real-Time Sync", "Next.js"],
      metrics: [
        { label: "Latency", value: "<150ms" },
        { label: "Sync Fidelity", value: "100%" }
      ],
      codeSnippet: `io.on('connection', (socket) => {
  socket.on('checklist:update', (data) => {
    socket.to(data.roomId).emit('checklist:sync', data);
  });
});`
    },
    {
      id: "neural-3d-sk",
      title: "WebGL 3D Interactive Canvas",
      subtitle: "GPU-Accelerated Web Experiences",
      description: "Building immersive 3D web spaces with Three.js GLSL shaders, reactive particle fields, and smooth camera physics for futuristic brand experiences.",
      tags: ["Three.js", "WebGL", "Framer Motion"],
      metrics: [
        { label: "FPS Target", value: "60 FPS" },
        { label: "3D Geometry", value: "Custom Mesh" }
      ],
      codeSnippet: `useFrame((state, delta) => {
  meshRef.current.rotation.x += delta * 0.3;
  meshRef.current.rotation.y += delta * 0.4;
});`
    }
  ] as AIResearchTopic[],

  projects: [
    {
      id: "jansehat",
      title: "JanSehat — AI Telemedicine Platform",
      category: "AI & Full-Stack",
      desc: "SIH 2025 Finalist project. A multilingual telemedicine PWA built for low-bandwidth (2G/3G) consultation with AI symptom checker, medical summarization, and WebRTC video fallback.",
      metric: "SIH 2025 Finalist & Low-Bandwidth AI",
      period: "2025 — Active",
      featured: true,
      hero: true,
      status: "completed",
      tags: ["React.js", "Next.js", "AI / ML", "WebRTC", "Socket.IO", "Node.js", "Tailwind CSS"],
      github: "https://github.com/kausikhussain/Jansehat",
      demo: "https://jansehat.vercel.app",
      casestudy: {
        problem: "Rural healthcare suffers from poor connectivity (2G/3G) and fragmented medical record access, preventing remote doctor consultations.",
        approach: "Built an offline-first PWA with WebRTC video calling, automated AI symptom extraction, and pharmacy inventory triage.",
        challenges: [
          "Optimizing WebRTC media bitrates for stable 2G/3G network conditions",
          "Implementing offline-first IndexedDB record synchronization upon reconnection",
          "Integrating AI medical summarization models into lightweight REST endpoints"
        ],
        outcome: "Smart India Hackathon 2025 Finalist selection with instant low-bandwidth consultation triage.",
        lessons: "Designing for weak network conditions requires strict offline-first data synchronization and resilient media fallbacks."
      }
    },
    {
      id: "tripsync",
      title: "TripSync — Real-Time Travel Platform",
      category: "Full-Stack & Real-Time",
      desc: "Real-time collaborative travel checklist platform enabling multi-user synchronization with Socket.IO, invite sharing, and sub-200ms real-time state updates.",
      metric: "Sub-200ms Real-Time Sync",
      period: "2025 — Active",
      featured: true,
      hero: true,
      status: "completed",
      tags: ["Next.js", "Node.js", "Socket.IO", "MongoDB", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/kausikhussain/TripSync",
      demo: "https://tripsync-demo.vercel.app",
      casestudy: {
        problem: "Group travel planning across multiple apps causes disjointed itineraries and out-of-sync travel checklists.",
        approach: "Engineered a Socket.IO event mesh backing a Next.js client with optimistic UI updates and token-based room sharing.",
        challenges: [
          "Resolving concurrent multi-user state conflicts on shared travel lists",
          "Maintaining sub-200ms event delivery across WebSocket connections"
        ],
        outcome: "Seamless collaborative travel planning platform with zero latency lag.",
        lessons: "Optimistic UI state updates combined with WebSocket synchronization deliver ultra-smooth collaborative UX."
      }
    },
    {
      id: "victus",
      title: "Victus — Dynamic Fitness & Health Engine",
      category: "Full-Stack & Web Analytics",
      desc: "High-performance fitness tracking platform with interactive workout logs, real-time analytics charts, and personalized nutrition recommendations.",
      metric: "Interactive Analytics & Workout Engine",
      period: "2025",
      featured: true,
      hero: true,
      status: "completed",
      tags: ["Next.js", "TypeScript", "React", "Node.js", "Tailwind CSS", "Chart.js"],
      github: "https://github.com/kausikhussain/Victus",
      demo: "https://victus-fitness.vercel.app",
      casestudy: {
        problem: "Standard fitness logs lack dynamic charts and responsive visual progress feedback.",
        approach: "Designed a dark glassmorphic interface with interactive exercise charts and personalized calorie scoring.",
        challenges: ["Structuring dynamic daily log data models in MongoDB"],
        outcome: "Fully responsive fitness dashboard with intuitive visual progress tracking.",
        lessons: "Visual chart feedback significantly boosts user consistency."
      }
    },
    {
      id: "uber-clone",
      title: "Uber Clone — Ride Booking System",
      category: "Full-Stack Systems",
      desc: "Full-stack ride-hailing system with real-time trip lifecycle, location tracking, fare estimation, and Node.js/Express API architecture.",
      metric: "Real-Time Trip Lifecycle & Tracking",
      period: "2025",
      featured: true,
      hero: false,
      status: "completed",
      tags: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Geolocation"],
      github: "https://github.com/kausikhussain/Uber-Clone",
      demo: null,
      casestudy: {
        problem: "Simulating real-world ride dispatch and tracking requires stateful driver-passenger matching logic.",
        approach: "Built stateful trip lifecycle APIs handling request, accept, location updates, and trip completion.",
        challenges: ["Designing location tracking math and state transitions"],
        outcome: "Scalable ride booking API service mimicking enterprise dispatch systems.",
        lessons: "State machine patterns simplify complex multi-party lifecycle workflows."
      }
    },
    {
      id: "elearning",
      title: "EduNexus — IIT Bhubaneswar Hackathon 2025",
      category: "Full-Stack & AI",
      desc: "Responsive e-learning platform developed during IIT Bhubaneswar Hackathon 2025 featuring course registration, modular quiz engine, and interactive content.",
      metric: "IIT Bhubaneswar Hackathon 2025",
      period: "2025",
      featured: true,
      hero: false,
      status: "completed",
      tags: ["JavaScript", "HTML5", "CSS3", "Node.js", "MongoDB"],
      github: "https://github.com/kausik1314/E-learning-platform",
      demo: null,
      casestudy: {
        problem: "Students need streamlined course registration and interactive quizzes without clutter.",
        approach: "Built modular course management system with automated quiz scoring and clean navigation.",
        challenges: ["Delivering complete hackathon product within 24-hour hackathon time limits"],
        outcome: "Shipped fully functional e-learning platform at IIT Bhubaneswar Hackathon 2025.",
        lessons: "Focused MVP scoping is vital for hackathon success."
      }
    },
    {
      id: "zamzam",
      title: "Zam-Zam Booking Platform",
      category: "Web Application",
      desc: "Real-world booking and reservation platform with interactive scheduling, customer reservation management, and clean user interface.",
      metric: "Real-World Reservation System",
      period: "2025",
      featured: false,
      hero: false,
      status: "completed",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/kausikhussain/ZamZam-Booking",
      demo: null,
      casestudy: {
        problem: "Local businesses require streamlined booking systems to prevent double-booking.",
        approach: "Designed conflict-free reservation scheduling backend with real-time UI slot highlights.",
        challenges: ["Handling concurrent booking slot requests"],
        outcome: "Deployed reservation platform preventing schedule collisions.",
        lessons: "Atomic reservation checks guarantee booking integrity."
      }
    }
  ] as Project[],

  skillCategories: [
    {
      category: "AI & Machine Learning",
      icon: "Brain",
      description: "Deep learning models, predictive pipelines, computer vision, and LLM applications",
      skills: [
        { name: "Python", level: 92, highlight: true, tags: ["AI", "Core"] },
        { name: "NumPy & Pandas", level: 94, highlight: true, tags: ["Data"] },
        { name: "Machine Learning Ensembles", level: 88, highlight: true, tags: ["ML"] },
        { name: "LLM Applications & Prompt Engineering", level: 90, highlight: true, tags: ["AI", "RAG"] },
        { name: "Matplotlib & Data Visualization", level: 86, highlight: false, tags: ["Analytics"] }
      ]
    },
    {
      category: "3D & Frontend Engineering",
      icon: "Sparkles",
      description: "Awwwards-grade web interfaces, Three.js 3D scenes, Framer Motion, and GSAP animations",
      skills: [
        { name: "React.js & Next.js 14", level: 96, highlight: true, tags: ["Frontend", "SSR"] },
        { name: "TypeScript & JavaScript (ES6+)", level: 95, highlight: true, tags: ["Core"] },
        { name: "Three.js / React Three Fiber", level: 90, highlight: true, tags: ["3D", "WebGL"] },
        { name: "Tailwind CSS & UI/UX Design", level: 98, highlight: true, tags: ["Styling"] },
        { name: "Framer Motion & GSAP", level: 92, highlight: true, tags: ["Animations"] }
      ]
    },
    {
      category: "Backend & Systems Architecture",
      icon: "Server",
      description: "Scalable backend microservices, real-time Socket.IO, WebRTC, and Spring Boot APIs",
      skills: [
        { name: "Node.js & Express.js", level: 94, highlight: true, tags: ["Backend"] },
        { name: "Java & Spring Boot", level: 88, highlight: true, tags: ["Backend"] },
        { name: "Socket.IO & WebRTC", level: 92, highlight: true, tags: ["Real-Time"] },
        { name: "REST APIs & JWT Auth", level: 96, highlight: true, tags: ["API"] },
        { name: "C & C++", level: 85, highlight: false, tags: ["Core"] }
      ]
    },
    {
      category: "Databases & Tools",
      icon: "Cloud",
      description: "NoSQL & SQL databases, version control, and cloud deployment tools",
      skills: [
        { name: "MongoDB", level: 94, highlight: true, tags: ["NoSQL"] },
        { name: "PostgreSQL & MySQL", level: 90, highlight: true, tags: ["SQL"] },
        { name: "Git & GitHub Automation", level: 95, highlight: true, tags: ["Version Control"] },
        { name: "Jupyter Notebook & VS Code", level: 96, highlight: false, tags: ["Tools"] }
      ]
    }
  ] as SkillCategory[],

  experiences: [
    {
      id: "sih-2025",
      role: "Smart India Hackathon 2025 Finalist",
      company: "JanSehat AI Telemedicine Platform",
      location: "India",
      period: "2025",
      duration: "National Finalist",
      bullets: [
        "Selected as National Finalist at Smart India Hackathon (SIH) 2025 for building JanSehat",
        "Engineered AI-powered symptom checker and medical record summarization pipeline",
        "Implemented low-bandwidth WebRTC video consultation with automatic 2G/3G network fallback",
        "Built emergency pharmacy stock tracking and triage notification workflows"
      ],
      tags: ["SIH 2025 Finalist", "AI Telemedicine", "WebRTC", "Next.js", "PWA"]
    },
    {
      id: "iit-hackathon-2025",
      role: "IIT Bhubaneswar Hackathon 2025 Developer",
      company: "IIT Bhubaneswar",
      location: "Bhubaneswar, IN",
      period: "2025",
      duration: "Hackathon Project",
      bullets: [
        "Designed and shipped a full-stack E-Learning platform during 24-hour IIT Bhubaneswar Hackathon 2025",
        "Built responsive course registration UI, interactive quiz engine, and modular navigation",
        "Integrated dynamic scoring algorithms with instant feedback cards"
      ],
      tags: ["IIT Bhubaneswar", "Full-Stack", "Hackathon", "JavaScript", "HTML/CSS"]
    }
  ] as Experience[],

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      school: "Silicon Institute of Technology",
      location: "Bhubaneswar / Sambalpur, Odisha",
      period: "2023–2027",
      grade: "CGPA: 8.75",
      highlight: "Specializing in AI/ML, Full-Stack Architecture & 3D Web Systems"
    },
    {
      degree: "Higher Secondary (Class XII)",
      school: "Apex Senior Secondary School",
      location: "Odisha",
      period: "2023",
      grade: "Score: 67%",
      highlight: "Physics, Chemistry & Mathematics Focus"
    },
    {
      degree: "Secondary (Class X)",
      school: "Gurukul Public School",
      location: "Odisha",
      period: "2021",
      grade: "Score: 81%",
      highlight: "Secondary Education Distinction"
    }
  ],

  certifications: [
    { name: "Python for Data Science", issuer: "Coursera", date: "Nov 2024" },
    { name: "Introduction to Big Data", issuer: "Coursera", date: "Jan 2025" },
    { name: "IT Fundamentals & Cybersecurity", issuer: "Industry Certification", date: "Mar 2025" }
  ]
};
