export default {
  mode: 'universal',
  env: {
    API_URL: process.env.API_URL || 'http://localhost/'
  },
  telemetry: false,
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
  loading: { color: '#fff' },
  css: [],
  plugins: [
    '~/plugins/axios',
    '~/plugins/vee-validate',
    { src: '~/plugins/vue-google-oauth2.js', ssr: false },
    { src: '~/plugins/webcam', mode: 'client', ssr: false }
  ],
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/onesignal',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    'vue-web-cam/nuxt'
  ],
  components: true,
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
  build: {
    transpile: ['vee-validate/dist/rules']
  },
  filenames: {
    app: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
    chunk: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js')
  }
}
