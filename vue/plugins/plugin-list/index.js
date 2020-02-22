const Component = {
  functional: true,
  render() {
    return <div>
            <h2>List</h2>
            <ul>
              <li><router-link to={{name: 'detail', params: { id: 1 }}}>item 1</router-link></li>
              <li><router-link to={{name: 'detail', params: { id: 2 }}}>item 2</router-link></li>
              <li><router-link to={{name: 'detail', params: { id: 3 }}}>item 3</router-link></li>
            </ul>
          </div>
  }
}

const routes = [
  {
    name: 'list',
    path: '/list',
    component: Component
  }
]

export default ({ addRoutes }) => addRoutes(routes)
