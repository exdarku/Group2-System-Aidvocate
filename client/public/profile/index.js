const urlParams = new URLSearchParams(window.location.search);
const organizationID = urlParams.get('organizationID');

fetch('/api/get/organization', {
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
.then(data => {
    const organization = data[0];
    
    document.getElementById('organizationName').textContent = organization.organizationName;
    
    const featurePicture = document.getElementById('organizationFeaturedPicture'); 
    featurePicture.src = `/api/image/${organizationID}`;
    featurePicture.alt = `Feature Picture`;
    
    const description = data[0].organizationDescription.split("\n");
    const profile = document.querySelector(".profile");
    description.forEach(line => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        profile.appendChild(paragraph);
    });
})
.catch(error => {
    console.error('Error fetching organization data:', error);
});