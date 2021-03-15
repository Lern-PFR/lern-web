import { Home } from 'react-feather';
import { MainLayout } from 'components/shared/layout';
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

const App = () => (
	<MainLayout>
		<section>
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
		</section>
		<section>
			<PrimaryButton>Primary button</PrimaryButton>
			<StandardButton>Standard button</StandardButton>
			<SubtleButton>Subtle button</SubtleButton>
			<DropdownButton>Dropdown button</DropdownButton>
			<DangerButton>Danger button</DangerButton>
			<IconButton><Home /></IconButton>
			<FloatingActionButton isIconOnly><Home /></FloatingActionButton>
		</section>
	</MainLayout>
);

export default App;
