export default ({ addRoutes }) => addRoutes({
  name: 'detail',
  path: '/detail/:id',
  props: true,
  component: {
    functional: true,
    render(h, { props }) {
      return <div>
              <h2>Detail</h2>
              <p>detail { props.id }</p>
            </div>
    }
  }
})
