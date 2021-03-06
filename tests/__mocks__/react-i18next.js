/* eslint-disable no-param-reassign */
module.exports = {
	// this mock makes sure any components using the translate HoC receive the t function as a prop
	withTranslation: () => (Component) => {
		Component.defaultProps = { ...Component.defaultProps, t: (str) => str };

		return Component;
	},
	useTranslation: () => ({
		t: (str) => str,
		i18n: {
			changeLanguage: jest.fn(),
		},
	}),
};
