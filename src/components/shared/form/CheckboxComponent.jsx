import styled from 'styled-components';
import {
	border,
	display,
	layout,
	shadow,
	color,
} from 'styled-system';
import PropTypes from 'prop-types';
import { disabled as disabledStyle } from 'theme/buttonStyles';
import { checkboxStyle } from 'theme/formStyles';
import { forwardRef, useRef } from 'react';

const StyledCheckboxComponent = styled('input')(
	border,
	display,
	layout,
	shadow,
	color,
	{ ...checkboxStyle },
);

/**
 * @name CheckboxComponent
 * @description A component used to display styled checkbox element.
 *
 * @author Christopher Walker
 *
 * @param {bool}			[disabled]		Whether the checkbox is disabled.
 * @param {bool}			[checked]		Whether the checkbox is checked.
 * @param {string|number}	id				The id of the checkbox.
 */
const CheckboxComponent = forwardRef(
	({ id, checked, disabled, ...otherProps }, ref) => {
		const defaultRef = useRef();
		const resolvedRef = ref || defaultRef;

		return (
			<StyledCheckboxComponent
				{...(disabled ? disabledStyle : {})}
				type="checkbox"
				disabled={disabled}
				defaultChecked={checked}
				id={id}
				ref={resolvedRef}
				{...otherProps}
			/>
		);
	}
);

CheckboxComponent.displayName = 'CheckboxComponent';

CheckboxComponent.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
};

CheckboxComponent.defaultProps = {
	disabled: false,
	checked: false,
};

export default CheckboxComponent;
