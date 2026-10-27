import React from 'react';
import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Colors, Typography, Spacing} from '../theme';
import {Category} from '../data/questions';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  MainTabs: undefined;
  Quiz: {category: Category | 'Mixed'; level: number};
  Result: {
    score: number;
    total: number;
    category: Category | 'Mixed';
    level: number;
    timeTaken: number;
    results: {
      questionText: string;
      selectedIndex: number | null;
      correctIndex: number;
      isCorrect: boolean;
      options: string[];
    }[];
    questionIds: string[];
    categoryBreakdown: {category: Category; correct: number; incorrect: number}[];
  };
};

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({icon, label, focused}: {icon: string; label: string; focused: boolean}) {
  return (
    <View style={[tabStyles.tabIcon, focused && tabStyles.tabIconActive]}>
      <Text style={tabStyles.icon}>{icon}</Text>
      <Text style={[tabStyles.label, focused && tabStyles.labelActive]}>{label}</Text>
      {focused && <View style={tabStyles.activeDot} />}
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyles.tabBar,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon icon="🏠" label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon icon="🧩" label="Quiz" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <TabIcon icon="👤" label="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'fade'}}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{animation: 'slide_from_right'}} />
        <Stack.Screen name="Result" component={ResultScreen} options={{animation: 'slide_from_bottom'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const tabStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#0F0E17',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    paddingTop: 8,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabIcon: {alignItems: 'center', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 12},
  tabIconActive: {backgroundColor: Colors.primary + '20'},
  icon: {fontSize: 22, marginBottom: 2},
  label: {fontSize: 10, color: Colors.textMuted, fontWeight: Typography.fontWeight.medium},
  labelActive: {color: Colors.primaryLight, fontWeight: Typography.fontWeight.bold},
  activeDot: {width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.primary, marginTop: 2},
});
