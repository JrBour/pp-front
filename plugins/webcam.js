import Vue from 'vue'

if (process.browser) {
  window.onNuxtReady(() => {
    const { WebCam } = require('vue-web-cam')
    Vue.use(WebCam)
  })
}
