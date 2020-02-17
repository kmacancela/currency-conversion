class AccountSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest, :currency, :balance
  has_many :incoming_transfers
  has_many :outgoing_transfers
end
