/**
 * Error processing callback
 * @callback cb
 * @param {?Error} err Error object. Null when no error.
 * @param {*} val The result of the calling.
 */

let result = [];

/**
 * Run async task parallelly
 * @param {Object} config
 * @param {Array<function>} config.tasks The task list that you want to run parallelly
 * @param {any} [config.param] The parameter that you want to pass to the outer layer function
 * @param {cb} [cb] The callback. May be called more than once if you have more than one task.
 */
export default function parallel({ tasks, param }, cb) {
	const runResult = tasks.every(val => {
		let success = true;
		new Promise(val(param)).then(value => {
			result.push(value);
		}).catch(e => {
			success = false;
			Promise.resolve().then(() => {
				cb(e);
			});
		});
		return success;
	});
	if (runResult) {
		Promise.resolve().then(() => {
			cb(null, result);
		});
	}
	result = [];
}
