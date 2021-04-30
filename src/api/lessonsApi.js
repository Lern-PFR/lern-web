import { del, get, post, put } from 'lib/shared/http';

/**
 * @function
 * @name fetchLessonById
 * @description Retrieves an existing lesson from the API, using the lessonId parameter.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} lessonId The id of the lesson we want to retrieve.
 *
 * @returns {Promise}
 */
export const fetchLessonById = (lessonId) => get(`/api/lessons/${lessonId}`);

/**
 * @function
 * @name fetchLessonsByNotionId
 * @description Retrieves all lessons from a specific notion using their linked notion's id.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} notionId The id of the notion we want to retrieve lessons from.
 *
 * @returns {Promise}
 */
export const fetchLessonsByNotionId = (notionId) => get(`/api/lessons/by-notion/${notionId}`);

/**
 * @function
 * @name createLesson
 * @description Creates a new lesson in the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} lessonData The data to create the new lesson from.
 *
 * @returns {Promise}
 */
export const createLesson = (lessonData) => post('/api/lessons', lessonData);

/**
 * @function
 * @name updateLesson
 * @description Updates an existing lesson from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {object} lessonData	The data to update the lesson with.
 * @param {string} lessonId		The id identifying the lesson to update.
 *
 * @returns {Promise}
 */
export const updateLesson = (lessonData, lessonId) => put(`/api/lessons/${lessonId}`, lessonData);

/**
 * @function
 * @name deleteLesson
 * @description Removes an existing lesson from the database.
 *
 * @author Timothée Simon-Franza
 *
 * @param {string} lessonId The id identifying the lesson to remove.
 *
 * @returns {Promise}
 */
export const deleteLesson = (lessonId) => del(`/api/lessons/${lessonId}`);
