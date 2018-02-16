const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0;
    blogs.forEach(red => {
        likes += red.likes
    })
    return likes;
}

const favoriteBlog = (blogs) => {
    let blog;
    blogs.forEach(b => {
        if ((!blog) || blog.likes < b.likes) {
            blog = b
        }
    })
    return blog
}

const mostBlogs = (blogs) => {
    let allWriters = {};
    let mostPopular;

    blogs.forEach(b => {
        if (!allWriters[b.author]) {
            allWriters[b.author] = 1
        } else {
            allWriters[b.author] = allWriters[b.author] + 1
        }
    })
    Object.keys(allWriters).forEach(m => {
        if (!mostPopular || allWriters[m] > allWriters[mostPopular.author]) {
            mostPopular = { "author": m, "blogs": allWriters[m] }
        }
    })
    return mostPopular
}

const mostVotes = (blogs) => {
    let allWriters = {}
    let mostPopular

    blogs.forEach(b => {
        if (!allWriters[b.author]) {
            allWriters[b.author] = b.likes
        } else {
            allWriters[b.author] = allWriters[b.author] + b.likes
        }

        if (!mostPopular || allWriters[b.author] > mostPopular.votes) {
            mostPopular = { "author": b.author, "votes": allWriters[b.author] }
        }
    })
    
    return mostPopular
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostVotes
}