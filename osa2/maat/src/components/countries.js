import React from 'react'
import Country from './country'

const Countries = ({ filter, countries, onClick }) => {
    let list = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

    if (list.length === 1) {
        return (
            <div>
                {list.map(country => <Country key={country.alpha2Code} country={country} />)}
            </div>
        )
    }

    else if (list.length > 10) {
        return (
            <div>
                too many countries to match, specify another filter
            </div>
        )
    }
    return (
        <div>
            {list.map(country => <div onClick={onClick(country.name)} key={country.alpha2Code}>{country.name}</div>)}
        </div>
    )

}

export default Countries