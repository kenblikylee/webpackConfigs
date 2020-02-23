import Vue from 'vue';
import Router from 'vue-router';
import Vuex, { Store } from 'vuex';

Vue.use(Router);
Vue.use(Vuex);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'login' } }
  ]
})
const modules = {};
const getters = {};

const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
const assign = (obj, props) => {
  for (let prop in props) {
    if(hasProp(props, prop) && props[prop]) {
      obj[prop] = props[prop]
    }
  }
}

function install(plugin) {
  let _install = typeof plugin === 'function' ? plugin : plugin.install
  _install({
    addRoutes(_routes) {
      let routes = Array.isArray(_routes) ? _routes : [_routes]
      router.addRoutes(routes)
    },
    addModules(_modules) {
      if (typeof _modules === 'object') assign(modules, _modules)
    },
    addGetters(_getters) {
      if (typeof _getters === 'object') assign(getters, _getters)
    }
  })
}

import login from '../index';

install(login);

const store = new Store({
  modules,
  getters
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => <div><router-view /></div>
}).$mount("#app");
