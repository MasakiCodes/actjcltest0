import { formatFullDate, formatTime, isSameDay } from './dateUtils.js';

export function renderResults(events, containers, templates) {
 // Clear existing content
    containers.upcomingContainer.innerHTML = "";
    containers.completedContainer.innerHTML = "";

    events.forEach((event) => {
     if (event.complete) {
            renderCompletedEvent(event, containers.completedContainer, templates.completedTemplate);
        } else {
            renderUpcomingEvent(event, containers.upcomingContainer, templates.upcomingTemplate);
    }
})
}

function renderCompletedEvent(event, container, template){
    const newEvent = template.content.cloneNode(true);
    const post = newEvent.querySelector('.blog-post');

     post.innerHTML = `
       <h3>${event.title || "Unknown Event"}</h3>
       <p><strong>Results:</strong> ${event.results || "N/A"}</p>
      `;

    container.appendChild(newEvent);
}

function renderUpcomingEvent(event, container, template){
    const newEvent = template.content.cloneNode(true);
     const post = newEvent.querySelector('.blog-post');

     const startDateFormatted = formatFullDate(event.startDate);
     const endDateFormatted = event.endDate ? formatFullDate(event.endDate) : null;
     const startTime = formatTime(event.startDate);
     const endTime = event.endDate ? formatTime(event.endDate) : null;

      let dateDisplay;
      if (endDateFormatted && isSameDay(event.startDate, event.endDate)) {
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

        container.appendChild(newEvent);
}