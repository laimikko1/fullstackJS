import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter }) => {
    if (filter === '') {
        return (
            <div>
                {persons.map(p => <Person key={p.name} props={p} />)}
            </div>
        )

    } else {
        const filtered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));
        console.log(filtered)
        return (
            <div>
                {filtered.map(p => <Person props={p} />)}
            </div>
        )
    }
}

export default Persons