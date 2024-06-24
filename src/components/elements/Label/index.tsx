import {Text, TextProps} from 'react-native';
import React from 'react';
import styles from './styles';

interface ILabelProps extends TextProps {
  type: 'topic' | 'subtopic' | 'label';
}

const Label: React.FC<ILabelProps> = ({type, style, ...restProps}) => {
  return (
    <Text
      style={[
        type === 'topic'
          ? styles.topic
          : type === 'label'
          ? styles.label
          : type === 'subtopic'
          ? styles.subTopic
          : styles.text,
        style,
      ]}
      {...restProps}
    />
  );
};

export default Label;
