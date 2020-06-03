export default (state = {}, { type, payload}) => {
    switch (type) {
        case 'ALERT_SUCCESS':
            return {
                type: 'alert-success',
                message: payload.message
            };
        case 'ALERT_ERROR':
            return {
                type: 'alert-danger',
                message: payload.message
            };
        case 'ALERT_CLEAR':
            return {};
        default: 
            return state;
    }
}