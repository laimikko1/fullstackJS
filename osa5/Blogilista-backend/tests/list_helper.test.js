const listHelper = require('../utils/list_helper')

const emptyBlogs = []

const oneBlog = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }
]

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

const allBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list has multiple blogs, the likes are the total likes of them all', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(12)
    })

    test('when list is empty, the likes are 0', () => {
        const result = listHelper.totalLikes(emptyBlogs)
        expect(result).toBe(0)
    })

    test('when list has one object the total likes same as that', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(7)
    })
})

describe('favorite blog', () => {


    test('when list is empty, undefined is returned', () => {
        const result = listHelper.favoriteBlog(emptyBlogs)
        expect(result).toEqual(undefined)
    })

    test('when only one blog, it\'s returned', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        expect(result).toEqual(oneBlog[0])
    })

    test('when only one blog, returned, even if zero likes', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        expect(result).toEqual(oneBlog[0])
    })

    test('when multiple blogs, it returns the one with most likes', () => {
        const result = listHelper.favoriteBlog(allBlogs)
        expect(result).toEqual(allBlogs[2])
    })
})

describe('most blogs', () => {
    test('when empty, undefined is returned', () => {
        const result = listHelper.mostBlogs(emptyBlogs)
        expect(result).toEqual(undefined)
    })

    test('when single blog, the author of it is returned', () => {
        const result = listHelper.mostBlogs(oneBlog)
        const mostB = { "author": oneBlog[0].author, "blogs": 1 }
        expect(result).toEqual(mostB)
    })

    test('when multiple blogs, the one with most is returned', () => {

        const result = listHelper.mostBlogs(allBlogs)
        const mostB = { "author": allBlogs[3].author, "blogs": 3 }
        expect(result).toEqual(mostB)
    })
})

describe('most votes', () => {
    test('when empty, undefined is returned', () => {
        const result = listHelper.mostVotes(emptyBlogs)
        expect(result).toEqual(undefined)
    })

    test('when single blog, author is returned with correct amount of votes', () => {
        const result = listHelper.mostVotes(oneBlog)
        expect(result).toEqual({ "author": oneBlog[0].author, "votes": oneBlog[0].likes })
    })

    test('when multiple authors, the one with most combined votes is returned', () => {
        const result = listHelper.mostVotes(allBlogs)
        expect(result).toEqual({ "author": allBlogs[1].author, "votes": 17 })
    })
})

