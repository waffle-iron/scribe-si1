class AuthController < ApplicationController
  require 'json'

  layout 'api', only: [:authenticate, :destroy]

  # POST /login
  def authenticate
    email = params[:user][:email]
    password = params[:user][:password]

    @user = User.find_by email: email

    if @user.blank?
      puts 'Usuario nao encontrado'
    else
      puts 'Usuario encontrado com sucesso'
      if @user && @user.authenticate(password)
        session[:current_user_id] = @user.id
        puts session
        puts 'senha correta'
      else
        puts 'senha incorreta'
      end
    end
  end

  # GET /login
  def login
  end

  # POST /destroy
  def destroy
  end

  private
end
