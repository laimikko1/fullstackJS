import React from 'react';
import Persons from './components/Persons'
import Person from './components/Person'
import axios from 'axios'
import './index.css'
import personService from './components/personService'
import Notification from './components/Notification'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            error: null,
            success: null
        }

    }

    componentWillMount() {
        personService
            .getALl()
            .then(response => {
                this.setState({ persons: response })
            })
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

    update = (data) => {
        const toUpdate = (this.state.persons.filter(pers => pers.name === data.name)[0].id)
        personService
            .update(toUpdate, data)
            .then(pers => {
                const notes = this.state.persons.filter(pe => pe.id !== toUpdate)
                this.setState({
                    persons: notes.concat(pers),
                    success: `${data.name} tiedot päivitetty onnistuneesti!`
                })
                setTimeout(() => {
                    this.setState({ success: null })
                }, 5000)
            })
            .catch(error => {
                personService
                    .create(data)
                    .then(newPerson => {
                        const notes = this.state.persons.filter(pe => pe.id !== toUpdate)
                        this.setState({
                            persons: notes.concat(newPerson),
                            newName: '',
                            newNumber: '',
                            success: `${data.name} tiedot päivitetty onnistuneesti!`
                        })
                        setTimeout(() => {
                            this.setState({ success: null })
                        }, 5000)

                    })
            })

    }

    addName = (event) => {
        event.preventDefault()
        const newName = {
            name: this.state.newName,
            number: this.state.newNumber,
        }
        const nim = (this.state.persons.map(m => m.name)).includes(this.state.newName)

        if (nim) {
            const o = window.confirm(`${newName.name} on jo luettelossa, korvataanko vanha numero uudella?`)
            if (o) {
                this.update(newName)
            } else {
                return null
            }
        }
        else {
            personService
                .create(newName)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: '',
                        success: `${newPerson.name} lisätty onnistuneesti!`
                    })
                    setTimeout(() => {
                        this.setState({ success: null })
                    }, 5000)
                })
        }

    }

    removePerson = (id, event) => {
        return () => {
            const o = window.confirm('Haluako nää varmasti')
            if (o) {
                personService
                    .deleteOne(id)
                    .then(del => {
                        const p = this.state.persons.filter(pers => pers.id !== id)
                        this.setState({
                            persons: p,
                            error: 'Henkilö poistettu!'
                        })
                        setTimeout(() => {
                            this.setState({ error: null })
                        }, 5000)
                    })

            }
        }
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.success} type={"success"} />
                <Notification message={this.state.error} type={"error"} />
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
                <Persons persons={this.state.persons} filter={this.state.filter} onClick={this.removePerson} />
            </div>
        )
    }
}

export default App