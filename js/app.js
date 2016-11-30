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
  getData(fileURLs) {
    fileURLs.forEach(file => {
      $.get(file, data => this.loadData(data));
      console.log(`Loading ${file}`);
    });
  }

  loadData(data) {
    alert('The data will now load. This will take a few seconds, I\'ll tell you when I\'m done');
    journalismGraph.load(mimeType, data, (err, numberOfTriples) => {
      if (err) {
        console.log(`There was error ${err}`);
        alert('There was an error loading the data');
        return console.stack;
      }
      console.log(numberOfTriples + ' triples loaded');
      alert('The data was loaded successfully');
    });

  }

  bindLoadDataButton(buttonId, dataDivId) {
    $(`#${buttonId}`).click(() => {
      const button = $(`#${buttonId}`);
      const data = $(`#${dataDivId}`).val();
      button.text('Loading...');
    });
  }

  bindQueryButton(buttonId, yasqe, yasr) {
    $(`#${buttonId}`).click(() => {
      const sparqlQuery = yasqe.getValue();
      journalismGraph.execute(sparqlQuery, (status, results) => {
        console.log(status);
        if (!results) {
          alert(status);
          return console.error(status);
        }
        if (results.length) {
          $(`#${buttonId}`).text(`Query yielded ${results.length} results`);
          console.log(results);
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
            if (transformedResult[key]) {
              transformedResult[key].type = this.mapType(transformedResult[key].token);
              if (parseFloat(transformedResult[key].value) || parseFloat(transformedResult[key].value) === 0) {
                  transformedResult[key].datatype = 'http://www.w3.org/2001/XMLSchema#double';
              }
              delete transformedResult[key].token;
            } else {
              delete transformedResult[key];
            }
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