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
var currentPlayer = 1;
function resetPlayerChoice() {
  $("#playerName").val("");
  $(".avatars").css('background-color', 'white');
  currentPlayer += 1;
  tempPlayer = "Player " + currentPlayer;
  $("#numPlayers").text(tempPlayer);
};

//hides selection div and reveals instruvtion div
function allCreated() {
  $("#avatar").hide();
  $("#instructions").show();
  $("#start").show();
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

    //hides instructions and reveals game
    function setupRace(i) {
      console.log("In Race Setup")
      $("#word").show();
      document.getElementById("word").focus();
      generateWords();
      $(".toType").text(gameWords[0]);
      $("#instructions").hide();
      $(".wordDisplay").show();
      $(".player").show();
      var playerAvatar = 'url("images/' + playerInfo[i].avatar + '.png")'
      $(".player").css({background: playerAvatar});
    }

    //game timer - IS NOT STOPPING THE OTHER FUNCTIONS FROM RUNNING
    // var timeoutID;
    // function timer(i) {
    //   timeoutID = window.setTimeout(checkEndRace, 3000, i)
    //   console.log("i = " + i);
    //   console.log(playerInfo[i]);
    // }



    // function checkEndRace(i) {
    //   console.log("in check end race - num players " + numPlayers);
    //   if (i < numPlayers - 1) {
    //     setupRace(i);
    //   }else {
    //     endRace(i);
    //   }
    // }

    //advances ship on correct typing
    function runRace() {
      console.log("In run race");
      var i = 0;
      while (i < playerInfo.length) {
        console.log("in run race loop");
        setupRace(i);
        //timer(i);


        //timer is skipping ahead to the next iteration, eventhough 
        //checkEndRace hasn't run yet
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
        i ++;
      };
    }

// ** END GAME FUNCTIONS ** \\

//hides race div and generates score
function endRace(i) {
  console.log("In end race");
  $(".wordDisplay").hide();
  $("#word").hide();
  alert("Times Up!");
  generateScore(i);
  generateWinMessage(i);
  if (i < playerInfo.length - 1) {
    return;

  } else {
  winDisplay();
  $("#endGame").show();
  $("#gameReset").show();
  }
}

function generateScore(i) {
  var tempScore = $(".player").css("left");
  tempScore = tempScore.slice(0, -2);
  tempScore = parseInt(tempScore) * 10;
  playerInfo[i].score.unshift(tempScore);
}

var currentScore = 0;
var winMessage = "";
function generateWinMessage(i) {
  currentScore = playerInfo[i].score[0];
  console.log(currentScore);
  if (currentScore > 3000 ){
    winMessage = "Holy nebula, " + playerInfo[i].name + "!!!! You're amazing!!!"
  }else if(currentScore > 1000){
    winMessage = "You're pretty good, " + playerInfo[i].name + "!"
  }else{
    winMessage = "Hmmm, you definetley need to keep playing this game. Keep at it " + playerInfo[i].name + "!"
  }
}

function winDisplay() {
  $("#winMessage").text(winMessage);
  var scoreMessage = currentScore + " Miles Traveled"
  $("#finalScore").text(scoreMessage);
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