const notificationAtStart = ''

const notificationReducer = (state = notificationAtStart, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return action.data
        case 'NULLIFY':
            return ''
        default:
            return state
    }
}

export const notify = (content, timer) => {
    return async (dispatch) => {
        dispatch({
            type: 'NOTIFY',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'NULLIFY'
            })
        }, timer * 1000)
    }
}

export default notificationReducer
