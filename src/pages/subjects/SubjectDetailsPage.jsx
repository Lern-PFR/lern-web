import { useEffect } from 'react';
import Proptypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { ChevronLeft } from 'react-feather';

import { clearModuleList, fetchModuleListBySubjectId } from 'redux/actions/modules';
import routes from 'routes/keys';

import { StyledDiv } from 'components/shared/layout';
import { Brevier, Canon, BodyCopy } from 'components/shared/typography';
import ModuleList from 'components/subjects/ModuleList';
import { SubtleButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';

import { backToListButton, pageLayout, subjectAuthor, subjectName, subjectDetails } from 'theme/pages/subjects/subjectDetailsPage';

import { subjectDetailsPageMock } from 'mockedData';

/**
 * @name SubjectDetailsPage
 * @description A page used to display the current subject with its composing modules.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	subjectId				The id of the current subject.
 * @param {object}	subject					The current subject's information.
 * @param {array}	modules					The list of modules composing the current subject.
 * @param {func}	t						The translation method provided by the withTranslation HoC.
 * @param {func}	dispatchFetchModuleList Dispatched action creator used to retrieve the current subject's module list.
 * @param {func}	dispatchClearModuleList	Dispatched action creator used to empty the modules state list on unmount.
 */
const SubjectDetailsPage = ({ dispatchFetchModuleList, dispatchClearModuleList, subjectId, subject, modules, t }) => {
	useEffect(() => {
		dispatchFetchModuleList(subjectId);

		return () => dispatchClearModuleList();
	}, [dispatchFetchModuleList, dispatchClearModuleList, subjectId]);

	return (
		<StyledDiv {...pageLayout}>
			<StyledDiv>
				<StyledDiv {...subjectDetails}>
					<Canon {...subjectName} tag="h1">{subject?.name}</Canon>
					<Brevier {...subjectAuthor}>
						{t('subjects.details.author_section', { author: subject?.author, lastUpdate: subject?.lastUpdate })}
					</Brevier>
					<BodyCopy>{subject?.description}</BodyCopy>
					<SubtleButton {...backToListButton}>
						<Link to={routes.subjects.default}>
							<StyledDiv display="flex" alignItems="center">
								<ChevronLeft />
								{t('subjects.links.back_to_list')}
							</StyledDiv>
						</Link>
					</SubtleButton>
				</StyledDiv>
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
		disabled: Proptypes.bool,
	})).isRequired,
	t: Proptypes.func.isRequired,
	dispatchFetchModuleList: Proptypes.func.isRequired,
	dispatchClearModuleList: Proptypes.func.isRequired,
};

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state, ownProps) => {
	const { match: { params: { id: subjectId } } } = ownProps;

	// @TODO: uncomment these lines once data can be retrieved from the API.
	// const {
	// 	modules: { items: moduleList },
	// 	subjects: { items: subjectList },
	// } = state;

	return {
		subjectId,
		subject: subjectDetailsPageMock.subjectList[0],
		modules: subjectDetailsPageMock.moduleList,
	};
};

const mapDispatchToProps = {
	dispatchFetchModuleList: fetchModuleListBySubjectId,
	dispatchClearModuleList: clearModuleList,
};

export default compose(
	withTranslation(),
	connect(mapStateToProps, mapDispatchToProps)
)(SubjectDetailsPage);
