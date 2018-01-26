import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, onClick }) => {
    if (filter === '') {
        return (
            <div>
                {persons.map(p => <Person key={p.id} props={p} onClick={onClick} />)}
            </div>
        )

    } else {
        const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <div>
                {filtered.map(p => <Person key={p.id} props={p} onClick={onClick} />)}
            </div>
        )
    }
}

export default Persons
