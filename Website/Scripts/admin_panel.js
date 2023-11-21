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
    var apiUrl = 'http://localhost:5241/Order';

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

            // Prüfen, ob apiData ein Array ist und Elemente hat
            if (Array.isArray(apiData) && apiData.length) {
                apiData.forEach(function (item) {
                    // Erstellen und Anhängen der Karte nur, wenn das Element Daten enthält
                    if (item && typeof item === 'object') {
                        var card = document.createElement('div');
                        card.className = 'card mb-3';

                        // Verwenden Sie eine Funktion zum sicheren Abrufen der Eigenschaft oder geben Sie einen Platzhalter zurück
                        function getPropertyOrDefault(obj, prop, defaultValue) {
                            return obj.hasOwnProperty(prop) ? obj[prop] : defaultValue;
                        }

                        // Verwenden Sie die Funktion, um Datumsangaben sicher zu formatieren oder einen Platzhalter zurückzugeben
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
                // Behandlung des Falls, dass apiData kein Array ist oder leer ist
                container.innerHTML = `<h3>No data available.</h3>
                                    <style>
                                        h3 {
                                        text-align: center;
                                        margin: 10%;
                                        }
                                    </style>`;
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der API-Daten:', error);
            // Anzeige der Fehlermeldung an den Benutzer
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