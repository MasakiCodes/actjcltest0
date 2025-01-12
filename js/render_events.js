fetch('/api/events')
  .then((response) => response.json())
  .then((events) => {
    events.forEach((event) => {
     console.log(event.title)
    });
  })
  .catch(console.error);