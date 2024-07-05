import {Text, View} from 'react-native';
import React from 'react';
import styles from './styles';

interface PrimaryGraphProps {
  values: number[];
}

const PrimaryGraph: React.FC<PrimaryGraphProps> = ({values}) => {
  return (
    <View style={styles.container}>
      <Text>Primary Graph</Text>
      <View style={styles.graphView}>
        {values.map((value, index) => (
          <View key={index} style={styles.graphColumn}>
            <View style={[styles.columnHighlighted, {flex: value}]} />
            <View style={[styles.columnNormal, {flex: 4095 - value}]} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default PrimaryGraph;
