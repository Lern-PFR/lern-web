import { StyledDiv } from 'components/shared/styledElements';
import PropTypes from 'prop-types';
import { tuna } from 'theme/colors';
import { forwardRef, useRef } from 'react';
import CheckboxComponent from './CheckboxComponent';
import LabelComponent from './LabelComponent';

/**
 * @name LabeledCheckbox
 * @description A component used to display styled checkbox element.
 *
 * @author Christopher Walker
 *
 * @param {bool}	[disabled]			Whether the checkbox is disabled.
 * @param {bool}	[checked]			Whether the checkbox is checked.
 * @param {string}	[labelTextStyle]	Text style for the label component.
 * @param {string}	id					The id of the checkbox.
 * @param {string}	children			Text to display in the label.
 */
const LabeledCheckbox = forwardRef(
	({ children, id, checked, disabled, labelTextStyle, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledDiv display="flex" alignItems="center" {...otherProps}>
				<CheckboxComponent disabled={disabled} checked={checked} id={id} ref={resolvedRef} />
				<LabelComponent textStyle={labelTextStyle} forId={id} color={disabled ? tuna.darker1 : 'initial'}>
					{children}
				</LabelComponent>
			</StyledDiv>
		);
	}
);

LabeledCheckbox.displayName = 'LabeledCheckbox';

LabeledCheckbox.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	children: PropTypes.string.isRequired,
	labelTextStyle: PropTypes.string,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

LabeledCheckbox.defaultProps = {
	labelTextStyle: '',
	disabled: false,
	checked: false,
};

export default LabeledCheckbox;
