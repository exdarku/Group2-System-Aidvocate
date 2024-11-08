// Extract the organization ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const eventID = urlParams.get('eventID');
let organizationId = null;

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
                fetchOrganization(data[0].organizationID).then(organization => {
                    document.getElementById('eventOrganization').textContent = organization.organizationName;
                    document.getElementById('charityPhoneNumber').textContent = organization.organizationPhoneNumber;
                    document.getElementById('charityContactNumber').textContent = organization.representativeContactNumber;
                    document.getElementById('charityEmail').textContent = organization.organizationEmail;
                    document.getElementById('organizationQR').src = `/api/organizationqr/${organization.organizationID}`;
                    organizationId = organization.organizationID;
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
        return organization[0];
    })
    .catch(error => {
        console.error('Error fetching organization data:', error);
    });
}







// Get the form element
const donationForm = document.getElementById('donationForm');
const thankYouModal = document.getElementById('thankYou-modal');

donationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount');
    const amountValue = parseFloat(amount.value);

    // Validate the amount value
    if (isNaN(amountValue) || amountValue <= 0) {
        amount.style.border = 'solid red 2px';
        return;
    } else {
        amount.style.border = 'none';
    }

    const donationData = new FormData();
    donationData.append('OrganizationID', organizationId);
    donationData.append('DonatorName', document.getElementById('donatorName').value);
    donationData.append('DonationAmount', amountValue);
    donationData.append('DonationProof', document.getElementById('proofOfPayment').files[0]);

    fetch('/api/donate', {
        method: 'POST',
        body: donationData
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Donation added successfully') {
            showThankYouGreet();
            closeDonationForm();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during submission:', error);
        alert('An error occurred while processing the donation');
    });
});



function showDonationForm() {

    // Show the modal
    document.getElementById("addDonation-modal").style.display = "block";

    // Disable background scroll
    document.body.style.overflow = "hidden";
}

function closeDonationForm() {
    // Hide the modal
    document.getElementById("addDonation-modal").style.display = "none";

    // Enable background scroll
    document.body.style.overflow = "auto";
}


// Add the confetti container and show the modal
function showThankYouGreet() {
    const modal = document.querySelector('.thank-you-modal');
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti');

    // Create random confetti particles
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        particle.style.animationDelay = `${Math.random() * 2}s`; // Random animation delay
        confettiContainer.appendChild(particle);
    }

    modal.appendChild(confettiContainer);
    modal.style.display = 'flex';

    // Remove confetti and close the modal after 4 seconds
    setTimeout(() => {
        confettiContainer.remove(); // Removes the confetti container
        modal.style.display = 'none'; // Hide the modal
    }, 4000); // 4000 milliseconds (4 seconds)
}

