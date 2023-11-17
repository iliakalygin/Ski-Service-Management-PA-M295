document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('SubmitButtonAnmeldung').addEventListener('click', insert);
});


function insert(event) {
    event.preventDefault();
    var name = document.getElementById("customerName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var priority = document.getElementById("priority").value;
    var service = document.getElementById("serviceType").value;

    var startDate = new Date();
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + parseInt(priority));




    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const endDateInGerman = endDate.toLocaleDateString('de-DE', options);
    
    var ergebnisAlert = document.getElementById('ergebnisAlert');
    ergebnisAlert.classList.add('alert-success');
    ergebnisAlert.innerHTML = `<h2>Vielen Dank, ${name}!</h2><br><p>Ihr Auftrag kann am <strong>${endDateInGerman}</strong> abgeholt werden.</p>`;
    ergebnisAlert.classList.remove('d-none');



    
    var data = {
        name: name,
        email: email,
        phone: phone,
        priority: priority,
        service: service,
        create_date: startDate.toISOString(),
        pickup_date: endDate.toISOString()
    };

    var data_post = {
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        priority: priority,
        serviceType: service,
        createDate: startDate.toISOString(),
        pickupDate: endDate.toISOString(),
        status: 'Offen'
    };
    
    
    fetch('http://localhost:5241/Order', {
    method: 'POST',
    body: JSON.stringify(data_post),y
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => finish(json))
    .catch((error) => console.error('Error:', error));



}



$(document).on('click', '.select-service-button', function() {
    const selectedService = $(this).data('service');
    localStorage.setItem('selectedService', selectedService);
    window.location.href = 'anmeldung.html';
});

document.addEventListener("DOMContentLoaded", function() {
    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
        $('#serviceType').val(selectedService);
    }
});