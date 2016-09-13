class CreatePolicies < ActiveRecord::Migration[5.0]
  def change
    create_table :policies do |t|
      t.belongs_to :document
      t.belongs_to :user
      t.string :permission
      t.timestamps
    end
  end
end
