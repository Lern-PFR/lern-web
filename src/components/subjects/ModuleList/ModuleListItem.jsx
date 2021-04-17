import PropTypes from 'prop-types';
import { StyledListItem } from 'components/shared/layout';
import { BodyCopy, DoublePica } from 'components/shared/typography';
import { withTranslation } from 'react-i18next';
import { moduleDescription, moduleListItem, moduleName } from 'theme/pages/subjects/subjectDetailsPage';
import { PrimaryButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import routes from 'routes/keys';
import styled from 'styled-components';

const StyledModuleListItem = styled(StyledListItem)(
	{
		'&:not(:first-child):before': {
			content: '""',
			border: 'solid 1px black',
			position: 'absolute',
			top: '-2.1em',
			height: '2em',
			left: '10em',
		},
	}
);

/**
 * @name ModuleListItem
 * @description An item used to display an overview of a module inside its subject's details page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	id			The current module's id.
 * @param {string}	name		The current module's name.
 * @param {string}	description	A short description of the current module.
 * @param {bool}	[disabled]	Set to true if the current module is not yet unlocked for the current user.
 * @param {func}	t			The translation method provided by the withTranslation HoC.
 */
const ModuleListItem = ({ id, name, description, disabled, t }) => (
	<StyledModuleListItem {...moduleListItem}>
		<DoublePica {...moduleName}>{name}</DoublePica>
		<BodyCopy {...moduleDescription}>{description}</BodyCopy>
		<PrimaryButton disabled={disabled}>
			<Link to={routes.modules.moduleDetails.replace(':id', id)} disabled={disabled}>{t('subjects.links.module')}</Link>
		</PrimaryButton>
	</StyledModuleListItem>
);

ModuleListItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	t: PropTypes.func.isRequired,
};

ModuleListItem.defaultProps = {
	disabled: false,
};

export default withTranslation()(ModuleListItem);
