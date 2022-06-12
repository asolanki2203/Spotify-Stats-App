import { legacy_createStore as createStore, combineReducers } from 'redux';
import loginReducer from '../reducers/loginReducer';

// const rootReducer = combineReducers(
//     loginReducer
// );

const Store = createStore(loginReducer);

export default Store;