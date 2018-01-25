import React from 'react'

const Countries = ({ filter, countries }) => {
    let list = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    const noCountryForOldMen = [{ name: 'too many countries to match, specify another filter' }]
    list.length > 10 ?
        list = noCountryForOldMen :
        list;

    console.log(list)

    return (
        <div>
            {list.map(country => <div key={country.alpha2Code}>{country.name}</div>)}
        </div>
    )

}

export default Countries