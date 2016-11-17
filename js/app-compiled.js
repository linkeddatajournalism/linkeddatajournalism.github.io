/**
 * Created by reinv on 10-11-2016.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mimeType = 'text/turtle';

var journalismGraph = rdfstore.create(function (err, store) {
  if (err) return console.error(err);
  return store;
});

var LDJapp = function () {
  function LDJapp() {
    _classCallCheck(this, LDJapp);
  }

  _createClass(LDJapp, [{
    key: 'bindLoadDataButton',
    value: function bindLoadDataButton(buttonId, dataDivId) {
      $('#' + buttonId).click(function () {
        $('#' + buttonId).text('Loading...');
        var data = $('#' + dataDivId).val();
        journalismGraph.load(mimeType, data, function (err, numberOfTriples) {
          if (err) {
            $('#' + buttonId).text('There was an error (see console log)');
            return console.error(err);
          }
          $('#' + buttonId).text(numberOfTriples + ' triples loaded!');
          console.log(numberOfTriples + ' triples loaded');
        });
      });
    }
  }, {
    key: 'bindQueryButton',
    value: function bindQueryButton(buttonId, yasqe) {
      $('#' + buttonId).click(function () {
        var sparqlQuery = yasqe.getValue();
        console.log(sparqlQuery);
        journalismGraph.execute(sparqlQuery, function (status, results) {
          console.log(status);
          if (results.length) {
            console.log(results);
          } else {
            alert('The query yielded no results');
          }
        });
      });
    }
  }]);

  return LDJapp;
}();

var ldjApp = new LDJapp();

//# sourceMappingURL=app-compiled.js.map