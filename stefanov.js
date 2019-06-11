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