// js/dateUtils.js
export function formatFullDate(isoString) {
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

export function formatTime(isoString) {
    if (!isoString) return "TBA";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).format(date);
}

export function getMonthKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}`;
}

export function getTermKey(startDate, termDates) {
    const eventStart = new Date(startDate);
    let term = termDates.find(t => eventStart >= t.start && eventStart <= t.end);
    return term ? term.name : null; // Return null if no term is found
}

export function sortDatesAscending(a, b) {
    return new Date(a.startDate) - new Date(b.startDate);
}

export function isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}