// Copyright © 2018 Vedegis Evgenii. Contacts: https://github.com/vedees
// License: https://opensource.org/licenses/Apache-2.0

const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // UImini
    { src: 'uimini/dist/css/uimini.min.css', lang: 'css' },
    // Main.styl
    { src: '~/assets/stylus/main.styl', lang: 'stylus'}

  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/Vuelidate', ssr: false }
    { src: '~/plugins/fireauth' },
    { src: '~/plugins/Vuelidate' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  // Router Settings
  router: {
    middleware: 'router-auth'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
