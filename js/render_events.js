const upcomingContainer = document.getElementById('upcoming_container');
const completedContainer = document.getElementById('completed-container');
const upcomingTemplate = document.getElementById('event-template1');
const completedTemplate = document.getElementById('event-template2');

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

// Function to format time only as "5:00 PM"
function formatTime(isoString) {
    if (!isoString) return "TBA";

    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).format(date);
}

// Fetch event data from Contentful API (or your Express.js backend)
fetch('/api/events')
  .then((response) => response.json())
  .then((events) => {
    events.forEach((event) => {
        let newEvent;

        if (event.complete) {
            newEvent = completedTemplate.content.cloneNode(true);
            let post = newEvent.querySelector('.blog-post');

            post.innerHTML = `
                <h3>${event.title || "Unknown Event"}</h3>
                <p><strong>Results:</strong> ${event.results || "N/A"}</p>
            `;

            completedContainer.appendChild(newEvent);
        } else {
            newEvent = upcomingTemplate.content.cloneNode(true);
            let post = newEvent.querySelector('.blog-post');

            let startDateFormatted = formatFullDate(event.startDate);
            let endDateFormatted = event.endDate ? formatFullDate(event.endDate) : null;
            let startTime = formatTime(event.startDate);
            let endTime = event.endDate ? formatTime(event.endDate) : null;

            let dateDisplay;
            if (endDateFormatted && startDateFormatted === endDateFormatted) {
                // Same day: show only time range
                dateDisplay = `${startDateFormatted}, ${startTime} - ${endTime}`;
            } else if (endDateFormatted) {
                // Different days: show full range
                dateDisplay = `${startDateFormatted} - ${endDateFormatted}`;
            } else {
                // Only start date
                dateDisplay = startDateFormatted;
            }

            post.innerHTML = `
                <h3>${event.title || "Upcoming Event"}</h3>
                <p><strong>Date:</strong> ${dateDisplay}</p>
                <p><strong>Location:</strong> ${event.location || "TBA"}</p>
                <p><strong>Booking:</strong> ${event.bookingLink ? `<a href="${event.bookingLink}" target="_blank">Booking Link</a>` : "No booking link available"}</p>
                <p>${event.description || ""}</p>
            `;

            upcomingContainer.appendChild(newEvent);
        }
    });
  })
  .catch(error => console.error("Error fetching events:", error));
