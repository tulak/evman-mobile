import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  nameWrapper: {
    alignItems: 'flex-start',
    flex: 1
  },

  eventListName: {
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },

  eventListDate: {
    paddingVertical: 5,
    paddingRight: 5,
    paddingLeft: 20,
  },

  verticalYear: {
    position: 'absolute',
    bottom: 17,
    left: 0,
    fontSize: 15, 
    transform: [{rotate:'-90deg'}]
  },

  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  location: {
    alignSelf: 'flex-start'
  },

  date: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center'
  },

  basePadding: {
    paddingHorizontal: 10,
    paddingVertical: 3
  },

  baseMargin: {
    marginHorizontal: 2,
  },

  textBox: {
    paddingRight: 5,
    fontSize: 15,
    // borderWidth: 1
  },

  icon: {
    width:35,
    fontSize: 22,
    // borderWidth: 1,
    textAlign: 'center'
  },

  row: {
    flexDirection: 'row',
    alignItems:'center', 
    justifyContent: 'flex-start',
  },

  header: {
    paddingVertical: 15,
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 1
  },

  tabsContainer: {
    height: 38
  },

  dataItemContainer: {
    padding: 10
  },

  dataItemValue: {
    flex: 1, 
    textAlign: 'right', 
    paddingLeft: 20
  }
})