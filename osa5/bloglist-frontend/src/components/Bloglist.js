import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, update }) => {

    return (
        <div>
            <h2>Blogs</h2>
            <ul>
                {blogs.forEach(blog =>
                    <Blog
                        bloki={blog}
                    >
                    </Blog>
                )}
            </ul>
        </div>
    )
}

export default BlogList