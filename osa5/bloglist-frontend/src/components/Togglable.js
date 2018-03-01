import React from 'react'

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const showOrHide = { display: this.state.visible ? '' : 'none' }

        return (
            <div>
                <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
                <div style={showOrHide}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Togglable;