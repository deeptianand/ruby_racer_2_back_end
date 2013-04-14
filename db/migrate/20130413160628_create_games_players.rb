class CreateGamesPlayers < ActiveRecord::Migration
  def change
  	create_table :games_players do |t|
  		t.references :game
  		t.references :player
  	end	
  end
end
