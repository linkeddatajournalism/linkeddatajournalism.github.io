/**
 * Created by reinv on 10-11-2016.
 */
class LDJapp {
  bindLoadDataButton(buttonId, dataDivId) {
    $(`#${buttonId}`).click(() => {
      const data = $(`#${dataDivId}`).text();
      console.log(data);
    });
  }

  bindQueryButton(buttonId, yasqe) {
    $(`#${buttonId}`).click(() => {
      console.log(yasqe.getValue());
    });
  }
}

const ldjApp = new LDJapp();