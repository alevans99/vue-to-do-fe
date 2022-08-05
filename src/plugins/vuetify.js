import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify)
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2E294E',
        secondary: '#306b34',
        accent: '#820263',
        highAlert: '#FF220C',
        mediumAlert: '#EFB700',
        background: '#EFB700',
      },
      dark: {
        primary: '#2E294E',
        background: colors.indigo.base,
      },
    },
  },
})

//#084B83 - Initial Blue
//#42BFDD
//#BBE6E4
//#F0F6F6
//#FF66B3
//#2E2C2F
//#EFB700 - Image Background
//#306B34 - Green
//#2E294E - New Blue
