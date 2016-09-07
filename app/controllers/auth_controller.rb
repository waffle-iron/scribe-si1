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
      #usuario nao encontrado
    else
      #usuario encontrado
      if @user && @user.authenticate(password)
        #senha correta, criar sessao
        new_session @user
        render status: 200,
               json: {
                   success: true,
                   info: "Authenticated",
                   data: {
                       success: true,
                   }
               }
      else
        #senha incorreta
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
      redirect_to :controller => 'auth', :action => 'login'
    end
  end
end
