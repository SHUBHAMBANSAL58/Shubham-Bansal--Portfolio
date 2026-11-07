/**
 * Utility for calculating estimated reading time and word counts for text content.
 */

export interface ReadingTimeResult {
  minutes: number;
  wordCount: number;
  formatted: string;
  label: string;
}

/**
 * Counts words in a string or array of strings.
 */
export function countWords(input: string | string[]): number {
  if (!input) return 0;
  const rawText = Array.isArray(input) ? input.join(' ') : input;
  const words = rawText.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

/**
 * Calculates estimated reading time based on word count.
 * Standard average reading speed: 200 words per minute.
 */
export function calculateReadingTime(
  content: string | string[],
  wordsPerMinute: number = 200
): ReadingTimeResult {
  const wordCount = countWords(content);
  if (wordCount === 0) {
    return {
      minutes: 0,
      wordCount: 0,
      formatted: '0 min read',
      label: '0 words'
    };
  }

  const wpm = wordsPerMinute > 0 ? wordsPerMinute : 200;
  const rawMinutes = wordCount / wpm;

  // If less than 0.7 minutes, mark as "1 min read" or "< 1 min read"
  const minutes = Math.max(1, Math.round(rawMinutes));
  const formatted = rawMinutes < 0.8 ? '< 1 min read' : `${minutes} min read`;

  return {
    minutes,
    wordCount,
    formatted,
    label: `${formatted} · ~${wordCount} words`
  };
}
