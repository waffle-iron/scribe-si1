class Policy < ApplicationRecord
  belongs_to :document
  has_one :user
  validates :permission, presence: true
end
