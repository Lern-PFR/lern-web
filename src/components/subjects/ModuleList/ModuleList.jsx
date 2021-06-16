import PropTypes from 'prop-types';
import conf from 'conf';
import styled from 'styled-components';
import { StyledDiv, StyledList, StyledSvg } from 'components/shared/styledElements';
import { BodyCopy } from 'components/shared/typography';
import { moduleList, moduleListNoDataContainer, moduleListNoDataSvg, moduleListNoDataText } from 'theme/pages/subjects/subjectDetailsPage';
import ModuleListItem from './ModuleListItem';

const NoDataSvg = styled(StyledSvg)(
	{
		'& svg': moduleListNoDataSvg,
	},
);

/**
 * @name ModuleList
 * @description A component used to display a subject's module list.
 *
 * @author Timothée Simon-Franza
 *
 * @param {array}	modules		The list of modules to display.
 * @param {string}	noDataText	The message to display the modules array is empty.
 */
const ModuleList = ({ modules, noDataText }) => (
	<>
		{(!modules || modules.length === 0) && (
			<StyledDiv {...moduleListNoDataContainer}>
				<NoDataSvg src={`${conf.svgIllustrationsPath}/blank_canvas.svg`} />
				<BodyCopy {...moduleListNoDataText}>{noDataText}</BodyCopy>
			</StyledDiv>
		)}
		{modules && modules.length > 0 && (
			<StyledList {...moduleList} listStyle="none">
				{modules.map(({ id, ...moduleData }) => (
					<ModuleListItem
						key={id}
						id={id}
						{...moduleData}
					/>
				))}
			</StyledList>
		)}
	</>
);

ModuleList.propTypes = {
	modules: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})).isRequired,
	noDataText: PropTypes.string.isRequired,
};

export default ModuleList;
