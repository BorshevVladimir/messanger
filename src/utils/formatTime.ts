export function formatTime (time: string): string {
	const date = new Date(time)
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDay()
	const hours = date.getHours()
	const minutes = date.getMinutes()

	return `${hours}:${minutes} ${day}-${month}-${year}`
}
