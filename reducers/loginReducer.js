import { ADD_TOKEN } from '../constants/constants';

const initState = {
    token: null
};

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}

export default loginReducer;