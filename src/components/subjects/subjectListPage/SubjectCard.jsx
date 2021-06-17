import PropTypes from 'prop-types';
import { generatePath } from 'react-router';
import routes from 'routes';

import { BodyCopy, GreatPrimer, LongPrimer } from 'components/shared/typography';
import { subjectCard, subjectCardAuthor, subjectCardBodyText, subjectCardTitle } from 'theme/pages/subjects/subjectListPage';
import { StyledListItem } from 'components/shared/styledElements';
import { useCallback } from 'react';
import { history } from 'routes/components/RouterProvider';

/**
 * @name SubjectCard
 * @description A component used to display a subject inside the subject list page.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object}	subject						The subject to display.
 * @param {object}	subject.author				The subject's author.
 * @param {string}	subject.author.firstname
 * @param {string}	subject.author.lastname
 * @param {id}		subject.id					The subject's id. Used for redirection on click.
 * @param {string}	subject.title				The subject's title.
 * @param {string}	subject.description			The subject's description.
 * @param {bool}	[isCurrentUserTheAuthor]	Whether the current user is the author of the subject.
 */
const SubjectCard = ({ author, id, title, description, isCurrentUserTheAuthor }) => {
	/**
	 * @function
	 * @name handleClick
	 * @description A handler for the onClick event which redirects the user to the clicked subject.
	 *
	 * @author Timothée Simon-Franza
	 */
	const handleClick = useCallback(() => {
		const destinationUrl = isCurrentUserTheAuthor ? routes.subjects.subjectEdition : routes.subjects.subjectDetails;
		history.push(generatePath(destinationUrl, { subjectId: id }));
	}, [id, isCurrentUserTheAuthor]);

	return (
		<StyledListItem {...subjectCard} onClick={handleClick}>
			<GreatPrimer {...subjectCardTitle}>{title}</GreatPrimer>
			<LongPrimer {...subjectCardAuthor}>{`${author.firstname} ${author.lastname}`}</LongPrimer>
			<BodyCopy {...subjectCardBodyText}>{description}</BodyCopy>
		</StyledListItem>
	);
};

SubjectCard.propTypes = {
	author: PropTypes.shape({
		firstname: PropTypes.string.isRequired,
		lastname: PropTypes.string.isRequired,
	}).isRequired,
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	isCurrentUserTheAuthor: PropTypes.bool,
};

SubjectCard.defaultProps = {
	isCurrentUserTheAuthor: false,
};

export default SubjectCard;
