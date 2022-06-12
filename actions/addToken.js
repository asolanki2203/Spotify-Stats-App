import { ADD_TOKEN } from '../constants/constants';

export function addToken(token) {
    return {
        type: ADD_TOKEN,
        payload: token
    }
}