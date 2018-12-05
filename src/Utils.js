export function formatTimeFromUser([hours, minutes]) {
	return hours*60*60 + minutes*60
}

export function formatTimeToUser(seconds) {
	let date = new Date(null)
	date.setSeconds(seconds)

	return date.toISOString().substr(11, 8)
}

export function toHoursMinutes(h) {
	let seconds = h*3600
	let timeString = formatTimeToUser(seconds)

	let hours = parseInt(timeString.substring(0, 2), 10)
	let minutes = parseInt(timeString.substring(3, 5), 10)

	console.log([hours, minutes])

	return [hours, minutes]
}