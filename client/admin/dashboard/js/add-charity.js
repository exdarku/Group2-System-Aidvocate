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
    const totalDonationCollected = document.getElementById('totalDonationCollected').value;
    const organizationProfilePicture = document.getElementById('organizationProfilePicture').files[0]; // Get the file
    const organizationFeaturedPicture = document.getElementById('organizationFeaturedPicture').files[0]; // Get the featured image file

    // Prepare the FormData object to send as multipart form data
    const formData = new FormData();

    formData.append('organizationName', organizationName);
    formData.append('organizationDescription', organizationDescription);
    formData.append('organizationPhoneNumber', organizationPhoneNumber);
    formData.append('organizationAddress', organizationAddress);
    formData.append('organizationAbbreviation', organizationAbbreviation);
    formData.append('representativeName', representativeName);
    formData.append('organizationEmail', organizationEmail);
    formData.append('representativeContactNumber', representativeContactNumber);
    formData.append('totalDonationCollected', totalDonationCollected);
    formData.append('status', 0);

    // Append files if they exist
    if (organizationProfilePicture) {
        formData.append('organizationProfilePicture', organizationProfilePicture);
    }
    if (organizationFeaturedPicture) {
        formData.append('organizationFeaturedPicture', organizationFeaturedPicture);
    }

    // Use fetch to send data to the server
    fetch('/api/addorganization', {
        method: 'POST',
        body: formData, // Send form data (includes files)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.message === 'Organization added successfully') {
            alert('Organization registered successfully!');
            form.reset();  // Reset the form after successful submission
            window.location.reload();
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