export function changeDisplayName(displayName: string) {
	if (displayName.length > 20) {
		return displayName.substring(0,21) + '...'
	}
	return displayName
}