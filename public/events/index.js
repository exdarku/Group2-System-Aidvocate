const eventsContainer = document.querySelector('.events');

// Function to create an event card
function createEventCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const details = document.createElement('div');
    details.classList.add('details');

    // Header section with title and date
    const header = document.createElement('div');
    header.classList.add('header');

    const title = document.createElement('div');
    title.classList.add('title');
    
    const status = document.createElement('h5');
    status.classList.add('status');
    status.textContent = 'UPCOMING EVENT';
    
    const eventTitle = document.createElement('h3');
    eventTitle.textContent = 'YOUTH FOR CHILDREN';
    
    title.appendChild(status);
    title.appendChild(eventTitle);

    const date = document.createElement('div');
    date.classList.add('date');
    
    const day = document.createElement('h4');
    day.id = 'event-day';
    day.textContent = '01';
    
    const month = document.createElement('h4');
    month.id = 'event-month';
    month.textContent = 'Nov';
    
    date.appendChild(day);
    date.appendChild(month);

    header.appendChild(title);
    header.appendChild(date);
    details.appendChild(header);

    // Description
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    details.appendChild(description);

    // Event time
    const infosDate = document.createElement('div');
    infosDate.classList.add('infos-date', 'infos');
    
    const clockIcon = document.createElement('img');
    clockIcon.src = '../images/schedule.png';
    clockIcon.alt = 'Clock';
    
    const venueDetailsTime = document.createElement('div');
    venueDetailsTime.classList.add('venue-details');
    
    const venueStart = document.createElement('p');
    venueStart.id = 'venue-start';
    venueStart.textContent = 'Friday, 5:00PM, EST';
    
    const venueEnd = document.createElement('p');
    venueEnd.id = 'venue-end';
    venueEnd.textContent = 'Friday, 5:00PM, EST';
    
    venueDetailsTime.appendChild(venueStart);
    venueDetailsTime.appendChild(venueEnd);
    
    infosDate.appendChild(clockIcon);
    infosDate.appendChild(venueDetailsTime);
    details.appendChild(infosDate);

    // Event location
    const infosPlace = document.createElement('div');
    infosPlace.classList.add('infos-place', 'infos');
    
    const locationIcon = document.createElement('img');
    locationIcon.src = '../images/Vector.png';
    locationIcon.alt = 'Location';
    
    const venueDetailsPlace = document.createElement('div');
    venueDetailsPlace.classList.add('venue-details');
    
    const venuePlace1 = document.createElement('p');
    venuePlace1.id = 'venue-place';
    venuePlace1.textContent = 'Lorem Ipsum';
    
    const venuePlace2 = document.createElement('p');
    venuePlace2.id = 'venue-place';
    venuePlace2.textContent = 'Lorem Ipsum';
    
    venueDetailsPlace.appendChild(venuePlace1);
    venueDetailsPlace.appendChild(venuePlace2);
    
    infosPlace.appendChild(locationIcon);
    infosPlace.appendChild(venueDetailsPlace);
    details.appendChild(infosPlace);

    // See More Button
    const seeMoreButton = document.createElement('button');
    seeMoreButton.classList.add('seeMoreButton');
    seeMoreButton.textContent = 'See more';
    details.appendChild(seeMoreButton);

    card.appendChild(details);

    // Event image
    const eventImage = document.createElement('img');
    eventImage.src = '../images/youthforchildren.png';
    eventImage.alt = '';
    card.appendChild(eventImage);

    return card;
}

// Add multiple event cards
const numberOfEventCards = 10; // Set the number of event cards you want
for (let i = 0; i < numberOfEventCards; i++) {
    eventsContainer.appendChild(createEventCard());
}
