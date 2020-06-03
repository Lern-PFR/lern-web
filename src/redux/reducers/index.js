import { combineReducers } from 'redux';
import alerts from '../reducers/alerts';
import auth from '../reducers/auth';
import users from '../reducers/users';

export default combineReducers({
    alerts,
    auth,
    users,
});