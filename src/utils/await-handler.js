/**
 * @param { Promise } promise - the promise to be awaited
 * @param { Object } errorExtension - Additional Information you can pass to the err object
 * @returns { [Promise, Error] }  An array containing the resolved data and the error
 */

export const to = async (promise, errorExtension) => {
	// prettier-ignore
	try {
		const data = await promise;
		return [data, null];

	} catch (error) {
		if (errorExtension) {
			const extendedError = { ...error, ...errorExtension };
			return [null, extendedError];
		}

		return [null, error];
	}
};
