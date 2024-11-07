// EventCard Class
class EventCard {
    constructor(event) {
        this.event = event;
    }

    createCard() {
        const card = document.createElement('div');
        card.classList.add('card');

        const details = this.createDetailsSection();
        card.appendChild(details);

        const eventImage = this.createEventImage();
        card.appendChild(eventImage);

        return card;
    }

    createDetailsSection() {
        const details = document.createElement('div');
        details.classList.add('details');

        const header = this.createHeaderSection();
        details.appendChild(header);

        const description = this.createDescription();
        details.appendChild(description);

        const infosDate = this.createEventTime();
        details.appendChild(infosDate);

        const infosPlace = this.createEventLocation();
        details.appendChild(infosPlace);

        const seeMoreButton = this.createSeeMoreButton();
        details.appendChild(seeMoreButton);

        return details;
    }

    createHeaderSection() {
        const header = document.createElement('div');
        header.classList.add('header');

        const title = document.createElement('div');
        title.classList.add('title');

        const status = document.createElement('h5');
        const eventTitle = document.createElement('h3');
        eventTitle.textContent = this.event.nameOfEvent;
        
        title.appendChild(status);
        title.appendChild(eventTitle);

        const date = document.createElement('div');
        date.classList.add('date');

        const day = document.createElement('h4');
        day.id = 'event-day';
        day.textContent = new Date(this.event.date).getDate();

        const month = document.createElement('h4');
        month.id = 'event-month';
        month.textContent = new Date(this.event.date).toLocaleString('default', { month: 'short' });

        date.appendChild(day);
        date.appendChild(month);

        header.appendChild(title);
        header.appendChild(date);

        return header;
    }

    createDescription() {
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = this.event.descriptionOfEvent.slice(0, 100) + "...";
        return description;
    }

    createEventTime() {
        const infosDate = document.createElement('div');
        infosDate.classList.add('infos-date', 'infos');

        const clockIcon = document.createElement('img');
        clockIcon.src = '../images/schedule.png';
        clockIcon.alt = 'Clock';

        const venueDetailsTime = document.createElement('div');
        venueDetailsTime.classList.add('venue-details');

        const venueStart = document.createElement('p');
        venueStart.id = 'venue-start';
        venueStart.textContent = this.formatTime(this.event.time);

        venueDetailsTime.appendChild(venueStart);

        infosDate.appendChild(clockIcon);
        infosDate.appendChild(venueDetailsTime);

        return infosDate;
    }

    formatTime(time) {
        const [hours, minutes] = time.split(':');
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        
        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;
        
        return `${hour}:${minutes} ${ampm}`;
    }

    createEventLocation() {
        const infosPlace = document.createElement('div');
        infosPlace.classList.add('infos-place', 'infos');

        const locationIcon = document.createElement('img');
        locationIcon.src = '../images/Vector.png';
        locationIcon.alt = 'Location';

        const venueDetailsPlace = document.createElement('div');
        venueDetailsPlace.classList.add('venue-details');

        const venuePlace1 = document.createElement('p');
        venuePlace1.id = 'venue-place';
        venuePlace1.textContent = this.event.location;

        venueDetailsPlace.appendChild(venuePlace1);

        infosPlace.appendChild(locationIcon);
        infosPlace.appendChild(venueDetailsPlace);

        return infosPlace;
    }

    createSeeMoreButton() {
        const button = document.createElement('button');
        button.classList.add('seeMoreButton');
        button.textContent = 'See more';

            // Adding onclick event listener
        button.onclick = () => {
            window.location.href = `/event?eventID=${this.event.eventID}`;
        };

        return button;
    }

    createEventImage() {
        const eventImage = document.createElement('img');
        eventImage.src = '/api/eventimage/' + this.event.eventID;
        eventImage.alt = 'Event Image';
        return eventImage;
    }
}

// Fetch and Display Events
const eventsContainer = document.querySelector('.events');
const noMatchMessage = document.querySelector('.no-match-found'); // Get the "No Match Found" message directly
const searchInput = document.querySelector('.search-input');

let allEvents = [];

// Fetch events and display them
fetch('http://localhost:3000/api/get/allevents/', {
    method: 'GET'
})
.then(response => response.json())
.then(events => {
    allEvents = events; // Save all events
    displayEvents(events); // Display all events initially
})
.catch(error => {
    console.error('Error:', error);
});

// Function to display event cards
function displayEvents(events) {
    eventsContainer.innerHTML = ''; // Clear existing events (but not the "No Match Found" message)

    let hasEvents = false; // Flag to track if there are events to display

    // Append the event cards
    events.forEach(eventData => {
        const eventCard = new EventCard(eventData);
        eventsContainer.appendChild(eventCard.createCard());
        hasEvents = true; // If at least one event is displayed
    });

    // Show or hide "No Match Found" message based on whether there are events
    if (events.length === 0 || !hasEvents) {
        noMatchMessage.style.display = 'block'; // Show the "No Match Found" message if no events
    } else {
        noMatchMessage.style.display = 'none'; // Hide the message if there are events
    }
}

// Search event based on event name
searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Filter events by title, description, or location
    const filteredEvents = allEvents.filter(event => 
        event.nameOfEvent.toLowerCase().includes(searchTerm) ||
        event.descriptionOfEvent.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
    );

    displayEvents(filteredEvents); // Display filtered events
});