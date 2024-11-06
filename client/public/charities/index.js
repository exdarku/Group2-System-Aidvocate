document.addEventListener("DOMContentLoaded", () => {

    const eventsContainer = document.querySelector('.charity');

    // Function to create a card
    function createCard(charityName, charityDescription, organizationID) {
        const card = document.createElement('div');
        card.classList.add('card');
    
        // Set the background image for the card directly here
        card.style.backgroundImage = "url('../api/image/" + organizationID + "')";
        card.style.filter = "none";

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
    

    // Getting the data from backend
    fetch('/api/getorganizations')
    .then(response => response.json())
    .then(data => {
        data.forEach(charity => {
            eventsContainer.appendChild(createCard(charity.organizationName, charity.organizationDescription, charity.organizationID));
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});


