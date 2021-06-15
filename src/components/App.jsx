import { Home } from 'react-feather';
import { StyledDiv } from 'components/shared/styledElements';
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
	LabeledSelect,
	LabeledTextArea,
} from 'components/shared/form';

const options = [
	{
		value: 1,
		label: 'One',
	},
	{
		value: '2',
		label: 'Two',
	},
	{
		value: 3,
		label: 'Three',
	},
	{
		value: '4',
		label: 'Four',
	},
];

/**
 * @name App
 * @description The main component of the application.
 *
 * @author Timothée Simon-Franza
 */
const App = () => (
	<>
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
			<FieldsetComponent title="Basic checkbox components" display="flex" flexDirection="column" gridGap=".5em">
				<LabeledCheckbox id="lcb5">Labeled checkbox</LabeledCheckbox>
				<LabeledCheckbox checked id="lcb6">Default checked labeled checkbox</LabeledCheckbox>
				<LabeledCheckbox disabled id="lcb7">Disabled labeled checkbox</LabeledCheckbox>
				<LabeledCheckbox disabled checked id="lcb8">Disabled default checked labeled checkbox</LabeledCheckbox>
			</FieldsetComponent>
		</StyledDiv>
		<StyledDiv position="relative">
			<FieldsetComponent title="Basic radio button components" display="flex" flexDirection="column" gridGap=".5em">
				<LabeledRadioButton name="rg2" id="lrb5" display="flex" gridGap=".5em">Labeled radio button</LabeledRadioButton>
				<LabeledRadioButton name="rg2" checked id="lrb6" display="flex" gridGap=".5em">Default checked labeled radio button</LabeledRadioButton>
				<LabeledRadioButton name="rg2" disabled id="lrb7" display="flex" gridGap=".5em">Disabled labeled radio button</LabeledRadioButton>
			</FieldsetComponent>
		</StyledDiv>
		<StyledDiv position="relative" width="100%" display="flex">
			<FieldsetComponent title="Text input components" width="33%">
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
					id="disabledErrorTextInput"
					placeholder="Enter details here."
					hintText="This is a hint for the user."
					errorText="There is something wrong with the value in this input"
					hasError
					disabled
				>
					Disabled labeled text input with a validation error
				</LabeledInput>
				<LabeledInput
					id="errorTextInput"
					placeholder="Enter details here."
					hintText="This is a hint for the user."
					errorText="There is something wrong with the value in this input"
					hasError
				>
					Labeled text input with a validation error
				</LabeledInput>
				<LabeledInput id="numberInput" placeholder="Number Input" type="number">Labeled number input</LabeledInput>
				<LabeledInput id="passwordInput" placeholder="Password Input" type="password">Labeled password input</LabeledInput>
			</FieldsetComponent>
			<FieldsetComponent title="Select component" width="33%">
				<LabeledSelect id="select1" options={options}>Default labeled select</LabeledSelect>
				<LabeledSelect id="select2" options={options} placeholder="Select one">Default labeled select with placeholder</LabeledSelect>
				<LabeledSelect id="select3" options={options} placeholder="Select one" hintText="Select an option">Default labeled select with a hint</LabeledSelect>
				<LabeledSelect
					id="select4"
					options={options}
					placeholder="Select one"
					hintText="Select an option"
					errorText="There is a problem with the selection"
					hasError
				>
					Default labeled select with a validation error
				</LabeledSelect>
				<LabeledSelect
					id="select5"
					options={options}
					placeholder="Select one"
					hintText="Select an option"
					errorText="There is a problem with the selection"
					hasError
					disabled
				>
					Disabled labeled select
				</LabeledSelect>
				<LabeledSelect
					id="select6"
					options={options}
					placeholder="Select one"
					hintText="Select an option"
					multiple
				>
					Multiple labeled select
				</LabeledSelect>
				<LabeledSelect
					id="select7"
					options={options}
					placeholder="Select one"
					hintText="Select an option"
					selectedOptions={options[1]}
				>
					Labeled select with default selected
				</LabeledSelect>
				<LabeledSelect
					id="select8"
					options={options}
					placeholder="Select one"
					hintText="Select an option"
					multiple
					selectedOptions={[options[0], options[2]]}
				>
					Multiple labeled select with default selected
				</LabeledSelect>
				<LabeledSelect
					id="select9"
					options={[]}
					placeholder="Select one"
					hintText="Select an option"
					noOptionsMessage="Sorry, we couldn't find any options"
				>
					Labeled select with custom &quot;no options&quot; text
				</LabeledSelect>
			</FieldsetComponent>
			<FieldsetComponent title="Text input components" width="33%">
				<LabeledTextArea id="basicTextArea">Basic labeled textarea</LabeledTextArea>
				<LabeledTextArea id="placeholderTextArea" placeholder="Text area">Labeled textarea with placeholder</LabeledTextArea>
				<LabeledTextArea id="sizedTextArea" placeholder="Text area" rows="5">Labeled textarea with custom size</LabeledTextArea>
				<LabeledTextArea id="hintTextArea" placeholder="Text area" rows="5" hintText="Type some text">Labeled textarea with hint</LabeledTextArea>
				<LabeledTextArea id="disabledTextArea" placeholder="Text area" rows="5" hintText="Type some text" disabled>Disabled labeled textarea with hint</LabeledTextArea>
				<LabeledTextArea
					id="errorTextArea"
					placeholder="Text area"
					rows="5"
					hintText="Type some text"
					errorText="There is something wrong with the value in this textarea"
					hasError
				>
					Labeled textarea with validation error
				</LabeledTextArea>
				<LabeledTextArea
					id="disabledErrorTextArea"
					placeholder="Text area"
					rows="5"
					hintText="Type some text"
					errorText="There is something wrong with the value in this textarea"
					hasError
					disabled
				>
					Disabled labeled textarea with validation error
				</LabeledTextArea>
			</FieldsetComponent>
		</StyledDiv>
	</>
);

export default App;
