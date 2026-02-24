import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  RootTabParamList,
  ChecklistStackParamList,
  AttractionsStackParamList,
} from './types';
import {ChecklistScreen} from '../screens/checklist/ChecklistScreen';
import {ChecklistDetailScreen} from '../screens/checklist/ChecklistDetailScreen';
import {CurrencyScreen} from '../screens/currency/CurrencyScreen';
import {AppsScreen} from '../screens/apps/AppsScreen';
import {AttractionsScreen} from '../screens/attractions/AttractionsScreen';
import {CityDetailScreen} from '../screens/attractions/CityDetailScreen';
import {colors, typography} from '../theme';
import {strings} from '../constants/strings';

const Tab = createBottomTabNavigator<RootTabParamList>();
const ChecklistStack = createNativeStackNavigator<ChecklistStackParamList>();
const AttractionsStack =
  createNativeStackNavigator<AttractionsStackParamList>();

function ChecklistStackNavigator() {
  return (
    <ChecklistStack.Navigator screenOptions={{headerShown: false}}>
      <ChecklistStack.Screen name="Checklist" component={ChecklistScreen} />
      <ChecklistStack.Screen
        name="ChecklistDetail"
        component={ChecklistDetailScreen}
      />
    </ChecklistStack.Navigator>
  );
}

function AttractionsStackNavigator() {
  return (
    <AttractionsStack.Navigator screenOptions={{headerShown: false}}>
      <AttractionsStack.Screen
        name="Attractions"
        component={AttractionsScreen}
      />
      <AttractionsStack.Screen name="CityDetail" component={CityDetailScreen} />
    </AttractionsStack.Navigator>
  );
}

function ChecklistTabIcon({color, size}: {color: string; size: number}) {
  return <Icon name="checkbox-outline" size={size} color={color} />;
}

function CurrencyTabIcon({color, size}: {color: string; size: number}) {
  return <Icon name="cash-outline" size={size} color={color} />;
}

function AppsTabIcon({color, size}: {color: string; size: number}) {
  return <Icon name="apps-outline" size={size} color={color} />;
}

function AttractionsTabIcon({color, size}: {color: string; size: number}) {
  return <Icon name="map-outline" size={size} color={color} />;
}

export const RootNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.borderLight,
          paddingBottom: 4,
          height: 56,
        },
        tabBarLabelStyle: {
          ...typography.small,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="ChecklistTab"
        component={ChecklistStackNavigator}
        options={{
          tabBarLabel: strings.tabChecklist,
          tabBarIcon: ChecklistTabIcon,
        }}
      />
      <Tab.Screen
        name="CurrencyTab"
        component={CurrencyScreen}
        options={{
          tabBarLabel: strings.tabCurrency,
          tabBarIcon: CurrencyTabIcon,
        }}
      />
      <Tab.Screen
        name="AppsTab"
        component={AppsScreen}
        options={{
          tabBarLabel: strings.tabApps,
          tabBarIcon: AppsTabIcon,
        }}
      />
      <Tab.Screen
        name="AttractionsTab"
        component={AttractionsStackNavigator}
        options={{
          tabBarLabel: strings.tabAttractions,
          tabBarIcon: AttractionsTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};
