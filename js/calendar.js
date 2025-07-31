function parseEventDate(dateString) {
    const dates = dateString.split(' - ');
    const endDateString = dates.length > 1 ? dates[1] : dates[0];
    
    const [day, month, year] = endDateString.split('/');
    const fullYear = parseInt(year) + 2000;
    
    return new Date(fullYear, parseInt(month) - 1, parseInt(day));
}

function isEventFinished(eventDate) {
    const today = new Date();
    const oneDayAfterEvent = new Date(eventDate);
    oneDayAfterEvent.setDate(oneDayAfterEvent.getDate() + 1);

    today.setHours(0, 0, 0, 0);
    oneDayAfterEvent.setHours(0, 0, 0, 0);
    
    return today >= oneDayAfterEvent;
}

function markFinishedEvents() {

    const events = document.querySelectorAll('.event');
    
    events.forEach(event => {

        const eventDateElement = event.querySelector('.event-date');
        if (!eventDateElement) return;
        
        const dateText = eventDateElement.textContent.trim();
        const eventDate = parseEventDate(dateText);
        

        if (isEventFinished(eventDate)) {
            if (!event.querySelector('.event-finished')) {

                const finishedElement = document.createElement('p');
                finishedElement.className = 'event-finished';
                finishedElement.textContent = 'Event Finished';
                finishedElement.style.cssText = `
                    color: #dc3545;
                    font-weight: bold;
                    font-size: 0.9rem;
                    margin: 8px 0 4px 0;
                    padding: 4px 8px;
                    background-color: #f8d7da;
                    border: 1px solid #f5c6cb;
                    border-radius: 4px;
                    display: inline-block;
                `;
                
                eventDateElement.parentNode.insertBefore(finishedElement, eventDateElement.nextSibling);
                
                event.style.opacity = '0.7';
                event.style.backgroundColor = '#f8f9fa';
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', markFinishedEvents);
setInterval(markFinishedEvents, 3600000);