/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-expressions */
const errorConstants = /** @type {const} */ ({
	VALIDATION_ERROR: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
});

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ?? 500;
	const stackTrace = process.env.NODE_ENV === 'development' ? err.stack : {};
	const message = err.message ?? 'Something went wrong';

	// prettier-ignore
	const ERROR_LOOKUP = {
		[errorConstants.VALIDATION_ERROR]: () => res.status(400).json({ title: 'Validation Failed', message, stackTrace }),

		[errorConstants.UNAUTHORIZED]: () => res.status(401).json({ title: 'Unauthorized', message, stackTrace }),

		[errorConstants.FORBIDDEN]: () => res.status(403).json({ title: 'Forbidden', message, stackTrace }),

		[errorConstants.NOT_FOUND]: () => res.status(404).json({ title: 'Not Found', message, stackTrace }),

		[errorConstants.SERVER_ERROR]: () => res.status(500).json({ title: 'Internal Server Error', message, stackTrace }),

		default: () => res.status(500).json({ title: 'Something went wrong', message, stackTrace }),
	};

	ERROR_LOOKUP[statusCode]?.() ?? ERROR_LOOKUP.default();
};

export default errorHandler;
