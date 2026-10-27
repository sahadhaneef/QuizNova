import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius} from '../theme';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useUserStore} from '../store/useUserStore';

const {width, height} = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({navigation}: Props) {
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(30)).current;
  const glowOpacity = useRef(new Animated.Value(0.4)).current;
  const {initialize, user} = useUserStore();

  useEffect(() => {
    // Initialize stored user first
    initialize().then(() => {});

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {toValue: 1, duration: 1500, useNativeDriver: true}),
        Animated.timing(glowOpacity, {toValue: 0.4, duration: 1500, useNativeDriver: true}),
      ]),
    ).start();

    // Entrance animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {toValue: 1, friction: 6, tension: 40, useNativeDriver: true}),
        Animated.timing(logoOpacity, {toValue: 1, duration: 600, useNativeDriver: true}),
      ]),
      Animated.timing(taglineOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.parallel([
        Animated.timing(buttonOpacity, {toValue: 1, duration: 500, useNativeDriver: true}),
        Animated.spring(buttonTranslateY, {toValue: 0, friction: 8, useNativeDriver: true}),
      ]),
    ]).start();
  }, []);

  // Auto-redirect when user is found
  useEffect(() => {
    if (user) {
      navigation.replace('MainTabs');
    }
  }, [user]);


  return (
    <LinearGradient colors={['#0F0E17', '#1A1933', '#2D1B69']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background decorative circles */}
      <Animated.View style={[styles.bgCircle, styles.bgCircle1, {opacity: glowOpacity}]} />
      <Animated.View style={[styles.bgCircle, styles.bgCircle2, {opacity: glowOpacity}]} />

      <Animated.View style={[styles.logoContainer, {opacity: logoOpacity, transform: [{scale: logoScale}]}]}>
        {/* Logo */}
        <Animated.View style={[styles.logoGlow, {opacity: glowOpacity}]} />
        <LinearGradient colors={['#6C63FF', '#A855F7']} style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>⚡</Text>
        </LinearGradient>
        <Text style={styles.appName}>QuizNova</Text>
      </Animated.View>

      <Animated.Text style={[styles.tagline, {opacity: taglineOpacity}]}>
        Learn. Challenge. Level Up.
      </Animated.Text>

      <Animated.View style={[styles.buttonContainer, {opacity: buttonOpacity, transform: [{translateY: buttonTranslateY}]}]}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.replace('Auth')}
          activeOpacity={0.85}>
          <LinearGradient colors={['#6C63FF', '#A855F7']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.version}>v1.0.0</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing['2xl']},
  bgCircle: {position: 'absolute', borderRadius: 999},
  bgCircle1: {width: 300, height: 300, backgroundColor: 'rgba(108,99,255,0.12)', top: -50, right: -80},
  bgCircle2: {width: 250, height: 250, backgroundColor: 'rgba(168,85,247,0.1)', bottom: 100, left: -60},
  logoContainer: {alignItems: 'center', marginBottom: Spacing['3xl']},
  logoGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(108,99,255,0.3)',
    top: -10,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  logoEmoji: {fontSize: 52},
  appName: {
    fontSize: Typography.fontSize['5xl'],
    fontWeight: Typography.fontWeight.black,
    color: Colors.textPrimary,
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: Spacing['6xl'],
    fontWeight: Typography.fontWeight.medium,
  },
  buttonContainer: {width: '100%', maxWidth: 300},
  getStartedButton: {borderRadius: BorderRadius.xl, overflow: 'hidden', elevation: 8, shadowColor: '#6C63FF', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 12},
  buttonGradient: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, paddingHorizontal: Spacing['3xl'], gap: 8},
  buttonText: {fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary, letterSpacing: 0.5},
  buttonArrow: {fontSize: Typography.fontSize.xl, color: Colors.textPrimary},
  version: {position: 'absolute', bottom: 32, color: Colors.textMuted, fontSize: Typography.fontSize.sm},
});
