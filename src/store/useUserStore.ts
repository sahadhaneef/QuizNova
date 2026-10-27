import {create} from 'zustand';
import {
  StoredUser,
  UserStats,
  createDefaultStats,
  saveUser,
  loadUser,
  saveStats,
  loadStats,
  getAllUsers,
  saveAllUsers,
} from '../utils/storage';
import {Category} from '../data/questions';

interface UserState {
  user: StoredUser | null;
  stats: UserStats;
  isLoading: boolean;
  // Actions
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  signup: (name: string, email: string, password: string) => Promise<{success: boolean; error?: string}>;
  logout: () => Promise<void>;
  updateStatsAfterQuiz: (params: {
    score: number;
    total: number;
    passed: boolean;
    category: Category | 'Mixed';
    categoryBreakdown: {category: Category; correct: number; incorrect: number}[];
    timeSeconds: number;
    questionsUsed: string[];
  }) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  stats: createDefaultStats(),
  isLoading: true,

  initialize: async () => {
    set({isLoading: true});
    const user = await loadUser();
    if (user) {
      const stats = (await loadStats(user.id)) ?? createDefaultStats();
      set({user, stats, isLoading: false});
    } else {
      set({isLoading: false});
    }
  },

  login: async (email: string, password: string) => {
    const users = await getAllUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return {success: false, error: 'Invalid email or password'};
    const stats = (await loadStats(found.id)) ?? createDefaultStats();
    await saveUser(found);
    set({user: found, stats});
    return {success: true};
  },

  signup: async (name: string, email: string, password: string) => {
    const users = await getAllUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return {success: false, error: 'An account with this email already exists'};
    }
    const newUser: StoredUser = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };
    await saveAllUsers([...users, newUser]);
    await saveUser(newUser);
    const stats = createDefaultStats();
    await saveStats(newUser.id, stats);
    set({user: newUser, stats});
    return {success: true};
  },

  logout: async () => {
    const {clearUser} = await import('../utils/storage');
    await clearUser();
    set({user: null, stats: createDefaultStats()});
  },

  updateStatsAfterQuiz: async ({score, total, passed, category, categoryBreakdown, questionsUsed}) => {
    const {user, stats} = get();
    if (!user) return;

    const newStats: UserStats = JSON.parse(JSON.stringify(stats));

    newStats.totalQuizzesAttempted += 1;
    newStats.totalQuizzesCompleted += 1;
    newStats.totalCorrect += score;
    newStats.totalIncorrect += total - score;
    newStats.totalQuestions += total;
    newStats.totalScore += score;
    if (score > newStats.bestScore) newStats.bestScore = score;

    // Update used question IDs
    const usedSet = new Set(newStats.usedQuestionIds);
    questionsUsed.forEach(id => usedSet.add(id));
    newStats.usedQuestionIds = Array.from(usedSet);

    // Streaks
    if (passed) {
      newStats.currentStreak += 1;
      if (newStats.currentStreak > newStats.highestStreak) {
        newStats.highestStreak = newStats.currentStreak;
      }
      // Level up
      newStats.level += 1;
      if (newStats.level > newStats.highestLevel) {
        newStats.highestLevel = newStats.level;
      }
      newStats.xp += score * 15 + 50; // bonus for pass
    } else {
      newStats.currentStreak = 0;
      newStats.xp += score * 10;
    }

    // Category stats
    for (const {category: cat, correct, incorrect} of categoryBreakdown) {
      if (cat in newStats.categoryStats) {
        newStats.categoryStats[cat].correct += correct;
        newStats.categoryStats[cat].incorrect += incorrect;
        newStats.categoryStats[cat].total += correct + incorrect;
        newStats.categoryStats[cat].quizzes += 1;
      }
    }

    await saveStats(user.id, newStats);
    set({stats: newStats});
  },
}));
