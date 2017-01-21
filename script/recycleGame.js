function recycleGame(userName, difficulty) {
  this.userName = userName;
  this.difficulty = difficulty;
  this.trashType = ["plastic", "paper", "glass", "organic"];
  this.totalImgs = this.setDifficulty();
  this.score = 0;

  this.prepareGame();
}
recycleGame.prototype.prepareGame = function() {
  this.prepareImages();
  this.addEventListener();
}

recycleGame.prototype.setDifficulty = function() {
  var that = this;
  switch (this.difficulty) {
    case "Easy":
      return 4;
    case "Normal":
      return 7;
    case "Hard":
      return 9;
  }
}

recycleGame.prototype.prepareImages = function() {
  var that = this;
  for (var i = 0; i < that.totalImgs; i++) {
    if (that.createTrash()) {
      i--;
    }
  }
  for (var i = 0; i < that.trashType.length; i++) {
    if ($("." + that.trashType[i]).length) {
      that.createBin(that.trashType[i]);
    }
  }
}
recycleGame.prototype.createTrash = function() {
  var trashType = this.trashType[this.generateRandom(4, 0)];
  var img = this.generateRandom(4, 1);
  var trashId = trashType + img;
  if ($("#" + trashId).length) {
    return true;
  } else {
    var trashClass = "draggableItem " + trashType;
    this.createBox(trashClass, trashId, true);
    return false;
  }
}
recycleGame.prototype.createBin = function(trashType) {
  var trashClass = "droppableItem " + trashType;
  this.createBox(trashClass, trashType, false);
  return false;
}
recycleGame.prototype.createBox = function(trashClass, trashId, trash) {
  var trashBox = "<div class='" + trashClass + "' id='" + trashId + "' />";
  if (trash) {
    $("#gameBox").append(trashBox);
    var trashBoxX = this.generateRandom($("#gameBox").width() - 200, 75);
    var trashBoxY = this.generateRandom($("#gameBox").height() - 200, 75);
    $("#" + trashId)
      .css("background-image", "url(multimedia/img/" + trashId + ".png)")
      .css("position", "absolute")
      .css("top", trashBoxY)
      .css("left", trashBoxX);
  } else {
    $("#binBox").append(trashBox)
      $("#" + trashId).css("background-image", "url(multimedia/img/" + trashId + ".png)");
  }

}
recycleGame.prototype.addEventListener = function() {
  var that = this;
  $(".draggableItem").draggable({
    containment: "#gameBox",
    scroll: false,
    revert: "valid"
  });

  $(".droppableItem").droppable({
    accept: ".draggableItem",
    drop: function(event, ui) {
      that.Drop(event, ui, that)
    }
  });
}
recycleGame.prototype.Drop = function(event, ui, obj) {
  if (ui.draggable.hasClass(event.target.id)) {
    ui.draggable.hide();
    obj.scorePoint();
  }
}
recycleGame.prototype.scorePoint = function() {
  if (this.score == this.totalImgs - 1) {
    createNewGameDialog();
  } else {
    this.score++;
    toastr.info("<h3>Now you have " + this.score + " point(s)!<h3>");
  }

}
recycleGame.prototype.generateRandom = function(maxValue, minValue) {
  return Math.floor((Math.random() * maxValue) + minValue);
}