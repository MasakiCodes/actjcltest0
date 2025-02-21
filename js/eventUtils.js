import { sortDatesAscending } from './dateUtils.js';

export function processEvents(events) {
    return events.sort(sortDatesAscending);
}

export function mapTermDates(schoolDates) {
    if (!schoolDates || schoolDates.length === 0) {
        return []; // Return empty array if no data
    }


    // Flatten term dates from all years and ensure they are properly formatted
    let allTermDates = schoolDates.flatMap(dates => [
        { name: "Summer Holidays", start: new Date(dates.summerHolidaysDay1), end: new Date(dates.term1Day1) },
        { name: "Term 1", start: new Date(dates.term1Day1), end: new Date(dates.autumnHolidaysDay1) },
        { name: "Autumn Holidays", start: new Date(dates.autumnHolidaysDay1), end: new Date(dates.term2Day1) },
        { name: "Term 2", start: new Date(dates.term2Day1), end: new Date(dates.winterHolidaysDay1) },
        { name: "Winter Holidays", start: new Date(dates.winterHolidaysDay1), end: new Date(dates.term3Day1) },
        { name: "Term 3", start: new Date(dates.term3Day1), end: new Date(dates.springHolidaysDay1) },
        { name: "Spring Holidays", start: new Date(dates.springHolidaysDay1), end: new Date(dates.term4Day1) },
        { name: "Term 4", start: new Date(dates.term4Day1), end: new Date(dates.summerHolidaysDay1) }
    ]);

    // Filter out any invalid dates (e.g., null values)
    allTermDates = allTermDates.filter(term => !isNaN(term.start) && !isNaN(term.end));

    // Sort term dates by start date
    allTermDates.sort((a, b) => a.start - b.start);

    return allTermDates;
}

export function filterEventsToMonths(events, numberOfMonths) {
    const now = new Date();
    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(now.getMonth() + numberOfMonths);

    return events.filter(event => {
        const eventDate = new Date(event.startDate);
        return eventDate >= now && eventDate <= sixMonthsLater;
    });
}

export function loadAllEvents(events, renderFunction, termDates, viewType, container, templates) {
    
    renderFunction(events, termDates, viewType, container, templates);
    const loadMoreButton = document.getElementById('load-more-btn');
    if (loadMoreButton) {
        loadMoreButton.style.display = 'none';
    }
    return
  
}
