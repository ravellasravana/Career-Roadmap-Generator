// frontend/script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'generator.html';
        } else {
            alert(data.message);
        }
    });
});

document.getElementById('generateForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const salaryRange = document.getElementById('salaryRange').value;
    const designation = document.getElementById('designation').value;
    const company = document.getElementById('company').value;

    fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ salaryRange, designation, company })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultContainer').innerHTML = JSON.stringify(data, null, 2);
    });
}); 
// frontend/script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'generator.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    });
});
