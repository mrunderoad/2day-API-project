import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './js/api.js';

function clearFields() {
  $("input:radio[name=coin]:checked").val("");
}

function getElements(response) {
  if (response) {
    $('.showCoin').text(`The price of ${response[0].name} is ${response[0].price}.`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}

async function makeApiCall(coin) {
  const response = await CryptoService.getCrypto(coin);
  console.log(response[0].price);
  console.log(response[0].name);
  getElements(response);
}

$(document).ready(function() {
  $('#checkCrypto').click(function() {
    let coin = $("input:radio[name=coin]:checked").val();
    clearFields();
    makeApiCall(coin);
  });
});