class AccountsController < ApplicationController
  def index
    allAccounts = Account.all
    render json: allAccounts
  end

  def show
    @account = Account.find_by(id: params[:id])
    render json: @account
  end

  def create
    account = Account.create(account_params)
    if account.valid?
      render json: account
    else
      render json: { errors: account.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params.permit(:first_name, :last_name, :email, :password)
  end
end
