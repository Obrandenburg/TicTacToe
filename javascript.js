gameboard = (function(){
  newGame = document.getElementById('new_game');
  newGame.addEventListener('click',render);
  gameBoard = document.querySelector(".game_board");

  function render(){
    deleteChildNodes;
    gameArray = []
    i = 0;
    while (i < 9) {
      gameArray.push("");
      div = document.createElement('div');
      div.classList.add('gameCell');
      div.setAttribute('id', `${i}`);
      gameBoard.appendChild(div);
      i++;
      }
      return {gameArray}
    }; 
  
  function deleteChildNodes(gameBoard){
    if (gameBoard.hasChildNodes){
      gameBoard.removeChild(child);
    };
  }
  
  })();


function createPlayer(name) {
  name = this.name;

  function markSpot(marker){
    game = document.querySelector(".game");
    game.addEventListener('click', function(e){
      e.target.innerHTML = `${marker}`;
    })
  };

  return {name, markSpot}
}

lib = createPlayer("lib");
lib.markSpot('X');