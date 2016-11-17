/**
 * Created by reinv on 10-11-2016.
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mimeType = 'text/n3';

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
        var button = $('#' + buttonId);
        var data = $('#' + dataDivId).val();
        button.text('Loading...');

        journalismGraph.load(mimeType, data, function (err, numberOfTriples) {
          if (err) {
            button.text('There was an error (see console log)');
            return console.error(err);
          }
          button.text(numberOfTriples + ' triples loaded!');
          console.log(numberOfTriples + ' triples loaded');
        });
      });
    }
  }, {
    key: 'bindQueryButton',
    value: function bindQueryButton(buttonId, yasqe, yasr) {
      var _this = this;

      $('#' + buttonId).click(function () {
        var sparqlQuery = yasqe.getValue();
        console.log(sparqlQuery);
        journalismGraph.execute(sparqlQuery, function (status, results) {
          console.log(status);
          if (results.length) {
            $('#' + buttonId).text('Query yielded ' + results.length + ' results');
            var sparqlJson = _this.resultsToSPARQLJSON(results);
            console.log(sparqlJson);
            yasr.setResponse(sparqlJson);
          } else {
            alert('The query yielded no results');
          }
        });
      });
    }
  }, {
    key: 'resultsToSPARQLJSON',
    value: function resultsToSPARQLJSON(rdfStoreResult) {
      var _this2 = this;

      var sparqlJSON = {};
      sparqlJSON.head = {
        link: [],
        vars: Object.keys(rdfStoreResult[0])
      };
      sparqlJSON.results = {
        distinct: false,
        ordered: false,
        bindings: rdfStoreResult.map(function (resultitem) {
          var transformedResult = resultitem;

          Object.keys(resultitem).forEach(function (key) {
            transformedResult[key].type = _this2.mapType(transformedResult[key].token);
            delete transformedResult[key].token;
          });
          return transformedResult;
        })
      };

      return JSON.stringify(sparqlJSON);
    }
  }, {
    key: 'mapType',
    value: function mapType(type) {
      var types = {
        uri: 'uri',
        literal: 'typed-literal'
      };
      return types[type];
    }
  }]);

  return LDJapp;
}();

var ldjApp = new LDJapp();

//# sourceMappingURL=app-compiled.js.map