class User < ActiveRecord::Base
  attr_accessible :email, :name

  has_many :photos

  before_save { |user| user.email = email.downcase }
  before_save :create_remember_token

  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end
end
