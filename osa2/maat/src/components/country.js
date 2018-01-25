import React from 'react'

const Country = ({country}) => {
    var style = {
        height:300,
         width:500
    }
    return (
        <div>
        <h2>{country.name} {country.nativeName}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>

        <img style={style} src={country.flag} alt={'täsä lippu'} />
    </div>
    )
}

export default Country