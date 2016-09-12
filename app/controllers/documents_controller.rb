class DocumentsController < ApplicationController
  require 'json'

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

  def new
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

  def delete
  end

  def edit
  end

  def update
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
    params.permit(:name, :extension, :content, :folder_id, :user_id)
  end
end
