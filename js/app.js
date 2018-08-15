var Furry=require('./furry.js');
var Coin=require('./coin.js');

function Game(){
  this.board = document.querySelectorAll('#board div');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0; 
  var self = this;
this.startGame = function(){
  this.idSetInterval = setInterval(function(){
    self.moveFurry();
  },250);
}
  
  this.index = function(x,y) {
  return x + (y * 10);
}
  this.showFurry=function() {
  this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
}
this.showCoin= function() {
  this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
  }
this.moveFurry = function(){
  this.hideVisibleFurry();
  if(this.furry.direction === 'right'){
    this.furry.x += 1;
  }else if (this.furry.direction === 'left'){
    this.furry.x -= 1;
  }else if (this.furry.direction === 'up'){
    this.furry.y += 1;
  }else if (this.furry.direction === 'down'){
    this.furry.y -= 1;
  }
  this.gameOver();
  this.showFurry();
  this.checkCoinCollision();
  
}

this.hideVisibleFurry = function(){
  var hiddenFurry = document.querySelector('.furry');
  hiddenFurry.classList.remove('furry');
}
this.furryDirection = function(event){
  switch (event.which) {
  case 37:
    this.furry.direction = 'left';
    break;
  case 39: //zmiana
    this.furry.direction = 'right';
    break;
  case 38: //zmiana
    this.furry.direction = 'down';
    break;
  case 40:
    this.furry.direction = 'up';
    break;
  }
}

document.addEventListener('keydown',function(event){
  self.furryDirection(event);
});

  this.checkCoinCollision = function(){
    if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
      this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
      this.score +=1;
      var scorebox = document.querySelector('#score strong');
      scorebox.innerText = this.score;
      this.coin = new Coin();
      this.showCoin();
    }
  }
  
  this.gameOver = function(){
    if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
      clearInterval(this.idSetInterval);
      var over= document.getElementById('over');
    over.classList.remove('invisible');
    var score=document.querySelector('.endScore');
    var strong=document.querySelector('strong')
    score.textContent=strong.textContent;
      this.hideVisibleFurry();
    }
  }
}

var game = new Game()
  game.showFurry();
  game.showCoin();
  game.startGame();


module.exports = Game;