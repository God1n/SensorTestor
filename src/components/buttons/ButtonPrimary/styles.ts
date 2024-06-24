import {StyleSheet} from 'react-native';
import {getScaleNumber} from '../../../utils/dimentions/RefDimentions';
import Colors from '../../../utils/colors/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark,
    paddingHorizontal: getScaleNumber(20),
    paddingVertical: getScaleNumber(10),
    minHeight: getScaleNumber(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: getScaleNumber(10),
  },
  containerFill: {
    backgroundColor: Colors.tertiary,
    // paddingHorizontal: getScaleNumber(18),
    // paddingVertical: getScaleNumber(8),
    // minHeight: getScaleNumber(46),
    borderWidth: getScaleNumber(2),
    borderColor: Colors.dark,
  },
  text: {
    color: Colors.tertiary,
    fontSize: getScaleNumber(20),
    fontWeight: 'bold',
  },
  textFill: {
    color: Colors.dark,
  },
});

export default styles;
