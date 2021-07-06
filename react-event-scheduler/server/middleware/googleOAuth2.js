require('dotenv/config')
const { google } = require('googleapis')
const { OAuth2 } = google.auth

//get authorized user
function getOAuth(){
  
  const scope = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
  const clientIdNotEnv='820226227644-rt7ajb9e5vj0ufjm05jhre0vpii80are.apps.googleusercontent.com'
  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_SECRET
  const redirect_uri = 'http://localhost:5002/v0/auth/callback'
  
  const oAuth2Client = new OAuth2(clientId, clientSecret)
  
  const authUrl = oAuth2Client.generateAuthUrl({
    client_id: clientId,
    access_type: 'offline',
    scope: scope,
    response_type: 'code',
    redirect_uri
  })

  //console.log(authUrl)
  
}

module.exports = { getOAuth }