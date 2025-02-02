const calendarContainer = document.getElementById('calendarContainer');
const viewSwitch = document.getElementById('viewSwitch');
const upcomingTemplate = document.getElementById('event-template1');

// Ensure the template exists before proceeding
if (!upcomingTemplate) {
    console.error("Event template not found. Ensure 'event-template1' exists in the HTML.");
}

// Function to format date as "Tuesday, January 21, 2025, 5:00 PM"
function formatFullDate(isoString) {
    if (!isoString) return "TBA";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).format(date);
}

// Fetch upcoming event data from Contentful API
fetch('/api/events')
    .then(response => response.json())
    .then(events => {
        const now = new Date();
        let upcomingEvents = events.filter(event => {
            return true; // Only include events that haven't started yet
        });

        // Clear the calendar container before populating
        calendarContainer.innerHTML = "";

        // Populate Upcoming Events
        upcomingEvents.forEach(event => {
            console.log(event)
            let newEvent = upcomingTemplate.content.cloneNode(true);
            let eventDiv = newEvent.querySelector('.event');

            if (!eventDiv) {
                console.error("Event structure missing in template.");
                return;
            }

            let dateDisplay = formatFullDate(event.startDate);
            if (event.endDate) {
                dateDisplay += ` - ${formatFullDate(event.endDate)}`;
            }

            eventDiv.querySelector(".event-title").innerText = event.title || "Upcoming Event";
            eventDiv.querySelector(".event-date").innerText = dateDisplay;
            eventDiv.querySelector(".event-description").innerText = event.description || "Details coming soon.";

            let link = eventDiv.querySelector(".event-link");
            if (link) {
                link.innerHTML = event.bookingLink ? `<a target="_blank" href="${event.bookingLink}">Booking Link</a>` : "No booking link available";
            }

            calendarContainer.appendChild(newEvent);
        });

    })
    .catch(error => console.error("Error fetching events:", error));
