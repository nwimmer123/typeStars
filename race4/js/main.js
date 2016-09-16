$(document).ready(function(){
  
  //set default name for Create Player div 
  $("#numPlayers").text(tempPlayer);

  //hide elements
  $(".wordDisplay").hide();
  $("#instructions").hide();
  $("#word").hide();
  $(".player").hide();
  $("#gameReset").hide();
  $("#avatar").hide();
  
  //START RACE button
  $("#start").on("click", function() {
    runRace();
  })

  //RESET button
	$("#reset").on("click", function() {
		$(".player").css({left: 0,});
    $("#endGame").hide();
    $("#gameReset").hide();
    runRace();
	});

  //player selector
  $("#playerCountBtn").on("click", playerSelector);

  //select avatar
  $(".avatars").on("click", createAvatarId);

  //Player creation
  $("#submitPlayer").on("click", multiPlayerCreation);

});

//sets number of players for the game and error check bad input
var numPlayers = 0;
function playerSelector() {
  if ($("#playerCount").val() > 4) {
    $(lowerIntro).text("Please enter a number less then 5");
  } else if ($("#playerCount").val() < 1) {
    $(lowerIntro).text("Please enter a number greater then 0");
  } else {
    numPlayers = $("#playerCount").val();
    $("#intro").hide();
    $("#avatar").show();
  }
};

// ** PLAYER CREATION FUNCTIONS ** \\

var playerCounter = 1;
var tempPlayer = "Player 1";
function multiPlayerCreation() { 
  if (playerCounter < numPlayers) {
    createPlayer();
    playerCounter += 1;
    resetPlayerChoice();
  } else {
    createPlayer();
    allCreated();
  }
};

//sets players avatar
var id = "spaceship1";
function createAvatarId() {
  $(".avatars").css('background-color', 'white');
  id = $(this).attr("id");
  $(this).css('background-color', 'yellow');
};

//creates individual player object
var playerInfo = [];
function createPlayer () {
  playerInfo.push({
    player_id: tempPlayer, 
    name: $("#playerName").val(),
    avatar: id,
    score:[],
  });
};

//clears player creation div
var currentPlayerNum = 1;
function resetPlayerChoice() {
  $("#playerName").val("");
  $(".avatars").css('background-color', 'white');
  currentPlayerNum += 1;
  tempPlayer = "Player " + currentPlayerNum;
  $("#numPlayers").text(tempPlayer);
};

//hides selection div and reveals instruvtion div
var currentPlayer = 0
function allCreated() {
  $("#avatar").hide();
  $("#instructions").show();
  $("#start").show();
  $("#instructionsName").text(playerInfo[currentPlayer].name);
  console.log(playerInfo);
};

// ** WORD ARRAY CREATOR FUNCTIONS ** \\

//randomize word array order
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//populate array w different words for each game
var gameWords = [];
function generateWords() {
  shuffle(words);
  for(var i = 0; i < 50; i ++) {
    gameWords.push(words[i]);
   }
}

    // ** RUNNING GAME FUNCTIONS ** \\

var currentPlayer = 0
function checkMorePlayer() {
  currentPlayer += 1;
  console.log("currentPlayer: " + currentPlayer);
  console.log("cp stats: " + playerInfo[currentPlayer]);
  if (currentPlayer < currentPlayerNum) {
    allCreated();
  }else {
    currentPlayer -= 1;
    checkMultiPlayer();
  }
}

function checkMultiPlayer() {
  console.log("numPlayers: " + numPlayers);
  if (numPlayers === 1) {
    winDisplay();
  } else {
    winConditions();
  }

}

//hides instructions and reveals game
function setupRace() {
  console.log("In Race Setup");
  $("#word").show();
  document.getElementById("word").focus();
  generateWords();
  $(".toType").text(gameWords[0]);
  $("#instructions").hide();
  $(".wordDisplay").show();
  $(".player").show();
  var playerAvatar = 'url("images/' + playerInfo[currentPlayer].avatar + '.png")'
  $(".player").css({background: playerAvatar});
  timer();
}

//game timer - IS NOT STOPPING THE OTHER FUNCTIONS FROM RUNNING
var timeoutID;
function timer() {
  timeoutID = window.setTimeout(endRace, 5000)
}

//advances ship on correct typing
function runRace() {
  console.log("In run race");
  setupRace();
  var j = 1;
  $(document).keyup(function(e){
    var targetWord = $(".toType").text();
    var typedWord = $("#word").val();
    while (j < gameWords.length){
      if(typedWord === targetWord){
        $(".player").css({left: "+=15px",});
        targetWord = $(".toType").text(gameWords[j]);
        $("#word").val("");
        j++;
      }else {
        return
      };
    }
  });
}

// ** END GAME FUNCTIONS ** \\

//hides race div and generates score
//this could be refactred, as many parts of it don't need 
//to run in a multiplayer game, but it runs every time anyways
function endRace() {
  console.log("In end race");
  $(".wordDisplay").hide(); //not needed in multiplayer
  $("#word").hide(); //not needed in multiplayer
  alert("Times Up!");
  generateScore();
  generateWinMessage(); //not needed in multiplayer
  checkMorePlayer();
}

function generateScore() {
  var tempScore = $(".player").css("left");
  tempScore = tempScore.slice(0, -2);
  tempScore = parseInt(tempScore) * 10;
  playerInfo[currentPlayer].score.unshift(tempScore);
}

var currentScore;
var winMessage;
function generateWinMessage() {
  currentScore = playerInfo[currentPlayer].score[0];
  console.log(currentScore);
  if (currentScore > 3000 ){
    winMessage = "Holy nebula, " + playerInfo[currentPlayer].name + "!!!! You're amazing!!!"
  }else if(currentScore > 1000){
    winMessage = "You're pretty good, " + playerInfo[currentPlayer].name + "!"
  }else{
    winMessage = "Hmmm, you definetley need to keep playing this game. Keep at it " + playerInfo[currentPlayer].name + "!"
  }
}

function winDisplay() {
  $("#endGame").show();
  $("#gameReset").show();
  $("#winMessage").text(winMessage);
  var scoreMessage = currentScore + " Miles Traveled"
  $("#finalScore").text(scoreMessage);
}

//check to see who has the highest score
function winConditions() {
  console.log("playerInfo.length: " + playerInfo.length);
  var winner;
  var bestScore;
  for (var i = 0; i < playerInfo.length - 1; i++) {

      if (playerInfo[i].score > playerInfo[i + 1]) {
        winner = playerInfo[i].name;
        bestScore = playerInfo[i].score[0];
      } else {
        winner = playerInfo[i].name;
        bestScore = playerInfo[i].score[0];
      }
  };
  multiWinDisplay(winner, bestScore);
}

function multiWinDisplay(winner, bestScore) {
  $("#gameReset").show();
  var winMessage = "Good job " + winner + "! You outflew your competition and went " + bestScore + "miles!";
  $("#winMessage").text(winMessage);
}


//BACK UP SINGLE PLAYER WORKING RUN RACE FUNCTION
// function runRace() {

//   setupRace();
//   timer();
//   var j = 1;
//   $(document).keyup(function(e){
//     var targetWord = $(".toType").text();
//     var typedWord = $("#word").val();
//     while (j < gameWords.length){
//       if(typedWord === targetWord){
//         $(".player").css({left: "+=15px",});
//         targetWord = $(".toType").text(gameWords[j]);
//         $("#word").val("");
//         j++;
//       }else {
//         return
//       };
//     }
//   });

// }