/**
 * Handles a 404 error by creating a new Error object with a message indicating that the requested URL was not found.
 * Sets the HTTP status code to 404 and passes the error object to the next middleware function (which is the global error handler in this case).
 *
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 * @returns {void} - This function does not return any value, but it triggers the execution of the next middleware function with the error object.
 */
const notFound = (req, res, next) => {
	const error = new Error(`Cannot ${req.method.toUpperCase()} - ${req.originalUrl}`);

	res.status(404);
	next(error);
};

export default notFound;
