const contentful = require('contentful');

// Initialize Contentful client
const client = contentful.createClient({
  space: 'wkknt9k70bzv',
  accessToken: 'PylOe0WWUDfc5C2VpkJ00GMtas3yBpd0OoOWU5Q7v48',
});

// Function to fetch content
async function fetchContent(contentType) {
  try {
    const entries = await client.getEntries({ content_type: contentType });
    return entries.items.map((item) => item.fields);
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
}

module.exports = fetchContent;