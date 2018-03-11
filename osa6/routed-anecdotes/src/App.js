import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { Container, Table, Grid, Image } from 'semantic-ui-react'

const Menu = ({ anecdotes, anecdoteById, addNew, setNotification, menuStyle, activeMenuStyle }) => (

  <div>
    <Router>
      <div>
        <div style={menuStyle}>
          <NavLink exact to="/" activeStyle={activeMenuStyle}>anecdotes</NavLink> &nbsp;
          <NavLink to="/create" activeStyle={activeMenuStyle}>create</NavLink> &nbsp;
          <NavLink to="/about" activeStyle={activeMenuStyle}>about</NavLink> &nbsp;
        </div>
        <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" render={({history}) => <CreateNew 
        history={history} 
        addNew={addNew}
        setNotification={setNotification} />} />
        <Route path="/about" render={() => <About />} />

        <Route exact path="/anecdotes/:id" render={({match}) => 
        <Anecdote anecdote={anecdoteById(match.params.id)} />}
      />
    </div>
    </Router>
  </div>


)

const Anecdote = ({anecdote}) => (

  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p> for more info see <a href={anecdote.info}>{anecdote.info}</a></p> 
    </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
      <h2>Anecdotes</h2>
    <Table striped celled>
    <Table.Body>
      {anecdotes.map(anecdote =>
        <Table.Row key={anecdote.id}>
        <Table.Cell>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </Table.Cell>
          </Table.Row>
      )}
      </Table.Body>
      </Table>
  </div>
    )
    
    const About = () => (
      <Grid divided="vertically">
      <Grid.Row columns={2}>
      <Grid.Column>
      <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      </Grid.Column>
      <Grid.Column>
        <Image style={{height: 300, width: 250}} src='https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg'/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
      )
      
      const Footer = () => (
  <div>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
    
    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
      )
      
class CreateNew extends React.Component {
        constructor() {
      super()
    this.state = {
        content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
        console.log(e.target.name, e.target.value)
    this.setState({[e.target.name]: e.target.value })
    }
  
  handleSubmit = (e) => {
        e.preventDefault()
    this.props.addNew({
        content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.setNotification(`a new anecdote ${this.state.content} created!`)
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
      )
  
    }
  }
  
class App extends React.Component {
        constructor() {
      super()
  
    this.state = {
        anecdotes: [
        {
        content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
        {
        content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ],
  notification: ''
}
}

  addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({anecdotes: this.state.anecdotes.concat(anecdote) })
    }
  
  anecdoteById = (id) => {
    return this.state.anecdotes.find(a => a.id === id)
    }

  setNotification = (notification) => {
    this.setState({notification: notification})

    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000);
  }

  vote = (id) => {
    const anecdote = this.anecdoteById(id)
  
    const voted = {
        ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({anecdotes})
    }
  
  render() {

    const style = {
      border:'solid',
      borderColor: 'green',
      borderWidth: '2px',
      width: '300px',
      margin: 5,
      padding: 10,
      color: 'green',
      borderRadius: 5
    }

    const menuStyle = {
      backgroundColor: 'LightBlue',
      padding: 10,
      margin: 5
    }

    const activeMenuStyle= {
      backgroundColor: 'white',
      padding: 5,
      borderRadius: 5
    }

    let not = null
    if(this.state.notification !== '') {
       not = <div style={style}>{this.state.notification}</div>
    }
    console.log(not);
    return (
      <Container>
      <div>
        <h1>Software anecdotes</h1>
        {not}
        <Menu anecdotes={this.state.anecdotes} 
        addNew={this.addNew} 
        anecdoteById={this.anecdoteById}
        setNotification={this.setNotification}
        menuStyle={menuStyle}
        activeMenuStyle={activeMenuStyle} />
        <Footer />
      </div >
      </Container>
      );
    }
  }
  
  export default App;
