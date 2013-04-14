class Game < ActiveRecord::Base
 	attr_accessor :winner,:time_taken_to_finish
 	has_and_belongs_to_many :players
 	belongs_to :winner, :class_name => "Player" , :foreign_key=>"winner_id"
end
