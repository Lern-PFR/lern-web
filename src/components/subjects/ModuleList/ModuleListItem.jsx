import PropTypes from 'prop-types';
import { StyledListItem } from 'components/shared/layout';
import { BodyCopy, DoublePica } from 'components/shared/typography';
import { withTranslation } from 'react-i18next';
import { moduleDescription, moduleListItem, moduleName } from 'theme/pages/subjects/subjectDetailsPage';
import { PrimaryButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import routes from 'routes/keys';

/**
 * @name ModuleListItem
 * @description
 * @param {*} param0
 * @returns
 */
const ModuleListItem = ({ name, description, t }) => (
	<StyledListItem {...moduleListItem}>
		<DoublePica {...moduleName}>{name}</DoublePica>
		<BodyCopy {...moduleDescription}>{description}</BodyCopy>
		<PrimaryButton>
			<Link to={routes.subjects.default}>{t('subjects.links.module')}</Link>
		</PrimaryButton>
	</StyledListItem>
);

ModuleListItem.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
};

export default withTranslation()(ModuleListItem);
