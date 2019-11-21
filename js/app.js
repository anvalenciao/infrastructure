'use strict';

// https://lengstorf.com/get-form-values-as-json/
(function () {
   new Router([
        new Route('home', 'home.html', true),            
        new Route('orderVehicle', 'orderVehicle.html')
    ]);
}());

// Slide Left
const $sidebarCollapse = document.getElementById('sidebarCollapse');
const $sidebar = document.getElementById('sidebar');
$sidebarCollapse.onclick = () => $sidebar.classList.toggle('active');

// Toggle Content
function toggleContentForm() {
  document.getElementById('table-json').classList.toggle('d-none');
  document.getElementById('form-json').classList.toggle('d-block');
  document.getElementById('btn-show-form').classList.toggle('d-none');
  document.getElementById('btn-show-content').classList.toggle('inline-block');
}

// Forms
function sendForm(that, f) {
    let data = Array.from(that.querySelectorAll('input, select, textarea'))
      .filter(element => element.name)
      .reduce((json, element) => {
          json[element.name] = element.type === 'checkbox' ? element.checked : element.value;
          return json;
      }, {});

    formAction[f](data);
    return false;
}

var formAction = {
  createVehicleOrder: function(data) {
    $loader.style.display = "block";
    data.vehicle = {
      "id": data.idVehicle,
      "tipoVehiculo": data.idTypeVehicle,
      "idzona": data.idZone
    };
    console.log(data);
    fetch("http://www.backendmantenimiento.somee.com/api/orders/create/vehicle", {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      $loader.style.display = "none";
      return res.json();
    })
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response);
      toggleContentForm();
      pageInit.orderVehicle();
    });
  }
};