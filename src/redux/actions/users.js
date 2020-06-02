export const updateUsersAction = ({ users }) => {
    return {
        type: 'USERS_UPDATE_ALL',
        payload: { users },    
    };
};