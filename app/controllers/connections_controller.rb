class ConnectionsController < ApplicationController

  def create
    new_connection = Connection.new(connection_params)
    new_connection.user = current_user

    if new_connection.save
      render json: new_connection
    else
      render json: {errors: new_connection.errors.full_messages}, status: 422
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def connection_params
    params.permit(:first_name, :last_name, :email)
  end
end
