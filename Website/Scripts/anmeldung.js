function submitForm(event) {
    event.preventDefault();

    const apiUrl = 'http://localhost:5241/Order';

    const currentDate = new Date().toISOString();

    const formData = {
        orderID: 0,
        customerName: document.getElementById('customerName').value,
        customerEmail: document.getElementById('email').value,
        customerPhone: document.getElementById('phone').value,
        priority: document.getElementById('priority').value,
        serviceType: document.getElementById('serviceType').value,
        createDate: currentDate, 
        pickupDate: currentDate,
        status: 'Offen',
        comment: ''
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Success:', data);
        // Erfolg behandeln - eventuell eine Erfolgsmeldung anzeigen
    })
    .catch((error) => {
        console.error('Error:', error);
        // Behandeln Sie hier Fehler, z. B. durch Anzeige einer Fehlermeldung
    });
}
