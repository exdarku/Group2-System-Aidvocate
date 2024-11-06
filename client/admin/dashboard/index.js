let index = 0;

// Charity Panel
function createCard(organization) {
    // Determine the card color based on the index
    const colors = ['card-blue', 'card-pink', 'card-yellow'];
    const cardColor = colors[index];

    // Update the index to cycle through the colors
    index = (index + 1) % colors.length;

    // Create the outer card div
    const card = document.createElement('div');
    card.classList.add('card', cardColor); // Add dynamic color class to the card

    // Create the header div
    const header = document.createElement('div');
    header.classList.add('header');
    card.appendChild(header);

    // Create the logo div inside the header
    const logo = document.createElement('div');
    logo.classList.add('logo');
    const logoImg = document.createElement('img');
    logoImg.src = organization.organizationProfilePicture || 'images/default.png'; // Default image if no profile picture
    logoImg.alt = organization.organizationName;
    logo.appendChild(logoImg);
    header.appendChild(logo);

    // Create the name and donations section inside the header
    const nameDonations = document.createElement('div');
    nameDonations.classList.add('name-donations');
    const charityName = document.createElement('h5');
    charityName.id = 'charity-name';
    charityName.textContent = organization.organizationName;
    const charityDonations = document.createElement('p');
    charityDonations.id = 'charity-donations';
    charityDonations.textContent = `${organization.totalDonationCollected} Donations`;
    nameDonations.appendChild(charityName);
    nameDonations.appendChild(charityDonations);
    header.appendChild(nameDonations);

    // Create the donations section
    const cardDonations = document.createElement('div');
    cardDonations.classList.add('card-donations');
    const donationAmount = document.createElement('h2');
    donationAmount.textContent = `PHP ${organization.totalDonationCollected}`;
    const donationsToday = document.createElement('p');
    donationsToday.textContent = '2 donations today'; // Placeholder for today’s donations
    cardDonations.appendChild(donationAmount);
    cardDonations.appendChild(donationsToday);
    card.appendChild(cardDonations);

    // Create the details section for representative
    const details = document.createElement('div');
    details.classList.add('details');
    const personImg = document.createElement('img');
    personImg.src = 'images/human.png'; // Placeholder image
    personImg.alt = '';
    const personName = document.createElement('p');
    personName.textContent = organization.representativeName;
    details.appendChild(personImg);
    details.appendChild(personName);
    card.appendChild(details);

    // Create the details section for location
    const locationDetails = document.createElement('div');
    locationDetails.classList.add('details');
    const locationImg = document.createElement('img');
    locationImg.src = 'images/loc.png'; // Placeholder image
    locationImg.alt = '';
    const locationName = document.createElement('p');
    locationName.textContent = organization.organizationAddress;
    locationDetails.appendChild(locationImg);
    locationDetails.appendChild(locationName);
    card.appendChild(locationDetails);

    return card; // Return the created card
}

// This function creates the structure for each charity's total donation display
function displayTopCollectedCharityDonations(organization, index) {
    // Create the charity donation div
    const charityDonationDiv = document.createElement('div');
    charityDonationDiv.classList.add('charity-total-donations');
    if(index == 0) {
        charityDonationDiv.classList.add('top-total-donations');
    }

    // Create the logo div and add the image
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo');
    const logoImg = document.createElement('img');
    logoImg.src = organization.organizationProfilePicture || 'images/default.png'; // use default if no profile picture
    logoImg.alt = organization.organizationName;
    logoDiv.appendChild(logoImg);

    // Create the charity name
    const charityName = document.createElement('h3');
    charityName.textContent = organization.organizationName;

    // Create the donation amount display
    const charityDonationAmount = document.createElement('h3');
    charityDonationAmount.classList.add('charity-donations-amount');
    charityDonationAmount.textContent = `PHP ${organization.totalDonationCollected.toLocaleString()}`;

    // Append all parts to the charity donation div
    charityDonationDiv.appendChild(logoDiv);
    charityDonationDiv.appendChild(charityName);
    charityDonationDiv.appendChild(charityDonationAmount);

    return charityDonationDiv; // Return the newly created charity donation div
}


function openModal() {
    // Show the modal
    document.getElementById("add-modal").style.display = "block";

    // Disable background scroll
    document.body.style.overflow = "hidden";
}

function closeModal() {
    // Hide the modal
    document.getElementById("add-modal").style.display = "none";

    // Enable background scroll
    document.body.style.overflow = "auto";
}



// Element Containers
const charityContainer = document.querySelector('.panel');
const totalDonationsContainer = document.querySelector('.card-total-donations');

// Elements text of valus
const totalCollectedDonationsText = document.getElementById("total-collected-donations");

let totalCollectedDonations = 0.00;
let top3CharitiesDonations = [];
fetch('http://localhost:3000/api/getorganizations', {
    method: 'GET'
})
.then(response => response.json())  // Parse the response as JSON
.then(organizations => {
    organizations.forEach((org) => {
        // Append each created card to the panel container
        charityContainer.appendChild(createCard(org));

        totalCollectedDonations += org.totalDonationCollected; // get the totalDonationCollected displayed in total-collected-donations
    });
    totalCollectedDonationsText.textContent = "PHP " + totalCollectedDonations.toFixed(2); // change the text content of total-collected-donations


    // Sort organizations by totalDonationCollected in descending order
    const sortedOrganizations = organizations.sort((a, b) => b.totalDonationCollected - a.totalDonationCollected);
    top3CharitiesDonations = sortedOrganizations.slice(0, 3);

    const topTotalDonationsContainer = document.querySelector('.card-total-donations');
    top3CharitiesDonations.forEach((org, index) => {
        const charityDonationElement = displayTopCollectedCharityDonations(org, index);
        topTotalDonationsContainer.appendChild(charityDonationElement);
    });

    
})
.catch(error => {
    console.error('Error:', error);  // Catch and log any errors
});


// SHOW EVENT CARDS
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
const numberOfEventCards = 4; // Set the number of event cards you want
for (let i = 0; i < numberOfEventCards; i++) {
    eventsContainer.appendChild(createEventCard());
}

let charityScrollHeight = 0;

function viewAll() {
    let panel = document.querySelector('.panel');
    
    // Check the current height
    if (panel.style.height === charityScrollHeight + "px") {
        panel.style.height = "250px";
    } else {
        panel.style.height = panel.scrollHeight + "px";
        charityScrollHeight = panel.scrollHeight;
    }
}

document.getElementById('registerOrganizationButton').addEventListener('click', (event) => {
    event.preventDefault();  // Prevent form from submitting the traditional way

    // Gather form data individually
    const organizationName = document.getElementById('organizationName').value;
    const organizationDescription = document.getElementById('organizationDescription').value;
    const organizationPhoneNumber = document.getElementById('organizationPhoneNumber').value;
    const organizationAddress = document.getElementById('organizationAddress').value;
    const organizationAbbreviation = document.getElementById('organizationAbbreviation').value;
    const representativeName = document.getElementById('representativeName').value;
    const representativeContactNumber = document.getElementById('representativeContactNumber').value;
    const totalDonationCollected = document.getElementById('totalDonationCollected').value;
    const organizationProfilePicture = document.getElementById('organizationProfilePicture').files[0]; // Get the file
    const organizationFeaturedPicture = document.getElementById('organizationFeaturedPicture').files[0]; // Get the featured image file

    // Prepare the FormData object to send as multipart form data
    const formData = new FormData();

    formData.append('organizationName', organizationName);
    formData.append('organizationDescription', organizationDescription);
    formData.append('organizationPhoneNumber', organizationPhoneNumber);
    formData.append('organizationAddress', organizationAddress);
    formData.append('organizationAbbreviation', organizationAbbreviation);
    formData.append('representativeName', representativeName);
    formData.append('representativeContactNumber', representativeContactNumber);
    formData.append('totalDonationCollected', totalDonationCollected);

    // Append files if they exist
    if (organizationProfilePicture) {
        formData.append('organizationProfilePicture', organizationProfilePicture);
    }
    if (organizationFeaturedPicture) {
        formData.append('organizationFeaturedPicture', organizationFeaturedPicture);
    }

    // Use fetch to send data to the server
    fetch('/api/addorganization', {
        method: 'POST',
        body: formData, // Send form data (includes files)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.message === 'Organization added successfully') {
            alert('Organization registered successfully!');
            form.reset();  // Reset the form after successful submission
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during submission:', error);
        alert('An error occurred while registering the organization.');
    });
});