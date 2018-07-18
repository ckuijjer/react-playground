import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'

const examples = ['LifeCycle', 'ReduxAndRerendering', 'MetadataTable']

const MenuAndRoutes = () => (
  <Router>
    <Fragment>
      {examples.map(x => (
        <Link to={`/${x}`} key={x}>
          <button>{x}</button>
        </Link>
      ))}
      {examples.map(x => (
        <Route
          key={x}
          path={`/${x}`}
          component={Loadable({
            loader: () => import(`./${x}`),
            loading: () => <div />,
          })}
        />
      ))}
    </Fragment>
  </Router>
)

class App extends Component {
  render() {
    return (
      <Fragment>
        <MenuAndRoutes />
      </Fragment>
    )
  }
}

export default App
