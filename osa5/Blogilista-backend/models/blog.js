const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})


// const formatBlog = (blog) => {
//     return {
//         id: blog._id,
//         title: blog.title,
//         author: blog.author,
//         url: blog.url,
//         likes: blog.likes
//     }
// }

module.exports = Blog