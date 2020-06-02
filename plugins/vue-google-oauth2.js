import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: process.env.NUXT_ENV_GOOGLE_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/calendar',
  prompt: 'consent'
}
Vue.use(GAuth, gauthOption)
