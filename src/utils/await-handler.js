/**
 * @param { Promise } promise
 * @param { Object } errorExtension - Additional Information you can pass to the err object
 * @return { Promise }
 */

export const to = async (promise, errorExtension) => {
	// prettier-ignore
	try {
		const data = await promise;
		return [data, null];

	} catch (error) {
		if (errorExtension) {
			const parsedError = { ...error, ...errorExtension };
			return [null, parsedError];
		}

		return [null, error];
	}
};
