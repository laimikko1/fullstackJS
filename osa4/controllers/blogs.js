const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog
        .find({})
        .populate('user', { name: 1, username: 1, id: 1 })

    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = request.body

    try {
        console.log(blog);
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        if (!blog.title) {
            return response.status(400).json({ error: 'title missing' })
        }

        const user = await User.findById(decodedToken.id)

        const b = new Blog({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes === undefined ? 0 : blog.likes,
            user: user._id
        })

        const savedB = await b.save()
        user.blogs = user.blogs.concat(savedB._id)
        await user.save()

        response.json(savedB)

    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.delete('/:id', async (req, res) => {
    const body = req.body

    try {
        const token = req.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        const blog = await Blog.findOne({ _id: req.params.id })

        if (decodedToken.id !== blog.user.toString()) {
            return res.status(401).json({ error: 'Deleting another users entry is not allowed' })
        }
        if (!token) {
            return res.status(401).json({ error: 'Token invalid or missing' })
        }

        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()

    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            res.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            res.status(500).json({ error: 'something went wrong...' })
        }
    }
})

blogsRouter.put('/:id', async (req, res) => {
    try {
        const b = await req.body

        const bl = {
            title: b.title,
            author: b.author,
            likes: b.likes,
            url: b.url
        }

        const r = await Blog.findByIdAndUpdate(req.params.id, bl, { new: true })
        res.json(r)

    } catch (exception) {
        console.log(exception);
        res.status(400).error({ error: 'no eipä löytynä,,,!!!' })
    }
})



module.exports = blogsRouter