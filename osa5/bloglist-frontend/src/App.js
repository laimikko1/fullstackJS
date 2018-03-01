import React from 'react'

import blogService from './services/blogService'
import loginService from './services/login'
import Notification from './components/Notification'

import LoginForm from './components/Loginform'
import Blogform from './components/Blogform'
import Blog from './components/Blog'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      message: null,
      type: null,
      blogform: null
    }
  }

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    const sortedB = await blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    this.setState({ blogs: sortedB })
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }



  logout = async (event) => {
    window.localStorage.removeItem(('loggedBlogappUser'))
    this.setState({ user: null })
  }

  addBlog = async (event) => {
    try {
      event.preventDefault()
      const newBlog = {
        title: this.state.title,
        author: this.state.url,
        url: this.state.url
      }

      const response = await blogService.create(newBlog)
      console.log(response);
      this.setState({
        blogs: this.state.blogs.concat(response),
        title: '', author: '', url: ''
      })
      this.setState({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
      setTimeout(() => {
        this.setState({ author: '', url: '', title: '' })
      }, 5000);
    } catch (exception) {
      this.setState({
        message: 'Vilduks mäni',
        type: 'error'
      })
      setTimeout(() => {
        this.setState({ message: null, type: null })
      }, 5000);
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        message: 'Käyttäjätunnus tai salasana virheellinen',
        type: 'error'
      })
      setTimeout(() => {
        this.setState({ message: null, type: null })
      }, 5000);
    }
  }

  likeBlog = (id, oldBlog, user) => {
    return async () => {
      const newBlog = {
        _id: oldBlog._id,
        likes: oldBlog.likes + 1,
        author: oldBlog.author,
        url: oldBlog.url,
        user: oldBlog.user,
        title: oldBlog.title
      }


      try {
        const response = await blogService.put(id, newBlog)
        console.log(user);
        response.user = user
        this.setState({
          blogs:
            this.state.blogs.map(blog => blog._id !== response._id ? blog : response)
        })
      } catch (exception) {
        setTimeout(() => {
          this.setState({ error: 'Päivitys ei onnistunut' })
        }, 5000);
      }
    }
  }

  removeOne = (id, title) => {
    return async () => {
      if (window.confirm(`haluako poistaa ${title}`)) {
        try {
          await blogService.remove(id)
          this.setState({ blogs: this.state.blogs.filter(blog => blog._id !== id) })
          this.setState({ message: 'Blogi poistettu onnistuneesti' })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000);
        } catch (exception) {
          this.setState({ message: exception.response.data.error, type: 'error' })
          setTimeout(() => {
            this.setState({ message: null, type: null })
          }, 5000);
        }
      }
    }
  }

  render() {

    const loginform = () => {
      return (
        <Togglable buttonLabel="login">
          <LoginForm
            login={this.login}
            username={this.state.username}
            password={this.state.password}
            handleFieldChange={this.handleFieldChange} />
        </Togglable>
      )
    }


    const blogform = () => {
      return (
        <div>
          <p> {this.state.user.name} logged in
        </p>
          <button onClick={this.logout}>Kirjaudu ulos</button>

          <Togglable buttonLabel="new blog" ref={component => this.blogform = component}>
            <Blogform
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
              create={this.addBlog}
              handleFieldChange={this.handleFieldChange}
            />
          </Togglable>

          {this.state.blogs.map(blog =>
            <Blog key={blog._id}
              blog={blog}
              update={this.likeBlog}
              delete={this.removeOne}
            >
            </Blog>
          )}
        </div>
      )

    }
    return (
      <div>
        <h2>Bloglist-sovellus</h2>
        <Notification
          message={this.state.message}
          type={this.state.type}
        />
        {
          this.state.user === null ?
            loginform()
            :
            blogform()

        }
      </div >
    );
  }
}

export default App;
