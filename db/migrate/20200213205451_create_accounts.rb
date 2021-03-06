class CreateAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.decimal :balance
      t.string :currency
      t.timestamps
    end
  end
end
