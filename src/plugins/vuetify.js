import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#45A29E',
        secondary: '#0B0C10',
        accent: '#66FCF1',
        error: '#FF5252',
        warning: '#FFC107',
      },
      dark: {
        primary: '#c0392b',
      },
    },
  },
  lang: {
    locales: { es },
    current: 'es',
  },
});
