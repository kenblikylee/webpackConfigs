const Login = {
  methods: {
    login() {
      let { state, commit, dispatch, getters } = this.$store
      dispatch('user/login', {
        account: 'ken', passwd: 'xxx'
      }).then(res => {
        console.log('login', state, commit, getters)
      })
    }
  },
  computed: {
    userName() {
      return this.$store.getters.userName
    }
  },
  render() {
    return <div>
            <h2>Login</h2>
            <button vOn:click={this.login}>submit</button>
            <p>{this.userName}</p>
          </div>
  }
}

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  }
]

export default {
  install({ addRoutes }) {
    addRoutes(routes)
  }
}
