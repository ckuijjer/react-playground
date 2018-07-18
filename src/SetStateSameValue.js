import React from 'react'
import BigNumber from './BigNumber'

const INTERVAL = 100

class SetStateSameValue extends React.Component {
  state = {
    timeInSeconds: 0,
  }

  componentDidMount() {
    const fn = (() => {
      let timeInMilliSeconds = 0

      return () => {
        timeInMilliSeconds = timeInMilliSeconds + INTERVAL
        this.setState({ timeInSeconds: Math.floor(timeInMilliSeconds / 1000) })
      }
    })()

    window.setInterval(fn, INTERVAL)
  }

  render() {
    return (
      <div>
        <BigNumber number={this.state.timeInSeconds} />
      </div>
    )
  }
}

export default SetStateSameValue
