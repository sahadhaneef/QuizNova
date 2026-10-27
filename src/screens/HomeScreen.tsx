import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius, Gradients} from '../theme';
import {useUserStore} from '../store/useUserStore';
import {ALL_CATEGORIES, Category} from '../data/questions';
import {getCategoryIcon, getLevelTitle} from '../utils/quizEngine';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../navigation/AppNavigator';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const CATEGORY_GRADIENTS: Record<string, readonly [string, string]> = {
  Science: ['#1D4ED8', '#3B82F6'],
  Geography: ['#047857', '#10B981'],
  History: ['#92400E', '#F59E0B'],
  Technology: ['#4338CA', '#6C63FF'],
  Mathematics: ['#B91C1C', '#EF4444'],
  'General Knowledge': ['#5B21B6', '#8B5CF6'],
  Nature: ['#14532D', '#22C55E'],
  Entertainment: ['#9D174D', '#EC4899'],
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const {user, stats} = useUserStore();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {toValue: 1, duration: 600, useNativeDriver: true}),
      Animated.spring(slideAnim, {toValue: 0, friction: 8, useNativeDriver: true}),
    ]).start();
  }, []);

  const accuracy = stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0;
  const xpForNext = stats.level * 100;
  const xpProgress = Math.min(stats.xp % xpForNext, xpForNext);
  const xpPercent = xpForNext > 0 ? xpProgress / xpForNext : 0;

  const handleStartMixed = () => {
    navigation.navigate('Quiz', {category: 'Mixed', level: stats.level});
  };

  const handleCategory = (category: Category) => {
    navigation.navigate('Quiz', {category, level: stats.level});
  };

  return (
    <LinearGradient colors={['#0F0E17', '#1A1933']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Animated.View style={[styles.headerSection, {opacity: fadeAnim, transform: [{translateY: slideAnim}]}]}>
          <LinearGradient colors={['#1A1933', '#2A2650']} style={styles.header}>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.greeting}>Good {getTimeOfDay()}, 👋</Text>
                <Text style={styles.userName}>{user?.name ?? 'Learner'}</Text>
              </View>
              <LinearGradient colors={['#6C63FF', '#A855F7']} style={styles.avatar}>
                <Text style={styles.avatarText}>{(user?.name ?? 'Q')[0].toUpperCase()}</Text>
              </LinearGradient>
            </View>

            {/* Level & XP */}
            <View style={styles.levelRow}>
              <LinearGradient colors={['#6C63FF', '#A855F7']} style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>Lv. {stats.level}</Text>
              </LinearGradient>
              <Text style={styles.levelTitle}>{getLevelTitle(stats.level)}</Text>
            </View>
            <View style={styles.xpBar}>
              <View style={[styles.xpFill, {width: `${Math.min(xpPercent * 100, 100)}%` as any}]} />
            </View>
            <Text style={styles.xpText}>{xpProgress} / {xpForNext} XP</Text>
          </LinearGradient>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View style={[styles.statsRow, {opacity: fadeAnim}]}>
          <StatBox label="Quizzes" value={stats.totalQuizzesCompleted.toString()} icon="🏆" />
          <StatBox label="Correct" value={stats.totalCorrect.toString()} icon="✅" />
          <StatBox label="Accuracy" value={`${accuracy}%`} icon="🎯" />
        </Animated.View>

        {/* Mixed Quiz CTA */}
        <TouchableOpacity onPress={handleStartMixed} activeOpacity={0.88} style={styles.ctaWrapper}>
          <LinearGradient colors={['#6C63FF', '#A855F7']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.ctaCard}>
            <View style={styles.ctaLeft}>
              <Text style={styles.ctaLabel}>CHALLENGE MODE</Text>
              <Text style={styles.ctaTitle}>Mixed Quiz</Text>
              <Text style={styles.ctaDesc}>Random questions from all categories</Text>
            </View>
            <View style={styles.ctaRight}>
              <Text style={styles.ctaEmoji}>⚡</Text>
              <View style={styles.startBtn}>
                <Text style={styles.startBtnText}>Start →</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {ALL_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={styles.categoryCard}
              onPress={() => handleCategory(cat)}
              activeOpacity={0.85}>
              <LinearGradient
                colors={CATEGORY_GRADIENTS[cat] as [string, string]}
                style={styles.categoryGradient}>
                <Text style={styles.categoryIcon}>{getCategoryIcon(cat)}</Text>
                <Text style={styles.categoryName}>{cat}</Text>
                <Text style={styles.categoryQuestions}>20 Qs</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function StatBox({label, value, icon}: {label: string; value: string; icon: string}) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function getTimeOfDay(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {paddingBottom: 100},
  headerSection: {marginBottom: Spacing.xl},
  header: {padding: Spacing['2xl'], paddingTop: 52},
  headerTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl},
  greeting: {fontSize: Typography.fontSize.md, color: Colors.textSecondary, marginBottom: 4},
  userName: {fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary},
  avatar: {width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center'},
  avatarText: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: 'white'},
  levelRow: {flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md},
  levelBadge: {paddingHorizontal: 12, paddingVertical: 4, borderRadius: BorderRadius.full},
  levelBadgeText: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold, color: 'white'},
  levelTitle: {fontSize: Typography.fontSize.md, color: Colors.textSecondary, fontWeight: Typography.fontWeight.medium},
  xpBar: {height: 6, backgroundColor: Colors.surfaceHighlight, borderRadius: BorderRadius.full, overflow: 'hidden', marginBottom: Spacing.xs},
  xpFill: {height: '100%', backgroundColor: Colors.primaryLight, borderRadius: BorderRadius.full},
  xpText: {fontSize: Typography.fontSize.xs, color: Colors.textMuted},
  statsRow: {flexDirection: 'row', gap: Spacing.md, paddingHorizontal: Spacing['2xl'], marginBottom: Spacing.xl},
  statBox: {flex: 1, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: Colors.border},
  statIcon: {fontSize: 22, marginBottom: 4},
  statValue: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary},
  statLabel: {fontSize: Typography.fontSize.xs, color: Colors.textMuted, marginTop: 2},
  ctaWrapper: {marginHorizontal: Spacing['2xl'], marginBottom: Spacing.xl, borderRadius: BorderRadius.xl, overflow: 'hidden', elevation: 8, shadowColor: '#6C63FF', shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.5, shadowRadius: 12},
  ctaCard: {flexDirection: 'row', padding: Spacing['2xl'], justifyContent: 'space-between', alignItems: 'center'},
  ctaLeft: {flex: 1},
  ctaLabel: {fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.bold, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, marginBottom: 4},
  ctaTitle: {fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.black, color: 'white', marginBottom: 4},
  ctaDesc: {fontSize: Typography.fontSize.sm, color: 'rgba(255,255,255,0.75)'},
  ctaRight: {alignItems: 'center', gap: Spacing.sm},
  ctaEmoji: {fontSize: 36},
  startBtn: {backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: BorderRadius.full},
  startBtnText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: 'white'},
  sectionTitle: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginHorizontal: Spacing['2xl'], marginBottom: Spacing.lg},
  categoriesGrid: {flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing['2xl'], gap: Spacing.md},
  categoryCard: {width: (width - Spacing['2xl'] * 2 - Spacing.md) / 2, borderRadius: BorderRadius.xl, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8},
  categoryGradient: {padding: Spacing.xl, minHeight: 110, justifyContent: 'space-between'},
  categoryIcon: {fontSize: 30, marginBottom: Spacing.sm},
  categoryName: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: 'white'},
  categoryQuestions: {fontSize: Typography.fontSize.xs, color: 'rgba(255,255,255,0.7)', marginTop: 2},
});
