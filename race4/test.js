 //I'm stumped here. Any help would be greatly appreciated. I've consoled logged and check typeOf of both the variables. I have them set as the same string, but the then function of the if statement isn't happening. I can't see what wrong. Anything obvious I'm missing? Thanks

    var typedWord = $("input").val();
    var targetWord = $(".toType").text();
 
 $(document).keydown(function(e){
    for (var j = 1; j < gameWords.length; j++){
        if((e.keyCode == 13) && (typedWord === targetWord)){
            $(".player").css({left: "+=15px",});
            $(".toType").text(gameWords[j]);
            $("input").val("");
        } else {
            $("input").val("");
            return;
        }
    }
});
/*
when I ask console 

typedWord === targetWord 

it returns true, 

but when I then try

if(targetWord === typedWord) {
	alert("HI");
}

nothing happens!!

Arrgghh!!!!

This is driving me nuts.

