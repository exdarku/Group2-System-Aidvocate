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
    logoImg.src = '/api/logo/' + organization.organizationID; // Default image if no profile picture
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
    console.log(organization.organizationID); 
    fetch(`http://localhost:3000/api/get/donatorcount/${organization.organizationID}`)
    .then(response => response.json())
    .then(data => {
        charityDonations.textContent = data[0].DonatorCount + " Donations"; // Use the actual count field from the response
    })
    .catch(error => {
        console.error('Error fetching donator count:', error);
    });

    nameDonations.appendChild(charityName);
    nameDonations.appendChild(charityDonations);
    header.appendChild(nameDonations);

    // Create the donations section
    const cardDonations = document.createElement('div');
    cardDonations.classList.add('card-donations');
    const donationAmount = document.createElement('h2');
    donationAmount.textContent = `PHP ${organization.totalDonationCollected.toLocaleString()}`;

    cardDonations.appendChild(donationAmount);
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
    const charityDonationDiv = document.createElement('div');
    charityDonationDiv.classList.add('charity-total-donations');
    if(index == 0) {
        charityDonationDiv.classList.add('top-total-donations');
    }

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo');
    const logoImg = document.createElement('img');
    logoImg.src = '/api/logo/' + organization.organizationID;
    logoImg.alt = organization.organizationName;
    logoDiv.appendChild(logoImg);

    // Create the charity name
    const charityName = document.createElement('h3');
    charityName.textContent = organization.organizationName;

    const charityDonationAmount = document.createElement('h3');
    charityDonationAmount.classList.add('charity-donations-amount');
    charityDonationAmount.textContent = `PHP ${organization.totalDonationCollected.toLocaleString()}`;

    charityDonationDiv.appendChild(logoDiv);
    charityDonationDiv.appendChild(charityName);
    charityDonationDiv.appendChild(charityDonationAmount);

    return charityDonationDiv;
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

    organizations.sort((a, b) => new Date(b.organizationRegisterDate) - new Date(a.organizationRegisterDate));

    organizations.forEach((org) => {
        // Append each created card to the panel container
        charityContainer.appendChild(createCard(org));

        totalCollectedDonations += org.totalDonationCollected; // get the totalDonationCollected displayed in total-collected-donations
    });
    totalCollectedDonationsText.textContent = "PHP " + totalCollectedDonations.toLocaleString(); // change the text content of total-collected-donations


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

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
const formattedDate = today.toLocaleDateString('en-US', options);

document.getElementById('dateToDay').textContent = formattedDate;


document.getElementById('userGreeting').textContent = `Hello, ${sessionStorage.getItem("firstName")}!`;