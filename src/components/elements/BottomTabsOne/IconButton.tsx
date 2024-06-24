import {Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {IBottomTabIconButtonProps} from '../elementTypes';
import VectorIcon from '../VectorIcon/VectorIcon';
import styles from './styles';
import Animated, {
  FadeInDown,
  FadeOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedVectorIcon = Animated.createAnimatedComponent(VectorIcon);

const IconButton: React.FC<IBottomTabIconButtonProps> = ({
  icon,
  label,
  isFocused,
  options,
  onPress,
  onLongPress,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = isFocused
      ? withTiming(1.6, {duration: 400})
      : withTiming(1, {duration: 400});
  }, [isFocused, scale]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.tabButtonContainer, options.tabBarItemStyle]}>
      <AnimatedVectorIcon
        type={icon?.group || 'MaterialIcons'}
        name={icon?.name || 'rocket'}
        style={[
          options.tabBarIconStyle,
          styles.tabIcon,
          animatedContainerStyle,
        ]}
      />
      {!isFocused && (
        <Animated.Text
          entering={FadeInDown.duration(300)}
          exiting={FadeOutDown.duration(300)}
          style={[styles.tabLabel, options.tabBarLabelStyle]}>
          {label as string}
        </Animated.Text>
      )}
    </Pressable>
  );
};

export default IconButton;
