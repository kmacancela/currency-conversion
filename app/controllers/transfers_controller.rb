class TransfersController < ApplicationController
  def index
    allTransfers = Transfer.all
    render json: allTransfers
  end

  def show
    @transfer = Transfer.find_by(id: params[:id])
    render json: @transfer
  end

  def create
    transfer = Transfer.create(transfer_params)
    if transfer.valid?
      render json: transfer
    else
      render json: { errors: transfer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def transfer_params
    params.permit(:sender, :receiver, :amount)
  end
end
