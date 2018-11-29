import {AsyncStorage} from 'react-native'

class LocalState {
  constructor () {
    this.data = {
      USER_TOKEN: null,
      USER_ID: null,
      TEAM_ID: null,
      SERVER_URL: null
    }

    this.as = AsyncStorage

    // Preload
    this.userToken
    this.userID
    this.teamID
    this.serverURL
    this.onLogout = (() => {})
    this.onTeamChange = (() => {})
  }

  async logout () {
    await AsyncStorage.multiRemove(['USER_TOKEN','USER_ID', 'TEAM_ID'])
    // this.userToken = null
    // this.userID = null
    // this.teamID = null
    this.preload().then(() => {
      this.onLogout()
    })
  }

  async preload () {
    for (let key in this.data) {
      console.log('Loading: ', key)
      await this.load(key)
    }
  }

  get userToken () { return this.get('USER_TOKEN') }
  set userToken (value) { this.set('USER_TOKEN', value) }

  get userID () { return this.get('USER_ID') }
  set userID (value) { this.set('USER_ID', value) }

  get teamID () { return this.get('TEAM_ID') }
  set teamID (value) { 
    this.set('TEAM_ID', value) 
    this.onTeamChange()
  }

  get serverURL () { return this.get('SERVER_URL') }
  set serverURL (value) { this.set('SERVER_URL', value) }

  get (key) {
    this.load(key)
    return this.data[key]
  }

  load (key) {
    return AsyncStorage.getItem(key).then((value) => this.data[key] = value)
  }
  
  set (key, value) {
    this.write(key, value)
    this.data[key] = value
    return true
  }

  write (key, value) {
    if (value) {
      return AsyncStorage.setItem(key, String(value)) 
    } else {
      console.log('Removing: ', key)
      return AsyncStorage.removeItem(key, (...e) => {
        console.log('AsyncStorage Error: ', e, 'key: ', key, 'value: ', value)
      }) 
    }
  }
}

export default localState = new LocalState()