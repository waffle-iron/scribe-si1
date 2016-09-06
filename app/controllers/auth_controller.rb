class AuthController < ApplicationController
  include AuthHelper
  require 'json'
  before_action :is_logged_in?, only: [:login]
  layout 'api', only: [:authenticate, :destroy]

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
        render status: 200,
               json: {
                   success: true,
                   info: "Authenticated",
                   data: {
                       success: true,
                   }
               }
      else
        #senha incorreta, redirecionar para a tela de login
      end
    end
  end

  # GET /login
  def login
  end

  # GET /logout
  def destroy
    destroy_session if session[:current_user_id]
  end
end
