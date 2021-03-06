import React from 'react'

const SimpleBlog = ({ blog, onClick }) => {
    return (
        <div>
            <div className="title">
                {blog.title} {blog.author}
            </div>
            <div className="content">
                blog has {blog.likes} likes
            <button onClick={onClick}>like</button>
            </div>
        </div>
    )
}

export default SimpleBlog