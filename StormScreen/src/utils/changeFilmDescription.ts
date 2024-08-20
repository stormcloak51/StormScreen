
export const changeFilmDescription = (description: string) => {
	if (description.length > 100) {
		return description.slice(0, 101) + '...'
	}
	return description;
}