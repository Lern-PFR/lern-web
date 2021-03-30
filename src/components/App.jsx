import { Home } from 'react-feather';
import { MainLayout, StyledDiv } from 'components/shared/layout';
import {
	Canon,
	Trafalgar,
	Paragon,
	GreatPrimer,
	DoublePica,
	BodyCopy,
	Pica,
	LongPrimer,
	Brevier,
	Minion,
} from 'components/shared/typography';
import {
	PrimaryButton,
	StandardButton,
	SubtleButton,
	DropdownButton,
	DangerButton,
	IconButton,
	FloatingActionButton,
} from 'components/shared/buttons';
import {
	elevationFlat,
	elevationFirst,
	elevationSecond,
	elevationThird,
	elevationFourth,
	elevationFifth,
} from 'theme/elevations';

/**
 * @name App
 * @description The main component of the application.
 *
 * @author Timothée Simon-Franza
 */
const App = () => (
	<MainLayout>
		<StyledDiv position="relative">
			<Canon>Canon text element.</Canon>
			<Trafalgar>Trafalgar text element.</Trafalgar>
			<Paragon>Paragon text element.</Paragon>
			<GreatPrimer>GreatPrimer text element.</GreatPrimer>
			<DoublePica>DoublePica text element.</DoublePica>
			<BodyCopy>BodyCopy text element.</BodyCopy>
			<Pica>Pica text element.</Pica>
			<LongPrimer>LongPrimer text element.</LongPrimer>
			<Brevier>Brevier text element.</Brevier>
			<Minion>Minion text element.</Minion>
		</StyledDiv>
		<StyledDiv position="relative">
			<PrimaryButton>Primary button</PrimaryButton>
			<StandardButton>Standard button</StandardButton>
			<SubtleButton>Subtle button</SubtleButton>
			<DropdownButton>Dropdown button</DropdownButton>
			<DangerButton>Danger button</DangerButton>
			<IconButton><Home /></IconButton>
			<FloatingActionButton isIconOnly><Home /></FloatingActionButton>
		</StyledDiv>
		<StyledDiv position="relative" marginTop="50px" display="flex" width="100%">
			<StyledDiv {...elevationFlat} width="260px" height="260px" padding="10px">Flat component</StyledDiv>
			<StyledDiv {...elevationFirst} width="260px" height="260px" padding="10px">5% elevation component</StyledDiv>
			<StyledDiv {...elevationSecond} width="260px" height="260px" padding="10px">10% elevation component</StyledDiv>
			<StyledDiv {...elevationThird} width="260px" height="260px" padding="10px">20% elevation component</StyledDiv>
			<StyledDiv {...elevationFourth} width="260px" height="260px" padding="10px">30% elevation component</StyledDiv>
			<StyledDiv {...elevationFifth} width="260px" height="260px" padding="10px">50% elevation component</StyledDiv>
		</StyledDiv>
	</MainLayout>
);

export default App;
