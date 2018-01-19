import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: {}
        }

    }

    
    seuraava = () => {
        
        
        let n = this.state.selected;
        while(n === this.state.selected) {
            n = Math.floor(Math.random() * 6);
        }
        return () => {
            this.setState({ selected: n });
        }
    }

    
    aanesta = () => {
        const anekdoottiAvain = this.props.anecdotes[this.state.selected];
        return () => {
            let v = this.state.votes;

            if (v[anekdoottiAvain] === undefined) {
                v[anekdoottiAvain] = 1;
            } else {
                v[anekdoottiAvain] = v[anekdoottiAvain] + 1;
            }

            this.setState({ votes: v });
        }
    }

    render() {

        return (
            <div>
                <Anec text={this.props.anecdotes[this.state.selected]} votes={this.state.votes} />
                <Button text={"vote"} handleClick={this.aanesta()} />
                <Button text={"next anecdote"} handleClick={this.seuraava()} />
                <h2>anecdote with most votes</h2>
                <PopularAnecdote votes={this.state.votes} />
            </div>
        )
    }
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Anec = ({ text, votes }) => {
    let v = 0;
    if (votes[text] !== undefined) {
        v = votes[text]
    }
    return (
        <p> {text} <br /> has {v} votes </p>

    )
}

const PopularAnecdote = ({ votes }) => {
    const v = { votes }.votes
    // Ohjelma sanoo poks, jos yrittää reducea käyttää tyhjään listaan
    if(Object.keys(v).length === 0) {
        return (
            ""
        )
    }
        // Palauttaa suosituimman, mutta jos monta yhtä suosittua, niin palauttaa ekana aakkosissa olevan

    let popular = Object.keys(v).reduce((a, b) => {
        if(v[b] === v[a]) return a > b ? b : a
        if (v[b] < v[a]) return a
        else return b
    });

    return (
        <p> {popular} <br /> has {v[popular]} votes </p>
    )
}



const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)