import React from 'react'
import _ from 'lodash'
import styled from 'react-emotion'

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

const CodeAndDescription = ({ code, description }) => `${code} - ${description}`

class CodeAndDescriptionClass extends React.Component {
  render() {
    return `${this.props.code} - ${this.props.description}`
  }
}

const HasDiscount = ({ value }) => (value ? 'yes' : 'no')

class HasDiscountClass extends React.Component {
  render() {
    return this.props.value ? 'yes' : 'no'
  }
}

class Counter extends React.Component {
  id: null

  state = {
    counter: 0,
  }

  componentDidMount() {
    this.id = window.setInterval(this.onTick, 1000)
    console.log('Counter componentDidMount', this.id)
  }

  componentWillUnmount() {
    console.log('Counter componentWillUnmount', this.id)
    window.clearInterval(this.id)
  }

  onTick = () => {
    this.setState(state => ({
      counter: state.counter >= 9 ? 0 : state.counter + 1,
    }))
  }

  render() {
    return (
      <div>
        {this.props.price} - {this.state.counter}
      </div>
    )
  }
}

const Bold = styled('div')({ fontWeight: 'bold' })

const JsonOutput = props => <pre>{JSON.stringify(props, null, 2)}</pre>

const metadata = [
  {
    title: 'item',
    render: CodeAndDescription,
  },
  {
    title: 'item code',
    dataIndex: 'code',
  },
  {
    title: 'item code bold',
    dataIndex: ({ code }) => ({ children: code }),
    render: Bold, // I would prefer to use Bold without the dataIndex function to map it to children
  },
  {
    title: 'category code',
    dataIndex: 'category.code',
  },
  {
    title: 'category',
    dataIndex: 'category',
    render: CodeAndDescription,
  },
  {
    title: 'category class',
    dataIndex: 'category',
    render: CodeAndDescriptionClass,
  },
  {
    title: 'price',
    dataIndex: 'price',
  },
  {
    title: 'discounted price',
    dataIndex: ({ price, discountPercentage = 0 }) =>
      (price * (100 - discountPercentage)) / 100,
  },
  {
    title: 'discounted price render',
    render: ({ price, discountPercentage = 0 }) =>
      (price * (100 - discountPercentage)) / 100,
  },
  {
    title: 'has discount',
    dataIndex: ({ discountPercentage }) => discountPercentage > 0,
    render: HasDiscount,
  },
  {
    title: 'has discount class',
    dataIndex: ({ discountPercentage }) => discountPercentage > 0,
    render: HasDiscountClass,
  },
  {
    title: 'item/category code',
    render: ({ code, category }) => `${code} - ${category.code}`,
  },
  {
    title: 'item/category code dataIndex',
    dataIndex: ({ code, category }) => ({ code, categoryCode: category.code }),
    render: ({ code, categoryCode }) => `${code} - ${categoryCode}`,
  },
  {
    title: 'counter',
    render: Counter,
  },
  {
    title: 'counter fn',
    render: props => <Counter {...props} />,
  },
]

const isObject = x => x === Object(x)

class Table extends React.Component {
  id: null

  state = {
    data: this.props.data,
  }

  componentDidMount() {
    this.id = window.setInterval(this.onTick, 3333)
    console.log('Table componentDidMount', this.id)
  }

  componentWillUnmount() {
    console.log('Table componentWillUnmount', this.id)
    window.clearInterval(this.id)
  }

  onTick = () => {
    this.setState(state => {
      // nasty price increase by directly touching the data
      state.data.forEach(
        x =>
          (x.price =
            Math.round(100 * (x.price * (1 + (Math.random() * 2 - 1) / 100))) /
            100),
      ) // random -1% to 1% price change
      return { data: state.data }
    })
  }

  render() {
    console.log('Table render')

    return (
      <table>
        <thead>
          <tr>{this.props.metadata.map(({ title }) => <th>{title}</th>)}</tr>
        </thead>
        <tbody>
          {this.state.data.map(d => (
            <tr>
              {this.props.metadata.map(
                ({
                  dataIndex = x => x,
                  render: ComponentOrFunction = ({ value }) => value,
                }) => {
                  // I wonder if value should be value, children, text or data?
                  const value =
                    typeof dataIndex === 'function'
                      ? dataIndex(d)
                      : _.get(d, dataIndex)

                  const props = isObject(value) ? value : { value }

                  return (
                    <td
                      style={{
                        border: '1px solid #ccc',
                        padding: 4,
                        margin: 1,
                      }}
                    >
                      {ComponentOrFunction.prototype.render ? (
                        <ComponentOrFunction {...props} />
                      ) : (
                        ComponentOrFunction(props)
                      )}
                    </td>
                  )
                },
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const MetadataTable = () => <Table data={data} metadata={metadata} />

export default MetadataTable
