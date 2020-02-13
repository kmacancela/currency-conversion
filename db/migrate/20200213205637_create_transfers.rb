class CreateTransfers < ActiveRecord::Migration[6.0]
  def change
    create_table :transfers do |t|
      t.integer :sender
      t.integer :receiver
      t.decimal :amount
      t.timestamps
    end
  end
end
