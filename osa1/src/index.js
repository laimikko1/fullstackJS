import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const kurssi = {
        nimi: 'Half stack - sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }


    return (
        <div>
            <Otsikko kurssi={kurssi.nimi} />
            <Sisalto osa={kurssi.osat} />
            <Yhteensa osa={kurssi.osat} />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        props.osa.map((element) => {
            return <Osa osa={element} />

        })
    )
}

const Osa = (props) => {
    return (
        <p> {props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    let yhteensa = 0;

    props.osa.map((element) => {
        yhteensa += element.tehtavia;
    })

    return (
        <div>yhteensä {yhteensa} tehtävää</div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)