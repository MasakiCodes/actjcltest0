// calendarRenderer.js (same as in previous response)
// ... (all the rendering functions from before) ...
import { formatFullDate, getMonthKey, getTermKey, isSameDay } from './dateUtils.js';

export function renderCalendar(events, termDates, viewType, container, templates) {
    container.innerHTML = ""; // Clear existing content
    console.log("test")
    if (viewType === "month") {
        renderMonthView(events, container, templates.monthTemplate, templates.eventTemplate);
    } else {
        renderTermView(events, termDates, container, templates.termTemplate, templates.eventTemplate);
    }
}

function renderMonthView(events, container, monthTemplate, eventTemplate) {
    const eventsByMonth = {};

    events.forEach(event => {
        const monthKey = getMonthKey(new Date(event.startDate));
        if (!eventsByMonth[monthKey]) {
            eventsByMonth[monthKey] = [];
        }
        eventsByMonth[monthKey].push(event);
    });

    for (const monthKey in eventsByMonth) {
        const [year, month] = monthKey.split('-');
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

        const newMonth = monthTemplate.content.cloneNode(true);
        newMonth.querySelector(".month-header h2").innerText = `${monthName} ${year}`;
        const monthContent = newMonth.querySelector(".month-content");

        eventsByMonth[monthKey].forEach(event => {
            const newEvent = createEventElement(event, eventTemplate);
            monthContent.appendChild(newEvent);
        });

        container.appendChild(newMonth);
    }
}

function renderTermView(events, termDates, container, termTemplate, eventTemplate) {
    const eventsByTerm = {};

    events.forEach(event => {
       const termKey = getTermKey(event.startDate, termDates);
       if(termKey) {
        if (!eventsByTerm[termKey]) {
                eventsByTerm[termKey] = [];
            }
        eventsByTerm[termKey].push(event);
    }
    });

    for (const termName in eventsByTerm) {
        const newTerm = termTemplate.content.cloneNode(true);
        newTerm.querySelector(".term-header h2").innerText = termName;
        const termContent = newTerm.querySelector(".term-content");

        eventsByTerm[termName].forEach(event => {
            const newEvent = createEventElement(event, eventTemplate);
            termContent.appendChild(newEvent);
        });

        container.appendChild(newTerm);
    }
}
// createEventElement is mostly presentation logic so it goes here
function createEventElement(event, eventTemplate) {
    const newEvent = eventTemplate.content.cloneNode(true);
    const eventDiv = newEvent.querySelector('.event');

    if (!eventDiv) {
        console.error("Event structure missing in template.");
        return null;
    }

    let dateDisplay = formatFullDate(event.startDate);
    if (event.endDate) {
        dateDisplay += ` - ${formatFullDate(event.endDate)}`;
    }

    eventDiv.querySelector(".event-title").innerText = event.title || "Upcoming Event";
    eventDiv.querySelector(".event-date").innerText = dateDisplay;
    eventDiv.querySelector(".event-description").innerText = event.description || "Details coming soon.";

    const link = eventDiv.querySelector(".event-link");
    if (link) {
        link.innerHTML = event.bookingLink ? `<a target="_blank" href="${event.bookingLink}">Booking Link</a>` : "No booking link available";
    }

    return newEvent;
}