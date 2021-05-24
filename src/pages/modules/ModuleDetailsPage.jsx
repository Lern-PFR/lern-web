import { useEffect } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { ChevronLeft } from 'react-feather';

import { clearNotionList, fetchNotionListByModuleId } from 'redux/actions/notions';
import routes from 'routes/keys';

import { moduleDetailsPageMock } from 'mockedData';
import { StyledDiv } from 'components/shared/styledElements';
import { Canon, GreatPrimer } from 'components/shared/typography';
import NotionList from 'components/modules/NotionList';
import { SubtleButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import { moduleName, moduleDescription, pageLayout } from 'theme/pages/modules/moduleDetailsPage';
import { backToListButton } from 'theme/pages/subjects/subjectDetailsPage';

/**
 * @name ModuleDetailsPage
 * @description A page used to display the current module and its composing notions
 *
 * @author Timothée Simon-Franza
 *
 * @param {string}	moduleId				The id of the current module.
 * @param {object}	module					The current module's information.
 * @param {array}	notions					The list of notions composing the current module.
 * @param {func}	dispatchFetchNotionList	Dispatched action creator used to retrieve the current module's notion list.
 * @param {func}	dispatchClearNotionList Dispatched action creator used to empty the notions state list on unmount.
 * @param {string}	subjectId				The current module's parent subject's id.
 * @param {func}	t						The translation method provided by the withTranslation HoC.
 */
const ModuleDetailsPage = ({ dispatchFetchNotionList, dispatchClearNotionList, moduleId, module, notions, t }) => {
	useEffect(() => {
		dispatchFetchNotionList(moduleId);

		return () => dispatchClearNotionList();
	}, [dispatchFetchNotionList, dispatchClearNotionList, moduleId]);

	return (
		<StyledDiv {...pageLayout}>
			<StyledDiv>
				<SubtleButton {...backToListButton}>
					<Link to={routes.subjects.subjectDetails.replace(':id', module?.subjectId)}>
						<StyledDiv display="flex" alignItems="center">
							<ChevronLeft />
							{t('modules.links.back_to_subject')}
						</StyledDiv>
					</Link>
				</SubtleButton>
				<Canon tag="h1" {...moduleName}>{module?.name}</Canon>
			</StyledDiv>
			<GreatPrimer {...moduleDescription}>{module?.description}</GreatPrimer>
			<NotionList notions={notions} />
		</StyledDiv>
	);
};

ModuleDetailsPage.propTypes = {
	moduleId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	module: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		subjectId: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
	}).isRequired,
	notions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]).isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		lessons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})),
	})).isRequired,
	dispatchFetchNotionList: PropTypes.func.isRequired,
	dispatchClearNotionList: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

/**
 *
 * @param {*} state
 */
const mapStateToProps = (state, ownProps) => {
	const { match: { params: { id: moduleId } } } = ownProps;

	// @TODO: uncomment these lines once data can be retrieved from the API.
	// const {
	// 	modules: { items: moduleList },
	// 	notions: { items: notionList },
	// } = state;

	return {
		moduleId,
		module: moduleDetailsPageMock.moduleList[0],
		notions: moduleDetailsPageMock.notionList,
	};
};

const mapDispatchToProps = {
	dispatchFetchNotionList: fetchNotionListByModuleId,
	dispatchClearNotionList: clearNotionList,
};

export default compose(
	withTranslation(),
	connect(mapStateToProps, mapDispatchToProps)
)(ModuleDetailsPage);
