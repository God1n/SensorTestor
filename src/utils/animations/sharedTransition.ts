import {SharedTransition, withSpring} from 'react-native-reanimated';

export const transitionOne = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

const transitionTwoSpringConfig = {
  mass: 1,
  stiffness: 100,
  damping: 200,
};
export const transitionTwo = SharedTransition.custom(values => {
  'worklet';
  return {
    height: withSpring(values.targetHeight, transitionTwoSpringConfig),
    width: withSpring(values.targetWidth, transitionTwoSpringConfig),
    originX: withSpring(values.targetOriginX, transitionTwoSpringConfig),
    originY: withSpring(values.targetOriginY, transitionTwoSpringConfig),
  };
});
