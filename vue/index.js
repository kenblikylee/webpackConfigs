import Vue from 'vue';
import Router from 'vue-router';
import Vuex, { Store } from 'vuex';

Vue.use(Router);
Vue.use(Vuex);

const router = new Router({ mode: 'history' })
const modules = {};
const getters = {};

function install(plugin) {
  let _install = typeof plugin === 'function' ? plugin : plugin.install
  _install({
    router: {
      addRoutes(route) {
        let routes = Array.isArray(route) ? route : [route]
        router.addRoutes(routes)
      }
    },
    modules,
    getters
  })
}

// 安装插件
import home  from 'plugin-home';
import list  from 'plugin-list';
import detail  from 'plugin-detail';

[ home, list, detail].forEach(install);

const store = new Store({
  modules,
  getters
})

new Vue({
  router,
  store,
  render() {
    return <div><router-view></router-view></div>
  }
}).$mount('#app')
