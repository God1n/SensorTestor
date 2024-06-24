import {StyleSheet} from 'react-native';
import {getScaleNumber} from '../../../utils/dimentions/RefDimentions';
import Colors from '../../../utils/colors/Colors';

const styles = StyleSheet.create({
  container: {},
  text: {
    color: Colors.quaternary,
    fontSize: getScaleNumber(14),
    fontWeight: 'normal',
  },
});

export default styles;
