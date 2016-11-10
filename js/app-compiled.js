"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by reinv on 10-11-2016.
 */
var LDJapp = function () {
  function LDJapp() {
    _classCallCheck(this, LDJapp);
  }

  _createClass(LDJapp, [{
    key: "bindLoadDataButton",
    value: function bindLoadDataButton(buttonId, dataDivId) {
      $("#" + buttonId).click(function () {
        var data = $("#" + dataDivId).text();
        console.log(data);
      });
    }
  }, {
    key: "bindQueryButton",
    value: function bindQueryButton(buttonId, yasqe) {
      $("#" + buttonId).click(function () {
        console.log(yasqe.getValue());
      });
    }
  }]);

  return LDJapp;
}();

var ldjApp = new LDJapp();

//# sourceMappingURL=app-compiled.js.map