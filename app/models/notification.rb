class Notification < ApplicationRecord
  attr_accessor :sender_email
  belongs_to :from_user, class_name: 'User'
  belongs_to :to_user, class_name: 'User'
  validates :message, presence: true
end
