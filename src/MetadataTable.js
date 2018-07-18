import React from 'react'
import _ from 'lodash'

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

const JsonOutput = props => <pre>{JSON.stringify(props, null, 2)}</pre>

const metadata = [
  {
    title: 'item',
    render: CodeAndDescription,
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
]

const isObject = x => x === Object(x)

const Table = ({ metadata, data }) => {
  return (
    <table>
      <thead>
        <tr>{metadata.map(({ title }) => <th>{title}</th>)}</tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr>
            {metadata.map(
              ({
                dataIndex = x => x,
                render: ComponentOrFunction = ({ value }) => value,
              }) => {
                const value =
                  typeof dataIndex === 'function'
                    ? dataIndex(d)
                    : _.get(d, dataIndex)

                const props = isObject(value) ? value : { value }

                return (
                  <td
                    style={{ border: '1px solid #ccc', padding: 4, margin: 1 }}
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

const MetadataTable = () => <Table data={data} metadata={metadata} />

export default MetadataTable
