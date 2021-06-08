/* istanbul ignore file */
import { mount } from 'enzyme';

/**
 * @function
 * @name containAtLeastOne
 * @description Test if the given form contains at least one input with the given type
 *
 * @author Yann Hodiesne
 *
 * @param {string} type : The type of the input to look for.
 * @param {object} form : The form to test on.
 */
export default (type, { sut }) => {
	const wrapper = mount(sut);

	expect(wrapper.find(`input[type="${type}"]`).exists()).toBe(true);
};
