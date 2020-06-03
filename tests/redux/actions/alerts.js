import * as alertsActions from '../../../src/redux/actions/alerts';

describe('alerts actions', () => {
    it('should create a success action', () => {
        // Arrange
        const message = "Task fulfilled successfuly";

        const expectedAction = {
            type: 'ALERT_SUCCESS',
            payload: {
                message
            }
        };

        // Act
        let result = alertsActions.successAlert({ message });

        // Assert
        expect(result).toEqual(expectedAction);
    });

    it('should create an error action', () => {
        // Arrange
        const message = "Something went wrong";

        const expectedAction = {
            type: 'ALERT_ERROR',
            payload: {
                message
            }
        };

        // Act
        let result = alertsActions.errorAlert({ message });

        // Assert
        expect(result).toEqual(expectedAction);
    });

    it('should create a clearing action', () => {
        // Arrange
        const expectedAction = {
            type: 'ALERT_CLEAR'
        };

        // Act
        let result = alertsActions.clearAlert();

        // Assert
        expect(result).toEqual(expectedAction);
    });
});
