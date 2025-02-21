// js/calendar.js
import { processEvents, mapTermDates, filterEventsToMonths, loadAllEvents } from './eventUtils.js';
import { renderCalendar } from './calendarRenderer.js';

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }
    return await response.json();
}

async function init() {
    let allEvents = []; // Store all processed events here.  This is crucial!
    let termDates = [];

    try {
        const events = await fetchData('/api/events');
        const schoolDates = await fetchData('/api/schoolDates');
        allEvents = processEvents(events);  // Store the full set.
        termDates = mapTermDates(schoolDates);
        const sixMonthsEvents = filterEventsToMonths(allEvents, 6);

        const calendarContainer = document.getElementById('calendarContainer');
        const viewSwitch = document.getElementById('viewSwitch');
        const viewLabel = document.getElementById('view-label');
        const monthTemplate = document.getElementById('month-template');
        const termTemplate = document.getElementById('term-template');
        const eventTemplate = document.getElementById('event-template');

        // Check if templates are found
        if (!monthTemplate || !termTemplate || !eventTemplate) {
            console.error("One or more templates not found. Ensure they exist in the HTML.");
        }

        const templates = { monthTemplate, termTemplate, eventTemplate };
        let currentlyDisplayedEvents = sixMonthsEvents;

        // Initial render (default to month view)
        renderCalendar(currentlyDisplayedEvents, termDates, "month", calendarContainer, templates);

        // Create a styled "Load More Events" button
        const loadMoreButton = document.createElement('button');
        loadMoreButton.textContent = 'Load More Events';
        loadMoreButton.id = "load-more-btn";
        loadMoreButton.classList.add('styled-load-more'); // Add a class for styling
        loadMoreButton.addEventListener('click', () => {
            currentlyDisplayedEvents = allEvents; // Update to show all
            renderCalendar(currentlyDisplayedEvents, termDates, viewSwitch.checked ? "term" : "month", calendarContainer, templates);
            loadMoreButton.style.display = 'none'; // Hide button
        });

        // Append the button after the calendar
        calendarContainer.after(loadMoreButton);

        // Toggle View Mode
        viewSwitch.addEventListener('change', () => {
            const viewType = viewSwitch.checked ? "term" : "month";
            viewLabel.innerText = viewSwitch.checked ? "Switch to Month View" : "Switch to Term View";
             // Use allEvents here!
            renderCalendar(currentlyDisplayedEvents, termDates, viewType, calendarContainer, templates);
        });

    } catch (error) {
        console.error("Initialization failed:", error);

        // Display user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.textContent = "Failed to load calendar data. Please try again later.";
        errorDiv.style.color = 'red';
        document.querySelector('main').prepend(errorDiv);
    }
}

document.addEventListener('DOMContentLoaded', init);