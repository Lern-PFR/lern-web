import * as alertsActions from '../../../src/redux/actions/alerts';

describe('alerts actions', () => {
    it('should create a success action', () => {

        const message = "Task fulfilled successfuly";

        const expectedAction = {
            type: 'ALERT_SUCCESS',
            payload: {
                message
            }
        };

        expect(alertsActions.successAlert({ message })).toEqual(expectedAction);
    });

    it('should create an error action', () => {

        const message = "Something went wrong";

        const expectedAction = {
            type: 'ALERT_ERROR',
            payload: {
                message
            }
        };

        expect(alertsActions.errorAlert({ message })).toEqual(expectedAction);
    });

    it('should create a clearing action', () => {

        const expectedAction = {
            type: 'ALERT_CLEAR'
        };

        expect(alertsActions.clearAlert()).toEqual(expectedAction);
    });
});
