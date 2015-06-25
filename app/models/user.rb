class User < ActiveRecord::Base

  validates :name, :presence => true
  validates :email, :presence => true, :uniqueness => true, :email => true
  validates :password, :presence => true, :confirmation => true
  validates :password_confirmation, :presence => { :if => :password }

  def password=(pass)
    return if pass.blank?
    self.password_digest = BCrypt::Password.create(pass)
  end

  def password
    self.password_digest
  end

  def self.authenticate(email, pass)
    user = find_by_email(email)
    user && BCrypt::Password.new(user.password_digest) == pass ? user : nil
  end

end
