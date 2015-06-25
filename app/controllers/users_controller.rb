class UsersController < ApplicationController

  def create
    # POST to create new account
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = 'Account created!'
    else
      flash[:notice] = 'FAIL'
    end

    redirect_to :root
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

    redirect_to :root
  end

  def logout
    #POST to logout. redirect to home page
    destroy_user_session

    redirect_to :root, notice: "Successful logout!"
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def create_user_session(user)
    session[:user_id] = user.id
  end

  def destroy_user_session
    session[:user_id] = nil
  end

end
