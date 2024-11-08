function openEventModal() {
    // Show the modal
    document.getElementById("addEvent-modal").style.display = "block";

    // Disable background scroll
    document.body.style.overflow = "hidden";
}

function closeEventModal() {
    // Hide the modal
    document.getElementById("addEvent-modal").style.display = "none";

    // Enable background scroll
    document.body.style.overflow = "auto";
}

document.addEventListener('DOMContentLoaded', () => {
    // Fetch organizations from the API and populate the select dropdown
    fetch('http://localhost:3000/api/getorganizations', {
        method: 'GET'
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(organizations => {
        const selectElement = document.getElementById('displayOrganizationsName');
        
        // Clear the existing options (in case of page reload)
        selectElement.innerHTML = '';

        // Add a default "Select Charity" option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select Charity';
        defaultOption.value = '';
        selectElement.appendChild(defaultOption);

        // Populate the select element with organizations
        organizations.forEach(org => {
            const option = document.createElement('option');
            option.value = org.organizationID; // Assuming the organizationID is the value to submit
            option.textContent = org.organizationName; // Display the organization's name
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error:', error);  // Catch and log any errors
    });
});

const eventForm = document.getElementById('eventRegistrationForm');

eventForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way

    // Gather form data individually
    const organizationID = document.getElementById('displayOrganizationsName').value;
    const nameOfEvent = document.getElementById('eventName').value;
    const descriptionOfEvent = document.getElementById('eventDescription').value;
    const location = document.getElementById('eventLocation').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const eventImage = document.getElementById('eventImagePoster').files[0];

    // Prepare the FormData object to send as multipart form data
    const formData = new FormData();
    formData.append('organizationID', organizationID);
    formData.append('nameOfEvent', nameOfEvent);
    formData.append('descriptionOfEvent', descriptionOfEvent);
    formData.append('location', location);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('status', 0);

    // Append file if it exists
    if (eventImage) {
        formData.append('imageOfEvent_posters', eventImage);
    }

    // Use fetch to send data to the server
    fetch('/api/addevent', {
        method: 'POST',
        body: formData, // Send form data (includes files)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        if (data.message === 'Event added successfully') {
            alert('Event added successfully!');
            eventForm.reset();  // Reset the form after successful submission
            window.location.reload();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during submission:', error);
        alert('An error occurred while registering the event.');
    });
});