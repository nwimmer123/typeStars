$(document).ready(function(){


 //I grabbed this function of stackOverflow after researching for awhile.

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
     
  generateWords();


  $(".toType").text(gameWords[0]);


  
  var j = 1;

    $(document).keyup(function(e){
      var targetWord = $(".toType").text();
      var typedWord = $("#word").val();
      while (j < gameWords.length){
        console.log(j);
        console.log(typedWord);
      
        if($("#word").val() === targetWord){
          console.log("They match!")
          $(".player").css({left: "+=15px",});
          targetWord = $(".toType").text(gameWords[j]);

          $("#word").val("");
          j++;
        }else {
          return
        };
      }
    });



  // function runRace() {
  //   $(document).keyup(function(e){
  //     var j = 1;
  //     var typedWord = $("input").val();
  //     while (j < gameWords.length){
  //       console.log(j);
  //       console.log(typedWord);
      
  //       if($("input").val() === targetWord){
  //         console.log("They match!")
  //         $(".player").css({left: "+=15px",});
  //         targetWord = $(".toType").text(gameWords[j]);

  //         $("input").val("");
  //         j++;
  //       }
  //     }
  //   });
  // }

  //START RACE button
  $("#start").on("click", function() {
    console.log("clicked start");
    runRace();
  })



//working RESET button
	$("#reset").on("click", function() {
		$(".player").css({left: 0,});
		});

	

});



