const filterAtStart = ''

const filterReducer = (state = filterAtStart, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data
        default:
            return state
        }
}

export const showFilter = (content) => {
    return {
        type: 'SHOW',
        data: content
    }
}


export default filterReducer