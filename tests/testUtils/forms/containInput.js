/* istanbul ignore file */
import { mount } from 'enzyme';

/**
 * @function
 * @name containInput
 * @description Test if the given form contains an input with the given name and type
 *
 * @author Yann Hodiesne
 *
 * @param {string} name : The name of the input to look for.
 * @param {string} type : The type of the input to look for.
 * @param {object} form : The form to test on.
 */
export default (name, type, { sut }) => {
	const wrapper = mount(sut);

	expect(wrapper.find(`[name="${name}"][type="${type}"]`).exists()).toBe(true);
};
