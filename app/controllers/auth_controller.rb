class AuthController < ApplicationController
  include AuthHelper
  require 'json'
  before_action :is_logged_in?, only:[:login]
  layout 'api', only: [:authenticate]

  # POST /login
  def authenticate
    email = params[:user][:email]
    password = params[:user][:password]

    @user = User.find_by(email: email)

    if @user.blank?
      puts 'User not found'
      render status: 200,
             json: {
                 success: false,
                 msg: "Não existe um usuário com esse e-mail. :(",
             }
    else
      if @user && @user.authenticate(password)
        puts 'Valid password, creating session...'
        new_session(@user)
        render status: 200,
               json: {
                   success: true,
                   current_user_id: @user.id,
                   info: "Authenticated",
               }
      else
        puts 'Invalid password'
        render status: 200,
               json: {
                   success: false,
                   msg: "A senha que você forneceu está incorreta. :(",
               }
      end
    end
  end

  # GET /login
  def login
  end

  # GET /logout
  def destroy
    if session[:current_user_id]
      destroy_session
    end
  end
end
