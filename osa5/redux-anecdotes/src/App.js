import React from 'react';
import { AnecdoteList, AnecdoteForm } from './Anecdote'

class App extends React.Component {
  render() {
    const anecdotes = this.props.store.getState()

    return (
      <div>
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App