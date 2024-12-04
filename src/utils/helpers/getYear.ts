export const currentYear = () => {
	const today = new Date(Date.now())

	return today.getFullYear()
}