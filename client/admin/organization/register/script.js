 // Get the form element
 const form = document.getElementById('registrationForm');

 // Handle form submission
 form.addEventListener('submit', function(event) {
     event.preventDefault();  // Prevent form from submitting the traditional way

     // Gather form data individually
     const organizationName = document.getElementById('organizationName').value;
     const organizationDescription = document.getElementById('organizationDescription').value;
     const organizationPhoneNumber = document.getElementById('organizationPhoneNumber').value;
     const organizationAddress = document.getElementById('organizationAddress').value;
     const organizationAbbreviation = document.getElementById('organizationAbbreviation').value;
     const representativeName = document.getElementById('representativeName').value;
     const representativeContactNumber = document.getElementById('representativeContactNumber').value;
     const totalDonationCollected = document.getElementById('totalDonationCollected').value;
     const organizationProfilePicture = document.getElementById('organizationProfilePicture').files[0]; // Get the file

     // Prepare the data object to send as JSON
     const data = {
         organizationName,
         organizationDescription,
         organizationPhoneNumber,
         organizationAddress,
         organizationAbbreviation,
         representativeName,
         representativeContactNumber,
         totalDonationCollected,
     };

     console.log(data);
     
     if (organizationProfilePicture) {
         formData.append('organizationProfilePicture', organizationProfilePicture);
     }

     // Use fetch to send data to the server
     fetch('/api/addorganization', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
     })
     .then(response => response.json())
     .then(data => {
         // Handle the response from the server
         if (data.message === 'Organization added successfully') {
             alert('Organization registered successfully!');
             form.reset();  // Reset the form after successful submission
         } else {
             alert('Error: ' + data.message);
         }
     })
     .catch(error => {
         console.error('Error during submission:', error);
         alert('An error occurred while registering the organization.');
     });
 });