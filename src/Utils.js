export function formatTimeFromUser([hours, minutes]) {
	return hours*60*60 + minutes*60
}

export function formatTimeToUser(seconds) {
	let date = new Date(null)
	date.setSeconds(seconds)

	return date.toISOString().substr(11, 8)
}