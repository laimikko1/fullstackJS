import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div key={kurssi.id}>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>

    )
}

const Otsikko = ({ kurssi }) => {
    return (
        <div>
            <h1>{kurssi.nimi}</h1>
        </div>
    )
}

const Sisalto = ({ kurssi }) => {
    return (
        kurssi.osat.map((element) => {
            return <Osa key={element.id} osa={element} />

        })
    )
}

const Osa = ({ osa }) => {
    return (
        <p> {osa.nimi} {osa.tehtavia}</p>
    )
}

const Yhteensa = ({ kurssi }) => {

    console.log(kurssi.osat)
    const yhteensa = 
    kurssi.osat.reduce((tehtavat, osa) => tehtavat + osa.tehtavia, 0);

    return (
        <div>yhteensä {yhteensa} tehtävää</div>
    )
}

export default Kurssi