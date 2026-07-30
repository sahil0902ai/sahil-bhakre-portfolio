import { portfolioKnowledgeBase, KnowledgeTopic } from '@config/knowledgeBase';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  topicRef?: string;
}

export function searchKnowledgeBase(query: string): KnowledgeTopic[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return [];

  const matched = portfolioKnowledgeBase.filter((topic) => {
    return (
      topic.keywords.some((kw) => normalized.includes(kw)) ||
      topic.title.toLowerCase().includes(normalized) ||
      topic.content.toLowerCase().includes(normalized)
    );
  });

  return matched.length > 0 ? matched : [portfolioKnowledgeBase[0]]; // Fallback to services overview
}

export function generateAssistantResponse(query: string): { responseText: string; topicTitle?: string } {
  const normalized = query.toLowerCase().trim();

  // 1. Services
  if (normalized.includes('service') || normalized.includes('offer') || normalized.includes('capabilities')) {
    const topic = portfolioKnowledgeBase.find((t) => t.id === 'services-overview');
    return { responseText: topic?.content || '', topicTitle: topic?.title };
  }

  // 2. Technologies
  if (normalized.includes('tech') || normalized.includes('tool') || normalized.includes('framework') || normalized.includes('python') || normalized.includes('nextjs')) {
    const topic = portfolioKnowledgeBase.find((t) => t.id === 'tech-stack');
    return { responseText: topic?.content || '', topicTitle: topic?.title };
  }

  // 3. Projects
  if (normalized.includes('project') || normalized.includes('work') || normalized.includes('case study') || normalized.includes('built') || normalized.includes('scraper')) {
    const topic = portfolioKnowledgeBase.find((t) => t.id === 'projects-summary');
    return { responseText: topic?.content || '', topicTitle: topic?.title };
  }

  // 4. Process
  if (normalized.includes('process') || normalized.includes('workflow') || normalized.includes('methodology') || normalized.includes('steps')) {
    const topic = portfolioKnowledgeBase.find((t) => t.id === 'development-process');
    return { responseText: topic?.content || '', topicTitle: topic?.title };
  }

  // 5. Technology Comparison
  if (normalized.includes('compare') || normalized.includes('vs') || normalized.includes('difference')) {
    const topic = portfolioKnowledgeBase.find((t) => t.id === 'tech-comparison');
    return { responseText: topic?.content || '', topicTitle: topic?.title };
  }

  // 6. Recommendation / Business Solution
  if (normalized.includes('recommend') || normalized.includes('solution') || normalized.includes('business') || normalized.includes('fit') || normalized.includes('best')) {
    const topic = portfolioKnowledgeBase.find((t) => t.id === 'solution-recommendated');
    return { responseText: topic?.content || '', topicTitle: topic?.title };
  }

  // 7. Experience / Bio
  if (normalized.includes('experience') || normalized.includes('background') || normalized.includes('who') || normalized.includes('education') || normalized.includes('degree')) {
    const topic = portfolioKnowledgeBase.find((t) => t.id === 'experience-summary');
    return { responseText: topic?.content || '', topicTitle: topic?.title };
  }

  // RAG Search Fallback
  const searchResults = searchKnowledgeBase(query);
  const bestTopic = searchResults[0];

  return {
    responseText: `Here is the relevant information from Sahil's portfolio regarding your question:\n\n${bestTopic.content}\n\nFeel free to ask for a custom project quote or book a 15-min strategy call!`,
    topicTitle: bestTopic.title,
  };
}
