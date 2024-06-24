import {
  ImageProps,
  ImageSourcePropType,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {BottomTabStackParameterList} from '../../navigation/BottomTabStack';
import {IconTypes} from './VectorIcon/VectorIconTypes';

export interface IImageViewProps extends ImageProps {
  /**
   * local image source for placeholder if you have any image to show when onError triggers.
   */
  placeholder?: ImageSourcePropType;
}

export interface IDescriptionTextProps extends TextProps {}

export interface IBottomTabIconButtonProps {
  icon?: {group: IconTypes; name: string};
  /**
   * Tab name
   */
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
      }) => ReactNode);
  /**
   * is the tab selected
   */
  isFocused: boolean;
  /**
   * options for icon button
   */
  options: BottomTabNavigationOptions;
  /**
   * onPress event
   */
  onPress: () => void;
  /**
   * onLongPress event
   */
  onLongPress: () => void;
}

export type BottomTabsIconMap = {
  [key in keyof BottomTabStackParameterList]: {group: IconTypes; name: string};
};

export interface ITextButtonProps extends TouchableOpacityProps {
  /**
   * button text
   */
  label: string;
  /**
   * button container style
   */
  style?: ViewStyle;
  /**
   * button text style
   */
  textStyle?: TextStyle;
}
