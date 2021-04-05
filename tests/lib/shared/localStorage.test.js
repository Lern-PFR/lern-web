import localStorage from 'lib/shared/localStorage';

describe('localStorage', () => {
	beforeEach(() => {
		const windowLocalStoragePrototype = Object.getPrototypeOf(window.localStorage);
		jest.spyOn(windowLocalStoragePrototype, 'setItem').mockImplementation(() => Promise.resolve());
		jest.spyOn(windowLocalStoragePrototype, 'getItem').mockImplementation(() => Promise.resolve());
		jest.spyOn(windowLocalStoragePrototype, 'removeItem').mockImplementation(() => Promise.resolve());
		jest.spyOn(windowLocalStoragePrototype, 'clear').mockImplementation(() => Promise.resolve());
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('Should call localStorage.setItem when calling localStorage.put with a defined and non-null value parameter.', () => {
		localStorage.put('key', 'value');

		expect(window.localStorage.setItem).toHaveBeenNthCalledWith(1, 'key', 'value');
	});

	it('Should call localStorage.removeItem when calling localStorage.put with a null value parameter.', () => {
		localStorage.put('key', null);

		expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(1, 'key');
		expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
	});

	it('Should call localStorage.removeItem when calling localStorage.put with an undefined value parameter.', () => {
		localStorage.put('key', undefined);

		expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(1, 'key');
		expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);
	});

	it('Should call localStorage.getItem when calling localStorage.get.', () => {
		localStorage.get('key');

		expect(window.localStorage.getItem).toHaveBeenNthCalledWith(1, 'key');
	});

	it('Should call localStorage.removeItem when calling localStorage.remove.', () => {
		localStorage.remove('key');

		expect(window.localStorage.removeItem).toHaveBeenNthCalledWith(1, 'key');
	});

	it('Should call localStorage.clear when calling localStorage.clear.', () => {
		localStorage.clear();

		expect(window.localStorage.clear).toHaveBeenCalledTimes(1);
	});
});
