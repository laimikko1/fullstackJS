import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const blog = this.props.blog
    let user = "unknown"
    if (this.props.blog.user) {
      user = this.props.blog.user
    }
    const showOrHide = {
      display: this.state.visible ? '' : 'none',
      paddingLeft: 5
    }

    let button = null
    const userN = JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username

    if (!this.props.blog.user ||
      this.props.blog.user.username === userN) {
      button = <button onClick={this.props.delete(this.props.blog._id, this.props.blog.title)}>Delete</button>
    }

    return (
      <div>
        <div className="blogStyle">
          <li onClick={this.toggleVisibility}>{blog.title} by {blog.author}</li>
          <div style={showOrHide} className="content">
            <li><a href={blog.url}>{blog.url}</a></li>
            <li>{blog.likes} likes <button onClick={this.props.update(this.props.blog._id, this.props.blog, this.props.blog.user)}>like</button></li>
            <li>added by {user.name}</li>
            {button}
          </div>
        </div>
      </div>
    )
  }
}


Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
}


export default Blog;