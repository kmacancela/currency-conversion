class CreateTransfers < ActiveRecord::Migration[6.0]
  def change
    create_table :transfers do |t|
      t.references :sender, foreign_key: { to_table: 'accounts' }
      t.references :receiver, foreign_key: { to_table: 'accounts' }
      t.decimal :amount
      t.timestamps
    end
  end
end
