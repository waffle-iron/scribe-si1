class CreateNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :notifications do |t|
      t.belongs_to :from_user
      t.belongs_to :to_user
      t.string :message
      t.timestamps
    end
  end
end
