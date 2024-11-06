document.addEventListener("DOMContentLoaded", () => {

    const eventsContainer = document.querySelector('.charity');

    // Function to create a card
    function createCard(charityName, charityDescription, organizationID) {
        const card = document.createElement('div');
        card.classList.add('card');

        // Set the background image for the card directly here
        card.style.backgroundImage = "url('../api/image/2')";

        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = '../images/handIcon.png';
        img.alt = 'hand icon';
        button.appendChild(img);

        const description = document.createElement('div');
        description.classList.add('description');
        
        const title = document.createElement('h3');
        title.textContent = charityName;
        
        const paragraph = document.createElement('p');
        paragraph.textContent = charityDescription;
        
        description.appendChild(title);
        description.appendChild(paragraph);
        
        card.appendChild(button);
        card.appendChild(description);

        return card;
    }

    // Getting the data from backend
    fetch('/api/getorganizations')
    .then(response => response.json())
    .then(data => {
        data.forEach(charity => {
            eventsContainer.appendChild(createCard(charity.organizationName, charity.organizationDescription));
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


