'use strict';

// Loading
const $loader = document.getElementById("loader");

// Form
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
  login: function(data) {
    $loader.style.display = "block";
    console.log(data);
    //$loader.style.display = "none";

    fetch("https://recaudosmultimodal.herokuapp.com/recaudo/card/" + data.cardNumber, {
      method: 'GET', // or 'PUT'
      /*body: JSON.stringify(data), // data can be `string` or {object}!*/
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      $loader.style.display = "none";
      return res.json();
    })
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', response);
    });
  }
};

function card() {

}