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
 
	$(document).keydown(function(e) {
		if ($(".one").css("left") === ("800px")) {
			alert("Player one wins");
		} else if ($(".two").css("left") === ("800px")) {
			alert("Player two wins");
		}
	});

});



