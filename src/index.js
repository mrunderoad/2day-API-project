import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CryptoService from './js/api.js';

function clearFields() {
  $("input:radio[name=coin]:checked").val("");
  // $("#user-amount").val("");
}

// let refreshInfo = new Promise(function(resolve, reject) {
//   if (outputCrypto != undefined) {
//     resolve
//   }
// })

// refreshInfo.then(function() {

// })

function getElements(outputUSD, outputCrypto, userYear, userAmt, userCoin) {
  $('.showCoin').text(`Today, the ${userAmt}$ you had in ${userYear} is worth ${outputUSD}$. You could buy ${outputCrypto} ${userCoin} with that!`);
}

async function makeApiCall(userCoin) {
  const response = await CryptoService.getCrypto(userCoin);
  const rate = response[0].price;
  console.log("makeAPI" + rate);
  return rate;
}

// async function makeSecondCall() {
  
// }

$(document).ready(function() {
  $('#checkCrypto').click(function() {
    (async function() {
      let userCoin = $("input:radio[name=coin]:checked").val();
      let userAmt = parseFloat($("#user-amount").val());
      let userYear = 2000;
      clearFields();
      let outputUSD = userAmt;
      let rate = await makeApiCall(userCoin);
      let outputCrypto = userAmt/rate;
      console.log(rate);
      getElements(outputUSD, outputCrypto, userYear, userAmt, userCoin);
    });
  });
});
