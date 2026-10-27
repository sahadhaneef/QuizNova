import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius} from '../theme';
import {useUserStore} from '../store/useUserStore';
import {getLevelTitle, getCategoryIcon} from '../utils/quizEngine';
import {ALL_CATEGORIES, Category} from '../data/questions';

const {width} = Dimensions.get('window');

export default function ProfileScreen() {
  const {user, stats, logout} = useUserStore();

  const accuracy = stats.totalQuestions > 0
    ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
    : 0;

  const avgScore = stats.totalQuizzesCompleted > 0
    ? (stats.totalScore / stats.totalQuizzesCompleted).toFixed(1)
    : '0.0';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', style: 'destructive', onPress: logout},
    ]);
  };

  return (
    <LinearGradient colors={['#0F0E17', '#1A1933']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Profile Header */}
        <LinearGradient colors={['#1A1933', '#2A2650']} style={styles.profileHeader}>
          <LinearGradient colors={['#6C63FF', '#A855F7']} style={styles.avatarLarge}>
            <Text style={styles.avatarText}>{(user?.name ?? 'Q')[0].toUpperCase()}</Text>
          </LinearGradient>
          <Text style={styles.profileName}>{user?.name ?? 'Learner'}</Text>
          <Text style={styles.profileEmail}>{user?.email ?? ''}</Text>

          <View style={styles.levelRow}>
            <LinearGradient colors={['#6C63FF', '#A855F7']} style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Level {stats.level}</Text>
            </LinearGradient>
            <Text style={styles.levelTitle}>{getLevelTitle(stats.level)}</Text>
            {stats.currentStreak > 0 && (
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>🔥 {stats.currentStreak}</Text>
              </View>
            )}
          </View>
        </LinearGradient>

        {/* Overall Stats */}
        <Text style={styles.sectionTitle}>Overall Performance</Text>
        <View style={styles.statsGrid}>
          <MiniStat label="Total Quizzes" value={stats.totalQuizzesCompleted.toString()} icon="🏆" color={Colors.primary} />
          <MiniStat label="Questions" value={stats.totalQuestions.toString()} icon="❓" color={Colors.accent} />
          <MiniStat label="Correct" value={stats.totalCorrect.toString()} icon="✅" color={Colors.success} />
          <MiniStat label="Wrong" value={stats.totalIncorrect.toString()} icon="❌" color={Colors.error} />
          <MiniStat label="Accuracy" value={`${accuracy}%`} icon="🎯" color={Colors.primaryLight} />
          <MiniStat label="Best Score" value={`${stats.bestScore}/10`} icon="⭐" color={Colors.accentLight} />
          <MiniStat label="Avg Score" value={`${avgScore}/10`} icon="📊" color={Colors.primaryLight} />
          <MiniStat label="Highest Lv." value={`Lv.${stats.highestLevel}`} icon="🚀" color={Colors.expert} />
        </View>

        {/* Streak Section */}
        <View style={styles.streakCard}>
          <LinearGradient colors={['#1A1933', '#2A2650']} style={styles.streakCardInner}>
            <View style={styles.streakRow}>
              <View style={styles.streakItem}>
                <Text style={styles.streakEmoji}>🔥</Text>
                <Text style={styles.streakValue}>{stats.currentStreak}</Text>
                <Text style={styles.streakLabel}>Current Streak</Text>
              </View>
              <View style={styles.streakDivider} />
              <View style={styles.streakItem}>
                <Text style={styles.streakEmoji}>⚡</Text>
                <Text style={styles.streakValue}>{stats.highestStreak}</Text>
                <Text style={styles.streakLabel}>Best Streak</Text>
              </View>
              <View style={styles.streakDivider} />
              <View style={styles.streakItem}>
                <Text style={styles.streakEmoji}>💎</Text>
                <Text style={styles.streakValue}>{stats.xp}</Text>
                <Text style={styles.streakLabel}>Total XP</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Category Performance */}
        <Text style={styles.sectionTitle}>Category Performance</Text>
        <View style={styles.categoryList}>
          {ALL_CATEGORIES.map(cat => {
            const catStat = stats.categoryStats[cat as keyof typeof stats.categoryStats];
            const catAccuracy = catStat && catStat.total > 0
              ? Math.round((catStat.correct / catStat.total) * 100)
              : 0;
            const catProgress = catAccuracy / 100;
            return (
              <View key={cat} style={styles.categoryItem}>
                <View style={styles.categoryItemHeader}>
                  <Text style={styles.categoryItemIcon}>{getCategoryIcon(cat)}</Text>
                  <View style={styles.categoryItemInfo}>
                    <Text style={styles.categoryItemName}>{cat}</Text>
                    <Text style={styles.categoryItemStats}>
                      {catStat?.quizzes ?? 0} quiz{catStat?.quizzes !== 1 ? 'zes' : ''} •{' '}
                      {catStat?.correct ?? 0} correct • {catAccuracy}%
                    </Text>
                  </View>
                  <Text style={styles.categoryItemPercent}>{catAccuracy}%</Text>
                </View>
                <View style={styles.categoryBar}>
                  <View style={[styles.categoryBarFill, {
                    width: `${catAccuracy}%`,
                    backgroundColor: catAccuracy >= 70 ? Colors.success : catAccuracy >= 40 ? Colors.warning : Colors.error,
                  }]} />
                </View>
              </View>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

function MiniStat({label, value, icon, color}: {label: string; value: string; icon: string; color: string}) {
  return (
    <View style={[styles.miniStat, {borderColor: color + '30'}]}>
      <Text style={styles.miniStatIcon}>{icon}</Text>
      <Text style={[styles.miniStatValue, {color}]}>{value}</Text>
      <Text style={styles.miniStatLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {paddingBottom: 100},
  profileHeader: {padding: Spacing['2xl'], paddingTop: 60, alignItems: 'center', marginBottom: Spacing.xl},
  avatarLarge: {width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg},
  avatarText: {fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.black, color: 'white'},
  profileName: {fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.xs},
  profileEmail: {fontSize: Typography.fontSize.md, color: Colors.textMuted, marginBottom: Spacing.lg},
  levelRow: {flexDirection: 'row', alignItems: 'center', gap: Spacing.md},
  levelBadge: {paddingHorizontal: 12, paddingVertical: 4, borderRadius: BorderRadius.full},
  levelBadgeText: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold, color: 'white'},
  levelTitle: {fontSize: Typography.fontSize.md, color: Colors.textSecondary},
  streakBadge: {backgroundColor: '#7F1D1D', paddingHorizontal: 12, paddingVertical: 4, borderRadius: BorderRadius.full},
  streakText: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.bold, color: 'white'},
  sectionTitle: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginHorizontal: Spacing['2xl'], marginBottom: Spacing.lg},
  statsGrid: {flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.md, paddingHorizontal: Spacing['2xl'], marginBottom: Spacing.xl},
  miniStat: {width: (width - Spacing['2xl'] * 2 - Spacing.md * 3) / 4, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md, alignItems: 'center', borderWidth: 1},
  miniStatIcon: {fontSize: 20, marginBottom: 4},
  miniStatValue: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, marginBottom: 2},
  miniStatLabel: {fontSize: 9, color: Colors.textMuted, textAlign: 'center'},
  streakCard: {marginHorizontal: Spacing['2xl'], marginBottom: Spacing.xl, borderRadius: BorderRadius.xl, overflow: 'hidden'},
  streakCardInner: {padding: Spacing.xl, borderWidth: 1, borderColor: Colors.border},
  streakRow: {flexDirection: 'row', alignItems: 'center'},
  streakItem: {flex: 1, alignItems: 'center'},
  streakEmoji: {fontSize: 28, marginBottom: 4},
  streakValue: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary},
  streakLabel: {fontSize: Typography.fontSize.xs, color: Colors.textMuted, marginTop: 2},
  streakDivider: {width: 1, height: 60, backgroundColor: Colors.border},
  categoryList: {marginHorizontal: Spacing['2xl'], marginBottom: Spacing.xl, gap: Spacing.md},
  categoryItem: {backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.lg, borderWidth: 1, borderColor: Colors.border},
  categoryItemHeader: {flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md},
  categoryItemIcon: {fontSize: 24},
  categoryItemInfo: {flex: 1},
  categoryItemName: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textPrimary},
  categoryItemStats: {fontSize: Typography.fontSize.xs, color: Colors.textMuted, marginTop: 2},
  categoryItemPercent: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: Colors.primaryLight},
  categoryBar: {height: 6, backgroundColor: Colors.surfaceHighlight, borderRadius: BorderRadius.full, overflow: 'hidden'},
  categoryBarFill: {height: '100%', borderRadius: BorderRadius.full},
  logoutBtn: {marginHorizontal: Spacing['2xl'], marginBottom: Spacing['3xl'], paddingVertical: 14, backgroundColor: Colors.surfaceHighlight, borderRadius: BorderRadius.lg, alignItems: 'center', borderWidth: 1, borderColor: Colors.error + '40'},
  logoutText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.error},
});
