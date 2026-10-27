import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, Spacing, BorderRadius} from '../theme';
import {useUserStore} from '../store/useUserStore';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

const {width} = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

export default function AuthScreen({navigation}: Props) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; password?: string}>({});
  const slideAnim = useRef(new Animated.Value(0)).current;

  const {login, signup, user} = useUserStore();

  // Redirect when login/signup succeeds
  useEffect(() => {
    if (user) {
      navigation.replace('MainTabs');
    }
  }, [user]);

  const switchTab = (newTab: 'login' | 'signup') => {
    setTab(newTab);
    setErrors({});
    Animated.spring(slideAnim, {
      toValue: newTab === 'signup' ? 1 : 0,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (tab === 'signup' && !name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (tab === 'login') {
        const result = await login(email, password);
        if (!result.success) {
          Alert.alert('Login Failed', result.error);
        }
      } else {
        const result = await signup(name, email, password);
        if (!result.success) {
          Alert.alert('Sign Up Failed', result.error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const tabX = slideAnim.interpolate({inputRange: [0, 1], outputRange: [0, width / 2 - 36]});

  return (
    <LinearGradient colors={['#0F0E17', '#1A1933', '#221F3B']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient colors={['#6C63FF', '#A855F7']} style={styles.logoSmall}>
              <Text style={styles.logoEmoji}>⚡</Text>
            </LinearGradient>
            <Text style={styles.appName}>QuizNova</Text>
            <Text style={styles.subtitle}>
              {tab === 'login' ? 'Welcome back! Ready to challenge yourself?' : 'Join thousands of learners worldwide'}
            </Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* Tab switcher */}
            <View style={styles.tabBar}>
              <Animated.View style={[styles.tabIndicator, {transform: [{translateX: tabX}]}]} />
              <TouchableOpacity style={styles.tabBtn} onPress={() => switchTab('login')}>
                <Text style={[styles.tabText, tab === 'login' && styles.tabTextActive]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabBtn} onPress={() => switchTab('signup')}>
                <Text style={[styles.tabText, tab === 'signup' && styles.tabTextActive]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Fields */}
            <View style={styles.form}>
              {tab === 'signup' && (
                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                    <Text style={styles.inputIcon}>👤</Text>
                    <TextInput
                      style={styles.input}
                      value={name}
                      onChangeText={setName}
                      placeholder="Your name"
                      placeholderTextColor={Colors.textMuted}
                      autoCapitalize="words"
                    />
                  </View>
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>
              )}

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                  <Text style={styles.inputIcon}>✉️</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="you@example.com"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Min. 6 characters"
                    placeholderTextColor={Colors.textMuted}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85} disabled={loading}>
                <LinearGradient colors={['#6C63FF', '#A855F7']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.submitGradient}>
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.submitText}>{tab === 'login' ? 'Login' : 'Create Account'}</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => switchTab(tab === 'login' ? 'signup' : 'login')}>
                <Text style={styles.switchText}>
                  {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <Text style={styles.switchLink}>{tab === 'login' ? 'Sign Up' : 'Login'}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  flex: {flex: 1},
  scroll: {flexGrow: 1, paddingHorizontal: Spacing['2xl'], paddingTop: 60, paddingBottom: 40},
  header: {alignItems: 'center', marginBottom: Spacing['3xl']},
  logoSmall: {width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.lg},
  logoEmoji: {fontSize: 28},
  appName: {fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.black, color: Colors.textPrimary, marginBottom: Spacing.sm},
  subtitle: {fontSize: Typography.fontSize.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22},
  card: {backgroundColor: Colors.surface, borderRadius: BorderRadius['2xl'], padding: Spacing['2xl'], borderWidth: 1, borderColor: Colors.border, elevation: 8, shadowColor: '#000', shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.3, shadowRadius: 16},
  tabBar: {flexDirection: 'row', backgroundColor: Colors.surfaceHighlight, borderRadius: BorderRadius.lg, padding: 4, marginBottom: Spacing['2xl'], position: 'relative'},
  tabIndicator: {position: 'absolute', top: 4, left: 4, width: '50%', height: '100%', backgroundColor: Colors.primary, borderRadius: BorderRadius.md},
  tabBtn: {flex: 1, paddingVertical: 10, alignItems: 'center'},
  tabText: {fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.textMuted},
  tabTextActive: {color: Colors.textPrimary},
  form: {gap: Spacing.lg},
  fieldGroup: {gap: Spacing.xs},
  label: {fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semibold, color: Colors.textSecondary, marginLeft: 4},
  inputWrapper: {flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceHighlight, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.lg, gap: Spacing.sm},
  inputError: {borderColor: Colors.error},
  inputIcon: {fontSize: 18},
  input: {flex: 1, fontSize: Typography.fontSize.md, color: Colors.textPrimary, paddingVertical: 14},
  eyeIcon: {fontSize: 20, padding: 4},
  errorText: {fontSize: Typography.fontSize.sm, color: Colors.error, marginLeft: 4},
  submitBtn: {borderRadius: BorderRadius.lg, overflow: 'hidden', marginTop: Spacing.sm, elevation: 6, shadowColor: '#6C63FF', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.4, shadowRadius: 8},
  submitGradient: {paddingVertical: 16, alignItems: 'center'},
  submitText: {fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary},
  switchText: {fontSize: Typography.fontSize.md, color: Colors.textMuted, textAlign: 'center', marginTop: Spacing.sm},
  switchLink: {color: Colors.primaryLight, fontWeight: Typography.fontWeight.semibold},
});
