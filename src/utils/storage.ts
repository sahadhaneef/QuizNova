import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: '@quiznova_user',
  STATS: '@quiznova_stats',
  USED_QUESTION_IDS: '@quiznova_used_ids',
};

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // Stored as-is for local demo (not production safe)
  createdAt: string;
}

export interface CategoryStat {
  correct: number;
  incorrect: number;
  total: number;
  quizzes: number;
}

export interface UserStats {
  level: number;
  highestLevel: number;
  totalQuizzesAttempted: number;
  totalQuizzesCompleted: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalQuestions: number;
  bestScore: number;
  totalScore: number; // For average calculation
  currentStreak: number;
  highestStreak: number;
  xp: number;
  categoryStats: {
    Science: CategoryStat;
    Geography: CategoryStat;
    History: CategoryStat;
    Technology: CategoryStat;
    Mathematics: CategoryStat;
    'General Knowledge': CategoryStat;
    Nature: CategoryStat;
    Entertainment: CategoryStat;
  };
  usedQuestionIds: string[];
}

export function createDefaultStats(): UserStats {
  const emptyCat: CategoryStat = {correct: 0, incorrect: 0, total: 0, quizzes: 0};
  return {
    level: 1,
    highestLevel: 1,
    totalQuizzesAttempted: 0,
    totalQuizzesCompleted: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    totalQuestions: 0,
    bestScore: 0,
    totalScore: 0,
    currentStreak: 0,
    highestStreak: 0,
    xp: 0,
    categoryStats: {
      Science: {...emptyCat},
      Geography: {...emptyCat},
      History: {...emptyCat},
      Technology: {...emptyCat},
      Mathematics: {...emptyCat},
      'General Knowledge': {...emptyCat},
      Nature: {...emptyCat},
      Entertainment: {...emptyCat},
    },
    usedQuestionIds: [],
  };
}

export async function saveUser(user: StoredUser): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export async function loadUser(): Promise<StoredUser | null> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function clearUser(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.USER);
}

export async function saveStats(userId: string, stats: UserStats): Promise<void> {
  await AsyncStorage.setItem(`${KEYS.STATS}_${userId}`, JSON.stringify(stats));
}

export async function loadStats(userId: string): Promise<UserStats | null> {
  try {
    const raw = await AsyncStorage.getItem(`${KEYS.STATS}_${userId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function getAllUsers(): Promise<StoredUser[]> {
  try {
    const raw = await AsyncStorage.getItem('@quiznova_all_users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveAllUsers(users: StoredUser[]): Promise<void> {
  await AsyncStorage.setItem('@quiznova_all_users', JSON.stringify(users));
}
