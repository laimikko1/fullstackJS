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

    const noCountryForOldMen = [{
        name: 'too many countries to match, specify another filter',
        alpha2Code: '123456'
    }]
    
    list.length > 10 ?
        list = noCountryForOldMen :
        list;

    return (
        <div>
            {list.map(country => <div onClick={(e) => onClick(country.name, e)} key={country.alpha2Code}>{country.name}</div>)}
        </div>
    )

}

export default Countries