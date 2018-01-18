import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super()
        this.state = {
            Hyvä: 0,
            Neutraali: 0,
            Huono: 0,
            kaikki: [],
            positiivisia: []

        }

    }



    aanesta = (key, arvo) => {
        return () => {
            this.setState({ [key]: this.state[key] + 1 });
            this.setState({ kaikki: this.state.kaikki.concat(arvo) });
            if (arvo === 1) {
                this.setState({ positiivisia: this.state.positiivisia.concat(arvo) });
            }
        }
    }

    render() {
        return (
            <div>
                <h2>Anna palautetta</h2>
                <Button
                    text={"Hyvä"}
                    handleClick={this.aanesta("Hyvä", 1)} />
                <Button
                    text={"Neutraali"}
                    handleClick={this.aanesta("Neutraali", 0)} />
                <Button text={"Huono"}
                    handleClick={this.aanesta("Huono", -1)} />

                <Statistics kaikki={this.state.kaikki} positiivisia={this.state.positiivisia} />
            </div>

        )
    }

}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ teksti, arvo }) => (
    <td>{teksti}: {arvo}</td>
)

const Statistics = ({ kaikki, positiivisia }) => {
    if (kaikki.length > 0) {
        const hyvat = kaikki.filter(a => a === 1).length;
        const neutraali = kaikki.filter(a => a === 0).length;
        const huono = kaikki.filter(a => a === -1).length;
        const positiiviset = ((positiivisia.length / kaikki.length) * 100).toFixed(2);
        const ka = ((kaikki.reduce((summa, a) => (summa + a))) / kaikki.length).toFixed(2);

        const style = {
            borderSpacing: 0,
            cellspacing: 0,
            display: 'block',
            padding:0
        }


        return (
            <div>
                <h2>Statistiikka</h2>
                <table style={style}>
                    <tbody>
                        <tr>
                            <Statistic teksti={"hyvä"} arvo={hyvat} />
                        </tr>
                        <tr>
                            <Statistic teksti={"neutraali"} arvo={neutraali} />
                        </tr>
                        <tr>
                            <Statistic teksti={"huono"} arvo={huono} />
                        </tr>
                        <tr>
                            <Statistic teksti={"keskiarvo"} arvo={ka} />

                        </tr>
                        <tr>
                            <Statistic teksti={"positiivisia"} arvo={positiiviset + " %"} />

                        </tr>
                    </tbody>

                </table>
            </div >
        )
    } else {
        return (
            <div>
                <h2>Statistiikkaa</h2>
                <p>Ei statistiikkaa</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />, document.getElementById('root'));
