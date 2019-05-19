/**
 * Error processing callback
 * @callback cb
 * @param {?Error} err Error object. Null when no error.
 * @param {*} val The result of the calling.
 */

/**
 * Run async task parallelly
 * @param {Object} config
 * @param {(Array<function>|Generator|Set<function>)} config.tasks The task list that you want to run parallelly
 * @param {any} [config.param] The parameter that you want to pass to the outer layer function
 * @param {cb} [cb] The callback. May be called more than once if you have more than one task.
 */
export default function parallel({ tasks, param }, cb) {
	for (const task of tasks) {
		Promise(task(param)).then(val => cb(null,val)).catch(e => cb(e))
	}
}
