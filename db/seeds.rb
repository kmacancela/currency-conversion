Account.destroy_all
Transfer.destroy_all

Account.reset_pk_sequence
Transfer.reset_pk_sequence

user1 = Account.create(first_name: 'Karina', last_name: 'Macancela', email: 'karina@gmail.com', password: 'karina', balance: 10000.50, currency: 'USD')

user2 = Account.create(first_name: 'Jean-Pierre', last_name: 'Chigne', email: 'jp@gmail.com', password: 'jp', balance: 40000.75, currency: 'GBP')

# transfer1 = Transfer.create(sender: user1.id, receiver: user2.id, amount: 1000.50)

puts 'Seeded!'
