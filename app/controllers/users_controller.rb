class UsersController < ApplicationController
  require 'json'
  layout 'auth', only: [:new]

  # GET /register
  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.html
      format.json {
        render :json => @user.to_json
      }
    end
  end

  # POST /users
  def create
    @user = User.new(get_request_params)

    if @user.save
      create_default_tree(@user)
      render status: 201,
             json: {
                info: "Account created",
                success: true,
                msg: "Usuário criado com sucesso! :)"
             }
    else
      render status: 200,
             json: {
               info: "Account not created",
               success: false,
               msg: "Nome de usuário já registrado. Por favor, escolha outro. :("
             } if unavailable_username?

      render status: 200,
             json: {
               info: "Account not created",
               success: false,
               msg: "Endereço de email já registrado. Por favor, escolha outro. :("
             } if unavailable_email?
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
    User.exists?(username: @user.username)
  end

  def create_default_tree(user)
    @folder = Folder.create(name: DEFAULT_FOLDER_NAME, parent_folder: nil, user: user)
    @folder.save(:validate => false)
    @document = Document.create(name: DEFAULT_DOCUMENT_NAME, content: DEFAULT_DOCUMENT_CONTENT, extension: DEFAULT_DOCUMENT_EXTENSION, folder: @folder, user: user)
    @document.save
  end
end
