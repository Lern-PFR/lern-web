import { combineReducers } from 'redux';
import lessons from './lessons';
import modules from './modules';
import concepts from './concepts';
import subjects from './subjects';
import users from './users';
<<<<<<< HEAD
import progression from './progression';
=======
import userAnswers from './userAnswers';
>>>>>>> Implemented the question answer redux stack.

export default combineReducers({
	concepts,
	lessons,
	modules,
	subjects,
	users,
<<<<<<< HEAD
	progression,
=======
	userAnswers,
>>>>>>> Implemented the question answer redux stack.
});
