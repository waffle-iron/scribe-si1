class DocumentsController < ApplicationController
  require 'json'
  before_action :is_logged_in?, only: [:edit]
  layout 'editor', only: [:new, :edit]

  def index
    @documents = Document.all
    respond_to do |format|
      format.html
      format.json {
        render :json => @documents.to_json
      }
    end
  end

  def find_children
    @documents = Document.where(folder_id: params[:folder_id])
    respond_to do |format|
      format.json {
        render :json => @documents.to_json
      }
    end
  end

  def find_shared
    user_id = params[:user_id]
    @policies = Policy.where(user_id: user_id)
    shared_documents = []

    @policies.each do |policy|
      document = Document.find(policy.document_id)
      document.owner = document.user.first_name + ' ' + document.user.last_name
      document.permission = policy.permission
      shared_documents.push(document)
    end

    respond_to do |format|
      format.json {
        render :json => shared_documents.to_json(:methods => [:owner, :permission])
      }
    end
  end

  def show
    @document = Document.find(params[:id])
    respond_to do |format|
      format.html
      format.json {
        render :json => @document.to_json
      }
    end
  end

  def create
    @document = Document.new(get_request_params)

    if @document.save
      render status: 201,
             json: {
               info: "Document created",
               success: true,
               msg: "Seu documento foi criado com sucesso! :)"
             }
    else
      render status: 200,
             json: {
               info: "Document not created",
               success: false,
               msg: "A extensão que você escolheu é inválida :("
             } if !valid_extension?(@document.extension)
    end
  end

  def edit
  end

  def update
    @document = Document.find(params[:id])

    if @document.update(get_request_params)
      render status: 200,
             json: {
               info: "Document updated",
               success: true,
               msg: "Seu documento foi atualizado com sucesso! :)"
             }
    else
      render status: 200,
             json: {
               info: "Document not updated",
               success: false,
               msg: "Houve algum problema ao atualizar seu documento. Tente novamente. :("
             }
    end
  end

  def valid_extension?(extension)
    if extension == 'md' || extension == 'txt'
      return true
    else
      return false
    end
  end

  private
  def get_request_params
    params.require(:file).permit(:name, :extension, :content, :folder_id, :user_id)
  end
end
