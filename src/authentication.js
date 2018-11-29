import { authorize } from 'react-native-app-auth'

const authenticate = {}

authenticate.google = async function () {
  const GOOGLE_OAUTH_APP_GUID = '1001377305812-c6kmpsr0llmokeqba2r9rdo3peg3dlhg'

  const config = {
    issuer: 'https://accounts.google.com',
    clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
    redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
    scopes: ['openid', 'email', 'profile']
  }

  const authData = await authorize(config);
  const {accessToken} = authData
  return accessToken
}

export {authenticate}