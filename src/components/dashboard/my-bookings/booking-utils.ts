// "14:00" + 2 hours → "3:00 PM – 5:00 PM"
// Same 12-hour formatting the BookingDialog uses when creating a booking.

const minutesFromTime = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number);
	return (hours + 24) * 60 + minutes;
};

const formatMinutes = (minutes: number) => {
	const hour = Math.floor((minutes % (24 * 60)) / 60);
	const period = hour >= 12 ? "PM" : "AM";
	const displayHour = ((hour + 11) % 12) + 1;
	return `${displayHour}:00 ${period}`;
};

export const formatTimeRange = (start: string, duration: number) => {
	const startMinutes = minutesFromTime(start);
	const endMinutes = (startMinutes + duration * 60) % (24 * 60);
	return `${formatMinutes(startMinutes)} – ${formatMinutes(endMinutes)}`;
};

export const formatBookingDate = (date: string) =>
	new Date(date).toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});
