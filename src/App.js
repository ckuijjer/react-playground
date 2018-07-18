import React, { Component, Fragment } from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import _ from 'lodash'

import store from './store'
import { incrementA, incrementB, incrementC } from './store/reducers'

import LifeCycle from './LifeCycle'
import ReduxAndRerendering from './ReduxAndRerendering'

const examples = ['LifeCycle', 'ReduxAndRerendering']

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

const data = [
  {
    code: 'APP',
    description: 'een set van 6 appels',
    price: 2.5,
    discountPercentage: 10,
    category: {
      code: 'GF',
      description: 'groente & fruit',
    },
  },
  {
    code: 'BAN',
    description: 'een tros bananen van 1kg',
    price: 1.99,
    category: {
      code: 'GF',
      description: 'groente & fruit',
    },
  },
]

const CodeAndDescription = ({ code, description }) => `${code}-${description}`

const HasDiscount = ({ children }) => (children ? 'yes' : 'no')

const metadata = [
  {
    title: 'item',
    render: CodeAndDescription,
  },
  {
    title: 'price',
    dataIndex: 'price',
  },
  {
    title: 'category',
    dataIndex: 'category',
    render: CodeAndDescription,
  },
  {
    title: 'discounted price',
    dataIndex: ({ price, discountPercentage = 0 }) =>
      (price * (100 - discountPercentage)) / 100,
  },
  {
    title: 'has discount',
    dataIndex: ({ discountPercentage }) => discountPercentage > 0,
    render: HasDiscount,
  },
]

const Table = ({ metadata, data }) => {
  return (
    <table>
      <thead>{metadata.map(({ title }) => <td>{title}</td>)}</thead>
      {data.map(d => (
        <tr>
          {metadata.map(({ dataIndex = x => x, render = x => x }) => {
            const value =
              typeof dataIndex === 'function'
                ? dataIndex(d)
                : _.get(d, dataIndex)

            return (
              <td style={{ border: '1px solid #ccc', padding: 4, margin: 1 }}>
                {render(value, data)}
              </td>
            )
          })}
        </tr>
      ))}
    </table>
  )
}

class App extends Component {
  render() {
    return (
      <Fragment>
        <MenuAndRoutes />
        <Table data={data} metadata={metadata} />
      </Fragment>
    )
  }
}

export default App
