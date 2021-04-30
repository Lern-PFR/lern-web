import { combineReducers } from 'redux';
import lessons from './lessons';
import modules from './modules';
import notions from './notions';
import subjects from './subjects';
import users from './users';

export default combineReducers({
	lessons,
	modules,
	notions,
	subjects,
	users,
});
