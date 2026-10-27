import {QUESTIONS, Question, Category, Difficulty, ALL_CATEGORIES} from '../data/questions';

export type DifficultyMix = {difficulty: Difficulty; count: number}[];

export function getDifficultyMixForLevel(level: number): DifficultyMix {
  if (level === 1) return [{difficulty: 'easy', count: 10}];
  if (level === 2) return [{difficulty: 'easy', count: 6}, {difficulty: 'medium', count: 4}];
  if (level === 3) return [{difficulty: 'easy', count: 3}, {difficulty: 'medium', count: 7}];
  if (level === 4) return [{difficulty: 'medium', count: 4}, {difficulty: 'hard', count: 6}];
  if (level === 5) return [{difficulty: 'hard', count: 3}, {difficulty: 'expert', count: 7}];
  // Level 6+
  return [{difficulty: 'expert', count: 10}];
}

export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectQuestions(
  category: Category | 'Mixed',
  level: number,
  usedIds: Set<string>,
  count: number = 10,
): Question[] {
  const difficultyMix = getDifficultyMixForLevel(level);
  const pool = category === 'Mixed' ? QUESTIONS : QUESTIONS.filter(q => q.category === category);

  let selected: Question[] = [];

  for (const {difficulty, count: needed} of difficultyMix) {
    // Prefer unused questions, fall back to used ones if needed
    const byDiff = shuffleArray(pool.filter(q => q.difficulty === difficulty));
    const unused = byDiff.filter(q => !usedIds.has(q.id));
    const used = byDiff.filter(q => usedIds.has(q.id));

    const candidates = [...unused, ...used];
    const alreadySelectedIds = new Set(selected.map(q => q.id));

    for (const q of candidates) {
      if (selected.length >= count) break;
      if (alreadySelectedIds.has(q.id)) continue;
      if (selected.filter(s => s.difficulty === difficulty).length >= needed) break;
      selected.push(q);
    }
  }

  // If we still don't have 10, fill from remaining pool
  if (selected.length < count) {
    const selectedIds = new Set(selected.map(q => q.id));
    const remaining = shuffleArray(pool.filter(q => !selectedIds.has(q.id)));
    for (const q of remaining) {
      if (selected.length >= count) break;
      selected.push(q);
    }
  }

  return shuffleArray(selected).slice(0, count);
}

export function shuffleOptions(question: Question): {options: string[]; correctIndex: number} {
  const indexed = question.options.map((opt, i) => ({opt, isCorrect: i === question.correctAnswer}));
  const shuffled = shuffleArray(indexed);
  const correctIndex = shuffled.findIndex(item => item.isCorrect);
  return {
    options: shuffled.map(item => item.opt),
    correctIndex,
  };
}

export function calculateScore(answers: (number | null)[], correctAnswers: number[]): number {
  return answers.reduce<number>((acc, ans, i) => {
    return acc + (ans === correctAnswers[i] ? 1 : 0);
  }, 0);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function getLevelTitle(level: number): string {
  if (level === 1) return 'Beginner';
  if (level === 2) return 'Intermediate';
  if (level === 3) return 'Advanced';
  if (level === 4) return 'Expert';
  if (level === 5) return 'Master';
  return `Legend Lv.${level}`;
}

export function getLevelXPRequired(level: number): number {
  return level * 100;
}

export function getCategoryIcon(category: Category | 'Mixed'): string {
  const icons: Record<string, string> = {
    Science: '🔬',
    Geography: '🌍',
    History: '📜',
    Technology: '💻',
    Mathematics: '🧮',
    'General Knowledge': '🧠',
    Nature: '🌿',
    Entertainment: '🎬',
    Mixed: '⚡',
  };
  return icons[category] || '❓';
}
