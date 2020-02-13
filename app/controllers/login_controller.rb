class LoginController < ApplicationController
  def create
    account = Account.find_by("lower(email) = ?", params[:email].downcase)
    if account && account.authenticate(params[:password])
      render json: { token: create_token(account.id), account_id: account.id }
    else
      render json: { errors: [ "Sorry, we couldn't find that account in our database." ] }, status: :unprocessable_entity
    end
  end
end
