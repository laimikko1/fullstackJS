const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { format, allBlogs, blogsInDb, noLikesBlog, noTitleBlog, usersInDb, testUser } = require('./test_helper')


describe('when the are blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = allBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())

        await Promise.all(promiseArray)
    })

    test('blogs are returned as json by GET /api/blogs', async () => {
        const blogsDB = await blogsInDb()
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        console.log(blogsDB.fo);
        expect(response.body.length).toBe(blogsDB.length)

        const returned = response.body.map(b => b.title)
        blogsDB.forEach(blog => {
            expect(returned).toContain(blog.title)
        })
    })

    test('all blogs are returned', async () => {
        const r = await api
            .get('/api/blogs')
        expect(r.body.length === blogsInDb.length)

    })
})

describe('when adding a new blog', async () => {
    beforeAll(async () => {
        const response = await api
            .post('/api/users')
            .send(testUser)

    })

    test('POST /api/blogs works with correct information', async () => {

        const logres = await api
            .post('/api/login')
            .send(testUser)

        const token = logres.body.token


        const newB = {
            title: 'Testiblogi',
            author: 'Testi K. Irjoittaja',
            url: 'wwww.google.com',
            likes: 5
        }

        const before = await blogsInDb()

        const res = await api
            .post('/api/blogs')
            .send(newB)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-type', /application\/json/)


        const after = await blogsInDb()
        const lastAdded = after[after.length - 1]
        delete lastAdded.id

        expect(after.length).toBe(before.length + 1)
        expect(lastAdded).toEqual(newB)
    })

    test('if an blog without likes is added, it gets 0 as likes value', async () => {
        const logres = await api
            .post('/api/login')
            .send(testUser)

        const token = logres.body.token


        const before = await blogsInDb()

        const r = await api
            .post('/api/blogs')
            .send(noLikesBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(200)

        const after = await blogsInDb()
        expect(after.length).toBe(before.length + 1)
        expect(after[after.length - 1].likes).toBe(0)
    })

    test('POST /api/blogs does not work if a blog has no title', async () => {
        const logres = await api
            .post('/api/login')
            .send(testUser)

        const token = logres.body.token
        const before = await blogsInDb()

        const notAdded = await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)

        const after = await blogsInDb()
        expect(after.length).toBe(before.length)
        expect(notAdded.body).toEqual({ error: "title missing" })
    })

})


describe('removing a blog', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const response = await api
            .post('/api/users')
            .send(testUser)

        const logres = await api
            .post('/api/login')
            .send(testUser)

        const token = logres.body.token

        const newB = {
            title: 'Testiblogi',
            author: 'Testi K. Irjoittaja',
            url: 'wwww.google.com',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newB)
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-type', /application\/json/)
    })

    test('DELETE /api/blog removes a blog when removed by the user who posted it', async () => {
        const before = await blogsInDb()

        const logres = await api
            .post('/api/login')
            .send(testUser)

        const token = logres.body.token
        const id = before[0].id
        console.log(before);

        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const after = await blogsInDb()
        const map = after.map(m => m.id)

        expect(after.length).toBe(before.length - 1)
        expect(map).not.toContain(id)
    })

})

describe('adding a user', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('POST /api/users succeeds with a new username', async () => {
        const before = await usersInDb()

        const newU = {
            name: "mikko",
            username: "mkoeee",
            password: "salasana"
        }

        await api
            .post('/api/users')
            .send(newU)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const after = await usersInDb()
        expect(after.length).toBe(before.length + 1)
        const usernames = after.map(m => m.username)
        expect(usernames).toContain(newU.username)
    })

    test('POST /api/users does not succeed with a duplicate username', async () => {
        const before = await usersInDb()

        const newU = {
            name: "rara",
            password: "salasana",
            username: "root"
        }

        const res = await api
            .post('/api/users')
            .send(newU)
            .expect(400)

        const after = await usersInDb()

        expect(res.body.error).toBe("username must be unique")
        expect(after.length).toBe(before.length)
    })

    test('POST /api/users does not succeed with too short password', async () => {
        const before = await usersInDb()


        const newU = {
            name: "test",
            password: "aa",
            username: "aa"
        }

        const res = await api
            .post('/api/users')
            .send(newU)
            .expect(400)

        const after = await usersInDb()

        expect(res.body.error).toBe('password must be atleast 3 characters long')
        expect(after.length).toBe(before.length)
    })

    test('if adult is not defined, default is true', async () => {
        const before = await usersInDb()

        const newU = {
            name: "test",
            password: "salasana",
            username: "testikaaettaejae"
        }

        const res = await api
            .post('/api/users')
            .send(newU)
            .expect(200)

        const after = await usersInDb()

        expect(after.length).toBe(before.length + 1)
        expect(res.body.adult).toEqual(true)
    })

})

afterAll(async () => {
    server.close()
}




)

