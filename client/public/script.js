document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    const eventsContainer = document.querySelector('.dynamicContents');

    // Function to create a card
    function createCard(charityName, charityDescription, organizationID) {
        const card = document.createElement('div');
        card.classList.add('card');
    
        // Create and set the background div with contrast filter applied in CSS
        const background = document.createElement('div');
        background.classList.add('background');
        background.style.backgroundImage = "url('../api/image/" + organizationID + "')";
        card.appendChild(background);

        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = '../images/handIcon.png';
        img.alt = 'hand icon';
        button.appendChild(img);
    
        const description = document.createElement('div');
        description.classList.add('description');
    
        // Wrapper for the text to keep it unaffected by the filter
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('text-wrapper');
    
        const title = document.createElement('h3');
        title.textContent = charityName;
    
        const paragraph = document.createElement('p');
        paragraph.textContent = charityDescription;
    
        textWrapper.appendChild(title);
        textWrapper.appendChild(paragraph);
        
        description.appendChild(textWrapper);
        
        card.appendChild(button);
        card.appendChild(description);
    
        return card;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    document.getElementById('eventsMonthLabel').textContent = currentDate.toLocaleString('default', { month: 'long' }) + " events";

    // Fetch and append data
    fetch('/api/getorganizations')
    .then(response => response.json())
    .then(data => {
        // Get the last 3 organizations
        const lastThree = data.slice(-3);

        // Loop through the last 3 items and append them to the container
        lastThree.forEach((charity) => {
            eventsContainer.appendChild(
                createCard(charity.organizationName, charity.organizationDescription.slice(0, 80) + "...", charity.organizationID)
            );
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    fetch('/api/get/allevents/')
        .then(response => response.json())
        .then(data => {
            const eventsContainer = document.getElementById("events");

            // Get the current date
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            // Filter events for the current month and year
            const filteredEvents = data.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear && event.status === 0;
            });

            filteredEvents.forEach(event => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <div class="details">
                        <div class="header">
                            <div class="title">
                                <h5 class="status">Upcoming Event</h5>
                                <h3>${event.nameOfEvent}</h3>
                            </div>
                            <div class="date">
                                <h4>${new Date(event.date).getDate().toString().padStart(2, '0')}</h4>
                                <h4>${new Date(event.date).toLocaleString('default', { month: 'short' })}</h4>
                            </div>
                        </div>
                        <p class="description">${event.descriptionOfEvent.slice(0,80)+"..."}</p>
                        <div class="infos-date infos">
                            <img src="images/schedule.png" alt="Clock">
                            <div class="venue-details">
                                <p>${new Date('1970-01-01T' + event.time).toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                  })}</p>
                            </div>
                        </div>
                        <div class="infos-place infos">
                            <img src="images/Vector.png" alt="Location">
                            <div class="venue-details">
                                <p>${event.location}</p>
                            </div>
                        </div>
                        <button class="seeMoreButton" onclick="showEvent(${event.eventID})">See more</button>
                    </div>
                    <img src="${'/api/eventimage/' + event.eventID || 'images/default-event.png'}" alt="${event.nameOfEvent}">
                `;

                eventsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching events:", error));
});

document.querySelector('.seeMoreButton').addEventListener('click', () => {
    window.location.href = '/charities';
});

function showEvent(eventID) {
    window.location.href = `/event?eventID=${eventID}`;
    console.log(eventID)
}