class AccountController < ApplicationController

  def edit
    contextio.connect_tokens.each do |t|
      puts t.email
    end
  end

  def add_email_account
    new_token = contextio.connect_tokens.create(url_for(action: 'edit'), add_email_params)

    redirect_to new_token.browser_redirect_url
  end

  private

  def add_email_params
    params.permit(:email)
  end

end
