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
    
    const description = organization.organizationDescription.split("\n");
    const profile = document.querySelector(".profile");
    description.forEach(line => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        profile.appendChild(paragraph);
    });


    // Dynamically set Google Maps iframe location based on event location
    const location = encodeURIComponent(organization.organizationAddress); // Make the location URL-safe
    const mapUrl = `https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=${location}&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`

    // Update the iframe src dynamically
    const venueMap = document.getElementById('venueMap');
    venueMap.innerHTML = `
        <div class="gmap_canvas">
            <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>
        </div>
    `;
})
.catch(error => {
    console.error('Error fetching organization data:', error);
});