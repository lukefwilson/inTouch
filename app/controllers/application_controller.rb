class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :require_login

  def require_login
    unless current_user
      flash[:error] = "You must be logged in to do that!"
      redirect_to :root # halts request cycle
    end
  end

  def current_user
    if session[:user_id]
      @@current_user ||= User.find(session[:user_id])
    end
  end

  def create_user_session(user)
    session[:user_id] = user.id
  end

  def destroy_user_session
    session[:user_id] = nil
    @@current_user = nil;
  end

  def contextio
    @@context ||=  ContextIO.new(ENV['CONTEXTIO_KEY'], ENV['CONTEXTIO_SECRET'])
  end

end
