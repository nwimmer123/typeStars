
var numPlayers = 0;
var currentPlayer = 1;
var id = "spaceship1";
var playerCounter = 1; 

$(document).ready(function(){

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

var timeoutID;
function timer() {
  timeoutID = window.setTimeout(endRace, 45000)
}

function endRace() {
  $(".wordDisplay").hide();
  $("#word").hide();
  alert("Times Up!");
  generateScore();
  generateWinMessage();
  winDisplay();
  $("#endGame").show();
  $("#gameReset").show();
}

function generateScore() {
  var tempScore = $(".player").css("left");
  tempScore = tempScore.slice(0, -2);
  tempScore = parseInt(tempScore) * 10;
  playerInfo[0].score.unshift(tempScore);
}

var currentScore = 0;
var winMessage = "";
function generateWinMessage() {
  currentScore = playerInfo[0].score[0];
  console.log(currentScore);
  if (currentScore > 3000 ){
    winMessage = "Holy nebula, " + playerInfo[0].name + "!!!! You're amazing!!!"
  }else if(currentScore > 1000){
    winMessage = "You're pretty good, " + playerInfo[0].name + "!"
  }else{
    winMessage = "Hmmm, you definetley need to keep playing this game. Keep at it " + playerInfo[0].name + "!"
  }
}

function winDisplay() {
  $("#winMessage").text(winMessage);
  var scoreMessage = currentScore + " Miles Traveled"
  $("#finalScore").text(scoreMessage);
}

function createAvatarId() {
  id = $(this).attr("id");
  $(this).css('background-color', 'yellow');
};

  //BUG: If you change your mind and click a different 
  //ship then the yellow background remains on the prior 
  //selection, however, it does selcet the correct one 
  //anyways


function playerSelector() {
  if ($("#playerCount").val() > 4) {
    $(lowerIntro).text("Please enter a number less then 5");
  } else if ($("#playerCount").val() < 1) {
    $(lowerIntro).text("Please enter a number greater then 0");
  } else {
    numPlayers = $("#playerCount").val();
    $("#intro").hide();
    $("#avatar").show();
    // tempPlayer = "Player " + currentPlayer;
    // $("#numPlayers").text(tempPlayer);
    // console.log(numPlayers);
  }
};

var tempPlayer = "Player 1";
function multiPlayerCreation() { 
  if (playerCounter < numPlayers) {
    console.log("pc" + playerCounter);
    console.log("np" + numPlayers)
    createPlayer();
    playerCounter += 1;
    resetPlayerChoice();
    
  } else {
    createPlayer();
    allCreated();
  }
};


function resetPlayerChoice() {
  $("#playerName").val("");
  $(".avatars").css('background-color', 'white');
  currentPlayer += 1;
  tempPlayer = "Player " + currentPlayer;
  $("#numPlayers").text(tempPlayer);
};

function allCreated() {
  $("#avatar").hide();
  $("#instructions").show();
  $("#start").show();
  console.log(playerInfo);
};

var playerInfo = [];
function createPlayer () {
  playerInfo.push({
    player_id: tempPlayer, 
    name: $("#playerName").val(),
    avatar: id,
    score:[],
  });
};

function setupRace() {
  $("#word").show();
  document.getElementById("word").focus();
  generateWords();
  $(".toType").text(gameWords[0]);
  $("#instructions").hide();
  $(".wordDisplay").show();
  $(".player").show();
  var playerAvatar = 'url("images/' + playerInfo[0].avatar + '.png")'
  $(".player").css({background: playerAvatar});
}

function runRace() {
  setupRace();
  timer();
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
