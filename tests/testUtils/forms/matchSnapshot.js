/* istanbul ignore file */
import { shallow } from 'enzyme';

/**
 * @function
 * @name matchSnapshot
 * @description Test if the given form matches its snapshot
 *
 * @author Yann Hodiesne
 *
 * @param {object} form : The form to test on.
 */
export default ({ sut }) => {
	const wrapper = shallow(sut);
	expect(wrapper).toMatchSnapshot();
};
