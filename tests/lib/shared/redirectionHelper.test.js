import { redirectOnSuccess, redirectOnFailure, redirectOnLogin } from 'lib/shared/redirectionHelper';
import { history } from 'routes/components/RouterProvider';
import routes from 'routes';

describe('redirectionHelper', () => {
	beforeEach(() => {
		jest.spyOn(history, 'push').mockImplementation(() => Promise.resolve());
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('redirectOnSuccess', () => {
		it('should call \'history.push\' with the value passed in parameter if it is truthy', () => {
			const expectedResult = {
				pathname: 'redirectionUrlParam',
				state: { requestedLocation: history.location },
			};

			redirectOnSuccess('redirectionUrlParam');
			expect(history.push).toHaveBeenNthCalledWith(1, expectedResult);
			expect(history.push).toHaveBeenCalledTimes(1);
		});

		it('should pass if provided value is falsy', () => {
			redirectOnSuccess(undefined);
			expect(history.push).toHaveBeenCalledTimes(0);
		});
	});

	describe('redirectOnFailure', () => {
		it('should call \'history.push\' with the value passed in parameter if it is truthy', () => {
			const expectedResult = {
				pathname: 'redirectionUrlParam',
				state: { requestedLocation: history.location },
			};

			redirectOnFailure('redirectionUrlParam');
			expect(history.push).toHaveBeenNthCalledWith(1, expectedResult);
		});

		it('should pass if provided value is falsy', () => {
			redirectOnFailure(undefined);
			expect(history.push).toHaveBeenCalledTimes(0);
		});
	});

	describe('redirectOnLogin', () => {
		it('should call \'history.push\' with the initially requested location', () => {
			const initialValue = history.location.state;

			const requestedLocation = { pathname: '/request' };
			history.location.state = { requestedLocation };

			const expectedResult = { ...requestedLocation };

			redirectOnLogin('redirectionUrlParam');
			expect(history.push).toHaveBeenNthCalledWith(1, expectedResult);
			expect(history.push).toHaveBeenCalledTimes(1);

			history.location.state = initialValue;
		});

		it('should call \'history.push\' with the value passed in parameter if the requested location is blacklisted', () => {
			const initialValue = history.location.state;

			const requestedLocation = { pathname: routes.auth.login };
			history.location.state = { requestedLocation };

			const expectedResult = {
				pathname: 'redirectionUrlParam',
				state: { requestedLocation: history.location },
			};

			redirectOnLogin('redirectionUrlParam');
			expect(history.push).toHaveBeenNthCalledWith(1, expectedResult);
			expect(history.push).toHaveBeenCalledTimes(1);

			history.location.state = initialValue;
		});

		it('should pass if requested location is blacklisted and provided value is falsy', () => {
			const initialValue = history.location.state;

			const requestedLocation = { pathname: routes.auth.login };
			history.location.state = { requestedLocation };

			redirectOnSuccess(undefined);
			expect(history.push).toHaveBeenCalledTimes(0);

			history.location.state = initialValue;
		});
	});
});
