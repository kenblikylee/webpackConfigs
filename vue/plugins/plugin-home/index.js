const Home = {
  functional: true,
  render() {
    return <div>
            <h2>Home</h2>
            <p><router-link to={{name: 'list'}}>list</router-link></p>
          </div>
  }
}

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  }
]

export default {
  install({ router, modules, getters }) {
    router.addRoutes(routes)
  }
}
