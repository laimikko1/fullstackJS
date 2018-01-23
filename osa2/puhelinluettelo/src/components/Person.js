import React from 'react'

const Person = ({ props }) => {
    return (
        <p key={props.name}>{props.name} {props.number}</p>
    )
}

export default Person