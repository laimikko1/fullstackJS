import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { anecdoteInitilization } from './reducers/anecdoteReducer'


class App extends React.Component {
  componentDidMount () {
    this.props.anecdoteInitilization()

  }


  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Filter />
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInitilization }
)(App)
