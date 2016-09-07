class UsersController < ApplicationController
  require 'json'
  layout 'auth', only: [:new]

  # GET /register
  def new
    @user = User.new
  end

  # POST /users
  def create
    @user = User.new(get_request_params)

    if @user.save
      redirect_to :controller => 'auth', :action => 'login'
    else
      # usuario não registrado por algum motivo, provavelmente email ou nome de usuário já existem, exibir mensagem de erro baseada nisso
    end
  end

  private
  def get_request_params
    params.require(:user).permit(:first_name, :last_name, :email, :username, :password)
  end

  def unavailable_email?
    User.exists?(email: @user.email)
  end

  def unavailable_username?
    User.exists?(email: @user.username)
  end
end
