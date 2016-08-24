class Document < ApplicationRecord
  belongs_to :folder
  belongs_to :user
  validates :name, :extension, presence: true
end
