import { combineReducers } from 'redux';
import modules from './modules';
import notions from './notions';
import subjects from './subjects';
import users from './users';

export default combineReducers({
	modules,
	notions,
	subjects,
	users,
});
