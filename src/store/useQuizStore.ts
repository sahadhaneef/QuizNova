import {create} from 'zustand';
import {Question, Category} from '../data/questions';

interface ActiveQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectIndex: number;
}

interface QuizState {
  activeQuiz: {
    category: Category | 'Mixed';
    level: number;
    questions: ActiveQuestion[];
    answers: (number | null)[];
    currentIndex: number;
    startTime: number;
    timerSeconds: number;
  } | null;
  startQuiz: (category: Category | 'Mixed', level: number, questions: ActiveQuestion[]) => void;
  setAnswer: (index: number, answerIndex: number) => void;
  goToQuestion: (index: number) => void;
  tickTimer: () => void;
  clearQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  activeQuiz: null,

  startQuiz: (category, level, questions) => {
    set({
      activeQuiz: {
        category,
        level,
        questions,
        answers: new Array(questions.length).fill(null),
        currentIndex: 0,
        startTime: Date.now(),
        timerSeconds: 120, // 2 minutes per quiz
      },
    });
  },

  setAnswer: (index, answerIndex) => {
    const {activeQuiz} = get();
    if (!activeQuiz) return;
    const newAnswers = [...activeQuiz.answers];
    newAnswers[index] = answerIndex;
    set({activeQuiz: {...activeQuiz, answers: newAnswers}});
  },

  goToQuestion: (index) => {
    const {activeQuiz} = get();
    if (!activeQuiz) return;
    if (index < 0 || index >= activeQuiz.questions.length) return;
    set({activeQuiz: {...activeQuiz, currentIndex: index}});
  },

  tickTimer: () => {
    const {activeQuiz} = get();
    if (!activeQuiz) return;
    const newTime = Math.max(0, activeQuiz.timerSeconds - 1);
    set({activeQuiz: {...activeQuiz, timerSeconds: newTime}});
  },

  clearQuiz: () => set({activeQuiz: null}),
}));
