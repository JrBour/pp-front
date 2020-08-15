export default {
  mode: 'universal',
  env: {
    API_URL: process.env.API_URL || 'http://localhost/'
  },
  telemetry: false,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    title: 'Plevent',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/vue-google-oauth2.js', ssr: false },
    { src: '~/plugins/webcam', mode: 'client', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/onesignal',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    'vue-web-cam/nuxt'
  ],

  oneSignal: {
    init: {
      appId:
        process.env.NUXT_ENV_APP_ID || '6243e402-acfa-476c-aac5-7a89fd9d8e64',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false
      }
    }
  },

  pwa: {
    manifest: {
      name: 'Plevent',
      lang: 'fr'
    },
    workbox: {
      dev: false,
      offlineStrategy: 'StaleWhileRevalidate'
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */

  build: {
    extend(config, ctx) {}
  }
}
