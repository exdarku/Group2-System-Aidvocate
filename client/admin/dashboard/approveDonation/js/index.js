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
    charityDonations.textContent = `${organization.totalDonationCollected} Donations`;
    nameDonations.appendChild(charityName);
    nameDonations.appendChild(charityDonations);
    header.appendChild(nameDonations);

    // Create the donations section
    const cardDonations = document.createElement('div');
    cardDonations.classList.add('card-donations');
    const donationAmount = document.createElement('h2');
    donationAmount.textContent = `PHP ${organization.totalDonationCollected.toLocaleString()}`;
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
    logoImg.src = '/api/logo/' + organization.organizationID; // use default if no profile picture
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


const selectElement = document.getElementById('unverifiedDonationsBox');

// Add a placeholder option initially
const placeholderOption = document.createElement('option');
placeholderOption.textContent = "Select a donation";
placeholderOption.value = "";
placeholderOption.disabled = true;
placeholderOption.selected = true;
selectElement.appendChild(placeholderOption);

let selectedOrganization;
// Event listener for when the select option changes
selectElement.addEventListener('change', () => {
    // Get the value of the selected option
    const selectedOrganization = selectElement.value;
    
    // Find the selected <option> element
    const selectedOption = selectElement.querySelector(`option[value="${selectedOrganization}"]`);
    
    // Get the data stored in the selected option
    const donatorName = selectedOption.getAttribute('data-donatorName');
    const donationAmount = selectedOption.getAttribute('data-donationAmount');
    
    // Call the function to update the text boxes with the selected data
    changeTextBoxValues(donatorName, donationAmount);
    
    // Show the data fields
    document.querySelector('.dataFields').style.display = "block";
});

function changeTextBoxValues(donatorName, amount) {
    document.getElementById('donatorNameTextBox').value = donatorName;
    document.getElementById('donationAmountTextBox').value = amount;
}

// Fetch donations and populate the select dropdown
fetch('http://localhost:3000/api/get/alldonations', {
    method: "GET"
})
    .then(response => response.json())
    .then(donations => {
        donations.forEach(async (donation) => {
            if (donation.Verified != true) {
                const newOption = document.createElement('option');
                newOption.value = donation.OrganizationID;

                try {
                    const organizationResponse = await fetch('http://localhost:3000/api/get/organization', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"organizationID": donation.OrganizationID})
                    });

                    const organizationData = await organizationResponse.json();
                    
                    newOption.textContent = `${organizationData[0].organizationName} | Donation #${donation.DonationID}`;
                    
                    // Store additional data in the option element
                    newOption.setAttribute('data-donatorName', donation.DonatorName);
                    newOption.setAttribute('data-donationAmount', donation.DonationAmount);
                    newOption.setAttribute('data-donationId', donation.DonationID); // Add DonationID attribute

                    selectElement.appendChild(newOption);
                } catch (error) {
                    console.error('Error fetching organization data:', error);
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching donations:', error);
    });

document.getElementById('approveButton').addEventListener('click', () => {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const donationID = selectedOption.getAttribute('data-donationId'); // Use the donation ID from the attribute

    fetch('http://localhost:3000/api/verifydonation', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "DonationID": donationID
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Donation has been verified!");
        })
        .catch(error => {
            console.error('Error verifying donation:', error);
        });
});
