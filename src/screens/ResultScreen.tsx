import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius} from '../theme';
import {useUserStore} from '../store/useUserStore';
import {useQuizStore} from '../store/useQuizStore';
import {getLevelTitle, getCategoryIcon, formatTime} from '../utils/quizEngine';
import {Category} from '../data/questions';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {RouteProp} from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Result'>;
  route: RouteProp<RootStackParamList, 'Result'>;
};

const {width} = Dimensions.get('window');

export default function ResultScreen({navigation, route}: Props) {
  const {score, total, category, level, timeTaken, results, questionIds, categoryBreakdown} = route.params;
  const {stats, updateStatsAfterQuiz} = useUserStore();
  const {clearQuiz} = useQuizStore();

  const passed = score >= 6;
  const accuracy = Math.round((score / total) * 100);

  const scoreAnim = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.8)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  const statsUpdated = useRef(false);

  useEffect(() => {
    // Update stats once
    if (!statsUpdated.current) {
      statsUpdated.current = true;
      updateStatsAfterQuiz({
        score,
        total,
        passed,
        category,
        categoryBreakdown,
        timeSeconds: timeTaken,
        questionsUsed: questionIds,
      });
    }

    // Entrance animations
    Animated.parallel([
      Animated.spring(cardScale, {toValue: 1, friction: 6, tension: 40, useNativeDriver: true}),
      Animated.timing(cardOpacity, {toValue: 1, duration: 600, useNativeDriver: true}),
    ]).start();

    if (passed) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(confettiAnim, {toValue: 1, duration: 800, useNativeDriver: true}),
          Animated.timing(confettiAnim, {toValue: 0.7, duration: 800, useNativeDriver: true}),
        ]),
      ).start();
    }
  }, []);

  const handleTryAgain = () => {
    clearQuiz();
    navigation.replace('Quiz', {category, level: stats.level});
  };

  const handleNextLevel = () => {
    clearQuiz();
    navigation.replace('Quiz', {category: 'Mixed', level: stats.level});
  };

  const handleHome = () => {
    clearQuiz();
    navigation.navigate('MainTabs');
  };

  return (
    <LinearGradient colors={['#0F0E17', '#1A1933']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Score Hero Card */}
        <Animated.View style={[styles.heroCard, {opacity: cardOpacity, transform: [{scale: cardScale}]}]}>
          <LinearGradient
            colors={passed ? ['#065F46', '#047857'] : ['#7F1D1D', '#991B1B']}
            style={styles.heroGradient}>

            {/* Status Icon */}
            <Animated.Text style={[styles.statusEmoji, passed && {transform: [{scale: confettiAnim.interpolate({inputRange: [0, 1], outputRange: [1, 1.2]})}]}]}>
              {passed ? '🎉' : '💪'}
            </Animated.Text>

            <Text style={styles.statusTitle}>
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </Text>
            <Text style={styles.statusSubtitle}>
              {passed
                ? 'You passed and advanced to the next level!'
                : 'You need at least 6/10 to advance. Try again!'}
            </Text>

            {/* Score */}
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreMain}>{score}/{total}</Text>
              <Text style={styles.scoreLabel}>Score</Text>
            </View>

            {/* Category & Level */}
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaText}>{getCategoryIcon(category)} {category}</Text>
              <Text style={styles.heroDot}>•</Text>
              <Text style={styles.heroMetaText}>Level {level} – {getLevelTitle(level)}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatItem icon="✅" label="Correct" value={score.toString()} color={Colors.success} />
          <StatItem icon="❌" label="Wrong" value={(total - score).toString()} color={Colors.error} />
          <StatItem icon="🎯" label="Accuracy" value={`${accuracy}%`} color={Colors.accent} />
          <StatItem icon="⏱️" label="Time" value={formatTime(timeTaken)} color={Colors.primaryLight} />
        </View>

        {/* Level progress */}
        {passed && (
          <View style={styles.levelCard}>
            <LinearGradient colors={['#1A1933', '#2A2650']} style={styles.levelCardGradient}>
              <Text style={styles.levelCardTitle}>🏆 Level Up!</Text>
              <Text style={styles.levelCardDesc}>
                Advanced from Level {level} → Level {level + 1} ({getLevelTitle(level + 1)})
              </Text>
              <View style={styles.levelProgress}>
                <View style={styles.levelProgressFill} />
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Answer Review */}
        <Text style={styles.reviewTitle}>Question Review</Text>
        {results.map((r, i) => (
          <View key={i} style={[styles.reviewCard, r.isCorrect ? styles.reviewCorrect : styles.reviewWrong]}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewNum}>Q{i + 1}</Text>
              <Text style={r.isCorrect ? styles.reviewCorrectBadge : styles.reviewWrongBadge}>
                {r.isCorrect ? '✓ Correct' : '✗ Wrong'}
              </Text>
            </View>
            <Text style={styles.reviewQuestion}>{r.questionText}</Text>
            <Text style={styles.reviewCorrectAnswer}>
              ✓ {r.options[r.correctIndex]}
            </Text>
            {!r.isCorrect && r.selectedIndex !== null && (
              <Text style={styles.reviewWrongAnswer}>
                ✗ {r.options[r.selectedIndex!]}
              </Text>
            )}
            {r.selectedIndex === null && (
              <Text style={styles.reviewSkipped}>— Not answered</Text>
            )}
          </View>
        ))}

        {/* Action Buttons */}
        <View style={styles.actions}>
          {passed && (
            <TouchableOpacity style={styles.nextLevelBtn} onPress={handleNextLevel} activeOpacity={0.88}>
              <LinearGradient colors={['#6C63FF', '#A855F7']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.actionGradient}>
                <Text style={styles.actionText}>⚡ Continue to Lv. {level + 1}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.retryBtn} onPress={handleTryAgain} activeOpacity={0.88}>
            <LinearGradient colors={['#221F3B', '#2A2650']} style={styles.actionGradient}>
              <Text style={styles.retryText}>🔄 Try Again (New Questions)</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeBtn} onPress={handleHome} activeOpacity={0.88}>
            <Text style={styles.homeBtnText}>🏠 Back to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function StatItem({icon, label, value, color}: {icon: string; label: string; value: string; color: string}) {
  return (
    <View style={[styles.statItem, {borderColor: color + '40'}]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, {color}]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {paddingHorizontal: Spacing['2xl'], paddingTop: 52, paddingBottom: 40},
  heroCard: {borderRadius: BorderRadius['2xl'], overflow: 'hidden', marginBottom: Spacing.xl, elevation: 10, shadowColor: '#000', shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.4, shadowRadius: 16},
  heroGradient: {padding: Spacing['3xl'], alignItems: 'center'},
  statusEmoji: {fontSize: 56, marginBottom: Spacing.lg},
  statusTitle: {fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.black, color: 'white', marginBottom: Spacing.sm, textAlign: 'center'},
  statusSubtitle: {fontSize: Typography.fontSize.md, color: 'rgba(255,255,255,0.75)', textAlign: 'center', marginBottom: Spacing['2xl'], lineHeight: 22},
  scoreCircle: {width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xl, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)'},
  scoreMain: {fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.black, color: 'white'},
  scoreLabel: {fontSize: Typography.fontSize.sm, color: 'rgba(255,255,255,0.7)'},
  heroMeta: {flexDirection: 'row', alignItems: 'center', gap: Spacing.sm},
  heroMetaText: {fontSize: Typography.fontSize.sm, color: 'rgba(255,255,255,0.7)'},
  heroDot: {color: 'rgba(255,255,255,0.4)'},
  statsGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, marginBottom: Spacing.xl},
  statItem: {flex: 1, minWidth: (width - Spacing['2xl'] * 2 - Spacing.md) / 2, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center', borderWidth: 1},
  statIcon: {fontSize: 24, marginBottom: Spacing.xs},
  statValue: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, marginBottom: 2},
  statLabel: {fontSize: Typography.fontSize.sm, color: Colors.textMuted},
  levelCard: {borderRadius: BorderRadius.xl, overflow: 'hidden', marginBottom: Spacing.xl},
  levelCardGradient: {padding: Spacing.xl, borderWidth: 1, borderColor: Colors.primary + '50'},
  levelCardTitle: {fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.sm},
  levelCardDesc: {fontSize: Typography.fontSize.md, color: Colors.textSecondary, marginBottom: Spacing.lg},
  levelProgress: {height: 6, backgroundColor: Colors.surfaceHighlight, borderRadius: BorderRadius.full, overflow: 'hidden'},
  levelProgressFill: {width: '100%', height: '100%', backgroundColor: Colors.primary, borderRadius: BorderRadius.full},
  reviewTitle: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.lg},
  reviewCard: {backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginBottom: Spacing.md, borderWidth: 1},
  reviewCorrect: {borderColor: Colors.success + '50'},
  reviewWrong: {borderColor: Colors.error + '50'},
  reviewHeader: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm},
  reviewNum: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold, color: Colors.textMuted},
  reviewCorrectBadge: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold, color: Colors.success},
  reviewWrongBadge: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold, color: Colors.error},
  reviewQuestion: {fontSize: Typography.fontSize.md, color: Colors.textPrimary, fontWeight: Typography.fontWeight.medium, marginBottom: Spacing.sm, lineHeight: 20},
  reviewCorrectAnswer: {fontSize: Typography.fontSize.sm, color: Colors.success, marginBottom: 2},
  reviewWrongAnswer: {fontSize: Typography.fontSize.sm, color: Colors.error},
  reviewSkipped: {fontSize: Typography.fontSize.sm, color: Colors.textMuted},
  actions: {gap: Spacing.md, marginTop: Spacing.xl},
  nextLevelBtn: {borderRadius: BorderRadius.lg, overflow: 'hidden', elevation: 6, shadowColor: '#6C63FF', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.4, shadowRadius: 8},
  retryBtn: {borderRadius: BorderRadius.lg, overflow: 'hidden'},
  homeBtn: {paddingVertical: 14, alignItems: 'center'},
  actionGradient: {paddingVertical: 16, alignItems: 'center'},
  actionText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: 'white'},
  retryText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary},
  homeBtnText: {fontSize: Typography.fontSize.md, color: Colors.textMuted, fontWeight: Typography.fontWeight.medium},
});
