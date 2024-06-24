/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, useWindowDimensions} from 'react-native';
import styles from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import IconButton from './IconButton';
import {BottomTabsIconMap} from '../elementTypes';

const padding = 16;

const BottomTabBarOne: React.FC<
  BottomTabBarProps & {icons: BottomTabsIconMap}
> = ({icons, state, descriptors, navigation}) => {
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const pointerStyle = useAnimatedStyle(() => {
    return {
      width: (width - padding * 2) / state.routes.length,
      transform: [{translateX: translateX.value}],
    };
  });
  useEffect(() => {
    translateX.value = withSpring(
      ((width - padding * 2) / state.routes.length) * state.index,
      {
        stiffness: 500,
        damping: 55,
        mass: 3,
      },
    );
  }, [state.index]);

  useEffect(() => {
    translateX.value = withSpring(
      ((width - padding * 2) / state.routes.length) * state.index,
      {
        stiffness: 500,
        damping: 55,
        mass: 3,
      },
    );
  }, [width]);
  return (
    <View style={[styles.tabBarContainer]}>
      <View style={[styles.tabBarAnimatedContainer]}>
        <Animated.View style={[styles.animatedView, pointerStyle]} />
      </View>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <IconButton
            icon={icons[label as keyof BottomTabsIconMap]}
            key={route.key}
            label={label}
            isFocused={isFocused}
            options={options}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

export default BottomTabBarOne;
