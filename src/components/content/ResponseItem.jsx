import { useCallback, useRef } from 'react';
import { InputComponent, RadioButtonComponent } from 'components/shared/form';
import { StyledDiv } from 'components/shared/styledElements';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { responseInput, responseItem } from 'theme/contentEditionCommon/genericLayout';

/**
 *
 * @param {*} param0
 * @returns
 */
const ResponseItem = ({ id, name, hasPlaceholder, handleChange, handleBlur, hasError, errorText, checked, handleCheckedChanged }) => {
	const { t } = useTranslation();
	const fieldsRef = useRef({});

	const onChange = useCallback(() => {
		handleCheckedChanged(name);
	}, [name, handleCheckedChanged]);

	return (
		<StyledDiv {...responseItem}>
			<RadioButtonComponent id={`rb-${id}`} name="responses" checked={checked} onChange={onChange} />
			<InputComponent
				id={id}
				name={name}
				onChange={handleChange}
				onBlur={handleBlur}
				hasError={hasError}
				errorText={errorText}
				placeholder={hasPlaceholder ? t(`exercises.creation.form.fields.${name}.placeholder`) : undefined}
				ref={(fieldRef) => { fieldsRef.current[name] = fieldRef; }}
				{...responseInput}
			/>
		</StyledDiv>
	);
};

ResponseItem.propTypes = {
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	name: PropTypes.string.isRequired,
	hasPlaceholder: PropTypes.bool.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	hasError: PropTypes.bool,
	errorText: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	handleCheckedChanged: PropTypes.func.isRequired,
};

ResponseItem.defaultProps = {
	hasError: false,
};

export default ResponseItem;
