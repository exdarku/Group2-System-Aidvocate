const eventsContainer = document.querySelector('.events');

// Function to create a card
function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = '../images/handIcon.png';
    img.alt = 'hand icon';
    button.appendChild(img);
    
    const description = document.createElement('div');
    description.classList.add('description');
    
    const title = document.createElement('h3');
    title.textContent = 'GET INVOLVED';
    
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    
    description.appendChild(title);
    description.appendChild(paragraph);
    
    card.appendChild(button);
    card.appendChild(description);
    
    return card;
}

// Add multiple cards
const numberOfCards = 15; // Set the number of cards you want
for (let i = 0; i < numberOfCards; i++) {
    eventsContainer.appendChild(createCard());
}
