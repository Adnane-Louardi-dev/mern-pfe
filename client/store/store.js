import { configureStore } from 'redux'

const initialState = {}

function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}

const store = configureStore(reducer)

export default store
