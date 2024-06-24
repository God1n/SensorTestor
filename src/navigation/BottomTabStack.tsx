/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/BottomTabs/Home';
import Settings from '../pages/BottomTabs/Settings';
import BottomTabBarOne from '../components/elements/BottomTabsOne/BottomTabsOne';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabsIconMap} from '../components/elements/elementTypes';
import {AppStackParameterList} from './AppStack';

export type BottomTabStackParameterList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabStackParameterList>();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
};

const iconList: BottomTabsIconMap = {
  Home: {
    name: 'home',
    group: 'Ionicons',
  },
  Settings: {
    name: 'settings',
    group: 'MaterialIcons',
  },
};

const BottomTabStack: React.FC<
  NativeStackScreenProps<AppStackParameterList, 'BottomTabs'>
> = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBar={props => <BottomTabBarOne icons={iconList} {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
