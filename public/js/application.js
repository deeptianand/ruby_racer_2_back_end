function Game(player1,player2) {
	this.player1 =player1;
	this.player2= player2;
	this.start_time = $.now();
	this.end_time = $.now();
	this.id = GAME_DATA["game"].game.id
}

function Player(player) {
	this.player_name = GAME_DATA["player"+player].player.name;
	this.position = 1;
	this.row = "#player"+player+"_strip";
	this.player_id = GAME_DATA["player"+player].player.id;
}

Player.prototype.advance_player = function() {
	this.position = this.position +1 ;
	var active_td = $(this.row).find('.active');
	active_td.removeClass('active');
	active_td.next().addClass('active');

}

Player.prototype.restart = function(){
	var active_td = $(this.row).find('.active');
	active_td.removeClass('active');
	$(this.row).find('td:eq(0)').addClass('active');
}

Game.prototype.winner = function(player) {
	if ($(player.row).children().length  == player.position) {
		$('#play_again').show();
		$('#start_new_game').show();
		$('#stats').show();
		this.end_time = $.now();
		var time_diff = (this.end_time - this.start_time);
		$.ajax({
			url:'/winner',
			method:'put',
			data : { "time" : time_diff ,"game_id": this.id , "winner_id" : player.player_id },
			success: function(response){
		     $('#winner').text("player "+ player.player_name+  " wins  "+ "in  " + time_diff + "  milliseconds" ).show();        

			       }
		    });	
            $('#winner').text("Declaring Results...Please Wait")
		   
	    }

}



Game.prototype.restart = function() {		
	this.player1.restart();
	this.player2.restart();
	$('#winner').hide();

}

Game.prototype.onKeyUp = function(e){
	if (e.which == 81) {
		this.player1.advance_player();
		this.winner(this.player1);

	}
	if (e.which == 80) {
		this.player2.advance_player();
		this.winner(this.player2);
	}
}

$(document).ready(function() {
	var player1 = new Player(1);
	var player2 = new Player(2);
	var game = new Game(player1,player2);
	
	$(document).on("keyup",function(e) {
		game.onKeyUp(e);
	});

	$('#play_again').on("click",function() {
		game.restart();
	});
});