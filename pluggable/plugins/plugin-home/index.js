const home = {
  functional: true,
  render() {
    return <div class="page">
            <header class="page-header">
              <router-link to={{name: 'home'}}>home</router-link>
            </header>
            <article class="page-body"></article>
            <footer class="page-footer"></footer>
          </div>
  }
}

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    name: 'home',
    path: '/home',
    component: home
  }
]

const modules = {
}

const getters = {
}

export default {
  install({ addRoutes, addModules, addGetters }) {
    addRoutes(routes)
    addModules(modules)
    addGetters(getters)
  }
}
