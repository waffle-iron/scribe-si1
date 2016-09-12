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
  end

  def delete
  end

  def edit
  end

  def update
  end
end
