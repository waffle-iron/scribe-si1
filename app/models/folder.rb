class Folder < ApplicationRecord
  belongs_to :user
  belongs_to :parent_folder, class_name: 'Folder'
  has_many :children_folders, class_name: 'Folder', :dependent => :destroy, foreign_key: 'parent_folder_id'
  has_many :documents, class_name: 'Document', :dependent => :destroy
  validates :name, presence: true
end
