/**
 * Created by reinv on 10-11-2016.
 */
'use strict';
const mimeType = 'text/n3';

const journalismGraph = rdfstore.create((err, store) => {
  if (err) return console.error(err);
  return store;
});

class LDJapp {
  bindLoadDataButton(buttonId, dataDivId) {
    $(`#${buttonId}`).click(() => {
      const button = $(`#${buttonId}`);
      const data = $(`#${dataDivId}`).val();
      button.text('Loading...');

      journalismGraph.load(mimeType, data, (err, numberOfTriples) => {
        if (err) {
          button.text('There was an error (see console log)');
          return console.error(err);
        }
        button.text(numberOfTriples + ' triples loaded!');
        console.log(numberOfTriples + ' triples loaded');
      });
    });
  }

  bindQueryButton(buttonId, yasqe, yasr) {
    $(`#${buttonId}`).click(() => {
      const sparqlQuery = yasqe.getValue();
      console.log(sparqlQuery);
      journalismGraph.execute(sparqlQuery, (status, results) => {
        console.log(status);
        if (results.length) {
          $(`#${buttonId}`).text(`Query yielded ${results.length} results`);
          const sparqlJson = this.resultsToSPARQLJSON(results);
          console.log(sparqlJson);
          yasr.setResponse(sparqlJson);
        } else {
          alert('The query yielded no results');
        }
      });
    });
  }

  resultsToSPARQLJSON(rdfStoreResult) {
    const sparqlJSON = {};
    sparqlJSON.head = {
      link: [],
      vars: Object.keys(rdfStoreResult[0])
    };
    sparqlJSON.results = {
      distinct: false,
      ordered: false,
      bindings: rdfStoreResult.map(resultitem => {
        const transformedResult = resultitem;

        Object.keys(resultitem)
          .forEach(key => {
            transformedResult[key].type = this.mapType(transformedResult[key].token)
            delete transformedResult[key].token;
          });
        return transformedResult
      })
    };

    return JSON.stringify(sparqlJSON);
  }

  mapType(type) {
    const types = {
      uri: 'uri',
      literal: 'typed-literal'
    };
    return types[type];
  }
}

const ldjApp = new LDJapp();