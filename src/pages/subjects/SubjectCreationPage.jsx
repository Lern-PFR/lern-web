import { StyledDiv } from 'components/shared/styledElements';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createSubject } from 'redux/actions/subjects';
import { SubjectCreationForm } from 'components/subjects/subjectCreationPage';

/**
 * @name SubjectCreationPage
 * @description A page used to create a subject.
 *
 * @author Timothée Simon-Franza
 */
const SubjectCreationPage = () => {
	const dispatch = useDispatch();

	const onSubmit = useCallback((formData) => {
		dispatch(createSubject(formData));
	}, [dispatch]);

	return (
		<StyledDiv>
			{/* sidebar */}
			<SubjectCreationForm onSubmit={onSubmit} />
		</StyledDiv>
	);
};

export default SubjectCreationPage;
