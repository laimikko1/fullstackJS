const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'good':
        case 'ok':
        case 'bad':
            return { ...state, [action.type]: state[action.type] + 1 }
        case 'zero':
            return { ...state, good: 0, ok: 0, bad: 0 }
    }
    return state
}

export default counterReducer