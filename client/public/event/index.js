// Extract the organization ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const eventID = urlParams.get('eventID');

if (eventID) {
    fetch(`/api/get/event/${eventID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                document.getElementById('eventName').textContent = data[0].nameOfEvent;
                const eventPoster = document.getElementById('eventPoster');
                eventPoster.src = '/api/eventimage/' + data[0].eventID;
                eventPoster.alt = "Event Poster";

                const description = data[0].descriptionOfEvent.split("\n");
                const leftSide = document.querySelector(".Left-Side");
                description.forEach(line => {
                    const paragraph = document.createElement("p");
                    paragraph.textContent = line;
                    leftSide.appendChild(paragraph);
                });

                document.getElementById('eventLocation').textContent = data[0].location;
                document.getElementById('eventDate').textContent = `${new Date(data[0].date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}`;
                
                document.getElementById('eventTime').textContent = `${new Date('1970-01-01T' + data[0].time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit',  hour12: true })}`;

                // Dynamically set Google Maps iframe location based on event location
                const location = encodeURIComponent(data[0].location); // Make the location URL-safe
                const mapUrl = `https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=${location}&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`

                // Update the iframe src dynamically
                const venueMap = document.getElementById('venueMap');
                venueMap.innerHTML = `
                    <div class="gmap_canvas">
                        <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>
                    </div>
                `;

                // Fetch the organization data
                fetchOrganization(1).then(organization => {
                    document.getElementById('eventOrganization').textContent = organization.organizationName;
                    document.getElementById('charityPhoneNumber').textContent = organization.organizationPhoneNumber;
                    document.getElementById('charityContactNumber').textContent = organization.representativeContactNumber;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching event data:', error);
        });
} else {
    console.error('No event ID found in URL');
}

// Function to fetch a specific organization by ID
function fetchOrganization(organizationID) {
    return fetch('/api/get/organization', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ organizationID: organizationID })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(organization => {
        return organization[0];  // Adjust based on the structure of the response
    })
    .catch(error => {
        console.error('Error fetching organization data:', error);
    });
}
