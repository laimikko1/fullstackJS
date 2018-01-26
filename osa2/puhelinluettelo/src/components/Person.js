import React from 'react'

const Person = ({ props, onClick }) => {
    return (
        <p key={props.name}>{props.name} {props.number}
            <span> <button onClick={onClick(props.id)}>
                poista
                </button>
            </span>
        </p>
    )
}

export default Person