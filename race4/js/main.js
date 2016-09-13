var playerInfo = [];
var currentScore = 0;
var tempPlayer = "";

$(document).ready(function(){

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
  var numPlayers = 0;
  var currentPlayer = 1;
  $("#playerCountBtn").on("click", function() {
    if ($("#playerCount").val() > 4) {
      $(lowerIntro).text("Please enter a number less then 5");
    } else if ($("#playerCount").val() < 1) {
      $(lowerIntro).text("Please enter a number greater then 0");
    } else {
      numPlayers = $("#playerCount").val();
      $("#intro").hide();
      $("#avatar").show();
      tempPlayer = "Player " + currentPlayer;
      $("#numPlayers").text(tempPlayer);
      console.log(numPlayers);
    }
  });

  //select avatar
  var id = "spaceship1";  
  $(".avatars").on("click", createAvatarId);

  function createAvatarId() {
    id = $(this).attr("id");
    $(this).css('background-color', 'yellow');
  };
  //BUG: If you change your mind and click a different 
  //ship then the yellow background remains on the prior 
  //selection, however, it does selcet the correct one 
  //anyways

  //Player creation
  // var playerCounter = 1
  // $("#submitPlayer").on("click", 
  //   while (playerCounter < numPlayers) {
  //     createPlayer();
  //   });

$("#submitPlayer").on("click", createPlayer);

  function createPlayer () {
    playerInfo.push({
      player_id: tempPlayer, 
      name: $("#playerName").val(),
      avatar: id,
      score:[],
    });
    console.log(playerInfo);
    //var playerAvatar = 'url("images/' + id + '.png")'
    
    $("#avatar").hide();
    $("#instructions").show();
    $("#start").show();
  };

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




