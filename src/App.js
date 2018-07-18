import React, { Component, Fragment } from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import _ from 'lodash'

const examples = ['LifeCycle', 'ReduxAndRerendering', 'MetadataTable']

const MenuAndRoutes = () => (
  <Router>
    <Fragment>
      {examples.map(x => (
        <Link to={`/${x}`}>
          <button>{x}</button>
        </Link>
      ))}
      {examples.map(x => (
        <Route
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
