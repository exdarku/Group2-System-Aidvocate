function createDonationCard(imageSrc, donorName, amount) {
    // Create the main donation container div
    const donationDiv = document.createElement('div');
    donationDiv.classList.add('charity-recent-donations');

    // Create and set the image element
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = donorName;
    donationDiv.appendChild(img);

    // Create and set the donor name h3 element
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = donorName;
    donationDiv.appendChild(nameHeading);

    // Create and set the donation amount h3 element
    const amountHeading = document.createElement('h3');
    amountHeading.classList.add('charity-donations-recent-amount');
    amountHeading.textContent = `PHP ${amount} +`;
    donationDiv.appendChild(amountHeading);

    // Set dynamic font size based on donor name length
    if (donorName.length > 20) {
        nameHeading.textContent = donorName.slice(0, 20) + '...';
    }

    // Append the created donation div to the .card container
    const cardDiv = document.querySelector('.recent-donations-panel .card');
    cardDiv.appendChild(donationDiv);
}

fetch('http://localhost:3000/api/get/alldonations/', {
    method: 'GET'
})
.then(response => response.json())  // Parse the response as JSON
.then(donations => {

    let organizationName = "";

    fetch('http://localhost:3000/api/getorganizations', {
        method: 'GET'
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(organizations => {


        // Sort donations by DonationTimestamp in descending order
        const recentDonations = donations
        .sort((a, b) => new Date(b.DonationTimestamp) - new Date(a.DonationTimestamp))
        .slice(0, 3);  // Get the top 3 recent donations

        // Loop through each recent donation and display it
        recentDonations.forEach(donation => {
            let organizationName = "";
            organizations.forEach(org => {
                if(org.organizationID == donation.OrganizationID) {
                    organizationName = org.organizationName;
                }
            });

            createDonationCard(
                '/api/logo/' + donation.OrganizationID,   // Assuming the image is static for this example
                organizationName, // Organization Name
                donation.DonationAmount
            );
        });

        
    })
    .catch(error => {
        console.error('Error:', error);  // Catch and log any errors
    });



})
.catch(error => {
    console.error('Error:', error);  // Catch and log any errors
});