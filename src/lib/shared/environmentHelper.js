/**
 * @function
 * @name isDev
 * @description A helper method used to determine whether the application is running in development mode.
 *
 * @author Timothée Simon-Franza
 *
 * @returns {boolean} False if the application is running in production mode, true otherwise.
 */
const isDev = () => !process.env.NODE_ENV || process.env.NODE_ENV !== 'production';

export default isDev;
