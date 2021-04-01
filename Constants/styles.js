import {StyleSheet} from 'react-native';
import Colors from './colors';

export default StyleSheet.create({
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#e9e9e9',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonWrapper: {
    padding: 15,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
