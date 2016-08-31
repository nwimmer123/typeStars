$(document).ready(function(){

  //define players
  var player1name = "";
  var player2name = "";
  var player3name = "";
  var player4name = "";

  //define avatars
  var avatar1 = "";
  var avatar2 = "";
  var avatar3 = "";
  var avatar4 = "";

  //hide elements
  $("#avatar").hide();
  $(".wordDisplay").hide();
  $("#instructions").hide();
  
  //START RACE button
  $("#start").on("click", function() {
    runRace();
  })

  //working RESET button
	$("#reset").on("click", function() {
		$(".player").css({left: 0,});
		});

  //player selector
  var numPlayers = 0;
  $("#playerCountBtn").on("click", function() {
    console.log("clicked");
    if ($("#playerCount").val() > 4) {
      $(lowerIntro).text("Please enter a number less then 4");
    } else {
      numPlayers = $("#playerCount").val();
      $("#intro").hide();
      $("#avatar").show();
      console.log(numPlayers);
    }
  });

  //

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

function setupRace() {
  document.getElementById("word").focus();
  generateWords();
  $(".toType").text(gameWords[0]);
}

function runRace() {
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



