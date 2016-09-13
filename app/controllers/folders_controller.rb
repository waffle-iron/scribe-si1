class FoldersController < ApplicationController
  require 'json'
  before_action :is_logged_in?, only: [:index]
  layout 'drive', only: [:index]

  def format_js?
    request.format.js?
  end

  def index
    @folder = my_drive
  end

  def new
  end

  def show
    @folder = Folder.find(params[:id])
    respond_to do |format|
      format.html
      format.json {
        render :json => @folder.to_json
      }
    end
  end

  def find_children
    @folders = Folder.where(parent_folder_id: params[:folder_id])
    respond_to do |format|
      format.html
      format.json {
        render :json => @folders.to_json
      }
    end
  end

  def create
    @folder = Folder.new(get_request_params)

    if @folder.save
      render status: 201,
             json: {
               info: "Folder created",
               success: true,
               msg: "Sua pasta foi criada com sucesso! :)"
             }
     end
  end

  def edit
  end

  def update
  end

  def delete
  end

  private
  def get_request_params
    params.require(:folder).permit(:name, :parent_folder_id, :user_id)
  end
end
