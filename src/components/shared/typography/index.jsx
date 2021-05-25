import PropTypes from 'prop-types';
import {
	canon,
	trafalgar,
	paragon,
	doublePica,
	greatPrimer,
	bodyCopy,
	pica,
	longPrimer,
	brevier,
	minion,
} from 'theme/textStyles';
import DynamicTextComponent from './DynamicTextComponent';

/**
 * @name LabeledCheckbox
 * @description A method used to get the different text styles by their name.
 *
 * @author Christopher Walker
 *
 * @param {string} textStyleName Name of the text style to return
 */
export const getTypographyStyleByName = (textStyleName) => {
	switch (textStyleName.toLowerCase()) {
		case 'canon':		return canon;
		case 'trafalgar':	return trafalgar;
		case 'paragon':		return paragon;
		case 'greatprimer':	return greatPrimer;
		case 'doublepica':	return doublePica;
		case 'bodycopy':	return bodyCopy;
		case 'pica':		return pica;
		case 'longprimer':	return longPrimer;
		case 'minion':		return minion;
		default:			return brevier;
	}
};

/**
 * @name Canon
 * @description Text component to be used for hero or page title, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const Canon = ({ children, ...props }) => (
	<DynamicTextComponent {...canon} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name Trafalgar
 * @description Text component to be used for page title or section headers, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const Trafalgar = ({ children, ...props }) => (
	<DynamicTextComponent {...trafalgar} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name Paragon
 * @description Text component to be used as primary headline, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const Paragon = ({ children, ...props }) => (
	<DynamicTextComponent {...paragon} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name DoublePica
 * @description Text component to be used as sub header, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const DoublePica = ({ children, ...props }) => (
	<DynamicTextComponent {...doublePica} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name GreatPrimer
 * @description Text component to be used as headline title or subtitle, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const GreatPrimer = ({ children, ...props }) => (
	<DynamicTextComponent {...greatPrimer} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name BodyCopy
 * @description Text component to be used as body copy.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const BodyCopy = ({ children, ...props }) => (
	<DynamicTextComponent {...bodyCopy} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name Pica
 * @description Text component to be used as links, titles or headlines, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const Pica = ({ children, ...props }) => (
	<DynamicTextComponent {...pica} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name LongPrimer
 * @description Text component to be used as secondary body copy, image captions or inline links, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const LongPrimer = ({ children, ...props }) => (
	<DynamicTextComponent {...longPrimer} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name Brevier
 * @description Text component to be used as timestamps, bylines, input labels and helper text, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const Brevier = ({ children, ...props }) => (
	<DynamicTextComponent {...brevier} {...props}>
		{children}
	</DynamicTextComponent>
);

/**
 * @name Minion
 * @description Text component to be used as small header capitalized, tag or badge, for example.
 *
 * @author Timothée Simon-Franza
 *
 * @param {*} children : The text to be displayed.
 */
const Minion = ({ children, ...props }) => (
	<DynamicTextComponent {...minion} {...props}>
		{children}
	</DynamicTextComponent>
);

Canon.propTypes = { children: PropTypes.node.isRequired };

Trafalgar.propTypes = { children: PropTypes.node.isRequired };

Paragon.propTypes = { children: PropTypes.node.isRequired };

GreatPrimer.propTypes = { children: PropTypes.node.isRequired };

DoublePica.propTypes = { children: PropTypes.node.isRequired };

BodyCopy.propTypes = { children: PropTypes.node.isRequired };

Pica.propTypes = { children: PropTypes.node.isRequired };

LongPrimer.propTypes = { children: PropTypes.node.isRequired };

Brevier.propTypes = { children: PropTypes.node.isRequired };

Minion.propTypes = { children: PropTypes.node.isRequired };

export {
	Canon,
	Trafalgar,
	Paragon,
	GreatPrimer,
	DoublePica,
	BodyCopy,
	Pica,
	LongPrimer,
	Brevier,
	Minion,
};
