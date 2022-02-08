import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

Vue.use(Vuetify, {
    
    theme: {
        primary: "#f44336",
        secondary: "#e57373",
        accent: "#9c27b0",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50"
      }
  })

export default new Vuetify({
});
