function update_player_position(player,time) {
	var row = $("#player"+player+"_strip");
	var active_td = row.find('.active');
	active_td.removeClass('active');
	active_td.next().addClass('active');

	if (row.children().length -1  == active_td.next().index()) {
		$('#play_again').show();
		$('#start_new_game').show();
		$('#stats').show();
		var time_after_win = $.now();
		var time_diff = (time_after_win - time);
		$.ajax({
			url:'/winner',
			method:'put',
			data : { "time" : time_diff ,"game_id": $('.racer_table').data("gameid") , "winner_id" : row.data("id") },
			success: function(response){
		             

			       }
		    });	

		   $('#winner').text("player "+ row.data("name")+  " wins  "+ "in  " + time_diff + "  milliseconds" ).show();
	    }
  }

function restart(player) {
	var row = $("#player"+player+"_strip");
	var active_td = row.find('.active');
	active_td.removeClass('active');
	row.find('td:eq(0)').addClass('active');
	$('#winner').hide();
}

$(document).ready(function(){
	var time = $.now();
	alert(<%=@game.id%>);
	$('#play_again').hide();
	$('#stats').hide();
	$('#start_new_game').hide();
	$(document).keyup(function(e){
		
		if(e.which == 80) {
		
			update_player_position(1,time);
		}
		else if(e.which == 81) {
		
			update_player_position(2,time);
		}
	});

	$('#play_again').on("click",function() {
    			restart(1)
				restart(2)
  
	});

});