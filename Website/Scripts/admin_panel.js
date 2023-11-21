function updateOrder(orderID) {
    // Sammelt die aktualisierten daten aus den Input-Feldern
    var updatedData = {
        orderID: orderID,
        customerName: document.querySelector(`#order-${orderID} .customer-name-input`).value,
        customerEmail: document.querySelector(`#order-${orderID} .customer-email-input`).value,
        customerPhone: document.querySelector(`#order-${orderID} .customer-phone`).value,
        priority: document.querySelector(`#order-${orderID} .priority`).value,
        serviceType: document.querySelector(`#order-${orderID} .service-type`).value,
        createDate: new Date(document.querySelector(`#order-${orderID} .create-date`).value).toISOString(),
        pickupDate: new Date(document.querySelector(`#order-${orderID} .pickup-date`).value).toISOString(),
        status: document.querySelector(`#order-${orderID} .status`).value,
        comment: document.querySelector(`#order-${orderID} .comment`).value
    };

    // Sendet die PUT-Anfrage
    fetch(`http://localhost:5241/Order/${orderID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (response.ok) {
            location.reload(); // Bei Erfolg ladet die Seite neu
        } else {
            throw new Error('Fehler beim Aktualisieren der Bestellung');
        }
    })
    .catch(error => {
        console.error('Fehler:', error);
        alert('Fehler beim Aktualisieren der Bestellung');
    });
}

function deleteOrder(orderID) {
        fetch(`http://localhost:5241/Order/${orderID}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                location.reload()
            } else {
                throw new Error('Fehler beim Löschen des Auftrags');
            }
        })
        .catch(error => {
            console.error('Fehler:', error);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    // API endpoint URL
    var apiUrl = 'http://localhost:5241/Order'; // Replace with the actual API URL

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(apiData => {
            var container = document.getElementById('data-container');
            container.className = 'container mt-4';

            // Check if apiData is an array and has items
            if (Array.isArray(apiData) && apiData.length) {
                apiData.forEach(function (item) {
                    // Create and append the card only if item has data
                    if (item && typeof item === 'object') {
                        var card = document.createElement('div');
                        card.className = 'card mb-3';

                        // Use a function to safely get the property or return a placeholder
                        function getPropertyOrDefault(obj, prop, defaultValue) {
                            return obj.hasOwnProperty(prop) ? obj[prop] : defaultValue;
                        }

                        // Use the function to safely format dates or return a placeholder
                        function formatDate(dateString) {
                            var date = new Date(dateString);
                            return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
                        }

                        card.innerHTML = `
                            <div id="order-${item.orderID}" class="card-header">
                                Name: <input type="text" class="form-control customer-name-input" value="${item.customerName}">
                            </div>
                            <div id="order-${item.orderID}" class="card-body">
                                <h4 class="card-title">${item.serviceType}</h4>
                                <p class="card-text">Email: <input type="email" class="form-control customer-email-input" value="${item.customerEmail}"></p>
                                <p class="card-text">Telefon: <input type="tel" class="form-control customer-phone" value="${item.customerPhone}"></p>
                                <p class="card-text">Priorität: <input type="text" class="form-control priority" value="${item.priority}"></p>
                                <p class="card-text">Dienstleistung: <input type="text" class="form-control service-type" value="${item.serviceType}"></p>
                                <p class="card-text">Erstellungsdatum: <input type="date" class="form-control create-date" value="${new Date(item.createDate).toISOString().split('T')[0]}"></p>
                                <p class="card-text">Abholdatum: <input type="date" class="form-control pickup-date" value="${new Date(item.pickupDate).toISOString().split('T')[0]}"></p>
                                <p class="card-text">Status: (Offen, InArbeit, Abgeschlossen)<input type="text" class="form-control status" value="${item.status}"></p>
                                <p class="card-text">Kommentar: <input type="text" class="form-control comment" value="${item.comment}"></p>
                                <button class="btn btn-danger" onclick="deleteOrder(${item.orderID})">Delete</button>
                                <button class="btn btn-primary" onclick="updateOrder(${item.orderID})">Update</button>
                            </div>
                        `;
                        container.appendChild(card);
                    }
                });
            } else {
                // Handle the case where apiData is not an array or is empty
                container.innerText = 'No data available.';
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der API-Daten:', error);
            // Display the error message to the user
            var container = document.getElementById('data-container');
            container.innerHTML = `<h3>No data available.</h3>
                                <style>
                                    h3 {
                                    text-align: center;
                                    margin: 10%;
                                    }
                                </style>`;
        });
});