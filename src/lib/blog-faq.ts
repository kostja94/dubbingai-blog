export interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_HEADING_RE = /^##\s+FAQs?\s*$/m;

function stripAnswerMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]*)\]\(<[^>]*>\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*\*(.+?)\*\*\*/g, "$1")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/`([^`]*)`/g, "$1")
    .trim();
}

export function extractFaqs(content: string): {
  faqs: FaqItem[];
  body: string;
} {
  const match = FAQ_HEADING_RE.exec(content);
  if (!match) return { faqs: [], body: content };

  const headingEnd = match.index + match[0].length;
  const body = content.slice(0, match.index).trimEnd();
  const faqSection = content.slice(headingEnd).trim();

  const faqs: FaqItem[] = [];
  let currentQuestion = "";
  let currentAnswer = "";
  let inAnswer = false;

  for (const line of faqSection.split("\n")) {
    const qm = line.match(/^###\s+(.+)$/);
    if (qm) {
      if (currentQuestion) {
        faqs.push({
          question: currentQuestion.trim(),
          answer: stripAnswerMarkdown(currentAnswer),
        });
      }
      currentQuestion = qm[1].trim();
      currentAnswer = "";
      inAnswer = true;
    } else if (inAnswer) {
      if (currentQuestion && line.trim() === "" && currentAnswer.endsWith("\n\n")) {
        continue;
      }
      currentAnswer += line + "\n";
    }
  }

  if (currentQuestion) {
    faqs.push({
      question: currentQuestion.trim(),
      answer: stripAnswerMarkdown(currentAnswer),
    });
  }

  return { faqs, body };
}
