import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CounterScreen from '@screens/CounterScreen';
import KnowledgeBaseScreen from '@screens/KnowledgeBaseScreen';
import TutorialDetailScreen from '@screens/TutorialDetailScreen';
import {AppTheme} from '@theme/index';
import {Tutorial} from '@data/tutorials';

export type RootTabParamList = {
  Counter: undefined;
  KnowledgeBase: undefined;
};

export type KnowledgeBaseStackParamList = {
  KnowledgeBaseHome: undefined;
  TutorialDetail: {tutorial: Tutorial};
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const KBStack = createNativeStackNavigator<KnowledgeBaseStackParamList>();

function KnowledgeBaseStack() {
  return (
    <KBStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <KBStack.Screen name="KnowledgeBaseHome" component={KnowledgeBaseScreen} />
      <KBStack.Screen name="TutorialDetail" component={TutorialDetailScreen} />
    </KBStack.Navigator>
  );
}

export default function AppNavigator() {
  const theme = useTheme<AppTheme>();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
            borderTopWidth: 1,
            height: 84,
            paddingBottom: 24,
            paddingTop: 8,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            letterSpacing: 0.4,
          },
          tabBarIcon: ({color, size, focused}) => {
            let iconName = 'help';
            if (route.name === 'Counter') {
              iconName = focused ? 'counter' : 'counter';
            } else if (route.name === 'KnowledgeBase') {
              iconName = focused ? 'book-open' : 'book-open-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name="Counter"
          component={CounterScreen}
          options={{tabBarLabel: 'Counter'}}
        />
        <Tab.Screen
          name="KnowledgeBase"
          component={KnowledgeBaseStack}
          options={{tabBarLabel: 'Learn'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
