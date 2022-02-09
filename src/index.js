import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './js/api.js';

function clearFields() {
  $("input:radio[name=coin]:checked").val("");
  $("#user-amount").val("");
}

function getElements(outputUSD, outputCrypto, userYear, userAmt, userCoin) {
  $('.showCoin').text(`Today, the ${userAmt}$ you had in ${userYear} is worth ${outputUSD}$. You could buy ${outputCrypto} ${userCoin} with that!`);
}

async function makeApiCall(userCoin, outputUSD, userAmt, userYear) {
  const response = await CryptoService.getCrypto(userCoin);
  const outputCrypto = outputUSD/response[0].price;
  getElements(outputUSD, outputCrypto, userYear, userAmt, userCoin);
  }

$(document).ready(function() {
  $('#checkCrypto').click(function() {
    let userCoin = $("input:radio[name=coin]:checked").val();
    let userAmt = parseFloat($("#user-amount").val());
    let userYear = 2000;
    clearFields();
    let outputUSD = userAmt;
    makeApiCall(userCoin, outputUSD, userAmt, userYear)
  });
});