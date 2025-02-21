// serverside_js/fetch_content.js
const contentful = require('contentful');
const { contentfulConfig } = require('../js/config'); // Correct relative path

// Initialize Contentful client
const client = contentful.createClient({
    space: contentfulConfig.space,
    accessToken: contentfulConfig.accessToken,
});

// Function to fetch events
async function fetchEvents() {
    try {
        const entries = await client.getEntries({ content_type: 'events' });
        return entries.items.map(item => item.fields);
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}

// Function to fetch school dates
async function fetchSchoolDates() {
    try {
        const entries = await client.getEntries({ content_type: 'schoolDates' });
        return entries.items.map(item => item.fields);
    } catch (error) {
        console.error('Error fetching school dates:', error);
        throw error;
    }
}

module.exports = {
    fetchEvents,
    fetchSchoolDates
};