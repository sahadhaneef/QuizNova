import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius} from '../theme';
import {useUserStore} from '../store/useUserStore';
import {ALL_CATEGORIES, Category} from '../data/questions';
import {getCategoryIcon, getLevelTitle, getDifficultyMixForLevel} from '../utils/quizEngine';
import {useNavigation} from '@react-navigation/native';

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

export default function CategoryScreen() {
  const navigation = useNavigation<any>();
  const {stats} = useUserStore();

  const handleSelect = (category: Category | 'Mixed') => {
    navigation.navigate('Quiz', {category, level: stats.level});
  };

  const diffMix = getDifficultyMixForLevel(stats.level);
  const diffLabel = diffMix.map(d => `${d.count} ${d.difficulty}`).join(' + ');

  return (
    <LinearGradient colors={['#0F0E17', '#1A1933']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choose a Category</Text>
          <Text style={styles.headerSub}>Level {stats.level} • {getLevelTitle(stats.level)}</Text>
          <View style={styles.diffPill}>
            <Text style={styles.diffPillText}>Questions: {diffLabel}</Text>
          </View>
        </View>

        {/* Mixed Quiz Banner */}
        <TouchableOpacity style={styles.mixedCard} onPress={() => handleSelect('Mixed')} activeOpacity={0.88}>
          <LinearGradient colors={['#6C63FF', '#A855F7']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.mixedGradient}>
            <View>
              <Text style={styles.mixedLabel}>FEATURED</Text>
              <Text style={styles.mixedTitle}>⚡ Mixed Quiz</Text>
              <Text style={styles.mixedDesc}>Random questions from all 8 categories</Text>
            </View>
            <TouchableOpacity style={styles.mixedBtn} onPress={() => handleSelect('Mixed')}>
              <Text style={styles.mixedBtnText}>Start →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>

        {/* Category List */}
        <Text style={styles.sectionLabel}>Or pick a category</Text>
        {ALL_CATEGORIES.map(cat => {
          const catStat = stats.categoryStats[cat as keyof typeof stats.categoryStats];
          const accuracy = catStat && catStat.total > 0 ? Math.round((catStat.correct / catStat.total) * 100) : null;
          return (
            <TouchableOpacity
              key={cat}
              style={styles.catRow}
              onPress={() => handleSelect(cat)}
              activeOpacity={0.85}>
              <LinearGradient
                colors={CATEGORY_GRADIENTS[cat] as [string, string]}
                style={styles.catIconBox}>
                <Text style={styles.catIcon}>{getCategoryIcon(cat)}</Text>
              </LinearGradient>
              <View style={styles.catInfo}>
                <Text style={styles.catName}>{cat}</Text>
                <Text style={styles.catMeta}>20 questions • {stats.level === 1 ? 'All difficulties' : `Level ${stats.level}`}</Text>
              </View>
              {accuracy !== null && (
                <View style={styles.catAccuracy}>
                  <Text style={styles.catAccuracyNum}>{accuracy}%</Text>
                  <Text style={styles.catAccuracyLabel}>Accuracy</Text>
                </View>
              )}
              <Text style={styles.catArrow}>›</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {paddingHorizontal: Spacing['2xl'], paddingTop: 52, paddingBottom: 100},
  header: {marginBottom: Spacing.xl},
  headerTitle: {fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, marginBottom: 4},
  headerSub: {fontSize: Typography.fontSize.md, color: Colors.textSecondary, marginBottom: Spacing.md},
  diffPill: {backgroundColor: Colors.surfaceHighlight, paddingHorizontal: Spacing.lg, paddingVertical: 6, borderRadius: BorderRadius.full, alignSelf: 'flex-start'},
  diffPillText: {fontSize: Typography.fontSize.sm, color: Colors.textSecondary},
  mixedCard: {borderRadius: BorderRadius.xl, overflow: 'hidden', marginBottom: Spacing.xl, elevation: 8, shadowColor: '#6C63FF', shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.4, shadowRadius: 12},
  mixedGradient: {padding: Spacing['2xl'], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  mixedLabel: {fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.bold, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, marginBottom: 4},
  mixedTitle: {fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.black, color: 'white', marginBottom: 4},
  mixedDesc: {fontSize: Typography.fontSize.sm, color: 'rgba(255,255,255,0.75)'},
  mixedBtn: {backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: BorderRadius.full},
  mixedBtnText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: 'white'},
  sectionLabel: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textMuted, marginBottom: Spacing.lg},
  catRow: {flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing.lg, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border, gap: Spacing.md},
  catIconBox: {width: 48, height: 48, borderRadius: BorderRadius.lg, alignItems: 'center', justifyContent: 'center'},
  catIcon: {fontSize: 24},
  catInfo: {flex: 1},
  catName: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary},
  catMeta: {fontSize: Typography.fontSize.sm, color: Colors.textMuted, marginTop: 2},
  catAccuracy: {alignItems: 'center'},
  catAccuracyNum: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: Colors.primaryLight},
  catAccuracyLabel: {fontSize: Typography.fontSize.xs, color: Colors.textMuted},
  catArrow: {fontSize: Typography.fontSize['2xl'], color: Colors.textMuted},
});
