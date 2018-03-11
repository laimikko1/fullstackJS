import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { anecdoteVote } from '../reducers/anecdoteReducer'


class AnecdoteList extends React.Component {

  voteAnecdote = async (anecdote) => {
    this.props.anecdoteVote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 5)

  }

  render() {


    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.voteAnecdote(anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  const sortedA = anecdotes.sort((a, b) => b.votes - a.votes)
  return sortedA.filter(f =>
    f.content.includes(filter))
}


const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdote, state.filter)
  }
}


const dispatchStateToProps = {
  anecdoteVote,
  notify
}

const ConnectedAnectdoteList = connect(
  mapStateToProps,
  dispatchStateToProps
)(AnecdoteList)

export default ConnectedAnectdoteList