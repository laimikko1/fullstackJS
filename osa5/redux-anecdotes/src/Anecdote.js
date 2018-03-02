import React from 'react'
import actionCreator from './actionCreator'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} votes
                <button onClick={handleClick}>vote</button>
            </div>
        </div>

    )
}

class AnecdoteForm extends React.Component {
    addNew = (event) => {
        event.preventDefault()
        this.props.store.dispatch(
            actionCreator.anecdoteCreation(event.target.anecdote.value)
        )
        event.target.anecdote.value = ''
    }
    render() {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={this.addNew}>
                    <input name="anecdote" />
                    <button type="submit">create</button>
                </form>
            </div>
        )
    }
}

class AnecdoteList extends React.Component {
    voteAhead = (id) => () => {
        this.props.store.dispatch(
            actionCreator.anecdoteVote(id)
        )
    }

    sortVotes = (anecdotes) => {
        const sort = anecdotes.sort((a, b) =>
            b.votes - a.votes
        )
        return sort
    }

    render() {
        return (
            <div>
                <h2>Anecdotes</h2>
                {this.sortVotes(this.props.store.getState()).map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        handleClick={this.voteAhead(anecdote.id)}
                        anecdote={anecdote} />
                )}
            </div>
        )
    }
}

export { AnecdoteList, AnecdoteForm } 