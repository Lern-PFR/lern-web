import localstorage from './localstorage';
import history from './history'
import { logoutAction } from '../redux/actions/auth';
import store from '../redux/store/configureStore';

const { dispatch, getState } = store;

/**
 * Generates HTTP headers.
 * 
 * If the user is authenticated, retrieves its jwt authentication token and add it to the header list.
 */
const getHeaders = () => {
    const headers = new Headers();
    const user = JSON.parse(localstorage.getItem('user'));
    
    headers.append('Content-Type', 'application/json');
  
    if (user && user.token) {
        headers.append('Authorization', `Bearer ${user.token}`);
    }
  
    return headers;
};

/**
 * Returns a query string from the object in parameter.
 * 
 * @param {object} params : The object to create the query string from.
 */
const objectToQS = (params) => Object
    .entries(params)
    .map(([key, value]) => {
        if (value !== undefined && value !== null) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }

        return `${encodeURIComponent(key)}`;
    })
    .join('&');

/**
 * Generates a POST HTTP query from the url and params object in parameters.
 * 
 * @param {string} url      : The url to target.
 * @param {object} params   : The parameters to inject into the query.
 */
export const post = (url, params) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: getHeaders(),
});

/**
 * Generates a GET HTTP query from the url and params object in parameters.
 * 
 * If the params object is set, converts its content into a query string.
 * 
 * @param {string} url      : The url to target.
 * @param {object} params   : The parameters to inject into the query.
 */
export const get = (url, params) => {
    const qs = params ? `?${objectToQS(params)}` : '';

    return fetch(`${url}${qs}`, {
        headers: getHeaders(),
    });
};

/**
 * Generates a PUT HTTP query from the url and params object in parameters.
 * 
 * @param {string} url       : The url to target.
 * @param {object} params    : The parameters to inject into the query.
 */
export const put = (url, params) => fetch(url, {
    method: 'PUT',
    body: JSON.stringify(params),
    headers: getHeaders(),
});

/**
 * Generates a DELETE HTTP query from the url in parameters.
 * 
 * @param {string} url 
 */
export const del = (url) => fetch(url, {
    method: 'PUT',
    headers: getHeaders(),
});

/**
 * Handles the response from an HTTP query.
 * 
 * If a trigger is passed to the method, dispatch it using redux.
 * 
 * @param {*} trigger : The redux action to dispatch.
 */
export const handleResponse = (trigger) => (response) => {
    if (response.status === 204) {
      if (trigger) {
        dispatch(trigger());
      }
  
      return Promise.resolve();
    }
  
    if (response.status === 403 || response.status === 413 || response.status >= 500) {
      return Promise.reject(response);
    }
  
    return response.json().then((res) => {
        if (response.status === 401 && res.message !== 'Bad credentials') {
            dispatch(logoutAction());
            history.push('/');
    
            return Promise.reject({
                ...res,
                status: response.status,
            });
        }
    
        if (response.status >= 300) {
            return Promise.reject({
                ...res,
                status: response.status,
            });
        }
    
        if (trigger) {
            dispatch(trigger(res));
        }
    
        return Promise.resolve(res);
    });
};