const Home = {
  functional: true,
  render() {
    return <div>
            <h2>Home</h2>
            <p><router-link to={{name: 'list'}}>list</router-link></p>
            <p><router-link to={{name: 'login'}}>login</router-link></p>
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

const modules = {
  user: {
    namespaced: true,
    state: {
      profile: {
        id: 0,
        name: '',
        avatar: ''
      }
    },
    mutations: {
      CH_USER: (state, userProfile) => {
        state.profile = userProfile
      }
    },
    actions: {
      login({ commit }, { account, passwd }) {
        console.log(`登录 ${account}:${passwd}`)
        return new Promise(resolve => {
          setTimeout(() => {
            commit('CH_USER', {
              id: 1,
              name: 'vxp',
              avatar: '/static/avatar.jpg'
            })
            resolve()
          }, 3000)
        })
      }
    }
  }
}

const getters = {
  userName: state => state.user.profile.name
}

export default {
  install({ addRoutes, addModules, addGetters }) {
    addRoutes(routes)
    addModules(modules)
    addGetters(getters)
  }
}
