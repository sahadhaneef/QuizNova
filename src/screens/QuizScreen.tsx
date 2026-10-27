import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius} from '../theme';
import {useUserStore} from '../store/useUserStore';
import {useQuizStore} from '../store/useQuizStore';
import {selectQuestions, shuffleOptions, getCategoryIcon, getLevelTitle} from '../utils/quizEngine';
import {Category} from '../data/questions';
import {formatTime} from '../utils/quizEngine';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {RouteProp} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Quiz'>;
  route: RouteProp<RootStackParamList, 'Quiz'>;
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: Colors.easy,
  medium: Colors.medium,
  hard: Colors.hard,
  expert: Colors.expert,
};

export default function QuizScreen({navigation, route}: Props) {
  const {category, level} = route.params;
  const {stats} = useUserStore();
  const {activeQuiz, startQuiz, setAnswer, goToQuestion, tickTimer, clearQuiz} = useQuizStore();
  const timerInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const questionFade = useRef(new Animated.Value(1)).current;
  const [selectedAnim, setSelectedAnim] = useState<Record<number, Animated.Value>>({});

  // Initialize quiz
  useEffect(() => {
    const usedIds = new Set<string>(stats.usedQuestionIds ?? []);
    const rawQuestions = selectQuestions(category, level, usedIds, 10);
    const questions = rawQuestions.map(q => {
      const {options, correctIndex} = shuffleOptions(q);
      return {...q, shuffledOptions: options, shuffledCorrectIndex: correctIndex};
    });
    startQuiz(category, level, questions);

    // Start timer
    timerInterval.current = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => {
      if (timerInterval.current) clearInterval(timerInterval.current);
    };
  }, []);

  // Handle timer expiry
  useEffect(() => {
    if (activeQuiz?.timerSeconds === 0) {
      if (timerInterval.current) clearInterval(timerInterval.current);
      handleSubmit(true);
    }
  }, [activeQuiz?.timerSeconds]);

  // Animate progress bar
  useEffect(() => {
    if (!activeQuiz) return;
    const progress = (activeQuiz.currentIndex + 1) / activeQuiz.questions.length;
    Animated.timing(progressAnim, {toValue: progress, duration: 300, useNativeDriver: false}).start();
  }, [activeQuiz?.currentIndex]);

  const animateQuestionTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(questionFade, {toValue: 0, duration: 150, useNativeDriver: true}),
    ]).start(() => {
      callback();
      Animated.timing(questionFade, {toValue: 1, duration: 250, useNativeDriver: true}).start();
    });
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (!activeQuiz) return;
    setAnswer(activeQuiz.currentIndex, optionIndex);
  };

  const handleNext = () => {
    if (!activeQuiz) return;
    if (activeQuiz.currentIndex < activeQuiz.questions.length - 1) {
      animateQuestionTransition(() => goToQuestion(activeQuiz.currentIndex + 1));
    }
  };

  const handlePrev = () => {
    if (!activeQuiz) return;
    if (activeQuiz.currentIndex > 0) {
      animateQuestionTransition(() => goToQuestion(activeQuiz.currentIndex - 1));
    }
  };

  const handleSubmit = (timeout = false) => {
    if (!activeQuiz) return;

    const unanswered = activeQuiz.answers.filter(a => a === null).length;
    if (unanswered > 0 && !timeout) {
      Alert.alert(
        'Unanswered Questions',
        `You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Submit anyway?`,
        [
          {text: 'Go Back', style: 'cancel'},
          {text: 'Submit', style: 'destructive', onPress: () => doSubmit()},
        ],
      );
      return;
    }
    doSubmit();
  };

  const doSubmit = () => {
    if (!activeQuiz) return;
    if (timerInterval.current) clearInterval(timerInterval.current);

    const timeTaken = 120 - (activeQuiz.timerSeconds ?? 0);
    const questions = activeQuiz.questions;
    const answers = activeQuiz.answers;

    const results = questions.map((q, i) => ({
      question: q,
      selectedIndex: answers[i],
      correctIndex: q.shuffledCorrectIndex,
      isCorrect: answers[i] === q.shuffledCorrectIndex,
    }));

    const score = results.filter(r => r.isCorrect).length;

    navigation.replace('Result', {
      score,
      total: questions.length,
      category: activeQuiz.category,
      level: activeQuiz.level,
      timeTaken,
      results: results.map(r => ({
        questionText: r.question.text,
        selectedIndex: r.selectedIndex,
        correctIndex: r.correctIndex,
        isCorrect: r.isCorrect,
        options: r.question.shuffledOptions,
      })),
      questionIds: questions.map(q => q.id),
      categoryBreakdown: buildCategoryBreakdown(results),
    });
  };

  const buildCategoryBreakdown = (results: any[]) => {
    const map: Record<string, {correct: number; incorrect: number}> = {};
    for (const r of results) {
      const cat = r.question.category;
      if (!map[cat]) map[cat] = {correct: 0, incorrect: 0};
      if (r.isCorrect) map[cat].correct++;
      else map[cat].incorrect++;
    }
    return Object.entries(map).map(([cat, v]) => ({category: cat as Category, ...v}));
  };

  if (!activeQuiz) {
    return (
      <LinearGradient colors={['#0F0E17', '#1A1933']} style={styles.loading}>
        <Text style={styles.loadingText}>Loading Quiz...</Text>
      </LinearGradient>
    );
  }

  const {questions, currentIndex, answers, timerSeconds} = activeQuiz;
  const question = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const timerPercent = timerSeconds / 120;
  const timerColor = timerSeconds > 60 ? Colors.success : timerSeconds > 30 ? Colors.warning : Colors.error;
  const progressWidth = progressAnim.interpolate({inputRange: [0, 1], outputRange: ['0%', '100%']});

  const answeredCount = answers.filter(a => a !== null).length;

  return (
    <LinearGradient colors={['#0F0E17', '#1A1933']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => {
          Alert.alert('Quit Quiz', 'Your progress will be lost. Quit?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Quit', style: 'destructive', onPress: () => {clearQuiz(); navigation.goBack();}},
          ]);
        }} style={styles.quitBtn}>
          <Text style={styles.quitText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.timerContainer}>
          <Text style={[styles.timerText, {color: timerColor}]}>{formatTime(timerSeconds)}</Text>
          <View style={styles.timerBar}>
            <View style={[styles.timerFill, {width: `${timerPercent * 100}%`, backgroundColor: timerColor}]} />
          </View>
        </View>

        <View style={styles.questionCounter}>
          <Text style={styles.counterText}>{answeredCount}/{questions.length}</Text>
          <Text style={styles.counterLabel}>done</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, {width: progressWidth}]} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={{opacity: questionFade}}>
          {/* Question Info */}
          <View style={styles.questionInfo}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{getCategoryIcon(question.category)} {question.category}</Text>
            </View>
            <View style={[styles.difficultyPill, {backgroundColor: DIFFICULTY_COLORS[question.difficulty] + '25', borderColor: DIFFICULTY_COLORS[question.difficulty]}]}>
              <Text style={[styles.difficultyText, {color: DIFFICULTY_COLORS[question.difficulty]}]}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.questionNumber}>Question {currentIndex + 1} of {questions.length}</Text>
          <Text style={styles.questionText}>{question.text}</Text>

          {/* Answer Options */}
          <View style={styles.options}>
            {question.shuffledOptions.map((option, optIdx) => {
              const isSelected = currentAnswer === optIdx;
              const letters = ['A', 'B', 'C', 'D'];
              return (
                <TouchableOpacity
                  key={optIdx}
                  style={[styles.optionCard, isSelected && styles.optionSelected]}
                  onPress={() => handleSelectAnswer(optIdx)}
                  activeOpacity={0.8}>
                  <LinearGradient
                    colors={isSelected ? ['#6C63FF', '#A855F7'] : ['#1A1933', '#221F3B']}
                    style={styles.optionGradient}>
                    <View style={[styles.optionLetter, isSelected && styles.optionLetterSelected]}>
                      <Text style={[styles.optionLetterText, isSelected && {color: Colors.primary}]}>{letters[optIdx]}</Text>
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>{option}</Text>
                    {isSelected && <Text style={styles.checkmark}>✓</Text>}
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]}
          onPress={handlePrev}
          disabled={currentIndex === 0}>
          <Text style={styles.navBtnText}>← Prev</Text>
        </TouchableOpacity>

        {isLast ? (
          <TouchableOpacity onPress={() => handleSubmit(false)} style={styles.submitBtn} activeOpacity={0.88}>
            <LinearGradient colors={['#6C63FF', '#A855F7']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.submitGradient}>
              <Text style={styles.submitText}>Submit Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.88}>
            <LinearGradient colors={['#6C63FF', '#A855F7']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.nextGradient}>
              <Text style={styles.nextText}>Next →</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  loading: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  loadingText: {color: Colors.textPrimary, fontSize: Typography.fontSize.xl},
  topBar: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing['2xl'], paddingTop: 52, paddingBottom: Spacing.lg},
  quitBtn: {width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center'},
  quitText: {color: Colors.textSecondary, fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold},
  timerContainer: {alignItems: 'center', flex: 1, marginHorizontal: Spacing.lg},
  timerText: {fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, marginBottom: 4},
  timerBar: {width: 120, height: 4, backgroundColor: Colors.surfaceHighlight, borderRadius: BorderRadius.full, overflow: 'hidden'},
  timerFill: {height: '100%', borderRadius: BorderRadius.full},
  questionCounter: {alignItems: 'center'},
  counterText: {fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary},
  counterLabel: {fontSize: Typography.fontSize.xs, color: Colors.textMuted},
  progressBar: {height: 4, backgroundColor: Colors.surfaceHighlight, marginHorizontal: Spacing['2xl'], borderRadius: BorderRadius.full, overflow: 'hidden', marginBottom: Spacing.lg},
  progressFill: {height: '100%', backgroundColor: Colors.primary, borderRadius: BorderRadius.full},
  scroll: {paddingHorizontal: Spacing['2xl'], paddingBottom: 120},
  questionInfo: {flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md},
  categoryPill: {backgroundColor: Colors.surfaceHighlight, paddingHorizontal: Spacing.md, paddingVertical: 4, borderRadius: BorderRadius.full},
  categoryPillText: {fontSize: Typography.fontSize.sm, color: Colors.textSecondary},
  difficultyPill: {paddingHorizontal: Spacing.md, paddingVertical: 4, borderRadius: BorderRadius.full, borderWidth: 1},
  difficultyText: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semibold},
  questionNumber: {fontSize: Typography.fontSize.sm, color: Colors.textMuted, marginBottom: Spacing.sm, fontWeight: Typography.fontWeight.medium},
  questionText: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, lineHeight: 28, marginBottom: Spacing['2xl']},
  options: {gap: Spacing.md},
  optionCard: {borderRadius: BorderRadius.lg, overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.border},
  optionSelected: {borderColor: Colors.primary},
  optionGradient: {flexDirection: 'row', alignItems: 'center', padding: Spacing.lg, gap: Spacing.md},
  optionLetter: {width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.surfaceHighlight, alignItems: 'center', justifyContent: 'center'},
  optionLetterSelected: {backgroundColor: 'white'},
  optionLetterText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: Colors.textSecondary},
  optionText: {flex: 1, fontSize: Typography.fontSize.md, color: Colors.textPrimary, lineHeight: 20},
  optionTextSelected: {fontWeight: Typography.fontWeight.semibold},
  checkmark: {fontSize: Typography.fontSize.lg, color: 'white'},
  footer: {position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', gap: Spacing.md, padding: Spacing['2xl'], paddingBottom: 36, backgroundColor: '#0F0E17'},
  navBtn: {paddingHorizontal: Spacing.xl, paddingVertical: 14, borderRadius: BorderRadius.lg, backgroundColor: Colors.surfaceHighlight},
  navBtnDisabled: {opacity: 0.3},
  navBtnText: {fontSize: Typography.fontSize.md, color: Colors.textSecondary, fontWeight: Typography.fontWeight.semibold},
  submitBtn: {flex: 1, borderRadius: BorderRadius.lg, overflow: 'hidden'},
  submitGradient: {paddingVertical: 14, alignItems: 'center'},
  submitText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: 'white'},
  nextBtn: {flex: 1, borderRadius: BorderRadius.lg, overflow: 'hidden'},
  nextGradient: {paddingVertical: 14, alignItems: 'center'},
  nextText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: 'white'},
});
