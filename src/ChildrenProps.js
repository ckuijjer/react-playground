import React from 'react'

const cardStyle = {
  display: 'inline-block',
  margin: 10,
  backgroundColor: '#eee',
  borderRadius: 5,
  padding: 10,
  width: 100,
  height: 100,
}

const Card = ({ title, children }) => (
  <div style={cardStyle}>
    <div>
      <b>{title}</b>
    </div>
    {children}
  </div>
)

const ChildrenProps = () => (
  <div>
    <Card title="Hello World">🌎 contents</Card>
    <Card title="Hello again">contents</Card>
  </div>
)

export default ChildrenProps
