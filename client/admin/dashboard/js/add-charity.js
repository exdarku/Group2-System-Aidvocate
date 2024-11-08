// Get the form element
const charityForm = document.getElementById('charityRegistrationForm');

// Handle form submission
charityForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way

    // Gather form data individually
    const organizationName = document.getElementById('organizationName').value;
    const organizationDescription = document.getElementById('organizationDescription').value;
    const organizationPhoneNumber = document.getElementById('organizationPhoneNumber').value;
    const organizationAddress = document.getElementById('organizationAddress').value;
    const organizationAbbreviation = document.getElementById('organizationAbbreviation').value;
    const representativeName = document.getElementById('representativeName').value;
    const organizationEmail = document.getElementById('organizationEmail').value;
    const representativeContactNumber = document.getElementById('representativeContactNumber').value;
    // const totalDonationCollected = document.getElementById('totalDonationCollected').value;
    const organizationProfilePicture = document.getElementById('organizationProfilePicture').files[0]; // Get the file
    const organizationFeaturedPicture = document.getElementById('organizationFeaturedPicture').files[0]; // Get the featured image file
    
    // Prepare the FormData object to send as multipart form data
    const charityData = new FormData();
    charityData.append('organizationName', organizationName);
    charityData.append('organizationDescription', organizationDescription);
    charityData.append('organizationPhoneNumber', organizationPhoneNumber);
    charityData.append('organizationEmail', organizationEmail);
    charityData.append('organizationAddress', organizationAddress);
    charityData.append('organizationAbbreviation', organizationAbbreviation);
    charityData.append('representativeName', representativeName);
    charityData.append('representativeContactNumber', representativeContactNumber);
    // charityData.append('totalDonationCollected', totalDonationCollected);

    // Append files if they exist
    charityData.append('organizationProfilePicture', organizationProfilePicture);
    
    charityData.append('organizationFeaturedPicture', organizationFeaturedPicture);
    

    // Use fetch to send data to the server
    fetch('/api/addorganization', {
        method: 'POST',
        body: charityData, // Send form data (includes files)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.message === 'Organization added successfully') {
            console.log("GOOD ADD ORG")
            
            
            const charityDonationData = new FormData();
            const nameOfAccountHolder = document.getElementById('organizationBankAccountHolder').value;
            const gcashQr = document.getElementById('organizationGcashQR').files[0];
            const bankAccountName = document.getElementById('organizationBankAccountName').value;
            const bankAccountBank = document.getElementById('organizationBankAccountBank').value;
            const bankAccountNumber = document.getElementById('organizationBankAccountNumber').value;
            
            
            charityDonationData.append('organizationID', data.organizationID);
            charityDonationData.append('nameOfAccountHolder', nameOfAccountHolder);
            charityDonationData.append('gcashQr', gcashQr);
            if(bankAccountName) {
                charityDonationData.append('bankAccountName', bankAccountName)
            }
            if(bankAccountBank) {
                charityDonationData.append('bankAccountBank', bankAccountBank)
            }
            if(bankAccountNumber) {
                charityDonationData.append('bankAccountNumber', bankAccountNumber)
            }
            
            fetch('/api/adddonationdescription', {
                method: 'POST',
                body: charityDonationData, // Send form data (includes files)
            })
            .then(response => response.json())
            .then(res => { 
                if(res.message == 'Donation description added successfully') {
                    alert('Donation description added successfully!');
                    charityForm.reset();
                    window.location.reload();
                } else {
                    alert('Error: ' + res.message);
                }
            });

            
            alert('Organization registered successfully!');

        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during submission:', error);
        alert('An error occurred while registering the organization.');
    });
});


function openCharityModal() {
    // Show the modal
    document.getElementById("addCharity-modal").style.display = "block";

    // Disable background scroll
    document.body.style.overflow = "hidden";
}

function closeCharityModal() {
    // Hide the modal
    document.getElementById("addCharity-modal").style.display = "none";
}