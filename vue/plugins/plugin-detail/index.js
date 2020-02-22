const Component = {
  functional: true,
  render(h, { props }) {
    return <div>
            <h2>Detail</h2>
            <p>detail { props.id }</p>
          </div>
  }
}

const routes = [
  {
    name: 'detail',
    path: '/detail/:id',
    component: Component,
    props: true
  }
]

export default ({ router }) => router.addRoutes(routes)
