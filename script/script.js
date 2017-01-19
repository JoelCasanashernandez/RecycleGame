//Begining 
$("document").ready(function() {
  dialogName = $("#dialogName").dialog({
    modal: true,
    buttons: {
      "Choose difficulty": function() {
        if (verifyUser()) {
          $(this).dialog("close");
          createDiffDialog();
        }
      }
    }
  });
})

function verifyUser() {
  userName = $("#playerName").val();
  if (userName.trim() == "") {
    $(".messageForm").html("Your name is required.");
    return false;
  } else {
    return true;
  }
}

function createDiffDialog() {
  dialogDiff = $("#dialogDifficulty").dialog({
    modal: true,
    buttons: {
    	"Easy":function(){setDifficulty("Easy");},
    	"Normal":function(){setDifficulty("Normal")},
    	"Hard":function(){setDifficulty("Hard")}
    }
  });
}
function setDifficulty(chosenDifficulty){
	difficulty = chosenDifficulty;
	dialogDiff.dialog("close");
	myGame = new recycleGame(userName,difficulty);
}