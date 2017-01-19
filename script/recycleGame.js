function recycleGame(userName,difficulty){
	this.userName = userName;
	this.difficulty=difficulty;

	this.prepareGame();
}

recycleGame.prototype.prepareGame = function(){
	console.log(this)
}