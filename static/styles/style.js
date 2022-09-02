import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    // flexDirection:'column',
    // flexWrap:'wrap',
    backgroundColor: '#111',
  },

  work: {
    minHeight: 125,
    justifyContent: 'center',
    marginLeft:'auto',
  },

  result: {
    minHeight: 125,
    justifyContent: 'center',
  },

  value: {
    color: '#3dc',
    marginRight: 10,
    fontSize: 30,
  },

  final: {
    color: '#e99',
    fontSize: 35,
    marginRight: 12,
  },

  resVal: {
    color: '#3dc',
    marginRight: 10,
    fontSize: 25,
    opacity: 0.8,
  },

  utils: {
    display: 'flex',
    flexDirection: 'row',
  },

  backB: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 20,
  },

  histB: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 20,
  },
});