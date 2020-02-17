class TransferSerializer < ActiveModel::Serializer
  attributes :id, :sender, :receiver, :amount
  has_one :receiver
  has_one :sender
end
