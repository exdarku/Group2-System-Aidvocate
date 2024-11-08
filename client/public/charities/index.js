document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.querySelector('.charity');
    const searchInput = document.querySelector('.search-input');
    const noMatchMessage = document.querySelector('.no-match-found');
    let allCharities = []; // To store all charities data

    // Function to create a card
    function createCard(charityName, charityDescription, organizationID) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.onclick = function() {
            showProfile(organizationID);
        };
    
        // Set the background image for the card directly here
        card.style.backgroundImage = `url('../api/image/${organizationID}')`;
        card.style.filter = "none";

        const background = document.createElement('div');
        background.classList.add('background');
        background.style.backgroundImage = `url('../api/image/${organizationID}')`;
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
    
    // Function to display charity cards
    function displayCharities(charities) {
        eventsContainer.innerHTML = ''; // Clear existing charities

        charities.forEach(charity => {
            eventsContainer.appendChild(createCard(charity.organizationName, charity.organizationDescription.slice(0, 80) + "...", charity.organizationID));
        });

        // Show or hide "No Match Found" message
        if (charities.length === 0) {
            noMatchMessage.style.display = 'block';
        } else {
            noMatchMessage.style.display = 'none';
        }
    }

    // Fetching the data from backend
    fetch('/api/getorganizations')
        .then(response => response.json())
        .then(data => {
            allCharities = data; // Save all charities data
            allCharities.sort((a, b) => new Date(b.organizationRegisterDate) - new Date(a.organizationRegisterDate));
            displayCharities(allCharities); // Display all charities initially
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        // Filter charities based on the search term
        const filteredCharities = allCharities.filter(charity => 
            charity.organizationName.toLowerCase().includes(searchTerm) ||
            charity.organizationDescription.toLowerCase().includes(searchTerm)
        );

        // Display the filtered charities
        displayCharities(filteredCharities);
    });
});

function showProfile(organizationID) {
    window.location.href = `/profile?organizationID=${organizationID}`;
}