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
import { elevation } from 'theme/elevations';

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
		<StyledDiv {...elevation.flat} width="100px" height="100px">Flat div</StyledDiv>
		<StyledDiv {...elevation.short} width="100px" height="100px">Short elevation div</StyledDiv>
		<StyledDiv {...elevation.medium} width="100px" height="100px">Medium elevation div</StyledDiv>
		<StyledDiv {...elevation.tall} width="100px" height="100px">Tall elevation div</StyledDiv>
	</MainLayout>
);

export default App;
