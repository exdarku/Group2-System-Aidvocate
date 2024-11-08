function showDonationForm() {
    // Show the modal
    document.getElementById("addDonation-modal").style.display = "block";

    // Disable background scroll
    document.body.style.overflow = "hidden";
}

function closeDonationForm() {
    // Hide the modal
    document.getElementById("addDonation-modal").style.display = "none";

    // Enable background scroll
    document.body.style.overflow = "auto";
}