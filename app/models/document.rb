class Document < ApplicationRecord
  belongs_to :folder
  belongs_to :user
  has_many :policies, class_name: 'Policy'
  validates :name, :extension, presence: true
end
