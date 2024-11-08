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
        status.classList.add('status');
        status.textContent = "Upcoming Event";
        const eventTitle = document.createElement('h2');
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
        description.textContent = this.event.descriptionOfEvent.slice(0, 100)+"...";
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

    // Helper function to format time to 12-hour format with AM/PM
    formatTime(time) {
        // Assuming time is in HH:mm:ss format (e.g., "12:00:00")
        const [hours, minutes] = time.split(':'); // Split the time into hours and minutes

        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM'; // Determine AM or PM

        // Convert hour to 12-hour format
        if (hour > 12) hour -= 12; // 24-hour to 12-hour conversion
        if (hour === 0) hour = 12; // Handle midnight case

        // Return the formatted time
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
        eventImage.src = '/api/eventimage/'+this.event.eventID;
        eventImage.alt = 'Event Image';
        return eventImage;
    }
}

// Fetch and Display Only Upcoming Events
const eventsContainer = document.querySelector('.events');

fetch('http://localhost:3000/api/get/allevents/', {
    method: 'GET'
})
.then(response => response.json())
.then(events => {
    eventsContainer.innerHTML = ''; // Clear existing events

    // Filter for only events with status "UPCOMING EVENTS"
    const upcomingEvents = events.filter(event => event.status === 0);

    upcomingEvents.forEach(eventData => {
        const eventCard = new EventCard(eventData);
        eventsContainer.appendChild(eventCard.createCard());
    });
})
.catch(error => {
    console.error('Error:', error);
});

