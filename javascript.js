const gameboard = (function(){
  gameArray = [];
  winner = null;
  winAlert = document.getElementById('winner')
  game = document.querySelector('.game');
  arrNum = 'h';
  winAnnounce = document.querySelector('.winner');
  
  function render(){
    winAnnounce.classList.remove('visible')
    gameboard.winner = null;
    deleteChildNodes();
    gameboard.gameArray = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
    i = 0;
    display();
    console.log(`${this.gameArray[0]} ${this.gameArray[1]} ${this.gameArray[2]}
               \n ${this.gameArray[3]} ${this.gameArray[4]} ${this.gameArray[5]}
               \n ${this.gameArray[6]} ${this.gameArray[7]} ${this.gameArray[8]}`);
  };
  
  function deleteChildNodes(){
    while(game.firstChild){
      game.removeChild(game.lastChild)
    }
  };
 
  function display(){
    n = 0; 
    gameboard.gameArray.forEach((item)=>{
      div = document.createElement('div');
      div.setAttribute('id', `${n}`);
      div.classList.add('gameCell');
      game.appendChild(div);
      n++
    })
  }
  
  return{gameArray, render, winner, winAlert, arrNum, game}
})();


function createPlayer(name, marker){
  this.name = name;
  this.marker = marker;
  isturn = false;
  return{name, marker, isturn}
};


function markSpot(n = null){
  if (n != null){
    checkTurn();
    gameboard.gameArray.splice(`${n-1}`, 1, `${current_player}`);
    console.log(`${gameboard.gameArray[0]} ${gameboard.gameArray[1]} ${gameboard.gameArray[2]}
               \n ${gameboard.gameArray[3]} ${gameboard.gameArray[4]} ${gameboard.gameArray[5]}
               \n ${gameboard.gameArray[6]} ${gameboard.gameArray[7]} ${gameboard.gameArray[8]}`);
  }
  else if (n == null) {
    checkTurn();
    if (gameboard.arrNum != "h"){
      gameboard.gameArray.splice(`${gameboard.arrNum}`, 1, `${current_player}`);
      document.getElementById(`${gameboard.arrNum}`).innerHTML = `${current_player}`;
    }
  }
};


function checkTurn(){
  console.log('check works')
  current_player = 'h';
  if (player_one.isturn){ 
    current_player = (player_one.marker);
    player_one.isturn = false;
    player_two.isturn = true;
  }
  else if (player_two.isturn){
    current_player = (player_two.marker);
    player_two.isturn = false;
    player_one.isturn = true;
  }
  return{current_player}
};

function checkWinner(){
  console.log('winner?')
  if(gameboard.gameArray[0] == gameboard.gameArray[1] && gameboard.gameArray[1] == gameboard.gameArray[2]){
    if(gameboard.gameArray[0] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[0] == "O") gameboard.winner = player_two.name;
  }
  else if(gameboard.gameArray[3] == gameboard.gameArray[4] && gameboard.gameArray[4] == gameboard.gameArray[5]){
    if(gameboard.gameArray[3] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[3] == "O") gameboard.winner = player_two.name;
  }
  else if(gameboard.gameArray[6] == gameboard.gameArray[7] && gameboard.gameArray[7] == gameboard.gameArray[8]){
    if(gameboard.gameArray[6] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[6] == "O") gameboard.winner = player_two.name;
  }
  else if(gameboard.gameArray[0] == gameboard.gameArray[3] && gameboard.gameArray[3] == gameboard.gameArray[6]){
    if(gameboard.gameArray[0] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[0] == "O") gameboard.winner = player_two.name;
  }
  else if(gameboard.gameArray[1] == gameboard.gameArray[4] && gameboard.gameArray[4] == gameboard.gameArray[7]){
    if(gameboard.gameArray[1] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[1] == "O") gameboard.winner = player_two.name;
  }
  else if(gameboard.gameArray[2] == gameboard.gameArray[5] && gameboard.gameArray[5] == gameboard.gameArray[8]){
    if(gameboard.gameArray[2] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[2] == "O") gameboard.winner = player_two.name;
  }
  else if(gameboard.gameArray[0] == gameboard.gameArray[4] && gameboard.gameArray[4] == gameboard.gameArray[8]){
    if(gameboard.gameArray[0] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[0] == "O") gameboard.winner = player_two.name;
  }
  else if(gameboard.gameArray[2] == gameboard.gameArray[4] && gameboard.gameArray[4] == gameboard.gameArray[6]){
    if(gameboard.gameArray[2] == "X") gameboard.winner = player_one.name; 
    if(gameboard.gameArray[2] == "O") gameboard.winner = player_two.name;
  }
  else if(!gameboard.gameArray.includes('-') && gameboard.win == false){
    gameboard.winner = 'Tie'
  }
};

function clickable(e){
  gameboard.arrNum = e.target.id;
  this.removeEventListener('click', clickable); 
  markSpot();
  checkWinner();

  if (gameboard.winner != null){
    winAnnounce.classList.add('visible');
    winAnnounce.innerHTML = `Winner: ${gameboard.winner}! Please select Start New Game to play again`;
    gameCell.forEach((cell) =>cell.removeEventListener('click', clickable)); 
  }
}

function gameManager(){
  gameCell.forEach((cell) => cell.addEventListener('click', clickable))
}

function playGame(){
  gameboard.render();
  gameCell = document.querySelectorAll('.gameCell');
  player_one = createPlayer("Player One", "X");
  player_two = createPlayer("Player Two", "O");
  player_one.isturn = true;
  gameManager();
};

btn = document.querySelector('.newGame');
btn.addEventListener('click', playGame)


