export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface ProjectArchitecture {
  frontend: string[];
  backend: string[];
  database: string[];
  protocols: string[];
}

export interface DeepProjectCaseStudy {
  id: string;
  keys: string[];
  title: string;
  subtitle: string;
  category: string;
  metric: string;
  period: string;
  motivation: string;
  problem: string;
  targetUsers: string;
  features: string[];
  architecture: ProjectArchitecture;
  engineeringDecisions: string[];
  challengesAndSolutions: ChallengeSolution[];
  learnings: string[];
  futureRoadmap: string[];
  github: string;
  demo: string | null;
  relatedQuestions: string[];
}

export const PROJECT_CASE_STUDIES: DeepProjectCaseStudy[] = [
  {
    id: "jansehat",
    keys: ["jansehat", "janseht", "janshet", "telemedicine", "medical ai", "healthcare", "sih telemedicine", "offline healthcare", "doctor app"],
    title: "JanSehat — Offline-First AI Telemedicine Platform",
    subtitle: "Smart India Hackathon (SIH) 2025 National Finalist Innovation",
    category: "AI & Full-Stack Systems",
    metric: "SIH '25 Finalist • 2G/3G Bandwidth Throttling",
    period: "2024 – 2025",
    motivation: "Over 65% of rural Indian populations lack access to immediate medical specialists due to poor cellular connectivity and severe doctor shortages.",
    problem: "Existing telemedicine platforms crash on low-bandwidth 2G/3G networks, requiring stable high-speed broadband which is non-existent in remote healthcare centers.",
    targetUsers: "Rural patients, community health workers (ASHAs), and remote consultation doctors.",
    features: [
      "Dynamic WebRTC adaptive bitrate resolution scaling during cellular packet loss.",
      "PyTorch multi-lingual AI symptom extraction and automated prescription generation.",
      "IndexedDB offline patient health record caching with background WebSocket reconciliation.",
      "Encryption and role-based access control for medical compliance."
    ],
    architecture: {
      frontend: ["React 19", "Next.js 16", "Tailwind CSS v4", "IndexedDB Cache"],
      backend: ["Node.js", "Express", "WebRTC Peer Connections", "PyTorch AI Pipeline"],
      database: ["MongoDB Atlas", "Redis Session Cache"],
      protocols: ["WebSockets (Socket.IO)", "WebRTC Data Channels", "HTTPS/TLS"]
    },
    engineeringDecisions: [
      "Decoupled video stream resolution from audio channels so consultations degrade gracefully to audio-only on 2G connections rather than dropping calls.",
      "Implemented client-side PyTorch quantized ONNX model execution for initial offline symptom triage."
    ],
    challengesAndSolutions: [
      {
        challenge: "WebRTC peer connection dropouts when transitioning between 3G towers in remote rural ambulances.",
        solution: "Engineered an automatic ICE candidate renegotiation wrapper that buffers ongoing audio chunks locally before re-establishing media tracks in <300ms."
      },
      {
        challenge: "Offline patient record sync conflicts when multiple health workers edit records simultaneously.",
        solution: "Implemented Conflict-Free Replicated Data Types (CRDTs) using timestamp vector clocks to resolve offline record merges automatically."
      }
    ],
    learnings: [
      "Building for low-connectivity environments requires an offline-first mindset where local storage is the primary source of truth, not the cloud database.",
      "Graceful degradation (audio-only fallback) delivers a far superior user experience than attempting to force HD video streams."
    ],
    futureRoadmap: [
      "Deploy quantized edge LLM diagnostic triage directly onto Android mobile devices.",
      "Integrate IoT bluetooth pulse oximeter & ECG hardware streaming."
    ],
    github: "https://github.com/kausikhussain/jansehat",
    demo: "https://jansehat-telemedicine.vercel.app",
    relatedQuestions: [
      "How does JanSehat offline mode work?",
      "What technologies were used in JanSehat?",
      "What was the biggest challenge in JanSehat?",
      "Tell me about SIH 2025"
    ]
  },

  {
    id: "tripsync",
    keys: ["tripsync", "trip sync", "travel app", "collaborative travel", "sub-200ms", "sync engine", "socket.io app"],
    title: "TripSync — Sub-200ms Collaborative Itinerary Mesh",
    subtitle: "Real-Time Multi-User Travel Coordination Platform",
    category: "Full-Stack & Real-Time Systems",
    metric: "sub-200ms Reconciliation • < 10ms Local Render",
    period: "2024",
    motivation: "Coordinating group travel itineraries via chat apps leads to fragmented decisions, duplicate bookings, and conflicting schedule edits.",
    problem: "Traditional travel web apps require constant manual page refreshes, causing user state collisions when multiple friends edit a trip concurrently.",
    targetUsers: "Group travelers, event organizers, and collaborative trip planners.",
    features: [
      "Room-isolated Socket.IO WebSocket channels managing live concurrent edit sessions.",
      "Optimistic UI local rendering delivering sub-10ms instantaneous feedback.",
      "Interactive map pin clustering and joint expense splitting breakdown.",
      "Redis pub-sub message broadcasting across distributed Node.js workers."
    ],
    architecture: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Express", "Socket.IO", "Redis Pub/Sub"],
      database: ["MongoDB", "Redis In-Memory State"],
      protocols: ["WebSockets", "RESTful APIs"]
    },
    engineeringDecisions: [
      "Utilized Redis pub-sub channels to broadcast itinerary state updates across multiple scaled Node.js server instances seamlessly.",
      "Applied optimistic UI mutations locally before WebSocket acknowledgment to make latency feel virtually non-existent."
    ],
    challengesAndSolutions: [
      {
        challenge: "State race conditions when two users simultaneously drag-and-drop the same day 2 trip location.",
        solution: "Built a operational transformation (OT) queue on Redis that sequences incoming payload timestamps and broadcasts unified diff updates."
      }
    ],
    learnings: [
      "Real-time collaborative applications require strict isolation of WebSocket rooms to prevent broadcast leaks across unrelated user sessions.",
      "Optimistic UI updates transform perceived user latency from hundreds of milliseconds to instantaneous 0ms."
    ],
    futureRoadmap: [
      "Add automated flight & hotel price tracking alerts.",
      "Integrate AI itinerary auto-generation based on group budget preferences."
    ],
    github: "https://github.com/kausikhussain/tripsync",
    demo: "https://tripsync-travel.vercel.app",
    relatedQuestions: [
      "What technologies were used in TripSync?",
      "What was the biggest challenge in TripSync?",
      "How does real-time sync work?",
      "Tell me about JanSehat"
    ]
  },

  {
    id: "victus",
    keys: ["victus", "victu", "fitness app", "workout analytics", "nutrition app", "gym app", "strength training"],
    title: "Victus — Full-Stack Workout & Nutrition Analytics Engine",
    subtitle: "Personalized Health & Caloric Volume Aggregation System",
    category: "Full-Stack Systems",
    metric: "Chart.js 30-Day Progression • Indexed Query Performance",
    period: "2024",
    motivation: "Standard fitness apps either overcomplicate calorie tracking with paywalls or lack detailed strength progression analytics.",
    problem: "Fitness enthusiasts need a fast, transparent platform to track progressive overload weight logs and macro distributions without clutter.",
    targetUsers: "Gym members, athletes, and fitness enthusiasts tracking daily strength gains.",
    features: [
      "Chart.js interactive data visualization rendering 30-day volume and strength trends.",
      "Macro distribution engine calculating daily protein, carb, and fat targets.",
      "MongoDB compound indexing optimized for multi-month daily log aggregation.",
      "Custom workout routine builder with exercise muscle group tagging."
    ],
    architecture: {
      frontend: ["React", "Chart.js", "Tailwind CSS", "Axios"],
      backend: ["Node.js", "Express", "JWT Authentication"],
      database: ["MongoDB Atlas (Compound Indexed)"],
      protocols: ["HTTPS REST API"]
    },
    engineeringDecisions: [
      "Engineered MongoDB compound indexes on `(userId, logDate)` to reduce analytics aggregation queries from 400ms down to under 15ms.",
      "Integrated client-side state caching to eliminate redundant API requests during tab switching."
    ],
    challengesAndSolutions: [
      {
        challenge: "Chart.js rendering lag when drawing multi-year workout history datasets on mobile screens.",
        solution: "Implemented client-side data downsampling that averages historical volume logs per week before rendering."
      }
    ],
    learnings: [
      "Compound database indexing is critical for temporal log analytical platforms.",
      "Building tools to solve one's own daily needs (fitness logging) produces deeper UX attention to detail."
    ],
    futureRoadmap: [
      "Add computer vision AI form analysis via camera feed.",
      "Implement social leaderboards and workout routine sharing."
    ],
    github: "https://github.com/kausikhussain/victus",
    demo: null,
    relatedQuestions: [
      "Why did you build Victus?",
      "Tell me about fitness",
      "What technologies were used in Victus?",
      "Show all projects"
    ]
  },

  {
    id: "edunexus",
    keys: ["edunexus", "iit", "iit bhubaneswar", "iit hackathon", "whiteboard app", "edu app"],
    title: "EduNexus — Multi-Tenant Educational Collaboration Engine",
    subtitle: "IIT Bhubaneswar Hackathon 2025 Presentation",
    category: "Full-Stack & Real-Time Systems",
    metric: "IIT Bhubaneswar 2025 • Real-Time Canvas",
    period: "2025",
    motivation: "Remote education platforms lack interactive real-time whiteboard tools where professors and students can draw and solve equations jointly.",
    problem: "Traditional video conferencing tools treat screen sharing as static video streams rather than editable, interactive vector canvases.",
    targetUsers: "University professors, students, and online tutoring groups.",
    features: [
      "HTML5 Canvas API multi-user real-time drawing vector sync.",
      "Peer-to-peer WebRTC video rooms with dynamic mic mute toggles.",
      "AI-assisted automated quiz generation based on room whiteboard lecture notes.",
      "Document file upload and PDF annotation layer."
    ],
    architecture: {
      frontend: ["Next.js 14", "React", "Canvas API", "Tailwind CSS"],
      backend: ["Node.js", "Socket.IO", "Redis"],
      database: ["PostgreSQL", "Prisma ORM"],
      protocols: ["WebSockets", "WebRTC"]
    },
    engineeringDecisions: [
      "Used vector stroke data arrays over WebSockets instead of canvas image snapshots to reduce whiteboard bandwidth usage by 95%."
    ],
    challengesAndSolutions: [
      {
        challenge: "Canvas stroke lag during fast pen movement across multiple concurrent client screens.",
        solution: "Applied Bezier curve interpolation client-side so stroke vectors render smoothly regardless of network packet jitter."
      }
    ],
    learnings: [
      "Vector stroke data streaming delivers 100x lower latency than bitmap image streaming for collaborative whiteboards."
    ],
    futureRoadmap: [
      "Add mathematical formula OCR recognition.",
      "Integrate AI voice lecture transcription."
    ],
    github: "https://github.com/kausikhussain/edunexus",
    demo: null,
    relatedQuestions: [
      "Tell me about IIT Bhubaneswar Hackathon",
      "Tell me about JanSehat",
      "Tell me about TripSync"
    ]
  },

  {
    id: "uber",
    keys: ["uber", "uber clone", "cab app", "ride sharing", "leaflet app", "map tracking"],
    title: "Uber Clone — Real-Time Ride Booking & Tracking Platform",
    subtitle: "Full-Stack Geo-Location Ride Dispatch System",
    category: "Full-Stack Systems",
    metric: "Leaflet Map API • Dynamic Route Computation",
    period: "2024",
    motivation: "Understanding the underlying architecture of real-time location tracking and driver dispatch algorithms.",
    problem: "Real-time geolocation tracking requires continuous socket streaming without draining client battery or overloading server capacity.",
    targetUsers: "Riders and drivers coordinating real-time pickup routes.",
    features: [
      "Leaflet & OpenStreetMap interactive vehicle movement tracking.",
      "Socket.IO location broadcasting with automatic driver-to-rider matching.",
      "Fare estimation algorithm calculated from dynamic distance & traffic duration.",
      "Secure JWT authentication and ride history database logs."
    ],
    architecture: {
      frontend: ["React", "Leaflet Maps API", "Tailwind CSS"],
      backend: ["Node.js", "Express", "Socket.IO"],
      database: ["MongoDB Atlas"],
      protocols: ["WebSockets", "REST APIs"]
    },
    engineeringDecisions: [
      "Throttled GPS coordinate emissions from driver clients to 2-second intervals while interpolating vehicle markers smoothly along roads using CSS transitions."
    ],
    challengesAndSolutions: [
      {
        challenge: "Erratic vehicle marker jumps on map when GPS coordinates fluctuate.",
        solution: "Implemented a moving average Kalman filter to smooth out noisy GPS coordinate streams before updating map markers."
      }
    ],
    learnings: [
      "Smoothing noisy hardware sensor streams (GPS) is as vital as backend server performance in geo-tracking systems."
    ],
    futureRoadmap: [
      "Add multi-stop ride routing.",
      "Integrate Stripe payment gateway for live ride completion settlements."
    ],
    github: "https://github.com/kausikhussain/uber-clone",
    demo: null,
    relatedQuestions: [
      "Show all projects",
      "Tell me about TripSync",
      "What are your backend skills?"
    ]
  }
];
