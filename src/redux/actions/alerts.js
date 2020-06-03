export const successAlert = ({ message }) => ({
    type: 'ALERT_SUCCESS',
    payload: {
        message
    }
});

export const errorAlert = ({ message }) => ({
    type: 'ALERT_ERROR',
    payload: {
        message
    }
});

export const clearAlert = () => ({
    type: 'ALERT_CLEAR'
});