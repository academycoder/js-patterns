function InputModel(text) {
  var _text = text || '';

  this.getValue = function () {
    return _text;
  }

  this.setValue = function(value) {
    _text = value;
  }
};

function InputView() {
  var textField,
      panel;

  function init() {
    textField = document.querySelector('.control');
    panel = document.querySelector('.panel');
  }

  var View = {
    getTextField: function () {
      return textField;
    },

    getPanel: function () {
      return panel;
    },

    // setModel: function (model) {
    //   panel.innerHTML = model.getValue();
    // },

    addInputHandler: function (handler) {
      textField.addEventListener('input', function () {
        var content = textField.value;
        handler(content);
      }, false);
    },

    innerContent: function(content) {
      panel.innerHTML = content;
    }
  };

  init();
  return View;
}

function InputPresenter(_view, _model) {
  var view,
      model;

  function init() {
    view = _view;
    model = _model;
    view.addInputHandler(function (content) {
      model.setValue(content);
      view.innerContent(model.getValue());
    })
  };

  var Presenter = {
    getView: function () {
      return view;
    },

    // setModel: function (_model) {
    //   model = _model;
    //   view.setModel(model);
    // }
  };

  init();
  return Presenter;
};

var Imodel = new InputModel('hello'),
    Ivew = InputView(),
    IPresenter = InputPresenter(Ivew, Imodel);
// IPresenter.setModel(Imodel);