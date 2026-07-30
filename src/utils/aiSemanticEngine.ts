import { KAUSIK_KNOWLEDGE_BASE, KnowledgeTopic } from "@/data/kausikKnowledgeBase";

export interface SemanticResponse {
  matchedTopic: KnowledgeTopic;
  confidenceScore: number;
  conversationalNote?: string;
}

class AISemanticEngine {
  private lastTopicId: string | null = null;

  // Compute fuzzy Levenshtein distance for typo tolerance
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

  // Score match strength between input query and a topic
  private scoreTopic(query: string, topic: KnowledgeTopic): number {
    const q = query.toLowerCase().trim();
    let maxScore = 0;

    // Check exact key matches
    for (const key of topic.keys) {
      if (q === key) return 1.0;
      if (q.includes(key) || key.includes(q)) {
        maxScore = Math.max(maxScore, 0.85);
      }

      // Fuzzy typo check
      const dist = this.levenshtein(q, key);
      if (dist <= 2 && key.length > 3) {
        maxScore = Math.max(maxScore, 0.75);
      }
    }

    // Check word token overlap in summary/details
    const tokens = q.split(/\s+/).filter((t) => t.length > 2);
    for (const token of tokens) {
      if (topic.title.toLowerCase().includes(token)) maxScore = Math.max(maxScore, 0.65);
      if (topic.summary.toLowerCase().includes(token)) maxScore = Math.max(maxScore, 0.55);
      for (const d of topic.details) {
        if (d.toLowerCase().includes(token)) maxScore = Math.max(maxScore, 0.45);
      }
    }

    return maxScore;
  }

  public query(userInput: string): SemanticResponse {
    const cleanInput = userInput.trim().toLowerCase();

    // 1. Check conversational follow-up triggers
    const followUpTriggers = ["it", "that", "this project", "the project", "technologies", "tech stack", "who built it"];
    if (this.lastTopicId && followUpTriggers.some((trig) => cleanInput.includes(trig))) {
      const activeTopic = KAUSIK_KNOWLEDGE_BASE.find((t) => t.id === this.lastTopicId);
      if (activeTopic) {
        return {
          matchedTopic: activeTopic,
          confidenceScore: 0.9,
          conversationalNote: `Continuing discussion on ${activeTopic.title}:`
        };
      }
    }

    // 2. Score all knowledge topics
    let bestTopic: KnowledgeTopic = KAUSIK_KNOWLEDGE_BASE[0];
    let highestScore = 0;

    for (const topic of KAUSIK_KNOWLEDGE_BASE) {
      const score = this.scoreTopic(cleanInput, topic);
      if (score > highestScore) {
        highestScore = score;
        bestTopic = topic;
      }
    }

    // Update last topic memory
    if (highestScore > 0.4) {
      this.lastTopicId = bestTopic.id;
    }

    // 3. High Confidence Match
    if (highestScore >= 0.4) {
      return {
        matchedTopic: bestTopic,
        confidenceScore: highestScore
      };
    }

    // 4. Natural Conversational Fallback
    const fallbackTopic: KnowledgeTopic = {
      id: "fallback",
      keys: ["fallback"],
      title: "Kausik's Portfolio AI Assistant",
      category: "personal",
      summary: `I couldn't find explicit data for '${userInput}'. You can ask me about Sk Kausik Hussain's SIH 2025 finalist journey, B.Tech CSE CGPA, JanSehat telemedicine app, TripSync, Victus, IIT Bhubaneswar hackathon, family business, fitness journey, or contact details!`,
      details: [
        "Try asking: 'Tell me about SIH 2025'",
        "Try asking: 'What is your college CGPA?'",
        "Try asking: 'Tell me about JanSehat'",
        "Try asking: 'Show your 10th and 12th marks'"
      ],
      relatedQuestions: [
        "Who is Sk Kausik Hussain?",
        "Tell me about SIH 2025",
        "Show all projects",
        "What are your core skills?"
      ]
    };

    return {
      matchedTopic: fallbackTopic,
      confidenceScore: 0.2
    };
  }
}

export const aiSemanticEngine = new AISemanticEngine();
export default aiSemanticEngine;
