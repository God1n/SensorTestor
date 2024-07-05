import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
  },
  graphView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    height: 200,
    gap: 2,
  },
  graphColumn: {
    flex: 1,
    height: '100%',
    flexDirection: 'column-reverse',
  },
  columnHighlighted: {
    backgroundColor: 'red',
  },
  columnNormal: {
    backgroundColor: '#ffffff00',
  },
});

export default styles;
