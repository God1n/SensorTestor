import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {IButtonPrimaryProps} from '../buttonTypes';

const ButtonPrimary: React.FC<IButtonPrimaryProps> = ({
  style,
  textStyle,
  label,
  fill = true,
  ...restProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, fill && styles.containerFill]}
      {...restProps}>
      <Text style={[styles.text, textStyle, fill && styles.textFill]}>
        {label || 'Button'}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
