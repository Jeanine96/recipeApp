// src/vuetify.js
import '@mdi/font/css/materialdesignicons.css' // Make sure this is imported
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
  },
})
