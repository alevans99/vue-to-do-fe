import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#084B83',
        secondary: '#BBE6E4',
        accent: '#FF66B3',
        error: colors.red.accent3,
        background: '#42BFDD',
      },
      dark: {
        primary: colors.blue.lighten3,
        background: colors.indigo.base,
      },
    },
  },
})

//#084B83
//#42BFDD
//#BBE6E4
//#F0F6F6
//#FF66B3
