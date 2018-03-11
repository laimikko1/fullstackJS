import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      borderWidth: 2,
      borderColor: 'green',
      padding: 10,
      margin: 5,
      borderWidth: 1
    }
    console.log(style);

    const { notification } = this.props

    if (notification) {
      return (
        <div style={style}>
          {notification}
        </div>
      )
    } else {
      return (
        null
      )
    }
  }
}

const mapStateProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateProps
)(Notification)

export default ConnectedNotification
