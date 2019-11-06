// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';
import store from './store/index'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import FBSignInButton from 'vue-facebook-signin-button'
import VueI18n from 'vue-i18n';
import i18n from './i18n'
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(VueI18n);
Vue.use(FBSignInButton)



var VueTruncate = require('vue-truncate-filter')
Vue.use(VueTruncate)

Vue.use(Vuetify)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = 'en';
  }

  i18n.locale = language;

  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',

  data: {
    country_iso: "mm"
  },

  router,
  store,
  components: { App },
  i18n,
  template: '<App/>'
})
