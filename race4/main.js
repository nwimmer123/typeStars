console.log("Sanity Check: JS is working!");

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
         console.log("Word Array: " + gameWords);
    }
     
    generateWords();


    $(".toType").text(gameWords[0]);

        
    var typedWord = $("input").val();
    var targetWord = $(".toType").text();
 
    $(document).keyup(function(e){
   

        for (var j = 1; j < gameWords.length; j++){
            console.log(typedWord);
                 if($("input").val() === targetWord){
                console.log("They match!")
                $(".player").css({left: "+=15px",});
                targetWord = $(".toType").text(gameWords[j]);
          
                $("input").val("");
            }
        }
    });


//working RESET button
	$("button").on("click", function() {
		$(".player").css({left: 0,});
		});

	

});



