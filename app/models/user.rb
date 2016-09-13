class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  has_many :notifications
  has_secure_password

  validates :first_name, :last_name, presence: true
  validates :username, uniqueness: true, presence: true
  validates :email, format: { with: VALID_EMAIL_REGEX }, uniqueness: true, presence: true
  validates :password, presence: true
end
