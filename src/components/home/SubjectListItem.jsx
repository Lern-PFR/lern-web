import { OutlinedLinkButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import { StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, GreatPrimer } from 'components/shared/typography';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import PropTypes from 'prop-types';
import routes from 'routes';
import { continueButton } from 'theme/pages/home/homepageAuth';

/**
 * @name SubjectListItem
 * @description A component used to display a summary of the subject on the user's dashboard
 *
 * @author Christopher Walker
 *
 * @param {string} id			The id of the subject.
 * @param {string} title		The title of the subject.
 * @param {string} description	The description of the subject.
*/
const SubjectListItem = ({ id, description, title }) => {
	const { t } = useTranslation();

	return (
		<StyledListItem>
			<GreatPrimer margin="0">{title}</GreatPrimer>
			<BodyCopy margin="0">{description}</BodyCopy>
			<OutlinedLinkButton {...continueButton}>
				<Link to={generatePath(routes.subjects.subjectDetails, { subjectId: id })}>{t('home.pages.auth.links.continue')}</Link>
			</OutlinedLinkButton>
		</StyledListItem>
	);
};

SubjectListItem.propTypes = {
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default SubjectListItem;
