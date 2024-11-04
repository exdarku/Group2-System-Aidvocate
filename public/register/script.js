document.getElementById('registerButton').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password, firstName, lastName})
        })

        const data = await response.json();
        if (response.ok){
            alert("User registered successfully");
        } else {
            alert("There has been an error. Please try again later.");
        }
    } catch (error) {
        alert("Error: " + error);
    }
})