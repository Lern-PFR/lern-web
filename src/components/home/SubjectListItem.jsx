import { OutlinedLinkButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import { StyledDiv, StyledListItem } from 'components/shared/styledElements';
import { BodyCopy, Brevier } from 'components/shared/typography';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import PropTypes from 'prop-types';
import routes from 'routes';

/** */
const SubjectListItem = ({ id, description, title }) => {
	const { t } = useTranslation();

	return (
		<StyledListItem key={id}>
			<BodyCopy margin="0">{title}</BodyCopy>
			<Brevier margin="0">{description}</Brevier>
			<StyledDiv>
				<OutlinedLinkButton>
					<Link to={generatePath(routes.subjects.subjectDetails, { subjectId: id })}>{t('subjects.links.show')}</Link>
				</OutlinedLinkButton>
			</StyledDiv>
		</StyledListItem>
	);
};

SubjectListItem.propTypes = {
	description: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default SubjectListItem;
