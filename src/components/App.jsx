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
import {
	LabeledCheckbox,
	FieldsetComponent,
	LabeledRadioButton,
	LabelComponent,
	LabeledInput,
} from 'components/shared/form';

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
		<StyledDiv position="relative" display="flex" flexDirection="column">
			<LabelComponent>Default label component</LabelComponent>
			<LabelComponent textStyle="bodycopy">BodyCopy label component</LabelComponent>
		</StyledDiv>
		<StyledDiv position="relative">
			<FieldsetComponent title="Basic checkbox components">
				<LabeledCheckbox id="lcb5">Labeled checkbox</LabeledCheckbox>
				<LabeledCheckbox labelTextStyle="bodycopy" checked id="lcb6">Default checked labeled checkbox</LabeledCheckbox>
				<LabeledCheckbox disabled id="lcb7">Disabled labeled checkbox</LabeledCheckbox>
				<LabeledCheckbox disabled checked id="lcb8">Disabled default checked labeled checkbox</LabeledCheckbox>
			</FieldsetComponent>
		</StyledDiv>
		<StyledDiv position="relative">
			<FieldsetComponent title="Basic radio button components">
				<LabeledRadioButton name="rg2" id="lrb5">Labeled radio button</LabeledRadioButton>
				<LabeledRadioButton labelTextStyle="bodycopy" name="rg2" checked id="lrb6">Default checked labeled radio button</LabeledRadioButton>
				<LabeledRadioButton name="rg2" disabled id="lrb7">Disabled labeled radio button</LabeledRadioButton>
			</FieldsetComponent>
		</StyledDiv>
		<StyledDiv position="relative" width="500px">
			<FieldsetComponent title="Text input components">
				<LabeledInput id="basicTextInput">Labeled text input</LabeledInput>
				<LabeledInput id="placeholderTextInput" placeholder="Enter details here.">Labeled text input with custom placeholder</LabeledInput>
				<LabeledInput id="hintTextInput" placeholder="Enter details here." hintText="This is a hint for the user.">Labeled text input with hint</LabeledInput>
				<LabeledInput
					id="disabledTextInput"
					placeholder="Enter details here."
					hintText="This is a hint for the user."
					disabled
				>
					Disabled labeled text input
				</LabeledInput>
				<LabeledInput
					id="errorTextInput"
					placeholder="Enter details here."
					hintText="This is a hint for the user."
					errorText="There is something wrong with the value in this input"
					error
				>
					Labeled text input with a validation error
				</LabeledInput>
				<LabeledInput id="numberInput" placeholder="Number Input" type="number">Labeled number input</LabeledInput>
				<LabeledInput id="passwordInput" placeholder="Password Input" type="password">Labeled password input</LabeledInput>
			</FieldsetComponent>
		</StyledDiv>
	</MainLayout>
);

export default App;
