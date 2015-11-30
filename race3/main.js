console.log("Sanity Check: JS is working!");

$(document).ready(function(){

var playerOne = {
	name: "player1",
	avatar: "",
	score: 0,
};

var playerTwo = {
	name: "player2",
	avatar: "",
	score: 0,
};
 	
 	playerOne.name = prompt("Player one, what is your name?");
 	playerTwo.name = prompt("Player two, what is your name?");
 	$(".pOne").text(playerOne.name + " the jaguar!!");
 	$(".pTwo").text(playerTwo.name + " the panther!!");

//p1 moves left using keystroke a
	$(document).keyup(function(e) {
		if(e.keyCode == 65) {
			$(".one").css({left: "-=5px",});
			}
		});
//p1 moves right using keystroke s	
		$(document).keyup(function(e) {
		if(e.keyCode == 83) {
			$(".one").css({left: "+=5px",});
			}
		});
//p1 moves up using keystroke z
			$(document).keyup(function(e) {
		if(e.keyCode == 90) {
			$(".one").css({top: "+=5px",});
			}
		});
//p1 moves up using keystroke w
				$(document).keyup(function(e) {
		if(e.keyCode == 87) {
			$(".one").css({top: "-=5px",});
			}
		});

//p2 moves left using keystroke k
	$(document).keyup(function(e) {
		if(e.keyCode == 75) {
			$(".two").css({left: "-=5px",});
			}
		});
//p2 moves right using keystroke l	
		$(document).keyup(function(e) {
		if(e.keyCode == 76) {
			$(".two").css({left: "+=5px",});
			}
		});
//p2 moves up using keystroke o
			$(document).keyup(function(e) {
		if(e.keyCode == 79) {
			$(".two").css({top: "-=5px",});
			}
		});
//p2 moves up using keystroke ,
				$(document).keyup(function(e) {
		if(e.keyCode == 188) {
			$(".two").css({top: "+=5px",});
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
				$(".winCounter").hide();
				alert(playerOneName + " has vanquished all!!!");	
			} else if(pTwoWins === 3) {
				pOneWins = 0;
				pTwoWins = 0;
				$(".winCounter").hide();
				alert(playerTwoName + " has vanquished all!!!");	
			}
		}
	}
/*
// i snagged all the following functions off of Stack Overflow, but they do 
//mostly make sense to me
    animateDiv();
    animateDiv2();
    


function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];    
    
}

function animateDiv(){
    var newq = makeNewPosition();
    var oldq = $('.enemy').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.enemy').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};

function animateDiv2(){
    var newq = makeNewPosition();
    var oldq = $('.enemy2').offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $('.enemy2').animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
    
};
function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}
//collision detectors that sort of work, these functions are from
//https://jquerygamesforbeginners.wordpress.com/identify-div-collision/
//detecting divs collision
    function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
        
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
          return false;
      } else {
      console.log("collision!!")
      $(".one").css({left: 0,});
      return true;
      }
  }

//detect collision for every 2 seconds
window.setInterval(function() {
    $('#result2').text(collision($('.one'), $('.enemy')));
}, 50);

    function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
        
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
          return false;
      } else {
      console.log("collision!!")
      $(".player").css({left: 0,});
      return true;
      }
  }

//detect collision for every 2 seconds
window.setInterval(function() {
    $('#result2ssss').text(collision($('.two'), $('.enemy2')));
}, 50);

*/
});


