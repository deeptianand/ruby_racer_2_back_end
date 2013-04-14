class CreateGames < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.integer :winner
  		t.integer :time_taken_to_finish
  		t.timestamps
  	end
  end
end
