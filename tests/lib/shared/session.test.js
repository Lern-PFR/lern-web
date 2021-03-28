import session, { TOKEN_KEY } from 'lib/shared/session';
import localStorage from 'lib/shared/localStorage';

describe('session', () => {
	beforeEach(() => {
		jest.spyOn(localStorage, 'get').mockImplementation(() => Promise.resolve());
		jest.spyOn(localStorage, 'put').mockImplementation(() => Promise.resolve());
		jest.spyOn(localStorage, 'remove').mockImplementation(() => Promise.resolve());
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should call localStorage.put when calling session.set', () => {
		session.set('value');

		expect(localStorage.put).toHaveBeenNthCalledWith(1, TOKEN_KEY, 'value');
	});

	it('should call localStorage.get when calling session.get', () => {
		session.get();

		expect(localStorage.get).toHaveBeenNthCalledWith(1, TOKEN_KEY);
	});

	it('should return true when calling session.exists and token_key exists in localstorage', () => {
		jest.spyOn(localStorage, 'get').mockReturnValueOnce(true);

		expect(session.exists()).toEqual(true);
	});

	it('should return false when calling session.exists and token_key doesn\'t exist in localstorage', () => {
		jest.spyOn(localStorage, 'get').mockReturnValueOnce(null);

		expect(session.exists()).toEqual(false);
	});

	it('should call localStorage.remove when calling session.remove', () => {
		session.remove();

		expect(localStorage.remove).toHaveBeenNthCalledWith(1, TOKEN_KEY);
	});
});
