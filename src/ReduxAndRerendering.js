import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'

import store from './store'
import { incrementA, incrementB, incrementC } from './store/reducers'

// const diagram = `
// {
//   a: 0,
//   children: {
//     b: 0,
//     c: 0
//   }
// }
// `

const ShowJSON = ({ json }) => <pre>{JSON.stringify(json, null, 2)}</pre>

const ShowState = connect(state => ({ json: state }))(ShowJSON)

const IncrementA = connect(
  null,
  dispatch => ({ onClick: () => dispatch(incrementA()) }),
)(({ onClick, children }) => <button onClick={onClick}>Increment A</button>)

const IncrementB = connect(
  null,
  dispatch => ({ onClick: () => dispatch(incrementB()) }),
)(({ onClick, children }) => <button onClick={onClick}>Increment B</button>)

const IncrementC = connect(
  null,
  dispatch => ({ onClick: () => dispatch(incrementC()) }),
)(({ onClick, children }) => <button onClick={onClick}>Increment C</button>)

const BigNumber = ({ number, style }) => (
  <span
    style={{ padding: 16, fontSize: 32, display: 'inline-block', ...style }}
  >
    {number}
  </span>
)

const ShowA = connect(state => ({ number: state.a }))(BigNumber)

const ShowB = connect(state => ({ number: state.children.b }))(BigNumber)

const ShowC = connect(state => ({ number: state.children.c }))(BigNumber)

const ShowChildrenState = connect(state => ({ json: state.children }))(ShowJSON)

const CThroughBAndC = ({ bAndC, ...rest }) => (
  <BigNumber number={bAndC.c} {...rest} />
)

const ShowCThroughBAndC = connect(state => ({ bAndC: state.children }))(
  CThroughBAndC,
)

class Pure extends React.PureComponent {
  render() {
    return (
      <div style={{ backgroundColor: 'rgba(161,161,255, 0.1)', padding: 16 }}>
        {this.props.children}
      </div>
    )
  }
}

class ReduxAndRerendering extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ margin: 32, backgroundColor: 'rgba(255,161,161, 0.1)' }}>
          <ShowState />
          <hr />
          <Pure>
            <ShowA style={{ backgroundColor: '#f99' }} />
            <ShowB style={{ backgroundColor: '#9f9' }} />
            <ShowC style={{ backgroundColor: '#99f' }} />
          </Pure>
          <hr />
          <IncrementA />
          <IncrementB />
          <IncrementC />
          <hr />
          <ShowChildrenState />
          <hr />
          <ShowCThroughBAndC style={{ backgroundColor: '#f9f' }} />
        </div>
      </Provider>
    )
  }
}

export default ReduxAndRerendering
