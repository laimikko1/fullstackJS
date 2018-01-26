import React from 'react'
const Success = ({ type, message }) => {
    let className = null;
    if (message === null) {
        return null
    }
    type === "success" ?
        className = 'success' :
        className = 'delete'

    console.log(className)
    return (
        <div className={className}>
            {message}
        </div>
    )
}
export default Success