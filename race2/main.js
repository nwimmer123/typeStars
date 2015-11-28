console.log("Sanity Check: JS is working!");

$(document).ready(function(){
 	
 	var playerOneName = prompt("Player one, what is your name?");
 	var playerTwoName = prompt("Player two, what is your name?");
 	$(".pOne").text(playerOneName + " the jaguar!!");
 	$(".pTwo").text(playerTwoName+ " the panther!!");

//p1 moves using keystroke a
	$(document).keydown(function(e) {
		if(e.keyCode == 65) {
			$(".one").css({left: "+=5px",});
			}
		});

//p2 moves using keystroke l
	$(document).keydown(function(e) {
		if(e.keyCode == 76) {
			$(".two").css({left: "+=5px",});
			}
		});

//working RESET button
	$("button").on("click", function() {
		$(".one").css({left: 0,});
		$(".two").css({left: 0,});
		});

	$(".winCounter").hide();

	var pOneWins = 0;
	var pTwoWins = 0;


//win condition
	$(document).keydown(function(e) {
		if ($(".one").css("left") === ("100px")) {
			pOneWins += 1;
			winRamifications();
			$(".counterOne").text("number of glorious victories: " + pOneWins);
			$(".counterOne").show();
		} else if ($(".two").css("left") === ("100px")) {
			pTwoWins +=1;
			winRamifications();
			$(".counterTwo").text("number of glorious victories: " + pTwoWins);
			$(".counterTwo").show();
		}
	});

//autoresets board
	function winRamifications() {
		$(".one").css({left: 0,});
		$(".two").css({left: 0,});
		alert("Prepare for a rematch!!");
		if (pOneWins === 3 || pTwoWins === 3){
			if (pOneWins === 3) {
				pOneWins = 0;
				pTwoWins = 0;
				alert(playerOneName + "has vanquished all!!!");
			} else if(pTwoWins === 3) {
				pOneWins = 0;
				pTwoWins = 0;
				alert(playerTwoName + "has vanquished all!!!");
			}
		}
	}



});


