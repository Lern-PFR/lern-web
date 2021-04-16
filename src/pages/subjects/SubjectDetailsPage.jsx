import { compose } from 'redux';
import { StyledDiv } from 'components/shared/layout';
import { Brevier, Canon, BodyCopy } from 'components/shared/typography';
import Proptypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { backToListButton, pageLayout, subjectAuthor, subjectName } from 'theme/pages/subjects/subjectDetailsPage';
import ModuleList from 'components/subjects/ModuleList';
import { SubtleButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import routes from 'routes/keys';

/**
 * @name SubjectDetailsPage
 * @description A page used to display the current subject with its composing modules.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	subjectId	The id of the current subject.
 * @param {object}	subject		The current subject's information.
 * @param {array}	modules		The list of modules composing the current subject.
 * @param {func}	t			The translation method provided by the withTranslation HoC.
 */
const SubjectDetailsPage = ({ subjectId, subject, modules, t }) => {
	console.log(subjectId);

	return (
		<StyledDiv {...pageLayout}>
			<StyledDiv>
				<Canon {...subjectName} tag="h1">{subject?.name}</Canon>
				<Brevier {...subjectAuthor}>
					{t('subjects.details.author_section', { author: subject?.author, lastUpdate: subject?.lastUpdate })}
				</Brevier>
				<BodyCopy>{subject?.description}</BodyCopy>
				<SubtleButton {...backToListButton}>
					<Link to={routes.subjects.default}>
						{t('subjects.links.back_to_list')}
					</Link>
				</SubtleButton>
			</StyledDiv>
			<StyledDiv>
				<ModuleList modules={modules} />
			</StyledDiv>
		</StyledDiv>
	);
};

SubjectDetailsPage.propTypes = {
	subjectId: Proptypes.string.isRequired,
	subject: Proptypes.shape({
		name: Proptypes.string.isRequired,
		description: Proptypes.string.isRequired,
		author: {
			firstName: Proptypes.string.isRequired,
			lastName: Proptypes.string.isRequired,
		}.isRequired,
		lastUpdate: Proptypes.string.isRequired,
	}).isRequired,
	modules: Proptypes.arrayOf(Proptypes.shape({
		id: Proptypes.string.isRequired,
		name: Proptypes.string.isRequired,
	})).isRequired,
	t: Proptypes.func.isRequired,
};

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state, ownProps) => {
	const { match: { params: { id: subjectId } } } = ownProps;

	const {
		// modules: { items: moduleList },
		subjects: { items: subjectList },
	} = state;

	subjectList[0] = {
		name: 'Gestion de projet informatique',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin accumsan nulla, vitae pellentesque magna commodo sed. Nam vel mattis ex, eu rutrum ligula. Curabitur accumsan et nulla id laoreet. Sed et sem vitae lorem iaculis venenatis. Morbi tempus mi vel neque rutrum, sed tempus quam interdum. Suspendisse vehicula eros vel lorem sollicitudin volutpat. Morbi at turpis et turpis pulvinar tristique. Duis dictum mollis justo sed commodo. Fusce finibus est non venenatis vestibulum. Sed ultricies elit eget metus elementum, ac lobortis mi venenatis. Nulla facilisi. Quisque id rhoncus nibh.',
		author: {
			firstName: 'John',
			lastName: 'Doe',
		},
		lastUpdate: '12/04/2021',
	};

	const moduleListMock = [
		{ id: '0', name: 'name 0', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin accumsan nulla, vitae pellentesque magna commodo sed. Nam vel mattis ex, eu rutrum ligula. Curabitur accumsan et nulla id laoreet. Sed et sem vitae lorem iaculis venenatis. Morbi tempus mi vel neque rutrum, sed tempus quam interdum. Suspendisse vehicula eros vel lorem sollicitudin volutpat. Morbi at turpis et turpis pulvinar tristique. Duis dictum mollis justo sed commodo. Fusce finibus est non venenatis vestibulum. Sed ultricies elit eget metus elementum, ac lobortis mi venenatis. Nulla facilisi. Quisque id rhoncus nibh.' },
		{ id: '1', name: 'name 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin accumsan nulla, vitae pellentesque magna commodo sed. Nam vel mattis ex, eu rutrum ligula. Curabitur accumsan et nulla id laoreet. Sed et sem vitae lorem iaculis venenatis. Morbi tempus mi vel neque rutrum, sed tempus quam interdum. Suspendisse vehicula eros vel lorem sollicitudin volutpat. Morbi at turpis et turpis pulvinar tristique. Duis dictum mollis justo sed commodo. Fusce finibus est non venenatis vestibulum. Sed ultricies elit eget metus elementum, ac lobortis mi venenatis. Nulla facilisi. Quisque id rhoncus nibh.' },
		{ id: '2', name: 'name 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin accumsan nulla, vitae pellentesque magna commodo sed. Nam vel mattis ex, eu rutrum ligula. Curabitur accumsan et nulla id laoreet. Sed et sem vitae lorem iaculis venenatis. Morbi tempus mi vel neque rutrum, sed tempus quam interdum. Suspendisse vehicula eros vel lorem sollicitudin volutpat. Morbi at turpis et turpis pulvinar tristique. Duis dictum mollis justo sed commodo. Fusce finibus est non venenatis vestibulum. Sed ultricies elit eget metus elementum, ac lobortis mi venenatis. Nulla facilisi. Quisque id rhoncus nibh.' },

	];

	return {
		subjectId,
		subject: subjectList[0],
		modules: moduleListMock,
	};
};

export default compose(withTranslation(), connect(mapStateToProps))(SubjectDetailsPage);
