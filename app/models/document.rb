class Document < ApplicationRecord
  attr_accessor :owner, :permission
  belongs_to :folder
  belongs_to :user
  has_many :policies, class_name: 'Policy'
  validates :name, :extension, presence: true
end
