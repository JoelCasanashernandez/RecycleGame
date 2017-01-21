//Begining 
$("document").ready(function() {
  actualWidth = $(window).width();
 /* $(window).resize(function(){
    var tmpWidth = $(this).width();
    var diffWidth = actualWidth-tmpWidth;
    $(".draggableItem").each(function(){
      var prevLeft = $(this).css("left");
      $(this).css("left",prevLeft+diffWidth)
    });
  });*/
  setToastrOptions();
  dialogName = $("#dialogName").dialog({
    modal: true,
    closeOnEscape: false,
    buttons: {
      "Choose difficulty": function() {
        if (verifyUser()) {
          $(this).dialog("close");
          createDiffDialog();
        }
      }
    }
  });
});

function verifyUser() {
  userName = $("#playerName").val();
  if (userName.trim() == "") {
    $(".messageForm").html("Your name is required.");
    return false;
  } else {
    return true;
  }
}
function setToastrOptions(){
  toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-bottom-full-width",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "10",
  "hideDuration": "10",
  "timeOut": "1000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

}
function createDiffDialog() {
  $("#binBox").html("");
  $(".draggableItem").remove();
  dialogDiff = $("#dialogDifficulty").dialog({
    modal: true,
    closeOnEscape: false,
    buttons: {
    	"Easy":function(){setDifficulty("Easy")},
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
function createNewGameDialog(){
  dialogNewGame = $("#dialogNewGame").dialog({
    modal:true,
    buttons:{
      "Yes":function(){
        createDiffDialog();
        dialogNewGame.dialog("close");
      },
      "No":function(){
        dialogNewGame.dialog("close");
      }
    }
  });
}