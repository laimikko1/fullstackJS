const actionFor = {
    anecdoteVote(id) {
        return {
            type: 'VOTE',
            data: { id }
        }
    },

    anecdoteCreation(content) {
        return {
            type:'NEW_ANECDOTE',
            data: {
                content
            }
        }
    }
}

export default actionFor 