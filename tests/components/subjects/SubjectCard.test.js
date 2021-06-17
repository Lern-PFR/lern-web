import { act, fireEvent, render, screen } from '@testing-library/react';
import { SubjectCard } from 'components/subjects/subjectListPage';
import { shallow } from 'enzyme';
import { history } from 'routes/components/RouterProvider';
import routes from 'routes';

describe('Subject card component', () => {
	const mockedSubject = {
		id: 'abcd',
		title: 'dummy_subject_title',
		description: 'dummy_subject_description',
		author: {
			firstname: 'dummy_author_firstname',
			lastname: 'dummy_author_lastname',
		},
	};

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	describe('snapshot testing', () => {
		it('should match previous snapshot', () => {
			const { wrapper } = shallow(<SubjectCard {...mockedSubject} />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('onClick redirection url value', () => {
		it('should call history.push with the subject details page on click if isCurrentUserTheAuthor is set to false', () => {
			const historyPushSpy = jest.spyOn(history, 'push');

			render(<SubjectCard data-testid="sut" {...mockedSubject} />);

			act(() => {
				fireEvent.click(screen.getByRole('listitem'));
			});

			expect(historyPushSpy).toHaveBeenCalledTimes(1);
			expect(historyPushSpy).toBeCalledWith(routes.subjects.subjectDetails.replace(':subjectId', mockedSubject.id));
		});

		it('should call history.push with the subject edition page on click if isCurrentUserTheAuthor is set to true', () => {
			const historyPushSpy = jest.spyOn(history, 'push');

			render(<SubjectCard {...mockedSubject} isCurrentUserTheAuthor />);

			act(() => {
				fireEvent.click(screen.getByRole('listitem'));
			});

			expect(historyPushSpy).toHaveBeenCalledTimes(1);
			expect(historyPushSpy).toBeCalledWith(routes.subjects.subjectEdition.replace(':subjectId', mockedSubject.id));
		});
	});
});
