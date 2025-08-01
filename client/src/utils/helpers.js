// Remove __typename from query objects
export const removeTypename = (arr) => {
	return arr.map((item) => {
		const newObj = {};
		for (const key in item) {
			if (key !== "__typename") {
				newObj[key] = item[key];
			}
		}
		return newObj;
	});
};
