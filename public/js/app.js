import 'bootstrap/dist/css/bootstrap.min.css';
// import * as sjcl from "sjcl";
import $ from "jquery";

require("../css/main.css");

function hex(buffer) {
  var digest = ''
  var view = new DataView(buffer)
  for(var i = 0; i < view.byteLength; i += 4) {
    var value = view.getUint32(i)
    var stringValue = value.toString(16)
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    digest += paddedValue
  }

  return digest
}

function successMessage(hash, time) {
  $("#error").hide();
  $("#hash").html(hash);
  $("#time").html(time);
  $("#success").show();
}

function errorMessage() {
  $("#success").hide();
  $("#error").show();
}

$(function() {
  $("button").click(() => {
    // Start hashing
    var t0 = performance.now();
    var file = document.getElementById("file").files[0];
    if (!file) {
      errorMessage();
      return;
    }
    var fr = new FileReader();
    fr.onload = function(event) {
      var bytes = new Uint8Array(event.target.result);
      crypto.subtle.digest("SHA-256", bytes ).then(function (hash) {
        var t1 = performance.now();
        successMessage(hex(hash), Math.round(t1 - t0))
      });

    }
    fr.readAsArrayBuffer(file);
  })
})
