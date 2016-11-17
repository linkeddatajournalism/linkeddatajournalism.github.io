/**
 * Created by reinv on 10-11-2016.
 */
'use strict';
const mimeType = 'text/turtle';

const journalismGraph = rdfstore.create((err, store) => {
  if (err) return console.error(err);
  return store;
});

class LDJapp {
  bindLoadDataButton(buttonId, dataDivId) {
    $(`#${buttonId}`).click(() => {
      $(`#${buttonId}`).text('Loading...');
      const data = $(`#${dataDivId}`).val();
      journalismGraph.load(mimeType, data, (err, numberOfTriples) => {
        if (err) {
          $(`#${buttonId}`).text('There was an error (see console log)');
          return console.error(err);
        }
        $(`#${buttonId}`).text(numberOfTriples + ' triples loaded!');
        console.log(numberOfTriples + ' triples loaded');
      });
    });
  }

  bindQueryButton(buttonId, yasqe) {
    $(`#${buttonId}`).click(() => {
      const sparqlQuery = yasqe.getValue();
      console.log(sparqlQuery);
      journalismGraph.execute(sparqlQuery, (status, results) => {
        console.log(status);
        if (results.length) {
          console.log(results);
        } else {
          alert('The query yielded no results');
        }
      });
    });
  }
}

const ldjApp = new LDJapp();