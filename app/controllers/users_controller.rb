class UsersController < ApplicationController

  skip_before_action :require_login, only: [:login, :create]

  def create
    # POST to create new account
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = 'Account created!'
      create_user_session(@user)
      redirect_to '/dashboard'
    else
      flash[:notice] = 'FAIL'
      redirect_to :root
    end

  end

  def show
    # GET to show account page?
  end

  def update
    # PUT to update account info
  end

  def destroy
    # DELETE to delete account
  end

  def login
    #POST to login and create a session. redirect to the main page...
    user = User.authenticate(user_params[:email], user_params[:password])

    if user
      flash[:notice] = "Successful login!"
      create_user_session(user)
    else
      flash[:notice] = "Failed to login!"
    end

    redirect_to '/dashboard'
  end

  def logout
    #POST to logout. redirect to home page
    destroy_user_session

    redirect_to :root, notice: "Successful logout!"
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
