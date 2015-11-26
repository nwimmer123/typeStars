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
 /*

	});

	if ($(".one").css("left") === ("20px")) {
		alert("winner");
	}
*/

});

