const login = {
  functional: true,
  render() {
    return <div class="page">
            <header class="page-header">
              <router-link to={{name: 'login'}}>login</router-link>
            </header>
            <article class="page-body"></article>
            <footer class="page-footer"></footer>
          </div>
  }
}

const routes = [
  {
    name: 'login',
    path: '/login',
    component: login
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
