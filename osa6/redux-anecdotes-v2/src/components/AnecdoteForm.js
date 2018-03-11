import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {


  addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    this.props.anecdoteCreation(content)
    this.props.notify(`you added  '${content}'`, 5)

  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}


const ConnectedAnecdoteForm = connect(
  null,
  { anecdoteCreation, notify }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
