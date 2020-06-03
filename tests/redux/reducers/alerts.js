import alertsReducer from '../../../src/redux/reducers/alerts';

describe('alerts reducer', () => {

    describe('initial state', () => {
        it('should return initial alert state', () => {
            // Arrange
            const action = { type: 'dummy_action' };
            const initialState = {};

            // Act
            let result = alertsReducer(undefined, action);

            // Assert
            expect(result).toEqual(initialState);
        });
    });

    describe('Success alert action', () => {
        it('should set the alert state to success value with dedicated message', () => {
            // Arrange
            const message = "Task fulfilled successfuly";

            const action = { type: 'ALERT_SUCCESS', payload: { message } };
            
            const expectedState = { 
                type: 'alert-success',
                message
            };
        
            // Act
            let result = alertsReducer(undefined, action);

            // Assert
            expect(result).toEqual(expectedState);
        });    
    });

    describe('Error alert action', () => {
        it('should set the alert state to danger value with dedicated message', () => {
            // Arrange
            const message = "Something went wrong";

            const action = { type: 'ALERT_ERROR', payload: { message } };
            
            const expectedState = { 
                type: 'alert-danger',
                message
            };
        
            // Act
            let result = alertsReducer(undefined, action);

            // Assert
            expect(result).toEqual(expectedState);
        });    
    });

    describe('Clear alert action', () => {
        it('should clear the alert state', () => {
            // Arrange
            const action = { type: 'ALERT_CLEAR' };
            
            const expectedState = {};
        
            // Act
            let result = alertsReducer(undefined, action);

            // Assert
            expect(result).toEqual(expectedState);
        });    
    });
});
