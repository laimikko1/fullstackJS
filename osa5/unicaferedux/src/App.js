import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import { createStore } from 'redux';

const store = createStore(counterReducer)

const Statistiikka = ({ zero }) => {

    const palautteita = Object.values(store.getState()).reduce((eka, toka) => eka + toka)
    if (palautteita === 0) {
        return (
            <div>
                <h2>statistiikkaa</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }
    const ka = Math.round((store.getState().good - store.getState().bad) / palautteita * 100) / 100
    const positiiviset = (store.getState().good / palautteita) * 100
    const pyoristetty = Math.round(positiiviset * 10) / 10

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{store.getState().good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{store.getState().ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{store.getState().bad}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{pyoristetty} %</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{ka}</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={zero}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('good')}>hyvä</button>
                <button onClick={this.klik('ok')}>neutraali</button>
                <button onClick={this.klik('bad')}>huono</button>
                <Statistiikka
                    zero={this.klik('zero')} />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}
renderApp()
store.subscribe(renderApp)
