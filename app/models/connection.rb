class Connection < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :groups
  validates :email, presence: true, email: true
end
