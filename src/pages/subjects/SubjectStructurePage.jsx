import { useCallback, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'react-feather';
import styled from 'styled-components';

import conf from 'conf';
import routes from 'routes/keys';

import { StyledDiv, StyledList, StyledListItem, StyledSvg } from 'components/shared/styledElements';
import { Canon, BodyCopy, GreatPrimer } from 'components/shared/typography';
import { SubtleLinkButton, SubtleButton } from 'components/shared/buttons';
import { Link } from 'components/shared/navigation';
import { navigationChevrons } from 'theme/pages/concepts/conceptDetailsPage';

import {
	backToListButton,
	pageLayout,
	titleDiv,
	subjectName,
	backToListSvg,
	list,
	listItem,
	lastListItem,
	subjectListItem,
	listItemText,
	activeListItem,
	activeListItemText,
	stepper,
	stepperCurrent,
	completedDiv,
	completedButton,
} from 'theme/pages/subjects/subjectStructurePage';
import { backToParentButtonContentLayout } from 'theme/buttonStyles';
import { LabelComponent } from 'components/shared/form';

const PreviousButton = styled(ChevronLeft)({ ...navigationChevrons });
const NextButton = styled(ChevronRight)({ ...navigationChevrons });

const StepperButton = styled('button')(
	{
		...stepper,
		backgroundColor: (({ id, step }) => (step >= id ? stepperCurrent.backgroundColor : stepper.backgroundColor)),
	}
);

/**
 * @name SubjectStructurePage
 * @description A page used to explain the subject structure.
 *
 * @author Christopher Walker
 */
const SubjectStructurePage = () => {
	const { t } = useTranslation();
	const [step, setStep] = useState(0);
	const subjectStep = 0;
	const moduleStep = 1;
	const conceptStep = 2;
	const courseStep = 3;
	const completedStep = 4;

	/**
	 * @name onPreviousClick
	 * @description onClick handler method for the 'previous' icon button.
	 *
	 * @author Christopher Walker
	 */
	const onPreviousClick = useCallback(
		() => {
			if (step > 0) {
				setStep(step - 1);
			}
		},
		[step],
	);

	/**
	 * @name onNextClick
	 * @description onClick handler method for the 'next' icon button.
	 *
	 * @author Christopher Walker
	 */
	const onNextClick = useCallback(
		() => {
			if (step < 4) {
				setStep(step + 1);
			}
		},
		[step],
	);

	/**
	 * @name onStepperClick
	 * @description onClick handler method for the 'stepper' icon button.
	 *
	 * @author Christopher Walker
	 */
	const onStepperClick = (e) => {
		setStep(parseInt(e.target.id, 10));
	};

	return (
		<StyledDiv>
			{step < completedStep && (
				<StyledDiv>
					<StyledDiv {...titleDiv}>
						<SubtleLinkButton {...backToListButton}>
							<Link to={routes.subjects.list}>
								<StyledDiv {...backToParentButtonContentLayout}>
									<StyledSvg src={`${conf.svgPath}/chevronLeft.svg`} {...backToListSvg} />
									{t('subjects.links.back_to_list')}
								</StyledDiv>
							</Link>
						</SubtleLinkButton>
						<Canon {...subjectName} tag="h1">{t('subjects.structure.title')}</Canon>
						<BodyCopy>{t('subjects.structure.subtitle')}</BodyCopy>
					</StyledDiv>
					<StyledDiv {...pageLayout}>
						<StyledDiv>
							{step >= subjectStep && (
								<BodyCopy>
									<Trans i18nKey="subjects.structure.subjects.description" components={{ bold: <strong /> }} />
								</BodyCopy>
							)}
							{step >= moduleStep && (
								<BodyCopy>
									<Trans i18nKey="subjects.structure.modules.description" components={{ bold: <strong /> }} />
								</BodyCopy>
							)}
							{step >= conceptStep && (
								<BodyCopy>
									<Trans i18nKey="subjects.structure.concepts.description" components={{ bold: <strong /> }} />
								</BodyCopy>
							)}
							{step >= courseStep && (
								<BodyCopy>
									<Trans i18nKey="subjects.structure.courses.description" components={{ bold: <strong /> }} />
								</BodyCopy>
							)}
						</StyledDiv>
						<StyledDiv>
							<StyledList {...list}>
								<StyledListItem {...listItem} {...lastListItem} {...subjectListItem}>
									<LabelComponent
										textStyle="greatprimer"
										disabled={step > subjectStep}
										{...listItemText}
										{...(step === subjectStep ? activeListItemText : {})}
									>
										{t('subjects.structure.subjects.examples.0.title')}
									</LabelComponent>
									{step >= moduleStep && (
									<StyledList {...list}>
										<StyledListItem {...listItem} {...(step === moduleStep ? activeListItem : {})}>
											<LabelComponent
												textStyle="greatprimer"
												disabled={step > moduleStep}
												{...listItemText}
												{...(step === moduleStep ? activeListItemText : {})}
											>
												<Trans i18nKey="subjects.structure.modules.examples.0.title" />
											</LabelComponent>
											{step >= conceptStep && (
											<StyledList {...list}>
												<StyledListItem {...listItem} {...(step === conceptStep ? activeListItem : {})}>
													<LabelComponent textStyle="greatprimer" disabled={step > conceptStep} {...(step === conceptStep ? activeListItemText : {})}>
														<Trans i18nKey="subjects.structure.concepts.examples.0.title" />
													</LabelComponent>
													{step >= courseStep && (
													<StyledList {...list}>
														<StyledListItem {...listItem} {...(step === courseStep ? activeListItem : {})}>
															<LabelComponent textStyle="greatprimer" {...listItemText} {...(step === courseStep ? activeListItemText : {})}>
																<Trans i18nKey="subjects.structure.courses.examples.0.title" />
															</LabelComponent>
														</StyledListItem>
														<StyledListItem {...listItem} {...(step === courseStep ? activeListItem : {})}>
															<LabelComponent textStyle="greatprimer" {...listItemText} {...(step === courseStep ? activeListItemText : {})}>
																<Trans i18nKey="subjects.structure.courses.examples.1.title" />
															</LabelComponent>
														</StyledListItem>
														<StyledListItem {...listItem} {...(step === courseStep ? activeListItem : {})}>
															<LabelComponent textStyle="greatprimer" {...listItemText} {...(step === courseStep ? activeListItemText : {})}>
																<Trans i18nKey="subjects.structure.courses.examples.2.title" />
															</LabelComponent>
														</StyledListItem>
														<StyledListItem {...listItem} {...(step === courseStep ? activeListItem : {})} {...lastListItem}>
															<LabelComponent textStyle="greatprimer" {...listItemText} {...(step === courseStep ? activeListItemText : {})}>
																<Trans i18nKey="subjects.structure.courses.examples.3.title" />
															</LabelComponent>
														</StyledListItem>
													</StyledList>
													)}
												</StyledListItem>
												<StyledListItem {...listItem} {...(step === conceptStep ? activeListItem : {})} {...lastListItem}>
													<LabelComponent
														textStyle="greatprimer"
														disabled={step > conceptStep}
														{...listItemText}
														{...(step === conceptStep ? activeListItemText : {})}
													>
														<Trans i18nKey="subjects.structure.concepts.examples.1.title" />
													</LabelComponent>
												</StyledListItem>
											</StyledList>
											)}
										</StyledListItem>
										<StyledListItem {...listItem} {...(step === moduleStep ? activeListItem : {})} {...lastListItem}>
											<LabelComponent
												textStyle="greatprimer"
												disabled={step > moduleStep}
												{...listItemText}
												{...(step === moduleStep ? activeListItemText : {})}
											>
												<Trans i18nKey="subjects.structure.modules.examples.1.title" />
											</LabelComponent>
										</StyledListItem>
									</StyledList>
									)}
								</StyledListItem>
							</StyledList>
						</StyledDiv>
					</StyledDiv>
				</StyledDiv>
			)}
			{step === completedStep && (
				<StyledDiv>
					<StyledDiv display="flex" flexDirection="column" justifyContent="center" alignItems="center" {...completedDiv}>
						<GreatPrimer>
							<Trans i18nKey="subjects.structure.completed.title" />
						</GreatPrimer>
						<BodyCopy>
							<Trans i18nKey="subjects.structure.completed.subtitle" />
						</BodyCopy>
						<StyledDiv flexDirection="row">
							<SubtleButton {...completedButton}>
								<Link to={routes.subjects.subjectCreation}>
									{t('subjects.structure.completed.button_finish')}
								</Link>
							</SubtleButton>
							<SubtleButton {...completedButton} onClick={() => setStep(0)}>
								<Trans i18nKey="subjects.structure.completed.button_to_start" />
							</SubtleButton>
						</StyledDiv>
					</StyledDiv>
				</StyledDiv>
			)}
			<StyledDiv display="flex" justifyContent="center" alignItems="center">
				<PreviousButton role="button" data-testid="concept-navigation-next" onClick={onPreviousClick} disabled={step === 0} />
				<StepperButton id="0" onClick={onStepperClick} step={step} />
				<StepperButton id="1" onClick={onStepperClick} step={step} />
				<StepperButton id="2" onClick={onStepperClick} step={step} />
				<StepperButton id="3" onClick={onStepperClick} step={step} />
				<StepperButton id="4" onClick={onStepperClick} step={step} />
				<NextButton role="button" data-testid="concept-navigation-next" onClick={onNextClick} disabled={step === 4} />
			</StyledDiv>
		</StyledDiv>
	);
};

export default SubjectStructurePage;
