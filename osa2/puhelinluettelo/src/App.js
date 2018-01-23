import React from 'react';
import Persons from './components/Persons'
import Person from './components/Person'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '040-123456' },
                { name: 'Martti Tienari', number: '040-123456' },
                { name: 'Arto Järvinen', number: '040-123456' },
                { name: 'Lea Kutvonen', number: '040-123456' }
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }

    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handlenumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    filterNames = (event) => {
        this.setState({ filter: event.target.value })
    }

    addName = (event) => {
        event.preventDefault()
        const newName = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        const nim = (this.state.persons.map(m => m.name)).includes(this.state.newName)
        const num = (this.state.persons.map(m => m.number)).includes(this.state.newNumber)

        if (nim || num) {
            return alert('Can\'t add same name and/or number twice')
        }
        else {
            const persons = this.state.persons.concat(newName)
            this.setState({
                persons,
                newName: '',
                newNumber: ''
            })
        }

    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>
                    rajaa näytettäviä: <input
                        value={this.state.filter}
                        onChange={this.filterNames}
                    />
                </div>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div>
                        number: <input
                            value={this.state.newNumber}
                            onChange={this.handlenumberChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <Persons persons={this.state.persons} filter={this.state.filter} />
            </div>
        )
    }
}

export default App