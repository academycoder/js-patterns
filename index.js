// Издатель
var paper = {
  daily: function () {
    this.publish('big news today');
  },

  monthly: function () {
    this.publish('interesting analysis', 'monthly');
  }
};

makePublisher(paper);

//Подписчик
var joe = {
  drinkCoffee: function (paper) {
    console.log('Just read ' + paper);
  },

  sundayPreNap: function (monthly) {
    console.log('About to sleep to fall that ' + monthly);
  }
};

paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
paper.monthly();

var App = (function (App) {

  App.Model = function () {
    var that = this,
        value = '';

    this.getValue = function () {
      return value;
    }

    this.setValue = function (val) {
      value = val;
      this.publish(value);
    }
  };

  App.View = function (textField, panel) {
    this.textField = document.getElementById(textField);
    this.panel = document.getElementById(panel);
    var that = this;

    this.updatePanel = (value) => {
      this.panel.innerHTML = value;
    };
  };

  App.Controller = function (model, view) {

    view.textField.addEventListener('input', function () {
      model.setValue(this.value);
    }, false);
  };

  return App;
}(App || {}));

var model = new App.Model(),
    view = new App.View('textField', 'panel');
makePublisher(model);
model.subscribe(view.updatePanel);
var controller = new App.Controller(model,view);