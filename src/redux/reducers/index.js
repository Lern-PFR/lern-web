import { combineReducers } from 'redux';
import lessons from './lessons';
import modules from './modules';
import concepts from './concepts';
import subjects from './subjects';
import users from './users';
import progression from './progression';
import userAnswers from './userAnswers';

export default combineReducers({
	concepts,
	lessons,
	modules,
	subjects,
	users,
	progression,
	userAnswers,
});
