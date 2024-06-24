import {ViewStyle, TextStyle, TouchableOpacityProps} from 'react-native';

export interface ITextButtonProps extends TouchableOpacityProps {
  /**
   * button text
   */
  label?: string;
  /**
   * button container style
   */
  style?: ViewStyle;
  /**
   * button text style
   */
  textStyle?: TextStyle;
  /**
   * button fill type
   */
  fill?: boolean;
}

export interface IButtonPrimaryProps extends TouchableOpacityProps {
  /**
   * button text
   */
  label?: string;
  /**
   * button container style
   */
  style?: ViewStyle;
  /**
   * button text style
   */
  textStyle?: TextStyle;
  /**
   * button fill type
   */
  fill?: boolean;
}
