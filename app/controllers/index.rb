get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/game' do
	player1= Player.find_or_create_by_name(params[:first_player_name])
	player2= Player.find_or_create_by_name(params[:second_player_name])
	game = Game.create
	@game_id = game.id
	game.players << player1
	game.players << player2
	redirect "/game/#{game.id}"
end

get '/game/:game_id' do
	@game = Game.find(params[:game_id])
	@player1= @game.players.first
	@player2=@game.players.last
	erb :game	
end

put '/winner' do
   game = Game.find(params[:game_id])
   winner_obj = Player.find(params[:winner_id])
   game[:winner] = params[:winner_id]
   game[:time_taken_to_finish] =params[:time]
   game.save
end

get '/results/:game_id' do
	@game = Game.find(params[:game_id])	
	@player1 = @game.players.first
	@player2= @game.players.last
	@winner_id = @game[:winner]
	@winner = Player.find(@winner_id)
	erb :stats
end