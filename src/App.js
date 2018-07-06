import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'
import LifeCycle from './LifeCycle'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LifeCycle />
      </Provider>
    )
  }
}

export default App
