import {StyleSheet} from 'react-native';
import Colors from '../../../../utils/colors/Colors';

const boxShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors['light-green'],
    borderRadius: 10,
    padding: 10,
    margin: 10,
    ...boxShadow,
  },
});

export default styles;
