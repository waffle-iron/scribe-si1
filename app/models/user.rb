class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  has_secure_password

  validates :first_name, :last_name, presence: true
  validates :username, length: { in: 4..60 }, uniqueness: true, presence: true
  validates :email, format: { with: VALID_EMAIL_REGEX }, uniqueness: true, presence: true
  validates :password, length: { in: 5..60 }, presence: true
end
