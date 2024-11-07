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
});

document.querySelector('.seeMoreButton').addEventListener('click', () => {
    window.location.href = '/charities';
});