console.log("Sanity Check: JS is working!");

$(document).ready(function(){
 
//p1 moves using keystroke l

$(document).keydown(function(e) {
        if(e.keyCode == 76) {
        $(".one").css({left: "+=5px",});
		}
	});

//p2 moves using keystroke

$(document).keydown(function(e) {
        if(e.keyCode == 65) {
        $(".two").css({left: "+=5px",});
		}
	});



//working RESET button
	$("button").on("click", function() {
		$(".one").css({left: 0,});
		$(".two").css({left: 0,});
		});

//win condition
 
var winner;

	$(document).keydown(function(e) {
		if ($(".one").css("left") === ("20px")) {
			winner = "Player 1";
			alert("Player one wins");
			winRamifications();
		} else if ($(".two").css("left") === ("20px")) {
			winner = "Player 2";
			alert("Player two wins");
			winRamifications();
		}
	});


var playerOneWins = 0;
var playerTwoWins = 0;
//autoresets board
	function winRamifications() {
		$(".one").css({left: 0,});
		$(".two").css({left: 0,});
		if (winner === "Player 1") {
			playerOneWins += 1;
			$(".pOne").text = playerOneWins
		} else if (winner === "Player 2") {
			playerTwoWins += 1;
		}
	}
	


});



