import { combineReducers } from 'redux';
import modules from './modules';
import subjects from './subjects';
import users from './users';

export default combineReducers({
	modules,
	subjects,
	users,
});
