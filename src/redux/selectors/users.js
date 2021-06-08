/**
 * @function
 * @name getCurrentUser
 * @description Returns the currently authenticated user if any.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} state The current Redux state object.
 *
 * @returns {object | undefined}
 */
const getCurrentUser = (state) => state.users?.currentUser ?? undefined;

export {
	// eslint-disable-next-line import/prefer-default-export
	getCurrentUser,
};
