import { KAUSIK_KNOWLEDGE_BASE, KnowledgeTopic } from "@/data/kausikKnowledgeBase";
import { PROJECT_CASE_STUDIES, DeepProjectCaseStudy } from "@/data/projectCaseStudies";

export interface SemanticResponse {
  matchedTopic: KnowledgeTopic;
  deepCaseStudy?: DeepProjectCaseStudy;
  confidenceScore: number;
  conversationalNote?: string;
  interviewAnswer?: string;
}

class AISemanticEngine {
  private lastTopicId: string | null = "jansehat";

  private levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  public query(userInput: string): SemanticResponse {
    const q = userInput.toLowerCase().trim();

    // 1. Recruiter & Cross-Project Interview Queries
    if (q.includes("hire") || q.includes("why hire") || q.includes("proud") || q.includes("best project")) {
      const jansehatCS = PROJECT_CASE_STUDIES.find((p) => p.id === "jansehat");
      const topic: KnowledgeTopic = {
        id: "interview_hire",
        keys: ["hire", "proud"],
        title: "Why Hire Kausik — Proven Engineering Craftsmanship",
        category: "personal",
        summary: "I don't just write code; I architect resilient digital products built for real-world constraints.",
        details: [
          "SIH 2025 Finalist Recognition: Engineered JanSehat to perform telemedicine consultations over degraded 2G/3G rural networks.",
          "Real-Time Systems Expertise: Built TripSync's sub-200ms Socket.IO WebSocket sync engine handling concurrent edit state queues.",
          "Academic & Technical Foundation: B.Tech CSE (8.75 CGPA) at Silicon Institute of Technology with deep WebGL Three.js motion design skills."
        ],
        metrics: [
          { label: "SIH Honor", value: "National Finalist" },
          { label: "CGPA", value: "8.75 / 10.0" }
        ],
        relatedQuestions: [
          "Tell me about JanSehat",
          "Tell me about TripSync",
          "What are your core skills?",
          "Contact Kausik"
        ]
      };

      return {
        matchedTopic: topic,
        deepCaseStudy: jansehatCS,
        confidenceScore: 0.95,
        interviewAnswer: "My flagship project, JanSehat (SIH '25 Finalist), demonstrates my ability to solve critical real-world problems under severe technical constraints like poor 2G/3G connectivity. Combined with my 8.75 CGPA and real-time Socket.IO experience on TripSync, I bring immediate production craftsmanship to any engineering team."
      };
    }

    if (q.includes("challenging") || q.includes("hardest") || q.includes("difficult")) {
      const jansehatCS = PROJECT_CASE_STUDIES.find((p) => p.id === "jansehat");
      const topic: KnowledgeTopic = {
        id: "interview_challenge",
        keys: ["challenging"],
        title: "Engineering Challenges & Solutions Across Projects",
        category: "project",
        summary: "JanSehat (SIH '25 Finalist) was the most technically challenging project due to WebRTC dropouts on 2G/3G towers.",
        details: [
          "JanSehat WebRTC Dropout Solution: Built automated ICE candidate renegotiation buffering audio locally during network switches.",
          "TripSync Concurrency Solution: Built Redis payload timestamp queues resolving edit state race conditions in <10ms."
        ],
        relatedQuestions: [
          "Tell me about JanSehat",
          "Tell me about TripSync",
          "What technologies were used in JanSehat?"
        ]
      };

      return {
        matchedTopic: topic,
        deepCaseStudy: jansehatCS,
        confidenceScore: 0.95,
        interviewAnswer: "JanSehat was my most challenging build. Handling WebRTC peer media dropouts on unstable 2G rural networks forced me to design a custom local buffering mechanism and graceful audio-only fallback."
      };
    }

    // 2. Specific Sub-Questions & Follow-Up Context Resolution
    let activeCS: DeepProjectCaseStudy | undefined;

    // Check direct project match
    for (const cs of PROJECT_CASE_STUDIES) {
      if (cs.keys.some((k) => q.includes(k) || this.levenshtein(q, k) <= 2)) {
        activeCS = cs;
        this.lastTopicId = cs.id;
        break;
      }
    }

    // Check conversational follow-up if no direct project matched
    if (!activeCS && this.lastTopicId) {
      activeCS = PROJECT_CASE_STUDIES.find((cs) => cs.id === this.lastTopicId);
    }

    if (activeCS) {
      // Sub-question parsing
      if (q.includes("offline") || q.includes("2g") || q.includes("bandwidth")) {
        const topic: KnowledgeTopic = {
          id: activeCS.id + "_offline",
          keys: ["offline"],
          title: `${activeCS.title} — Offline & Low-Bandwidth Architecture`,
          category: "project",
          summary: activeCS.engineeringDecisions[0] || activeCS.problem,
          details: activeCS.challengesAndSolutions.map((c) => `Challenge: ${c.challenge}\nSolution: ${c.solution}`),
          relatedQuestions: [
            `What technologies were used in ${activeCS.title.split(" ")[0]}?`,
            `What was the biggest challenge in ${activeCS.title.split(" ")[0]}?`,
            "Show all projects"
          ]
        };

        return {
          matchedTopic: topic,
          deepCaseStudy: activeCS,
          confidenceScore: 0.95,
          conversationalNote: `Detailed offline architecture breakdown for ${activeCS.title}:`
        };
      }

      if (q.includes("architecture") || q.includes("backend") || q.includes("tech stack") || q.includes("technology")) {
        const topic: KnowledgeTopic = {
          id: activeCS.id + "_arch",
          keys: ["architecture"],
          title: `${activeCS.title} — Complete Architecture & Stack`,
          category: "project",
          summary: `Frontend: ${activeCS.architecture.frontend.join(", ")} | Backend: ${activeCS.architecture.backend.join(", ")} | DB: ${activeCS.architecture.database.join(", ")}`,
          details: activeCS.engineeringDecisions,
          tags: [...activeCS.architecture.frontend, ...activeCS.architecture.backend],
          relatedQuestions: [
            `What was the biggest challenge in ${activeCS.title.split(" ")[0]}?`,
            `Why did you build ${activeCS.title.split(" ")[0]}?`,
            "Show all projects"
          ]
        };

        return {
          matchedTopic: topic,
          deepCaseStudy: activeCS,
          confidenceScore: 0.95,
          conversationalNote: `Complete architecture & technical stack for ${activeCS.title}:`
        };
      }

      if (q.includes("challenge") || q.includes("problem") || q.includes("why build") || q.includes("motivation")) {
        const topic: KnowledgeTopic = {
          id: activeCS.id + "_prob",
          keys: ["problem"],
          title: `${activeCS.title} — Motivation & Engineering Challenges`,
          category: "project",
          summary: activeCS.problem,
          details: activeCS.challengesAndSolutions.map((c) => `[CHALLENGE]: ${c.challenge}\n[SOLUTION]: ${c.solution}`),
          relatedQuestions: [
            `Explain ${activeCS.title.split(" ")[0]} architecture`,
            `What did you learn from ${activeCS.title.split(" ")[0]}?`,
            "Show all projects"
          ]
        };

        return {
          matchedTopic: topic,
          deepCaseStudy: activeCS,
          confidenceScore: 0.95,
          conversationalNote: `Problem statement & engineering challenges for ${activeCS.title}:`
        };
      }

      // Default full case study return for the matched project
      const defaultTopic: KnowledgeTopic = {
        id: activeCS.id,
        keys: activeCS.keys,
        title: activeCS.title,
        category: "project",
        summary: activeCS.subtitle,
        details: [
          `Problem: ${activeCS.problem}`,
          `Motivation: ${activeCS.motivation}`,
          `Key Innovation: ${activeCS.features[0]}`
        ],
        metrics: [{ label: "Metric", value: activeCS.metric }],
        tags: activeCS.features,
        relatedQuestions: activeCS.relatedQuestions
      };

      return {
        matchedTopic: defaultTopic,
        deepCaseStudy: activeCS,
        confidenceScore: 0.9
      };
    }

    // 3. Fallback to General Knowledge Base
    let bestTopic: KnowledgeTopic = KAUSIK_KNOWLEDGE_BASE[0];
    let highestScore = 0;

    for (const topic of KAUSIK_KNOWLEDGE_BASE) {
      for (const key of topic.keys) {
        if (q.includes(key) || key.includes(q) || this.levenshtein(q, key) <= 2) {
          highestScore = 0.85;
          bestTopic = topic;
          break;
        }
      }
    }

    return {
      matchedTopic: bestTopic,
      confidenceScore: highestScore > 0 ? highestScore : 0.4
    };
  }
}

export const aiSemanticEngine = new AISemanticEngine();
export default aiSemanticEngine;
