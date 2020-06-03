import sut from '../../src/lib/localstorage';

describe('localstorage', () => {

    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'setItem');
        jest.spyOn(window.localStorage.__proto__, 'removeItem');
        jest.spyOn(window.localStorage.__proto__, 'getItem');
        jest.spyOn(window.localStorage.__proto__, 'clear');
    });

    afterEach(() => {    
        jest.clearAllMocks();
    });

    describe('put', () => {
        it('should call localstorage.setItem once', () => {
            // Arrange
            const user = { id: 0, username: 'johndoe' };

            // Act
            sut.put('user', user)

            // Assert
            expect(localStorage.setItem).toBeCalledWith('user', 
                expect.objectContaining({
                    id : user.id,
                    username: user.username
                }),
            );
            expect(localStorage.setItem).toBeCalledTimes(1);
        });

        it('should call localstorage.removeItem twice', () => {
            // Arrange

            // Act
            sut.put('user', null);
            sut.put('user', undefined);

            // Assert
            expect(localStorage.removeItem).toBeCalledWith('user');
            expect(localStorage.removeItem).toBeCalledTimes(2);
        });
    });

    describe('get', () => {
        it('should call localstorage.getItem once', () => {
            // Arrange

            // Act
            sut.get('dummy_key')

            // Assert
            expect(localStorage.getItem).toBeCalledWith('dummy_key');
            expect(localStorage.getItem).toBeCalledTimes(1);
        });
    });

    describe('clear', () => {
        it('should call localstorage.clear once', () => {
            // Arrange

            // Act
            sut.clear()

            // Assert
            expect(localStorage.clear).toBeCalledTimes(1);
        });
    });

    describe('remove', () => {
        it('should call localstorage.removeItem once', () => {
            // Arrange

            // Act
            sut.remove('user');

            // Assert
            expect(localStorage.removeItem).toBeCalledWith('user');
            expect(localStorage.removeItem).toBeCalledTimes(1);
        });
    });
});