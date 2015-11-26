console.log("Sanity Check: JS is working!");

$(document).ready(function(){
 
//p1 moves using keystroke l

$(document).keydown(function(e) {
        if(e.keyCode == 76) {
        $(".one").animate({ left: "+=5px",})
		}
	})

//p2 moves using keystroke

$(document).keydown(function(e) {
        if(e.keyCode == 65) {
        $(".two").animate({ left: "+=5px",})
		}
	})

 /*
	$(".player").click(function(){
	    $(this).animate({ 
	        left: "+=5px",
	    });
	});

var player=document.getElementById('one');
var board=document.getElementById('b');

var oneLeft = 0;

function anim(e){
	
	if(e.keyCode === 76){
		oneLeft +=5;
		oneLeft.style.left = oneLeft + 'px';
	}
} 
 
function checkKeyCode(e) {
	
	alert(e.keyCode);
}

document.onkeydown = checkKeyCode;


$(".player").animate({ 
	        left: "+=5px",
	    });
*/

});

