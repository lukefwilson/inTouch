class AccountController < ApplicationController

  def edit
    contextio.connect_tokens.each do |t|
      puts t.email
    end
  end

  def add_email_account
    #POST to add email account and go through contextio process
    new_token = contextio.connect_tokens.create(
                  url_for(action: 'new_connect_token'),
                  add_email_params
                )

    redirect_to new_token.browser_redirect_url
  end

  def new_connect_token
    if !current_user.contextio_id && new_connect_token_params[:contextio_token]
      token_id = new_connect_token_params[:contextio_token]
      new_token = contextio.connect_tokens[token_id]
      new_account_id = new_token.account.id
      current_user.update(contextio_id:  new_account_id)
      flash[:notice] = "New contextio account #{new_account_id}"
    end

    redirect_to action: 'edit'
  end

  private

  def add_email_params
    params.permit(:email)
  end

  def new_connect_token_params
    params.permit(:contextio_token)
  end

end
