import {StyleSheet} from 'react-native'

export const globalStyles = StyleSheet.create({
  debugBorder: {
    borderWidth: 1,
    borderColor: 'red'
  },

  bold: {
    fontWeight: 'bold'
  },

  redText: {
    color: 'red'
  },

  verticalAlignCenter: {
    alignItems: 'center',
    textAlignVertical: 'center'
  }
});

export function getStyles (...args) {
  return args.map((a) => globalStyles[a])
}
