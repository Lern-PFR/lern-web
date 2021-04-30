import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearNotionList, fetchNotionListByModuleId } from 'redux/actions/notions';

import { moduleDetailsPageMock } from 'mockedData';
import { StyledDiv } from 'components/shared/layout';
import { Canon, GreatPrimer } from 'components/shared/typography';
import NotionList from 'components/modules/NotionList';
import { moduleName, moduleDescription, pageLayout } from 'theme/pages/modules/moduleDetailsPage';

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
 */
const ModuleDetailsPage = ({ dispatchFetchNotionList, dispatchClearNotionList, moduleId, module, notions }) => {
	useEffect(() => {
		dispatchFetchNotionList(moduleId);

		return () => dispatchClearNotionList();
	}, [dispatchFetchNotionList, dispatchClearNotionList, moduleId]);

	return (
		<StyledDiv {...pageLayout}>
			<Canon tag="h1" {...moduleName}>{module?.name}</Canon>
			<GreatPrimer {...moduleDescription}>{module?.description}</GreatPrimer>
			<NotionList notions={notions} />
		</StyledDiv>
	);
};

ModuleDetailsPage.propTypes = {
	moduleId: PropTypes.string.isRequired,
	module: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired,
	notions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetailsPage);
