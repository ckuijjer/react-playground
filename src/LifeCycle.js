import React from 'react'

let number = 0

class Parent extends React.Component {
  state = {
    number: 0,
    numberObject: { number: 0 },
  }

  componentDidMount() {
    window.setInterval(() => {
      number++
      this.setState(state => {
        // state.number++;
        // state.numberObject.number++;
        // return state;
        return {
          number: state.number + 1,
          numberObject: { number: state.number + 1 },
        }
      })
    }, 1000)
  }

  render() {
    console.log('Parent is rerendering', this.state.number)

    return (
      <div style={{ backgroundColor: '#f99', fontSize: 48 }}>
        {this.state.number}
        <Child number={this.state.number} />
        <ObjectChild numberObject={this.state.numberObject} />
      </div>
    )
  }
}

class Child extends React.PureComponent {
  componentWillReceiveProps(...args) {
    console.log('Child componentWillReceiveProps', args)
  }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.number !== this.props.number;
  // }

  render() {
    const { number } = this.props
    console.log('Child is rerendering', number)

    return <div style={{ backgroundColor: '#9f9' }}>{number}</div>
  }
}

class ObjectChild extends React.PureComponent {
  componentWillReceiveProps(...args) {
    console.log('ObjectChild componentWillReceiveProps', args)
  }

  render() {
    const { numberObject } = this.props
    console.log('ObjectChild is rerendering', numberObject.number)

    return <div style={{ backgroundColor: '#99f' }}>{numberObject.number}</div>
  }
}

export default Parent
